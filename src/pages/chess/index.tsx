import React, { useEffect, useRef } from 'react'
import styles from './index.less'
export default function IndexPage() {
  const chessRef = useRef<HTMLCanvasElement>(null)
  let ctx!: CanvasRenderingContext2D
  const arr: any[][] = []
  let isBlack = true
  for (let i = 0; i < 15; i++) {
    arr[i] = new Array(15).fill(0)
  }
  const checkUpDown = (x: number, y: number): boolean => {
    let num = 0
    for (let i = x - 1; i >= 0; i--) {
      if (arr[i][y] === arr[x][y]) num++
      else break
    }
    for (let i = x + 1; i < 15; i++) {
      if (arr[i][x] === arr[x][y]) num++
      else break
    }
    if (num >= 4) return true
    else return false
  }
  const checkLeftRight = (x: number, y: number): boolean => {
    let num = 0
    for (let i = y - 1; i >= 0; i--) {
      if (arr[x][i] === arr[x][y]) num++
      else break
    }
    for (let i = y + 1; i < 15; i++) {
      if (arr[x][i] === arr[x][y]) num++
      else break
    }
    if (num >= 4) return true
    else return false
  }
  const checkLuRd = (x: number, y: number): boolean => {
    let num = 0
    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
      if (arr[i][j] === arr[x][y]) num++
      else break
    }
    for (let i = x + 1, j = y + 1; i < 15 && j < 15; i++, j++) {
      if (arr[i][j] === arr[x][y]) num++
      else break
    }
    if (num >= 4) return true
    else return false
  }
  const checkLdRu = (x: number, y: number): boolean => {
    let num = 0
    for (let i = x - 1, j = y + 1; i >= 0 && j < 15; i--, j++) {
      if (arr[i][j] === arr[x][y]) num++
      else break
    }
    for (let i = x + 1, j = y - 1; i < 15 && j >= 0; i++, j++) {
      if (arr[i][j] === arr[x][y]) num++
      else break
    }
    if (num >= 4) return true
    else return false
  }

  const checkWin = (x: number, y: number) => {
    if (
      checkUpDown(x, y) ||
      checkLeftRight(x, y) ||
      checkLuRd(x, y) ||
      checkLdRu(x, y)
    ) {
      alert('赢了')
    }
  }

  useEffect(() => {
    if (chessRef.current) {
      ctx = chessRef.current.getContext('2d')
      // ctx.fillStyle = 'black'
      for (let i = 0; i < 15; i++) {
        ctx.beginPath()
        ctx.moveTo(20, 20 + i * 40)
        ctx.lineTo(580, 20 + i * 40)
        ctx.stroke()
        ctx.closePath()
      }
      for (let j = 0; j < 15; j++) {
        ctx.beginPath()
        ctx.moveTo(20 + j * 40, 20)
        ctx.lineTo(20 + 40 * j, 580)
        ctx.stroke()
        ctx.closePath()
      }
      chessRef.current.addEventListener('click', (e) => {
        const clientX = e.clientX
        const clientY = e.clientY
        const x = Math.round((clientX - 20) / 40) * 40 + 20
        const y = Math.round((clientY - 20) / 40) * 40 + 20
        const chessX = (x - 20) / 40
        const chessY = (y - 20) / 40
        if (arr[chessX][chessY]) return
        arr[chessX][chessY] = isBlack ? 1 : 2
        ctx.beginPath()
        ctx.arc(x, y, 20, 0, Math.PI * 2)
        ctx.fillStyle = isBlack ? 'black' : 'white'
        ctx.fill()
        ctx.closePath()
        isBlack = !isBlack
        setTimeout(() => {
          checkWin(chessX, chessY)
        }, 0)
      })
    }
  }, [])

  return (
    <canvas ref={chessRef} className="chess-canvas" width="600" height="600">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
  )
}
