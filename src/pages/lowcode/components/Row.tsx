import { Area, RowProps } from '../interface'
import styles from '../index.less'
import Column from './Column'
import React from 'react'
import { useDrag } from 'react-dnd'
import DropZone from './DropZone'
import { COMPONENT, ROW } from '../constant'
import Component from './Component'

export default function Row(props: React.PropsWithoutRef<RowProps>) {
  const { children = [] } = props.data
  const path = props.rowIndex + ''
  const [, drag] = useDrag({
    type: 'row',
    item: {
      path,
      type: 'row',
      data: props.data,
      area: props.area,
    },
  })
  return (
    <div className={styles.row} ref={drag}>
      {children?.map((item, index) => {
        return (
          <>
            <DropZone
              currentChildrenNum={children.length}
              area={Area.ROW}
              className={styles.dropZoneVertical}
              path={`${path}-${index}`}
            />
            {item.type === COMPONENT ? (
              <Component
                area={Area.ROW}
                key={`comp_id_${item.id}`}
                data={item}
                rowIndex={index}
                columnIndex={0}
                compIndex={0}
              />
            ) : (
              <Column
                area={Area.ROW}
                key={`col_id_${item.id}`}
                data={item}
                rowIndex={props.rowIndex}
                columnIndex={index}
              />
            )}
          </>
        )
      })}
      <DropZone
        currentChildrenNum={children.length}
        area={Area.ROW}
        className={styles.dropZoneVertical}
        path={`${path}-${children.length}`}
      />
    </div>
  )
}
