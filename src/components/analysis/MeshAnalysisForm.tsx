import React, { useState } from 'react';
import { MeshInput } from '../../types/analysis';
import { InputField } from '../ui/InputField';
import { Button } from '../ui/Button';

interface MeshAnalysisFormProps {
  onSubmit: (input: MeshInput) => void;
}

export function MeshAnalysisForm({ onSubmit }: MeshAnalysisFormProps) {
  const [numMeshes, setNumMeshes] = useState(2);
  const [resistances, setResistances] = useState<number[]>([0, 0]);
  const [voltageSources, setVoltageSources] = useState<number[]>([0, 0]);
  const [currentSources, setCurrentSources] = useState<number[]>([0, 0]);

  const handleNumMeshesChange = (value: number) => {
    setNumMeshes(value);
    setResistances(new Array(value).fill(0));
    setVoltageSources(new Array(value).fill(0));
    setCurrentSources(new Array(value).fill(0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      numMeshes,
      resistances,
      voltageSources,
      currentSources
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        label="Number of Meshes"
        type="number"
        min={1}
        max={10}
        value={numMeshes}
        onChange={(e) => handleNumMeshesChange(parseInt(e.target.value))}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Resistances (Ω)</h3>
        {resistances.map((_, index) => (
          <InputField
            key={`resistance-${index}`}
            label={`R${index + 1}`}
            type="number"
            step="0.1"
            value={resistances[index]}
            onChange={(e) => {
              const newResistances = [...resistances];
              newResistances[index] = parseFloat(e.target.value);
              setResistances(newResistances);
            }}
          />
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Voltage Sources (V)</h3>
        {voltageSources.map((_, index) => (
          <InputField
            key={`voltage-${index}`}
            label={`V${index + 1}`}
            type="number"
            step="0.1"
            value={voltageSources[index]}
            onChange={(e) => {
              const newVoltageSources = [...voltageSources];
              newVoltageSources[index] = parseFloat(e.target.value);
              setVoltageSources(newVoltageSources);
            }}
          />
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Current Sources (A) - Optional</h3>
        {currentSources.map((_, index) => (
          <InputField
            key={`current-${index}`}
            label={`I${index + 1}`}
            type="number"
            step="0.1"
            value={currentSources[index]}
            onChange={(e) => {
              const newCurrentSources = [...currentSources];
              newCurrentSources[index] = parseFloat(e.target.value);
              setCurrentSources(newCurrentSources);
            }}
          />
        ))}
      </div>

      <Button type="submit">Solve Mesh Analysis</Button>
    </form>
  );
}