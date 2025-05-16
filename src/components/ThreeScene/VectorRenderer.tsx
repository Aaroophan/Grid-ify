import React from 'react';
import * as THREE from 'three';
import { Point3D } from '../../types';

interface VectorRendererProps {
  points: Point3D[];
}

// Helper function to create an arrow head
const createArrowHead = (from: THREE.Vector3, to: THREE.Vector3, color: string) => {
  // Get direction and normalize
  const direction = new THREE.Vector3().subVectors(to, from).normalize();
  
  // Create arrow head cone pointing in the right direction
  const arrowHeadLength = 0.3;
  const arrowHeadRadius = 0.1;
  
  return (
    <mesh 
      position={[to.x, to.y, to.z]} 
      rotation={[
        Math.atan2(direction.z, Math.sqrt(direction.x * direction.x + direction.y * direction.y)),
        0,
        Math.atan2(direction.y, direction.x)
      ]}
    >
      <coneGeometry args={[arrowHeadRadius, arrowHeadLength, 8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const VectorRenderer: React.FC<VectorRendererProps> = ({ points }) => {
  if (points.length === 0) return null;
  
  // Origin point at [0,0,0]
  const origin = new THREE.Vector3(0, 0, 0);
  
  return (
    <>
      {/* Draw vectors from origin to each point */}
      {points.map((point) => {
        const start = origin;
        const end = new THREE.Vector3(point.x, point.y, point.z);
        
        // Calculate positions for the line from origin to point
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        
        return (
          <React.Fragment key={point.id}>
            {/* Line from origin to point */}
            <line geometry={lineGeometry}>
              <lineBasicMaterial 
                attach="material" 
                color="#14b8a6" 
                linewidth={2}
              />
            </line>
            
            {/* Arrow head at the end of the vector */}
            {createArrowHead(start, end, '#14b8a6')}
            
            {/* Small sphere at the point */}
            <mesh position={[point.x, point.y, point.z]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#14b8a6" />
            </mesh>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default VectorRenderer;