import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AnalysisCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  onClick: () => void;
}

export function AnalysisCard({ title, description, Icon, onClick }: AnalysisCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 bg-gradient-to-br from-blue-500 to-green-400 rounded-full">
          <Icon className="h-12 w-12 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}