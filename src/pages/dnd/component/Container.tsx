import { useRef, useState } from 'react'
import { useDrop } from 'react-dnd'
import styles from '../index.less'
import { ItemType } from '../interface'
import Box from './Box'

export default function Container() {
  const [boxes, setBoxes] = useState<ItemType[]>([])
  const ref = useRef(null)

  const [, drop] = useDrop(() => {
    return {
      accept: 'box',
      drop(item) {
        setBoxes((boxes) => [...boxes, item])
      },
    }
  })

  drop(ref)

  return (
    <div ref={ref} className={styles.container}>
      {boxes.map((item, index) => {
        return <Box key={index} color={item.color}></Box>
      })}
    </div>
  )
}
