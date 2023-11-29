import { useCallback, useState } from 'react'
import { CardItem } from './interface'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './index.less'
import Card from './components/Card'

export default function SwapDnd() {
  const [cardList, setCardList] = useState<CardItem[]>([
    {
      id: 0,
      content: '000',
    },
    {
      id: 1,
      content: '111',
    },
    {
      id: 2,
      content: '222',
    },
    {
      id: 3,
      content: '333',
    },
    {
      id: 4,
      content: '444',
    },
  ])

  const swapIndex = useCallback((index1: number, index2: number) => {
    const tmp = cardList[index1]
    cardList[index1] = cardList[index2]
    cardList[index2] = tmp
    setCardList([...cardList])
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.cardList}>
        {cardList.map((item: CardItem, index) => {
          return (
            <Card
              data={item}
              key={`card_${item.id}`}
              index={index}
              swapIndex={swapIndex}
            />
          )
        })}
      </div>
    </DndProvider>
  )
}
