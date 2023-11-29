import { CardProps, DragData } from '../interface'
import styles from '../index.less'
import { useEffect, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export default function Card(props: CardProps) {
  const ref = useRef(null)
  const { data, index, swapIndex } = props

  const [{ dragging }, drag] = useDrag({
    type: 'card',
    item: {
      id: data.id,
      index: index,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      }
    },
  })

  const [, drop] = useDrop({
    accept: 'card',
    hover(item: DragData) {
      swapIndex(index, item.index)
      item.index = index
    },
  })

  useEffect(() => {
    drag(ref)
    drop(ref)
  }, [])

  return (
    <div
      ref={ref}
      className={`${
        dragging ? `${styles.card} ${styles.dragging}` : styles.card
      }`}
    >
      {data.content}
    </div>
  )
}
