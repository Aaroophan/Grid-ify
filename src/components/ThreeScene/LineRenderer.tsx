import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Point3D } from '../../types';

interface LineRendererProps {
  points: Point3D[];
}

const LineRenderer: React.FC<LineRendererProps> = ({ points }) => {
  // Convert points to Vector3 positions for the line geometry
  const linePositions = useMemo(() => {
    if (points.length < 2) return null;
    
    // Create line geometry from points
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(
      points.map(point => new THREE.Vector3(point.x, point.y, point.z))
    );
    
    return lineGeometry;
  }, [points]);

  if (!linePositions || points.length < 2) {
    return null;
  }

  return (
    <>
      {/* Render connecting lines */}
      <line geometry={linePositions}>
        <lineBasicMaterial 
          attach="material" 
          color="#d6ddff" 
          linewidth={5} 
          linecap="round" 
          linejoin="round"
        />
      </line>
      
      {/* Render points as small spheres */}
      {points.map((point) => (
        <mesh key={point.id} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </>
  );
};

export default LineRenderer;