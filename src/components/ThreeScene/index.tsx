import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PointerLockControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import useDataStore from '../../store/useDataStore';
import AxisHelper from './AxisHelper';
import PointRenderer from './PointRenderer';
import LineRenderer from './LineRenderer';
import VectorRenderer from './VectorRenderer';
import * as THREE from 'three';

const CameraSetup: React.FC = () => {
  const { camera } = useThree();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      camera.position.set(10, 10, 10);
      initialized.current = true;
    }
  }, [camera]);

  return null;
};

const MoveControls: React.FC = () => {
  const { camera } = useThree();
  const moveSpeed = 0.1;
  const keys = useRef({
    w: false,
    s: false,
    a: false,
    d: false,
    q: false,
    e: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keys.current.hasOwnProperty(e.key.toLowerCase())) {
        keys.current[e.key.toLowerCase() as keyof typeof keys.current] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (keys.current.hasOwnProperty(e.key.toLowerCase())) {
        keys.current[e.key.toLowerCase() as keyof typeof keys.current] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const moveCamera = () => {
      const direction = new THREE.Vector3();
      const rotation = camera.rotation.clone();

      // Forward/Backward
      if (keys.current.w) {
        direction.z = -1;
      }
      if (keys.current.s) {
        direction.z = 1;
      }

      // Left/Right
      if (keys.current.a) {
        direction.x = -1;
      }
      if (keys.current.d) {
        direction.x = 1;
      }

      // Up/Down
      if (keys.current.q) {
        direction.y = 1;
      }
      if (keys.current.e) {
        direction.y = -1;
      }

      // Apply rotation to direction
      direction.applyEuler(rotation);

      // Move camera
      camera.position.addScaledVector(direction, moveSpeed);
    };

    const interval = setInterval(moveCamera, 16); // ~60fps
    return () => clearInterval(interval);
  }, [camera]);

  return <PointerLockControls />;
};

const ThreeScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { renderMode, points, grabMode, moveMode } = useDataStore();

  useEffect(() => {
    if (moveMode) {
      document.body.style.cursor = 'grab';
    } else {
      document.body.style.cursor = 'default';
    }
    return () => {
      document.body.style.cursor = 'default';
    };
  }, [moveMode]);

  return (
    <motion.div 
      className="w-full h-full bg-gray-800 rounded-lg overflow-hidden relative"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Canvas
        ref={canvasRef}
        style={{ background: '#131621' }}
      >
        <CameraSetup />
        <ambientLight intensity={5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <AxisHelper />
        
        {renderMode === 'points' && <PointRenderer points={points} />}
        {renderMode === 'lines' && <LineRenderer points={points} />}
        {renderMode === 'vectors' && <VectorRenderer points={points} />}
        
        {grabMode && (
          <OrbitControls 
            enableDamping
            dampingFactor={1}
            rotateSpeed={0.5}
            zoomSpeed={0.75}
          />
        )}
        
        {moveMode && <MoveControls />}
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-30 px-3 py-1 rounded-full text-sm">
        Mode: {renderMode.charAt(0).toUpperCase() + renderMode.slice(1)}
      </div>
    </motion.div>
  );
};

export default ThreeScene;