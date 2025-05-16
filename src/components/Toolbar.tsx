import React from 'react';
import { motion } from 'framer-motion';
import { Circle, LineChart, Zap, RotateCcw, Move, Navigation } from 'lucide-react';
import useDataStore from '../store/useDataStore';
import { RenderMode } from '../types';

const renderModeIcons = {
  points: Circle,
  lines: LineChart,
  vectors: Zap,
};

const Toolbar: React.FC = () => {
  const { renderMode, setRenderMode, clearPoints, grabMode, setGrabMode, moveMode, setMoveMode } = useDataStore();

  return (
    <motion.div
      className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 border-t border-gray-700"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-center gap-4">
        {(Object.keys(renderModeIcons) as RenderMode[]).map((mode) => {
          const Icon = renderModeIcons[mode];
          const isActive = renderMode === mode;

          return (
            <motion.button
              key={mode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-lg transition-colors ${isActive
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              onClick={() => setRenderMode(mode)}
            >
              <Icon size={20} />
              <span className="ml-2 text-sm">{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
            </motion.button>
          );
        })}

        <div className="w-px h-6 bg-gray-700 mx-2" />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-lg transition-colors ${grabMode
              ? 'bg-gray-700 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          onClick={() => setGrabMode(!grabMode)}
        >
          <Move size={20} />
          <span className="ml-2 text-sm">Grab Mode</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-lg transition-colors ${moveMode
              ? 'bg-gray-700 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          onClick={() => setMoveMode(!moveMode)}
          disabled
        >
          <Navigation size={20} />
          <span className="ml-2 text-sm">Move Mode</span>
        </motion.button>

        <div className="w-px h-6 bg-gray-700 mx-2" />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-lg bg-gray-800 text-red-400 hover:bg-gray-700"
          onClick={clearPoints}
        >
          <RotateCcw size={20} />
          <span className="ml-2 text-sm">Reset</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Toolbar;