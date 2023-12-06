import { CompoentProps } from '../interface'
import styles from '../index.less'
import Aaa from './Aaa'
import Bbb from './Bbb'
import Ccc from './Ccc'
import { useDrag } from 'react-dnd'

export const registeredComponent: Record<string, any> = {
  aaa: Aaa,
  bbb: Bbb,
  ccc: Ccc,
}

export default function Component(props: React.PropsWithoutRef<CompoentProps>) {
  const { component } = props.data

  const path = `${props.rowIndex}-${props.columnIndex}-${props.compIndex}`

  const [, drag] = useDrag({
    type: 'component',
    item: {
      type: 'component',
      path,
      data: props.data,
      area: props.area,
    },
  })
  const Comp = registeredComponent[component!.type]
  return (
    <div ref={drag} className={styles.component}>
      {<Comp />}
    </div>
  )
}
