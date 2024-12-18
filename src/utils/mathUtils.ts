export function solveLinearEquations(matrix: number[][], constants: number[]): number[] {
  // Gaussian elimination implementation
  const n = matrix.length;
  const augmentedMatrix = matrix.map((row, i) => [...row, constants[i]]);

  // Forward elimination
  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(augmentedMatrix[j][i]) > Math.abs(augmentedMatrix[maxRow][i])) {
        maxRow = j;
      }
    }

    [augmentedMatrix[i], augmentedMatrix[maxRow]] = [augmentedMatrix[maxRow], augmentedMatrix[i]];

    for (let j = i + 1; j < n; j++) {
      const factor = augmentedMatrix[j][i] / augmentedMatrix[i][i];
      for (let k = i; k <= n; k++) {
        augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k];
      }
    }
  }

  // Back substitution
  const solution = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    solution[i] = augmentedMatrix[i][n];
    for (let j = i + 1; j < n; j++) {
      solution[i] -= augmentedMatrix[i][j] * solution[j];
    }
    solution[i] /= augmentedMatrix[i][i];
  }

  return solution;
}