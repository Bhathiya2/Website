import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float, PerspectiveCamera, OrbitControls, MeshDistortMaterial, AdaptiveDpr, Preload } from "@react-three/drei";
import { useInView } from "react-intersection-observer";

const SceneContent = ({ scrollProgress }) => {
    const { viewport, size } = useThree();
    const groupRef = useRef();

    // Dynamically calculate scale based on physical screen size and Three.js units
    const isMobile = size.width < 768;
    const baseScale = isMobile ? (viewport.width / 5.5) : (viewport.width / 7);
    
    useFrame((state, delta) => {
        if (groupRef.current) {
            // Zoom effect on scroll
            const zoom = 1 + (scrollProgress?.current || 0) * 0.5;
            groupRef.current.scale.setScalar(baseScale * zoom);
            
            // Extra rotation on scroll
            groupRef.current.rotation.y += (scrollProgress?.current || 0) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <NeuralLattice scrollProgress={scrollProgress} />
                <CentralIntelligence />
            </Float>
        </group>
    );
};

const NeuralLattice = ({ scrollProgress }) => {
    const latticeRef = useRef();
    
    useFrame((state, delta) => {
        if (latticeRef.current) {
            const speedMultiplier = 1 + (scrollProgress?.current || 0) * 2;
            latticeRef.current.rotation.y += delta * 0.1 * speedMultiplier;
            latticeRef.current.rotation.z += delta * 0.05 * speedMultiplier;
        }
    });

    return (
        <group ref={latticeRef}>
            {/* Outer Wireframe Lattice */}
            <mesh>
                <icosahedronGeometry args={[2.5, 1]} />
                <meshStandardMaterial 
                    color="#0ea5e9" 
                    emissive="#0ea5e9"
                    emissiveIntensity={0.5}
                    wireframe 
                    transparent
                    opacity={0.15}
                />
            </mesh>

            {/* Inner Structural Lattice */}
            <mesh>
                <icosahedronGeometry args={[2, 1]} />
                <meshStandardMaterial 
                    color="#22d3ee" 
                    emissive="#22d3ee"
                    emissiveIntensity={0.8}
                    wireframe 
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </group>
    );
};

const CentralIntelligence = () => {
    const coreRef = useRef();
    
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (coreRef.current) {
            coreRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
        }
    });

    return (
        <group>
            {/* Pulsing Core */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[1, 12, 12]} />
                <MeshDistortMaterial
                    color="#22d3ee"
                    emissive="#0ea5e9"
                    emissiveIntensity={1}
                    distort={0.3}
                    speed={1.5}
                    roughness={0.2}
                />
            </mesh>

            {/* Core Glow Atmosphere */}
            <mesh scale={1.4}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial 
                    color="#22d3ee" 
                    transparent 
                    opacity={0.05} 
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Point Light inside the core */}
            <pointLight intensity={8} distance={5} color="#22d3ee" />
        </group>
    );
};

const SmartCore3D = ({ className = "w-full aspect-square max-w-[550px]", scrollProgress }) => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        // triggerOnce: false // Stop rendering when not in view to save GPU
    });

    return (
        <div ref={ref} className={`${className} mx-auto relative cursor-grab active:cursor-grabbing`}>
            {inView && (
                <Canvas 
                    camera={{ position: [0, 0, 12], fov: 40 }}
                    dpr={[1, 1.2]} // Lowered for better mobile performance
                    gl={{ 
                        antialias: false,
                        alpha: true, 
                        powerPreference: "high-performance",
                        stencil: false,
                        depth: true
                    }}
                >
                    <AdaptiveDpr pixelated />
                    <OrbitControls 
                        enableZoom={false} 
                        enablePan={false}
                        autoRotate={true}
                        autoRotateSpeed={0.5}
                        makeDefault
                    />
                    
                    <ambientLight intensity={0.5} />
                    <spotLight 
                        position={[10, 10, 10]} 
                        angle={0.15} 
                        penumbra={1} 
                        intensity={2} 
                        color="#fff" 
                    />

                    <React.Suspense fallback={null}>
                        <SceneContent scrollProgress={scrollProgress} />
                    </React.Suspense>
                    <Preload all />
                </Canvas>
            )}
            
            {/* Holographic Floor Shadow */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-cyan-500/10 blur-2xl rounded-full" />
        </div>
    );
};

export default SmartCore3D;
