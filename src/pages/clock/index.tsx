import React, { useEffect, useRef } from 'react'
export default function IndexPage() {
  const clockRef = useRef<HTMLCanvasElement>(null)
  let ctx!: CanvasRenderingContext2D

  useEffect(() => {
    if (clockRef.current) {
      ctx = clockRef.current.getContext('2d')
      // 大小圆
      ctx.translate(300, 300)
      ctx.beginPath()
      ctx.arc(0, 0, 150, 0, Math.PI * 2)
      ctx.stroke()
      ctx.closePath()
      ctx.beginPath()
      ctx.arc(0, 0, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()

      ctx.save()
      ctx.beginPath()
      for (let i = 0; i < 60; i++) {
        ctx.rotate((Math.PI * 2) / 60)
        ctx.moveTo(0, -150)
        ctx.lineWidth = 1
        // ctx.strokeStyle = 'red'
        ctx.lineTo(0, -140)
        ctx.stroke()
      }

      ctx.closePath()
      ctx.restore()

      ctx.beginPath()
      for (let i = 0; i < 12; i++) {
        ctx.rotate((Math.PI * 2) / 12)
        ctx.moveTo(0, -150)
        ctx.lineWidth = 3
        // ctx.strokeStyle = 'red'
        ctx.lineTo(0, -132)
        ctx.stroke()
      }

      ctx.closePath()
      ctx.restore()

      startTimer()
    }
  }, [])

  const startTimer = () => {
    const requestId = window.requestAnimationFrame(() => {
      ctx.clearRect(-100, -100, 200, 200)
      const date = new Date()
      const hour = date.getHours() % 12
      const min = date.getMinutes()
      const sec = date.getSeconds()

      ctx.save()
      ctx.beginPath()
      ctx.rotate(((hour + min / 60) / 12) * Math.PI * 2)
      ctx.moveTo(0, 10)
      ctx.lineWidth = 10
      ctx.strokeStyle = 'red'
      ctx.lineTo(0, -40)
      ctx.stroke()
      ctx.closePath()
      ctx.restore()

      ctx.save()
      ctx.beginPath()
      ctx.rotate((min / 60) * Math.PI * 2)
      ctx.moveTo(0, 20)
      ctx.lineWidth = 7
      ctx.strokeStyle = 'green'
      ctx.lineTo(0, -60)
      ctx.stroke()
      ctx.closePath()
      ctx.restore()

      ctx.save()
      ctx.beginPath()
      ctx.rotate((sec / 60) * Math.PI * 2)
      ctx.moveTo(0, 30)
      ctx.lineWidth = 5
      ctx.strokeStyle = 'blue'
      ctx.lineTo(0, -80)
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
      window.cancelAnimationFrame(requestId)
      startTimer()
    })
  }

  return (
    <canvas ref={clockRef} className="clock-canvas" width="600" height="600">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
  )
}
