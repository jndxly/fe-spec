import { useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'
import { BoxProps } from '../interface'
import { getEmptyImage } from 'react-dnd-html5-backend'

import styles from '../index.less'

export default function Box(props: React.PropsWithoutRef<BoxProps>) {
  const ref = useRef(null)

  const [{ dragging }, drag, dragPreview] = useDrag({
    type: 'box',
    item: {
      color: props.color,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      }
    },
  })

  useEffect(() => {
    drag(ref)
    dragPreview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  return (
    <div
      ref={ref}
      className={`${
        dragging ? `${styles.box} ${styles.dragging}` : styles.box
      }`}
      style={{ backgroundColor: props.color || 'blue' }}
    />
  )
}
