import React, { useEffect, useRef } from 'react'
import './index.less'
export default function IndexPage() {
  const lotteryRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  let ctx!: CanvasRenderingContext2D
  let isDown = false

  useEffect(() => {
    if (lotteryRef.current) {
      ctx = lotteryRef.current.getContext('2d')
      ctx.fillStyle = 'darkgray'
      ctx.fillRect(0, 0, 400, 100)
      document.addEventListener('mousedown', () => {
        isDown = true
      })
      document.addEventListener('mousemove', (e: MouseEvent) => {
        if (isDown) {
          const x =
            e.pageX -
            containerRef!.current?.offsetLeft +
            containerRef!.current?.offsetWidth / 2
          const y = e.pageY - containerRef!.current?.offsetTop
          ctx.beginPath()
          ctx.arc(x, y, 30, 0, Math.PI * 2)
          ctx.globalCompositeOperation = 'destination-out'
          ctx.fill()
          ctx.closePath()
        }
      })
      document.addEventListener('mouseup', (e) => {
        isDown = false
      })
    }
  }, [])

  return (
    <div className="container" ref={containerRef}>
      <div className="gift">奖品</div>
      <canvas ref={lotteryRef} className="lottery-canvas">
        当前浏览器不支持canvas元素，请升级或更换浏览器！
      </canvas>
    </div>
  )
}
