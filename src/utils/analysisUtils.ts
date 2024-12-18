import { MeshInput, NodalInput, AnalysisResult } from '../types/analysis';
import { solveLinearEquations } from './mathUtils';

export function solveMeshAnalysis(input: MeshInput): AnalysisResult {
  const { numMeshes, resistances, voltageSources, currentSources = [] } = input;
  
  // Create coefficient matrix for mesh equations
  const matrix: number[][] = Array(numMeshes).fill(0).map(() => Array(numMeshes).fill(0));
  const constants: number[] = Array(numMeshes).fill(0);
  
  // Build matrix equations based on KVL
  for (let i = 0; i < numMeshes; i++) {
    matrix[i][i] = resistances[i];
    if (i < numMeshes - 1) {
      matrix[i][i + 1] = -resistances[i + 1];
      matrix[i + 1][i] = -resistances[i + 1];
    }
    constants[i] = voltageSources[i] || 0;
    if (currentSources[i]) {
      constants[i] += currentSources[i] * resistances[i];
    }
  }

  const solutions = solveLinearEquations(matrix, constants);
  
  return {
    equations: generateMeshEquations(matrix, constants),
    solutions: solutions.reduce((acc, curr, idx) => ({ ...acc, [`I${idx + 1}`]: curr }), {}),
    steps: generateMeshSteps(matrix, constants, solutions)
  };
}

export function solveNodalAnalysis(input: NodalInput): AnalysisResult {
  const { numNodes, nodeVoltages, resistances, voltageSources, currentSources = [] } = input;
  
  // Create conductance matrix
  const matrix: number[][] = Array(numNodes).fill(0).map(() => Array(numNodes).fill(0));
  const constants: number[] = Array(numNodes).fill(0);
  
  // Build matrix equations based on KCL
  for (let i = 0; i < numNodes; i++) {
    const conductance = 1 / resistances[i];
    matrix[i][i] = conductance;
    if (i < numNodes - 1) {
      matrix[i][i + 1] = -conductance;
      matrix[i + 1][i] = -conductance;
    }
    if (voltageSources[i]) {
      constants[i] = voltageSources[i] * conductance;
    }
    if (currentSources[i]) {
      constants[i] += currentSources[i];
    }
  }

  const solutions = solveLinearEquations(matrix, constants);
  
  return {
    equations: generateNodalEquations(matrix, constants),
    solutions: solutions.reduce((acc, curr, idx) => ({ ...acc, [`V${idx + 1}`]: curr }), {}),
    steps: generateNodalSteps(matrix, constants, solutions)
  };
}

function generateMeshEquations(matrix: number[][], constants: number[]): string[] {
  return matrix.map((row, i) => {
    const terms = row.map((coeff, j) => 
      coeff !== 0 ? `${coeff > 0 ? '+' : ''}${coeff}I${j + 1}` : ''
    ).filter(term => term);
    return `${terms.join(' ')} = ${constants[i]}`;
  });
}

function generateNodalEquations(matrix: number[][], constants: number[]): string[] {
  return matrix.map((row, i) => {
    const terms = row.map((coeff, j) => 
      coeff !== 0 ? `${coeff > 0 ? '+' : ''}${coeff}V${j + 1}` : ''
    ).filter(term => term);
    return `${terms.join(' ')} = ${constants[i]}`;
  });
}

function generateMeshSteps(matrix: number[][], constants: number[], solutions: number[]): string[] {
  return [
    'Step 1: Apply KVL to each mesh',
    'Step 2: Form system of equations',
    ...matrix.map((row, i) => `Equation ${i + 1}: ${generateMeshEquations([row], [constants[i]])[0]}`),
    'Step 3: Solve system of equations',
    ...Object.entries(solutions.reduce((acc, curr, idx) => ({ ...acc, [`I${idx + 1}`]: curr }), {}))
      .map(([key, value]) => `${key} = ${value.toFixed(2)} A`)
  ];
}

function generateNodalSteps(matrix: number[][], constants: number[], solutions: number[]): string[] {
  return [
    'Step 1: Apply KCL to each node',
    'Step 2: Form system of equations',
    ...matrix.map((row, i) => `Equation ${i + 1}: ${generateNodalEquations([row], [constants[i]])[0]}`),
    'Step 3: Solve system of equations',
    ...Object.entries(solutions.reduce((acc, curr, idx) => ({ ...acc, [`V${idx + 1}`]: curr }), {}))
      .map(([key, value]) => `${key} = ${value.toFixed(2)} V`)
  ];
}