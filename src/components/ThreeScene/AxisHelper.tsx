import React from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Create axis helper with labels
const AxisHelper: React.FC = () => {
  const { scene } = useThree();
  
  React.useEffect(() => {
    // Clean up previous grid if it exists
    const existingGrid = scene.getObjectByName('gridHelper');
    if (existingGrid) scene.remove(existingGrid);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x444444);
    gridHelper.name = 'gridHelper';
    scene.add(gridHelper);
    
    return () => {
      scene.remove(gridHelper);
    };
  }, [scene]);
  
  return (
    <>
      {/* X Axis - Red */}
      <line>
        <bufferGeometry attach="geometry" args={[new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(5, 0, 0)
        ])]} />
        <lineBasicMaterial attach="material" color="red" linewidth={2} />
      </line>
      <mesh position={[5.5, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="red" />
      </mesh>
      
      {/* Y Axis - Green */}
      <line>
        <bufferGeometry attach="geometry" args={[new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 5, 0)
        ])]} />
        <lineBasicMaterial attach="material" color="green" linewidth={2} />
      </line>
      <mesh position={[0, 5.5, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="green" />
      </mesh>
      
      {/* Z Axis - Blue */}
      <line>
        <bufferGeometry attach="geometry" args={[new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 0, 5)
        ])]} />
        <lineBasicMaterial attach="material" color="blue" linewidth={2} />
      </line>
      <mesh position={[0, 0, 5.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    </>
  );
};

export default AxisHelper;