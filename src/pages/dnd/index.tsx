import Box from './component/Box'
import Container from './component/Container'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DragLayer from './component/DragLayer'

export default function Dnd() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container />
      <Box color="blue" />
      <Box color="red" />
      <Box color="green" />
      <DragLayer />
    </DndProvider>
  )
}
