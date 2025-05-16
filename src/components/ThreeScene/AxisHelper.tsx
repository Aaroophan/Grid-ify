import React from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import useDataStore from '../../store/useDataStore';

const AxisHelper: React.FC = () => {
  const { scene } = useThree();
  const { axisLabels } = useDataStore();

  React.useEffect(() => {
    const existingGrid = scene.getObjectByName('gridHelper');
    if (existingGrid) scene.remove(existingGrid);

    const size = 100;
    const divisions = 100;

    const gridXY = new THREE.GridHelper(size, divisions, 0x4e598a, 0x242a40);
    gridXY.rotation.x = Math.PI / 2;
    gridXY.position.z = 0;

    const gridXZ = new THREE.GridHelper(size, divisions, 0x4e598a, 0x242a40);

    const gridYZ = new THREE.GridHelper(size, divisions, 0x4e598a, 0x242a40);
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

  const numbers = Array.from({ length: 101 }, (_, i) => i - 50);

  return (
    <>
      <line>
        <bufferGeometry attach="geometry" args={[new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-5, 0, 0),
          new THREE.Vector3(5, 0, 0)
        ])]} />
        <lineBasicMaterial attach="material" color="red" linewidth={2} />
      </line>
      <Text position={[5.8, 0, 0]} color="red" fontSize={0.3}>{axisLabels.x}</Text>

      <line>
        <bufferGeometry attach="geometry" args={[new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -5, 0),
          new THREE.Vector3(0, 5, 0)
        ])]} />
        <lineBasicMaterial attach="material" color="green" linewidth={2} />
      </line>
      <Text position={[0, 5.8, 0]} color="green" fontSize={0.3}>{axisLabels.y}</Text>

      <line>
        <bufferGeometry attach="geometry" args={[new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, -5),
          new THREE.Vector3(0, 0, 5)
        ])]} />
        <lineBasicMaterial attach="material" color="blue" linewidth={2} />
      </line>
      <Text position={[0, 0, 5.8]} color="blue" fontSize={0.3}>{axisLabels.z}</Text>

      {numbers.map((num) => (
        <React.Fragment key={num}>
          <Text position={[num, -0.3, 0]} color="white" fontSize={0.2}>
            {num}
          </Text>
          <Text position={[-0.3, num, 0]} color="white" fontSize={0.2}>
            {num}
          </Text>
          <Text position={[0, -0.3, num]} color="white" fontSize={0.2}>
            {num}
          </Text>
        </React.Fragment>
      ))}
    </>
  );
};

export default AxisHelper;