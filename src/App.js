import { useTexture } from '@react-three/drei';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere } from '@react-three/drei';
import { useState } from 'react';
import * as THREE from 'three';



export default function App() {
  const [deployedArea, setDeployedArea] = useState(1); // km²

  const handleDeploy = () => {
    setDeployedArea(prev => Math.min(prev + 200, 4178));
  };

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'black', color: 'white' }}>
      <div className="absolute top-0 left-0 p-4 z-10">
        <h1 className="text-xl font-bold">ASTRIAN-2 Orbital Deployment</h1>
        <p>Deployed Area: {deployedArea} km²</p>
        <button
          onClick={handleDeploy}
          className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          Deploy More ASTRIAN-2 (press this button to watch ASTRIAN-2 deploy)
        </button>
      </div>

      <Canvas camera={{ position: [0, 20, 40], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade={true} />
        <EarthSphere />
        <OrbitControls enableZoom={true} target={[0, -20, 0]} />
        <SESOrbitalArray deployedArea={deployedArea} />
      </Canvas>
    </div>
  );
}

function SESOrbitalArray({ deployedArea }) {
  const size = Math.sqrt(deployedArea) / 10;

  const lat = 39.5 * (Math.PI / 180);       // latitude stays the same
  const lon = 98.35 * (Math.PI / 180);     // flip the longitude from -95 to +95
  const radius = 10.6;


  const x = radius * Math.cos(lat) * Math.cos(lon);
  const y = radius * Math.sin(lat);
  const z = radius * Math.cos(lat) * Math.sin(lon);

  return (
    <group position={[x, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial
          color="#1f8db2"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Optional: Panel grid lines (faked with offset cubes later if needed) */}
    </group>
  );
}



function EarthSphere() {
  const texture = new THREE.TextureLoader().load(process.env.PUBLIC_URL + '/earth.jpg');


  return (
    <mesh position={[0, -20, 0]} rotation={[0, Math.PI * 2.05, 0]}>
      <sphereGeometry args={[10, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>

  );
}

