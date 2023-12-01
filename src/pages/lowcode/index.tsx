import React, { useCallback, useState } from 'react'
import { Area, ContextType, DragProps, DropItem, LayoutItem } from './interface'
import { COMPONENT, initLayout } from './constant'
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

  const swapPosition = useCallback((item: DragProps, dropItem: DropItem) => {
    console.log(item.path, dropItem)
    const dragPath = item.path
    const { area, path, currentChildrenNum } = dropItem
    const [row, column, compIndex] = path
      .split('-')
      .map((item) => parseInt(item))
    switch (area) {
      case Area.ROOT:
        // 根据drag的组件决定是容器类还是原子类
        layout.splice(row, 0, {
          type: COMPONENT,
          id: item?.data?.id ?? `component${new Date().valueOf()}`,
          component: {
            type: item.type,
          },
        })
        break
      case Area.ROW:
        layout[row].children?.splice(column, 0, {
          type: COMPONENT,
          id: item?.data?.id ?? `component${new Date().valueOf()}`,
          component: {
            type: item.type,
          },
        })
        break
      case Area.COLUMN:
        layout[row].children![column].children?.splice(compIndex, 0, {
          type: COMPONENT,
          id: item?.data?.id ?? `component${new Date().valueOf()}`,
          component: {
            type: item.type,
          },
        })
        break
      default:
    }
    setLayout([...layout])
  }, [])
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
                    rowIndex={index}
                    columnIndex={0}
                    compIndex={0}
                  />
                ) : (
                  <Row key={`row_id_${item.id}`} rowIndex={index} data={item} />
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
