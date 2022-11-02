export type RectProps = {
  x: number
  y: number
  width: number
  height: number
  color: string
}

export type SnakeProps = {
  length: number
}

export enum Direction {
  left = 'ArrowLeft',
  up = 'ArrowUp',
  right = 'ArrowRight',
  down = 'ArrowDown',
}
