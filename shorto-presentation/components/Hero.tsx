import React from 'react';
import { ArrowDown } from 'lucide-react';
import toolongImg from '../pic/toolong.jpg';

export const Hero: React.FC = () => {
  return (
    <header className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-gradient-to-b from-white to-slate-100">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 space-y-6">

        {/* Problem Statement + Before/After */}
        <div className="flex justify-center mb-6 mt-8">
          <span className="px-6 py-3 bg-slate-100 border border-slate-300 rounded-full text-xl text-slate-600 shadow-sm">
            URLs too long to share?
          </span>
        </div>

        {/* Before / After Comparison */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* Before */}
          <div className="flex flex-col items-center">
            <span className="mb-3 px-6 py-2 bg-rose-100 text-rose-600 font-bold text-xl rounded-full">
              BEFORE
            </span>
            <img src={toolongImg} alt="Before - Long URLs" className="max-w-4xl w-full h-auto" />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-slate-900">
          Shorto
        </h1>

        <p className="text-lg md:text-xl text-slate-600 font-light">
          A High-Performance Distributed <span className="text-indigo-600 font-semibold">URL Shortener</span>
        </p>


      </div>

      <div className="absolute bottom-10 animate-bounce text-slate-400">
        <ArrowDown size={32} />
      </div>
    </header>
  );
};