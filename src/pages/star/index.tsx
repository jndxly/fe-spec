import { ContextReplacementPlugin } from '@umijs/deps/compiled/webpack'
import React, { createContext, useEffect, useRef } from 'react'
import Star from './components/Star'
import './index.less'

export default function IndexPage() {
  const starRef = useRef<HTMLCanvasElement>(null)
  const timerId = useRef<NodeJS.Timeout | null>(null)
  const aw = document.documentElement.clientWidth || document.body.clientWidth
  const ah = document.documentElement.clientHeight || document.body.clientHeight
  const arr: Star[] = []
  const mouseStar: Star = new Star(0, 0, 3)
  for (let i = 0; i < 100; i++) {
    const star = new Star(Math.random() * aw, Math.random() * ah, 3)
    arr.push(star)
  }
  useEffect(() => {
    if (starRef.current) {
      const canvas: HTMLCanvasElement =
        document.getElementsByClassName('star-canvas')[0]
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
      canvas.addEventListener('mousemove', (e: MouseEvent) => {
        mouseStar.x = e.clientX
        mouseStar.y = e.clientY
      })
      // 赋值给canvas
      canvas.width = aw
      canvas.height = ah
      startTimer(ctx, aw, ah)
    }
  }, [])

  const drawLine = (
    ctx: CanvasRenderingContext2D,
    item1: Star,
    item2: Star,
  ) => {
    ctx.beginPath()
    ctx.moveTo(item1.x, item1.y)
    ctx.lineTo(item2.x, item2.y)
    ctx.stroke()
    ctx.closePath()
  }

  const startTimer = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    timerId.current = setTimeout(() => {
      timerId.current && clearTimeout(timerId.current)
      ctx.clearRect(0, 0, w, h)
      arr.forEach((star) => {
        star.draw()
        star.move()
      })
      mouseStar.draw()
      for (let i = 0; i < arr.length - 1; i++) {
        const item1 = arr[i]
        for (let j = 1; j < arr.length; j++) {
          const item2 = arr[j]
          if (
            Math.abs(item1.x - item2.x) < 50 &&
            Math.abs(item1.y - item2.y) < 50
          ) {
            drawLine(ctx, item1, item2)
          }
          if (
            Math.abs(item1.x - mouseStar.x) < 50 &&
            Math.abs(item1.y - mouseStar.y) < 50
          ) {
            drawLine(ctx, item1, mouseStar)
          }
        }
      }
      startTimer(ctx, w, h)
    }, 50)
  }

  return (
    <canvas ref={starRef} className="star-canvas">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
  )
}
