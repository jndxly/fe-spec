import { useDragLayer } from 'react-dnd'
import styles from '../index.less'

export default function DragLayer() {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }))

  if (!isDragging) {
    return null
  }

  return (
    <div
      className={styles.dragLayer}
      style={{
        left: currentOffset?.x,
        top: currentOffset?.y,
      }}
    >
      {item.color}拖
    </div>
  )
}
