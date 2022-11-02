import React, { useEffect, useRef } from 'react'
import Snake from './components/Snake'
import { canvasHeight, canvasWidth } from './utils/const'

export default function IndexPage() {
  const snakeRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (snakeRef.current) {
      const snake = new Snake(3)
      snake.drawSnake()
    }
  }, [])
  return (
    <div>
      <canvas
        ref={snakeRef}
        className="snake-canvas"
        width={canvasWidth}
        height={canvasHeight}
      >
        当前浏览器不支持canvas元素，请升级或更换浏览器！
      </canvas>
    </div>
  )
}
