import React from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

const AxisHelper: React.FC = () => {
  const { scene } = useThree();

  React.useEffect(() => {
    const existingGrid = scene.getObjectByName('gridHelper');
    if (existingGrid) scene.remove(existingGrid);

    // Create grids for all planes
    const size = 10;
    const divisions = 10;

    // XY plane (blue)
    const gridXY = new THREE.GridHelper(size, divisions, 0x404040, 0x404040);
    gridXY.rotation.x = Math.PI / 2;
    gridXY.position.z = 0;

    // XZ plane (green)
    const gridXZ = new THREE.GridHelper(size, divisions, 0x404040, 0x404040);

    // YZ plane (red)
    const gridYZ = new THREE.GridHelper(size, divisions, 0x404040, 0x404040);
    gridYZ.rotation.z = Math.PI / 2;
    gridYZ.position.x = 0;

    const gridGroup = new THREE.Group();
    gridGroup.name = 'gridHelper';
    gridGroup.add(gridXY, gridXZ, gridYZ);
    scene.add(gridGroup);

    return () => {
      scene.remove(gridGroup);
    };
  }, [scene]);

  // Generate axis numbers
  const numbers = Array.from({ length: 11 }, (_, i) => i - 5);

  return (
    <>
      {/* X Axis */}
      <line>
        <bufferGeometry attach="geometry" args={[new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-5, 0, 0),
          new THREE.Vector3(5, 0, 0)
        ])]} />
        <lineBasicMaterial attach="material" color="red" linewidth={2} />
      </line>
      <Text position={[5.8, 0, 0]} color="red" fontSize={0.3}>X</Text>

      {/* Y Axis */}
      <line>
        <bufferGeometry attach="geometry" args={[new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -5, 0),
          new THREE.Vector3(0, 5, 0)
        ])]} />
        <lineBasicMaterial attach="material" color="green" linewidth={2} />
      </line>
      <Text position={[0, 5.8, 0]} color="green" fontSize={0.3}>Y</Text>

      {/* Z Axis */}
      <line>
        <bufferGeometry attach="geometry" args={[new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, -5),
          new THREE.Vector3(0, 0, 5)
        ])]} />
        <lineBasicMaterial attach="material" color="blue" linewidth={2} />
      </line>
      <Text position={[0, 0, 5.8]} color="blue" fontSize={0.3}>Z</Text>

      {/* Axis Numbers */}
      {numbers.map((num) => (
        <React.Fragment key={num}>
          {/* X axis numbers */}
          <Text position={[num, -0.3, 0]} color="white" fontSize={0.2}>
            {num}
          </Text>
          {/* Y axis numbers */}
          <Text position={[-0.3, num, 0]} color="white" fontSize={0.2}>
            {num}
          </Text>
          {/* Z axis numbers */}
          <Text position={[0, -0.3, num]} color="white" fontSize={0.2}>
            {num}
          </Text>
        </React.Fragment>
      ))}
    </>
  );
};

export default AxisHelper;