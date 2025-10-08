import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Float,
  Stars,
  Sparkles,
} from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere({
  position,
  color,
}: {
  position: [number, number, number]
  color: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Sphere>
      
      {/* Glow effect */}
      <Sphere args={[1.2, 32, 32]} position={position}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </Float>
  )
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null)

  const particlesCount = 2000
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 25
    }
    return pos
  }, [])

  const colors = useMemo(() => {
    const cols = new Float32Array(particlesCount * 3)
    const colorPalette = [
      new THREE.Color('#667eea'),
      new THREE.Color('#764ba2'),
      new THREE.Color('#f093fb'),
      new THREE.Color('#4facfe'),
    ]
    for (let i = 0; i < particlesCount; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      cols[i * 3] = color.r
      cols[i * 3 + 1] = color.g
      cols[i * 3 + 2] = color.b
    }
    return cols
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Rings() {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[5, 0.05, 16, 100]} />
      <meshBasicMaterial
        color="#667eea"
        transparent
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
      <color attach="background" args={['#0a0a0f']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#667eea" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#764ba2" />
      <pointLight position={[0, 10, -10]} intensity={0.8} color="#f093fb" />
      <spotLight
        position={[0, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#4facfe"
      />

      {/* Environment */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Main spheres */}
      <AnimatedSphere position={[-2.5, 1, 0]} color="#667eea" />
      <AnimatedSphere position={[2.5, -1, -2]} color="#764ba2" />
      <AnimatedSphere position={[0, 2.5, -1]} color="#f093fb" />
      <AnimatedSphere position={[-1, -2, -3]} color="#4facfe" />

      {/* Particles */}
      <Particles />

      {/* Decorative rings */}
      <Rings />

      {/* Sparkles */}
      <Sparkles
        count={100}
        scale={10}
        size={2}
        speed={0.4}
        opacity={0.6}
        color="#a78bfa"
      />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}
