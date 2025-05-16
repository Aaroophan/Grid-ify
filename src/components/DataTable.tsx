import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, X, CheckCircle } from 'lucide-react';
import useDataStore from '../store/useDataStore';
import { PointInput, validatePoint } from '../utils/validation';

const DataTable: React.FC = () => {
  const { points, addPoint, updatePoint, removePoint } = useDataStore();
  const [newPoint, setNewPoint] = useState<PointInput>({ x: 0, y: 0, z: 0 });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    pointId?: string,
    field?: keyof PointInput
  ) => {
    const { name, value } = e.target;

    if (pointId && field) {
      // Updating existing point
      updatePoint(pointId, { [field]: parseFloat(value) || 0 });
    } else {
      // Adding new point
      setNewPoint(prev => ({ ...prev, [name]: value }));
    }
    
    setError(null);
  };

  const handleAddPoint = () => {
    const validation = validatePoint(newPoint);
    
    if (validation.success) {
      addPoint(newPoint);
      setNewPoint({ x: 0, y: 0, z: 0 });
      setError(null);
    } else {
      setError(validation.error);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPoint();
    }
  };

  return (
    <motion.div 
      className="bg-white shadow-lg rounded-lg overflow-hidden h-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 bg-indigo-600 text-white">
        <h2 className="text-xl font-semibold">3D Coordinates</h2>
      </div>
      
      <div className="p-4 max-h-[calc(100%-60px)] overflow-y-auto">
        {error && (
          <motion.div 
            className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center justify-between"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <span>{error}</span>
            <X 
              size={18} 
              className="cursor-pointer" 
              onClick={() => setError(null)} 
            />
          </motion.div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">X</th>
                <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Y</th>
                <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Z</th>
                <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {points.map((point) => (
                <tr key={point.id}>
                  <td className="py-2">
                    <input
                      type="number"
                      value={point.x}
                      onChange={(e) => handleInputChange(e, point.id, 'x')}
                      className="w-full px-2 py-1 border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={point.y}
                      onChange={(e) => handleInputChange(e, point.id, 'y')}
                      className="w-full px-2 py-1 border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={point.z}
                      onChange={(e) => handleInputChange(e, point.id, 'z')}
                      className="w-full px-2 py-1 border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </td>
                  <td className="py-2 text-right">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removePoint(point.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2">
                  <input
                    type="number"
                    name="x"
                    value={newPoint.x}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="X"
                    className="w-full px-2 py-1 border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    name="y"
                    value={newPoint.y}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Y"
                    className="w-full px-2 py-1 border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    name="z"
                    value={newPoint.z}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Z"
                    className="w-full px-2 py-1 border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </td>
                <td className="py-2 text-right">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddPoint}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white p-1 rounded-md"
                  >
                    <CheckCircle size={18} />
                  </motion.button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
          onClick={handleAddPoint}
        >
          <Plus size={18} />
          <span>Add Point</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DataTable;