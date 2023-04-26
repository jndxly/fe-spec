export default class Stage {
  ctx!: CanvasRenderingContext2D
  canvas!: HTMLCanvasElement
  constructor() {}
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)
  }
  render() {}
}
