import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EfficiencyDataPoint } from '../../types/analytics';
import * as THREE from 'three';

interface ThreeDGraphProps {
  data: EfficiencyDataPoint[];
}

function DataPoints({ data }: ThreeDGraphProps) {
  const points = data.map((point, index) => {
    const x = index * 2;
    const y = point.efficiency;
    const z = 0;
    return new THREE.Vector3(x, y, z);
  });

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x4f46e5 });

  return (
    <>
      <line geometry={lineGeometry} material={lineMaterial} />
      {points.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#4f46e5" />
        </mesh>
      ))}
    </>
  );
}

export function ThreeDGraph({ data }: ThreeDGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="h-[500px] w-full bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <Canvas camera={{ position: [10, 10, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <DataPoints data={data} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <gridHelper args={[20, 20, "#808080", "#404040"]} />
      </Canvas>
    </div>
  );
}