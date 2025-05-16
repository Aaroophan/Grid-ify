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
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial 
            color="#002fff" 
            emissive="#002fff"
            emissiveIntensity={1}
            roughness={1}
            metalness={1}
          />
        </mesh>
      ))}
    </>
  );
};

export default PointRenderer;