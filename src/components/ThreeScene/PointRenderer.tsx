import React from 'react';
import { Point3D } from '../../types';

interface PointRendererProps {
  points: Point3D[];
}

const PointRenderer: React.FC<PointRendererProps> = ({ points }) => {
  return (
    <>
      {points.map((point) => (
        <mesh key={point.id} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial 
            color="#6366f1" 
            emissive="#4f46e5"
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      ))}
    </>
  );
};

export default PointRenderer;