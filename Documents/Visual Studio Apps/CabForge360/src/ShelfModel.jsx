import PropTypes from 'prop-types'

const SHELF_THICKNESS = 0.05

export default function ShelfModel({ width, depth, yPosition }) {
  return (
    <mesh position={[0, yPosition, 0]}>
      <boxGeometry args={[width, SHELF_THICKNESS, depth]} />
      <meshStandardMaterial color="#a37d37" />
    </mesh>
  )
}

ShelfModel.propTypes = {
  width: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired
} 