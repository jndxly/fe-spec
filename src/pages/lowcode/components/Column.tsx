import { ColumnProps } from '../interface'
import styles from '../index.less'
import Component from './Component'
import React from 'react'
import { useDrag } from 'react-dnd'
import DropZone from './DropZone'

export default function Column(props: React.PropsWithoutRef<ColumnProps>) {
  const { children = [] } = props.data
  const path = `${props.rowIndex}-${props.columnIndex}`
  const [, drag] = useDrag({
    type: 'column',
    item: {
      type: 'column',
      path,
      data: props.data,
    },
  })
  return (
    <div className={styles.column} ref={drag}>
      {children?.map((item, index) => {
        return (
          <>
            <DropZone
              key={index}
              path={`${path}-${index}`}
              className={styles.dropZoneHorizontal}
            />
            <Component
              key={`comp_id_${item.id}`}
              data={item}
              rowIndex={props.rowIndex}
              columnIndex={props.columnIndex}
              compIndex={index}
            />
          </>
        )
      })}
      <DropZone
        className="dropZoneHorizontal"
        path={`${path}-${children.length}`}
      />
    </div>
  )
}
