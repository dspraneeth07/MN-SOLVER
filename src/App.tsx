import React, { useState } from 'react';
import { CircuitBoard, Network } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AnalysisCard } from './components/AnalysisCard';
import { MeshAnalysisForm } from './components/analysis/MeshAnalysisForm';
import { NodalAnalysisForm } from './components/analysis/NodalAnalysisForm';
import { AnalysisResults } from './components/analysis/AnalysisResults';
import { MeshInput, NodalInput, AnalysisResult } from './types/analysis';
import { solveMeshAnalysis, solveNodalAnalysis } from './utils/analysisUtils';

function App() {
  const [analysisType, setAnalysisType] = useState<'mesh' | 'nodal' | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisClick = (type: 'mesh' | 'nodal') => {
    setAnalysisType(type);
    setResult(null);
  };

  const handleMeshSubmit = (input: MeshInput) => {
    const result = solveMeshAnalysis(input);
    setResult(result);
  };

  const handleNodalSubmit = (input: NodalInput) => {
    const result = solveNodalAnalysis(input);
    setResult(result);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-6 py-12">
        {!analysisType ? (
          <>
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Mesh & Nodal Analysis Tool
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                MN SOLVER provides easy-to-use tools for solving Mesh and Nodal Analysis problems 
                in electrical engineering circuits. Select the type of analysis and input the 
                necessary parameters to get detailed solutions and circuit visualizations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <AnalysisCard
                title="Mesh Analysis"
                description="Analyze circuit loops using Kirchhoff's Voltage Law (KVL). Perfect for solving complex circuits with multiple loops."
                Icon={CircuitBoard}
                onClick={() => handleAnalysisClick('mesh')}
              />
              <AnalysisCard
                title="Nodal Analysis"
                description="Solve circuits using Kirchhoff's Current Law (KCL) at nodes. Ideal for determining node voltages in complex networks."
                Icon={Network}
                onClick={() => handleAnalysisClick('nodal')}
              />
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Why Choose MN SOLVER?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg mb-2">Visual Results</h3>
                  <p className="text-gray-600">Interactive circuit diagrams with real-time updates</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg mb-2">Step-by-Step Solutions</h3>
                  <p className="text-gray-600">Detailed explanation of the solving process</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg mb-2">Easy to Use</h3>
                  <p className="text-gray-600">Intuitive interface for quick problem-solving</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setAnalysisType(null)}
              className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Back to Selection
            </button>
            
            <h2 className="text-3xl font-bold mb-8">
              {analysisType === 'mesh' ? 'Mesh Analysis' : 'Nodal Analysis'}
            </h2>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              {analysisType === 'mesh' ? (
                <MeshAnalysisForm onSubmit={handleMeshSubmit} />
              ) : (
                <NodalAnalysisForm onSubmit={handleNodalSubmit} />
              )}
            </div>

            {result && (
              <AnalysisResults result={result} type={analysisType} />
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;