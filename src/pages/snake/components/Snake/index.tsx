// import { SnakeProps } from '../../interface'
import Rect from '../Rect'
import { canvasHeight, canvasWidth } from '../../utils/const'
import { Direction } from '../../interface'

export default class Snake {
  initLength: number
  length: number
  head: Rect
  body: Rect[] = []
  food: Rect
  direction: Direction = Direction.right
  timeId: NodeJS.Timeout | undefined
  constructor(length: number) {
    // const { length = 0 } = props
    this.initLength = this.length = length
    this.initSnake()
  }
  private initSnake() {
    this.length = this.initLength
    this.head = new Rect({
      width: 40,
      height: 40,
      x: canvasWidth / 2,
      y: canvasHeight / 2,
      color: 'red',
    })
    this.body = []
    let x = this.head.x - 40
    const y = this.head.y
    for (let i = 0; i < this.length; i++) {
      const rect = new Rect({
        width: 40,
        height: 40,
        x,
        y,
        color: 'yellow',
      })
      x -= 40
      this.body.push(rect)
    }
    this.initEventListener()
    this.startTimer()
    this.food = this.randomFood()
  }
  private initEventListener() {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.code) {
        case Direction.left:
          this.direction =
            this.direction === Direction.right
              ? Direction.right
              : Direction.left
          break
        case Direction.up:
          this.direction =
            this.direction === Direction.down ? Direction.down : Direction.up
          break
        case Direction.right:
          this.direction =
            this.direction === Direction.left ? Direction.left : Direction.right
          break
        case Direction.down:
          this.direction =
            this.direction === Direction.up ? Direction.up : Direction.down
          break
      }
    })
  }
  private startTimer() {
    this.timeId = setTimeout(() => {
      clearTimeout(this.timeId)
      const canvas: HTMLCanvasElement = document.getElementsByClassName(
        'snake-canvas',
      )[0] as HTMLCanvasElement
      if (canvas) {
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        this.moveSnake()
        this.drawSnake()
        this.food?.draw()
        // this.randomFood()
      }
      this.startTimer()
    }, 300)
  }
  drawSnake() {
    if (this.isHit()) {
      clearTimeout(this.timeId)
      const con = confirm(
        `总共吃了${this.body.length - this.initLength}个食物，重新开始吗`,
      )
      if (con) {
        const canvas: HTMLCanvasElement = document.getElementsByClassName(
          'snake-canvas',
        )[0] as HTMLCanvasElement
        if (canvas) {
          const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
          ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        }
        this.initSnake()
        this.drawSnake()
      }
      return
    }
    this.head.draw()
    for (let i = 0; i < this.length; i++) {
      this.body[i].draw()
    }
  }
  randomFood() {
    let flag = true
    let rect: Rect
    while (flag) {
      const x = Math.round((Math.random() * canvasWidth) / 40) * 40
      const y = Math.round((Math.random() * canvasHeight) / 40) * 40
      if (
        (this.head.x === x && this.head.y === y) ||
        this.body.find((item) => item.x === x && item.y === y)
      ) {
        flag = true
      } else {
        rect = new Rect({
          x,
          y,
          width: 40,
          height: 40,
          color: 'blue',
        })
        flag = false
      }
    }
    return rect
  }
  moveSnake() {
    const rect = new Rect({
      ...this.head,
      color: 'yellow',
    })
    this.body.unshift(rect)

    switch (this.direction) {
      case Direction.right:
        this.head.x += 40
        break
      case Direction.up:
        this.head.y -= 40
        break
      case Direction.down:
        this.head.y += 40
        break
      case Direction.left:
        this.head.x -= 40
        break
    }
    const isEat = this.food.x === this.head.x && this.food.y === this.head.y
    if (isEat) {
      this.length++
      this.food = this.randomFood()
      this.food.draw()
      this.drawSnake()
    } else {
      this.body.pop()
    }
  }
  private isHit() {
    const xLmit = this.head.x < 0 || this.head.x >= canvasWidth
    const yLimit = this.head.y < 0 || this.head.y >= canvasHeight
    const hitSelf = this.body.find(
      (item) => item.x === this.head.x && item.y === this.head.y,
    )
    return xLmit || yLimit || hitSelf
  }
}
