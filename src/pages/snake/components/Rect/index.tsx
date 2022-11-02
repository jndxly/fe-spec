import { RectProps } from '../../interface'
export default class Rect {
  x: number
  y: number
  width: number
  height: number
  color: string
  constructor(props: RectProps) {
    const { x, y, width, height, color } = props
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }
  draw() {
    const canvas: HTMLCanvasElement = document.getElementsByClassName(
      'snake-canvas',
    )[0] as HTMLCanvasElement
    if (canvas) {
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
      ctx.beginPath()
      ctx.fillStyle = this.color
      ctx.fillRect(this.x, this.y, this.width, this.height)
      ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
  }
}
