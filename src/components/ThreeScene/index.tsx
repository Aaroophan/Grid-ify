import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import useDataStore from '../../store/useDataStore';
import AxisHelper from './AxisHelper';
import PointRenderer from './PointRenderer';
import LineRenderer from './LineRenderer';
import VectorRenderer from './VectorRenderer';

const ThreeScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { renderMode, points } = useDataStore();

  return (
    <motion.div 
      className="w-full h-full bg-gray-800 rounded-lg overflow-hidden relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Canvas
        ref={canvasRef}
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ background: '#1e293b' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <AxisHelper />
        
        {renderMode === 'points' && <PointRenderer points={points} />}
        {renderMode === 'lines' && <LineRenderer points={points} />}
        {renderMode === 'vectors' && <VectorRenderer points={points} />}
        
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-30 px-3 py-1 rounded-full text-sm">
        Mode: {renderMode.charAt(0).toUpperCase() + renderMode.slice(1)}
      </div>
    </motion.div>
  );
};

export default ThreeScene;