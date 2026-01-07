import React from 'react';
import { Github, Twitter, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0f172a] pt-16 pb-8 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
              RoamRiot
            </h2>
            <p className="text-slate-400 max-w-sm">
              The AI-powered travel companion that manages your budget, tracks your chaos, and posts your memories so you don't have to.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer">Tours</li>
              <li className="hover:text-cyan-400 cursor-pointer">Memories</li>
              <li className="hover:text-cyan-400 cursor-pointer">Budget Tracker</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-4">
              <Twitter className="w-5 h-5 text-slate-400 hover:text-cyan-400 cursor-pointer" />
              <Instagram className="w-5 h-5 text-slate-400 hover:text-pink-400 cursor-pointer" />
              <Github className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
          <p>© 2026 RoamRiot Inc. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by Developers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;