export interface MeshInput {
  numMeshes: number;
  resistances: number[];
  voltageSources: number[];
  currentSources?: number[];
}

export interface NodalInput {
  numNodes: number;
  nodeVoltages: number[];
  resistances: number[];
  voltageSources: number[];
  currentSources?: number[];
}

export interface AnalysisResult {
  equations: string[];
  solutions: { [key: string]: number };
  steps: string[];
}