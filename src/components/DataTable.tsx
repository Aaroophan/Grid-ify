import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import useDataStore from '../store/useDataStore';
import { PointInput } from '../utils/validation';

const DataTable: React.FC = () => {
  const { points, addPoint, updatePoint, removePoint } = useDataStore();
  const tableRef = useRef<HTMLTableElement>(null);

  // Handle paste event
  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData?.getData('text') || '';
    const rows = pasteData.split('\n');

    rows.forEach(row => {
      const [x, y, z] = row.split('\t').map(val => parseFloat(val.trim()));
      if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
        addPoint({ x, y, z });
      }
    });
  };

  useEffect(() => {
    const table = tableRef.current;
    table?.addEventListener('paste', handlePaste);
    return () => table?.removeEventListener('paste', handlePaste);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    pointId?: string,
    field?: keyof PointInput
  ) => {
    const value = parseFloat(e.target.value) || 0;

    if (pointId && field) {
      updatePoint(pointId, { [field]: value });
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg rounded-lg overflow-hidden h-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4 bg-black bg-opacity-50 text-white">
        <h2 className="text-xl font-semibold">Coordinates</h2>
      </div>

      <div className="p-4 max-h-[calc(100%-60px)] overflow-y-auto">
        <div className="overflow-x-auto">
          <table ref={tableRef} className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">X</th>
                <th className="py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Y</th>
                <th className="py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Z</th>
                <th className="py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {points.map((point) => (
                <tr key={point.id}>
                  <td className="py-1">
                    <input
                      type="number"
                      value={point.x}
                      onChange={(e) => handleInputChange(e, point.id, 'x')}
                      className="w-full px-2 py-1 bg-gray-800 text-white border border-gray-700 rounded focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    />
                  </td>
                  <td className="py-1">
                    <input
                      type="number"
                      value={point.y}
                      onChange={(e) => handleInputChange(e, point.id, 'y')}
                      className="w-full px-2 py-1 bg-gray-800 text-white border border-gray-700 rounded focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    />
                  </td>
                  <td className="py-1">
                    <input
                      type="number"
                      value={point.z}
                      onChange={(e) => handleInputChange(e, point.id, 'z')}
                      className="w-full px-2 py-1 bg-gray-800 text-white border border-gray-700 rounded focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                    />
                  </td>
                  <td className="py-1 text-right">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removePoint(point.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={4}>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                    onClick={() => addPoint({ x: 0, y: 0, z: 0 })}
                  >
                    <Plus size={18} />
                    <span>Add Row</span>
                  </motion.button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default DataTable;