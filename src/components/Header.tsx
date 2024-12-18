import React from 'react';
import { CircuitBoard } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CircuitBoard className="h-8 w-8" />
          <h1 className="text-2xl font-bold">MN SOLVER</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-blue-200 transition-colors">Home</a></li>
            <li><a href="#mesh" className="hover:text-blue-200 transition-colors">Mesh Analysis</a></li>
            <li><a href="#nodal" className="hover:text-blue-200 transition-colors">Nodal Analysis</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}