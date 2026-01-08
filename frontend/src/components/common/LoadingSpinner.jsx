import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#0f172a]/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-cyan-400" />
        </motion.div>
        <p className="text-slate-200 font-medium animate-pulse">Just a sec...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;