import { useRef } from 'react'
import PropTypes from 'prop-types'
import ShelfModel from './ShelfModel'
import { useVariableLibrary } from './VariableLibraryContext'

export default function CabinetModel({ 
  width = 2, 
  height = 3, 
  depth = 1, 
  shelfPositions = [],
  jobId,
  roomId,
  cabinetId
}) {
  const meshRef = useRef()
  const { getVariableValue } = useVariableLibrary()

  // Get effective dimensions from variables or fallback to props
  const effectiveWidth = getVariableValue('cabinet_width', jobId, roomId, cabinetId) || width
  const effectiveHeight = getVariableValue('cabinet_height', jobId, roomId, cabinetId) || height
  const effectiveDepth = getVariableValue('cabinet_depth', jobId, roomId, cabinetId) || depth

  return (
    <group>
      {/* Cabinet frame */}
      <mesh ref={meshRef} position={[0, effectiveHeight/2, 0]}>
        <boxGeometry args={[effectiveWidth, effectiveHeight, effectiveDepth]} />
        <meshStandardMaterial color="#cc9900" transparent opacity={0.9} />
      </mesh>

      {/* Shelves */}
      {shelfPositions.map((yPos, index) => (
        <ShelfModel
          key={index}
          width={effectiveWidth - 0.05}
          depth={effectiveDepth - 0.05}
          yPosition={yPos}
        />
      ))}
    </group>
  )
}

CabinetModel.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  depth: PropTypes.number,
  shelfPositions: PropTypes.arrayOf(PropTypes.number),
  jobId: PropTypes.string,
  roomId: PropTypes.string,
  cabinetId: PropTypes.string
} 