import { RowProps } from '../interface'
import styles from '../index.less'
import Column from './Column'
import React from 'react'
import { useDrag } from 'react-dnd'
import DropZone from './DropZone'

export default function Row(props: React.PropsWithoutRef<RowProps>) {
  const { children = [] } = props.data
  const path = props.rowIndex + ''
  const [, drag] = useDrag({
    type: 'row',
    item: {
      path,
      type: 'row',
      data: props.data,
    },
  })
  return (
    <div className={styles.row} ref={drag}>
      {children?.map((item, index) => {
        return (
          <>
            <DropZone
              className={styles.dropZoneVertical}
              path={`${path}-${index}`}
            />
            <Column
              key={`col_id_${item.id}`}
              data={item}
              rowIndex={props.rowIndex}
              columnIndex={index}
            />
          </>
        )
      })}
      <DropZone
        className={styles.dropZoneVertical}
        path={`${path}-${children.length}`}
      />
    </div>
  )
}
