export default class Star {
  x: number
  y: number
  r: number
  speedX: number
  speedY: number
  ctx: CanvasRenderingContext2D
  constructor(x: number, y: number, r: number) {
    this.x = x
    this.y = y
    this.r = r
    this.r = r
    this.speedX = Math.random() * 3 * Math.pow(-1, Math.round(Math.random()))
    this.speedY = Math.random() * 3 * Math.pow(-1, Math.round(Math.random()))
  }
  draw() {
    const canvas: HTMLCanvasElement =
      document.getElementsByClassName('star-canvas')[0]
    this.ctx = canvas.getContext('2d')
    this.ctx.fillStyle = 'white'
    this.ctx.strokeStyle = 'white'
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.closePath()
  }
  move() {
    this.x -= this.speedX
    this.y -= this.speedY
    if (this.x < 0 || this.x > document.documentElement.clientWidth) {
      this.speedX *= -1
    }
    if (this.y < 0 || this.y > document.documentElement.clientHeight) {
      this.speedY *= -1
    }
  }
}
