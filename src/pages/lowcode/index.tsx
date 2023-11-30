import React, { useCallback, useState } from 'react'
import { ContextType, DrapProps, LayoutItem } from './interface'
import { initLayout } from './constant'
import styles from './index.less'
import Row from './components/Row'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BarItem from './components/BarItem'
import DropZone from './components/DropZone'

export const LayoutContext = React.createContext<ContextType>({
  swapPosition: () => {},
})

export default function LowCode() {
  const [layout, setLayout] = useState<LayoutItem[]>(initLayout)

  const swapPosition = useCallback((item: DrapProps, path2: string) => {
    console.log(item.path, path2)
  }, [])
  return (
    <DndProvider backend={HTML5Backend}>
      <LayoutContext.Provider value={{ swapPosition }}>
        <div className={styles.container}>
          {layout.map((item, index) => {
            return (
              <>
                <DropZone
                  className={styles.dropZoneHorizontal}
                  path={`${index}`}
                />
                <Row key={`row_id_${item.id}`} rowIndex={index} data={item} />
              </>
            )
          })}
          <DropZone
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
