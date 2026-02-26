import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshDistortMaterial, PerspectiveCamera, Stars } from "@react-three/drei";

const ConnectionLines = ({ positions, activeIndex }) => {
    const lineRef = useRef();
    
    const points = useMemo(() => {
        return positions.map(p => new THREE.Vector3(...p));
    }, [positions]);

    const geometry = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [points]);

    return (
        <lineSegments geometry={geometry}>
            <lineBasicMaterial color="#22d3ee" transparent opacity={0.2} />
        </lineSegments>
    );
};

const DataNode = ({ position, active, index }) => {
    const meshRef = useRef();
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(t + index) * 0.2;
            if (active) {
                meshRef.current.rotation.x += 0.02;
                meshRef.current.rotation.y += 0.02;
            }
        }
    });

    return (
        <group>
            <mesh ref={meshRef} position={position}>
                <icosahedronGeometry args={[active ? 0.6 : 0.3, 0]} />
                <MeshDistortMaterial
                    color={active ? "#22d3ee" : "#0f172a"}
                    emissive={active ? "#22d3ee" : "#1e293b"}
                    emissiveIntensity={active ? 5 : 0.5}
                    distort={active ? 0.4 : 0}
                    speed={2}
                    metalness={1}
                    roughness={0}
                />
            </mesh>
            
            {active && (
                <pointLight position={position} intensity={2} color="#22d3ee" distance={5} />
            )}
        </group>
    );
};

const NeuralCore = ({ activeIndex }) => {
    const groupRef = useRef();
    
    const nodes = useMemo(() => {
        return [0, 1, 2, 3].map((i) => ({
            id: i,
            pos: [
                Math.cos((i / 4) * Math.PI * 2) * 3,
                (i % 2 === 0 ? 1 : -1) * 1.5,
                Math.sin((i / 4) * Math.PI * 2) * 3
            ]
        }));
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            {nodes.map((node, i) => (
                <DataNode 
                    key={node.id} 
                    position={node.pos} 
                    active={i === activeIndex} 
                    index={i}
                />
            ))}
            
            {/* Central Energy Sphere */}
            <mesh>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshStandardMaterial 
                    color="#000000"
                    emissive="#22d3ee"
                    emissiveIntensity={0.2}
                    transparent
                    opacity={0.8}
                    wireframe
                />
            </mesh>
            
            <mesh scale={1.1}>
                <sphereGeometry args={[1, 32, 32]} />
                <MeshDistortMaterial 
                    color="#22d3ee"
                    emissive="#22d3ee"
                    emissiveIntensity={activeIndex !== null ? 2 : 0.5}
                    distort={0.5}
                    speed={3}
                />
            </mesh>

            {/* Orbiting Particles */}
            <Stars radius={10} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
        </group>
    );
};

const ServiceScene3D = ({ activeIndex }) => {
    return (
        <div className="w-full h-full min-h-[500px]">
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <NeuralCore activeIndex={activeIndex} />
                </Float>
            </Canvas>
        </div>
    );
};

export default ServiceScene3D;
