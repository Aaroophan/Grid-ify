import React from 'react';
import { motion } from 'framer-motion';
import { Circle, LineChart, Zap, RotateCcw } from 'lucide-react';
import useDataStore from '../store/useDataStore';
import { RenderMode } from '../types';

const renderModeIcons = {
  points: Circle,
  lines: LineChart,
  vectors: Zap,
};

const Toolbar: React.FC = () => {
  const { renderMode, setRenderMode, clearPoints } = useDataStore();

  const handleModeChange = (mode: RenderMode) => {
    setRenderMode(mode);
  };

  return (
    <motion.div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg flex space-x-2 z-10"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      {(Object.keys(renderModeIcons) as RenderMode[]).map((mode) => {
        const Icon = renderModeIcons[mode];
        const isActive = renderMode === mode;
        
        return (
          <motion.button
            key={mode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full focus:outline-none ${
              isActive 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleModeChange(mode)}
            title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode`}
          >
            <Icon size={20} />
          </motion.button>
        );
      })}
      
      <div className="w-px h-6 bg-gray-300 self-center mx-2" />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-3 rounded-full bg-gray-100 text-red-500 hover:bg-gray-200 focus:outline-none"
        onClick={clearPoints}
        title="Reset graph"
      >
        <RotateCcw size={20} />
      </motion.button>
    </motion.div>
  );
};

export default Toolbar;