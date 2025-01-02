import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import CabinetModel from './CabinetModel'
import CabinetControls from './CabinetControls'
import { useVariableLibrary } from './VariableLibraryContext'

function Box() {
  const meshRef = useRef()

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <mesh ref={meshRef} position={[-3, 1, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#646cff" />
    </mesh>
  )
}

function getShelfPositions(height, shelfCount) {
  if (shelfCount === 0) return []
  
  const spacing = height / (shelfCount + 1)
  return Array.from({ length: shelfCount }, (_, i) => spacing * (i + 1))
}

export default function Scene3D({ jobId = '1', roomId = '10', cabinetId = '100' }) {
  const { setSystemVariable } = useVariableLibrary()
  const [dimensions, setDimensions] = useState({
    width: 2,
    height: 3,
    depth: 1
  })
  const [shelfCount, setShelfCount] = useState(2)

  // Initialize default cabinet variables if they don't exist
  useEffect(() => {
    setSystemVariable('cabinet_width', 'Default cabinet width', dimensions.width)
    setSystemVariable('cabinet_height', 'Default cabinet height', dimensions.height)
    setSystemVariable('cabinet_depth', 'Default cabinet depth', dimensions.depth)
  }, [])

  const shelfPositions = useMemo(() => 
    getShelfPositions(dimensions.height, shelfCount),
    [dimensions.height, shelfCount]
  )

  const handleDimensionsChange = (newDimensions) => {
    setDimensions(newDimensions)
    // Update system variables when sliders change
    setSystemVariable('cabinet_width', 'Default cabinet width', newDimensions.width)
    setSystemVariable('cabinet_height', 'Default cabinet height', newDimensions.height)
    setSystemVariable('cabinet_depth', 'Default cabinet depth', newDimensions.depth)
  }

  return (
    <div>
      <CabinetControls 
        dimensions={dimensions}
        shelfCount={shelfCount}
        onDimensionsChange={handleDimensionsChange}
        onShelfCountChange={setShelfCount}
      />
      <div style={{ width: '100%', height: '500px' }}>
        <Canvas camera={{ position: [5, 5, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Box />
          <CabinetModel 
            {...dimensions} 
            shelfPositions={shelfPositions}
            jobId={jobId}
            roomId={roomId}
            cabinetId={cabinetId}
          />
          <Grid infiniteGrid position={[0, 0, 0]} />
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        </Canvas>
      </div>
    </div>
  )
} 