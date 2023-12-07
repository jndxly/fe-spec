import { Area, BaritemProps } from '../interface'
import { registeredComponent } from './Component'
import styles from '../index.less'
import { useDrag } from 'react-dnd'

export default function BarItem(props: React.PropsWithoutRef<BaritemProps>) {
  const Comp = registeredComponent[props.type]

  const [, drag] = useDrag({
    type: 'barItem',
    item: {
      path: '',
      ...props,
      area: Area.OUTSIDE,
    },
  })

  return (
    <div ref={drag} className={styles.barItem}>
      <Comp />
    </div>
  )
}
