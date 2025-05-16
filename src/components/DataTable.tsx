import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import useDataStore from '../store/useDataStore';

const DataTable: React.FC = () => {
  const { points, setPointsFromText, clearPoints, axisLabels, setAxisLabels } = useDataStore();
  const [inputText, setInputText] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setPointsFromText(e.target.value);
  };

  const handleAxisLabelChange = (axis: 'x' | 'y' | 'z', value: string) => {
    setAxisLabels({ [axis]: value });
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg rounded-lg overflow-hidden h-full"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 bg-black bg-opacity-50 text-white">
        <h2 className="text-xl font-semibold mb-4">Coordinates</h2>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {(['x', 'y', 'z'] as const).map((axis) => (
            <div key={axis}>
              <label className="block text-sm text-gray-400 mb-1">
                {axis.toUpperCase()} Axis Label
              </label>
              <input
                type="text"
                value={axisLabels[axis]}
                onChange={(e) => handleAxisLabelChange(axis, e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">
            Enter coordinates as [x,y,z],[x,y,z],...
          </label>
          <textarea
            value={inputText}
            onChange={handleInputChange}
            className="w-full h-40 px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:ring-1 focus:ring-gray-500 focus:border-gray-500 font-mono"
            placeholder="Example: [1,2,3],[4,5,6],[7,8,9]"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          onClick={() => {
            clearPoints();
            setInputText('');
          }}
        >
          <RotateCcw size={18} />
          <span>Clear All</span>
        </motion.button>
      </div>

      <div className="p-4">
        <div className="text-gray-400">
          <h3 className="font-semibold mb-2">Current Points:</h3>
          <pre className="text-xs bg-gray-800 p-3 rounded overflow-x-auto">
            {points.length > 0
              ? points.map(p => `[${p.x},${p.y},${p.z}]`).join(',')
              : 'No points added yet'
            }
          </pre>
        </div>
      </div>
    </motion.div>
  );
};

export default DataTable;