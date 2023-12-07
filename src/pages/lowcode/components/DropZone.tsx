import { DropZoneProps, DragProps } from '../interface'
import styles from '../index.less'
import { useDrop } from 'react-dnd'
import { useContext } from 'react'
import { LayoutContext } from '..'

export default function DropZone(props: DropZoneProps) {
  const { swapPosition } = useContext(LayoutContext)
  const { area, path } = props
  const [{ overing }, drop] = useDrop({
    accept: ['column', 'row', 'component', 'barItem'],
    drop(item: DragProps) {
      swapPosition(item, {
        area,
        path,
      })
    },
    collect(monitor) {
      return {
        overing: monitor.isOver(),
      }
    },
  })

  return (
    <div
      ref={drop}
      className={`${styles.dropZone} ${props.className} ${
        overing ? styles.focus : ''
      }`}
    ></div>
  )
}
