import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2024 MN SOLVER. All rights reserved.</p>
            <p className="text-sm mt-1">Built & Developed by: Dhadi Sai Praneeth Reddy (1602-23-733-038)</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/dspraneeth07" className="hover:text-blue-400 transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com/dspraneeth" className="hover:text-blue-400 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}