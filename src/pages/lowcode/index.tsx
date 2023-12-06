import React, { useCallback, useState } from 'react'
import { Area, ContextType, DragProps, DropItem, LayoutItem } from './interface'
import { COMPONENT, ROW, initLayout } from './constant'
import styles from './index.less'
import Row from './components/Row'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BarItem from './components/BarItem'
import DropZone from './components/DropZone'
import Component from './components/Component'

export const LayoutContext = React.createContext<ContextType>({
  swapPosition: () => {},
})

export default function LowCode() {
  const [layout, setLayout] = useState<LayoutItem[]>(initLayout)

  const swapPosition = useCallback(
    (dragItem: DragProps, dropItem: DropItem) => {
      console.log(dragItem.path, dropItem)
      const dragPath = dragItem.path
      const dragArea = dragItem.area
      const [dragRow, dragColumn, dragCompIndex] = dragPath
        .split('-')
        .map((dragItem) => parseInt(dragItem))
      const { area, path } = dropItem
      const [row, column, compIndex] = path
        .split('-')
        .map((item) => parseInt(item))
      // 根据drag的组件决定是容器类还是原子类

      const type = dragItem.data?.component?.type || dragItem.type

      // 当前drop区域所在位置
      switch (area) {
        case Area.ROOT:
          // drag元素之前位置需要是删除，如果位置在drop的后面，则splice插入后，index需要+1
          const spliceRow = dragRow >= row ? dragRow + 1 : dragRow

          //直接插入，
          // TODO 还需要判断当前组件市原则类还是容器类
          if (type === COMPONENT) {
            layout.splice(row, 0, {
              type: COMPONENT,
              id: dragItem?.data?.id ?? `component${new Date().valueOf()}`,
              component: {
                type,
              },
            })
          } else if (type === ROW) {
            layout.splice(row, 0, dragItem.data)
          }

          // 当前是视图内组件拖拽，则组件顺序调整，需要删除组件之前位置
          // 需要区分drag的组件所在位置是root、row、column,然后做对应的删除
          switch (dragArea) {
            // 拖动的是根容器下的组件
            case Area.ROOT:
              layout.splice(spliceRow, 1)
              break
            // 拖动的是Row容器下的组件
            case Area.ROW:
              layout[spliceRow].children!.splice(dragColumn, 1)
              break
            // 拖动的是column容器下的组件
            case Area.COLUMN:
              layout[spliceRow]?.children![dragColumn].children?.splice(
                dragCompIndex,
                1,
              )
              break
          }

          break
        case Area.ROW:
          // drag元素之前位置需要是删除，如果位置在drop的后面，则splice插入后，index需要+1
          let splitColumn = dragColumn
          // 当前是在同一个容器内拖拽
          if (dragRow === row) {
            splitColumn = dragColumn >= column ? dragColumn + 1 : dragColumn
          }
          layout[row].children?.splice(column, 0, {
            type: COMPONENT,
            id: dragItem?.data?.id ?? `component${new Date().valueOf()}`,
            component: {
              type,
            },
          })
          // 当前是视图内组件拖拽，则组件顺序调整，需要删除组件之前位置
          // 需要区分drag的组件所在位置是root、row、column,然后做对应的删除
          switch (dragArea) {
            // 拖动的是根容器下的组件
            case Area.ROOT:
              layout.splice(dragRow, 1)
              break
            // 拖动的是Row容器下的组件
            case Area.ROW:
              layout[dragRow].children!.splice(splitColumn, 1)
              break
            // 拖动的是column容器下的组件
            case Area.COLUMN:
              layout[dragRow]?.children![splitColumn].children?.splice(
                dragCompIndex,
                1,
              )
              break
          }
          break
        case Area.COLUMN:
          // drag元素之前位置需要是删除，如果位置在drop的后面，则splice插入后，index需要+1
          let splitCompIndex = dragCompIndex
          // 当前是在同一个容器内拖拽
          if (dragColumn === column) {
            splitCompIndex =
              dragCompIndex >= compIndex ? dragCompIndex + 1 : dragCompIndex
          }
          layout[row].children![column].children?.splice(compIndex, 0, {
            type: COMPONENT,
            id: dragItem?.data?.id ?? `component${new Date().valueOf()}`,
            component: {
              type,
            },
          })
          // 当前是视图内组件拖拽，则组件顺序调整，需要删除组件之前位置
          // 需要区分drag的组件所在位置是root、row、column,然后做对应的删除
          switch (dragArea) {
            // 拖动的是根容器下的组件
            case Area.ROOT:
              layout.splice(dragRow, 1)
              break
            // 拖动的是Row容器下的组件
            case Area.ROW:
              layout[dragRow].children!.splice(dragColumn, 1)
              break
            // 拖动的是column容器下的组件
            case Area.COLUMN:
              layout[dragRow]?.children![dragColumn].children?.splice(
                splitCompIndex,
                1,
              )
              break
          }
          break
        default:
      }
      setLayout([...layout])
      console.log(layout)
    },
    [],
  )
  return (
    <DndProvider backend={HTML5Backend}>
      <LayoutContext.Provider value={{ swapPosition }}>
        <div className={styles.container}>
          {layout.map((item, index) => {
            return (
              <>
                <DropZone
                  currentChildrenNum={layout.length}
                  area={Area.ROOT}
                  className={styles.dropZoneHorizontal}
                  path={`${index}`}
                />
                {item.type === COMPONENT ? (
                  <Component
                    key={`comp_id_${item.id}`}
                    data={item}
                    area={Area.ROOT}
                    rowIndex={index}
                    columnIndex={0}
                    compIndex={0}
                  />
                ) : (
                  <Row
                    key={`row_id_${item.id}`}
                    area={Area.ROOT}
                    rowIndex={index}
                    data={item}
                  />
                )}
              </>
            )
          })}
          <DropZone
            currentChildrenNum={layout.length}
            area={Area.ROOT}
            className={styles.dropZoneHorizontal}
            path={`${layout.length}`}
          />
          <div className={styles.bottomBar}>
            <BarItem type="aaa" />
            <BarItem type="bbb" />
            <BarItem type="ccc" />
          </div>
        </div>
      </LayoutContext.Provider>
    </DndProvider>
  )
}
