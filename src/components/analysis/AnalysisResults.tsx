import React from 'react';
import { AnalysisResult } from '../../types/analysis';

interface AnalysisResultsProps {
  result: AnalysisResult;
  type: 'mesh' | 'nodal';
}

export function AnalysisResults({ result, type }: AnalysisResultsProps) {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <h3 className="text-xl font-bold mb-3">System of Equations</h3>
        <div className="space-y-2">
          {result.equations.map((equation, index) => (
            <div key={index} className="font-mono bg-gray-50 p-2 rounded">
              {equation}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3">Solutions</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(result.solutions).map(([variable, value]) => (
            <div key={variable} className="bg-gray-50 p-3 rounded">
              <span className="font-mono">
                {variable} = {value.toFixed(2)} {type === 'mesh' ? 'A' : 'V'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3">Solution Steps</h3>
        <ol className="list-decimal list-inside space-y-2">
          {result.steps.map((step, index) => (
            <li key={index} className="text-gray-700">
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}