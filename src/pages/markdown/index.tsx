import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css'

export default function Markdown(): JSX.Element {
  const text = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`
  const [markdown, setMarkdown] = useState(text)
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.addEventListener('change', () => {
      const reader = new FileReader()
      reader.readAsText(inputRef.current.files[0], 'utf8')
      reader.onload = () => {
        setMarkdown(reader.result)
      }
    })
  }, [])

  const showmap = (position) => {
    var long = document.getElementById('longitude')
    var lat = document.getElementById('latitude')
    var cords = position.coords
    long.value = cords.longitude
    lat.value = cords.latitude
  }

  const error = (err) => {
    console.log(err)
  }

  const handleClick = () => {
    if (navigator.geolocation) {
      //检测当前设备是否支持H5Geolocation API
      navigator.geolocation.getCurrentPosition(showmap, error)
      //检测结果存在地理定位对象的话，navigator.geolocation调用将返回该对象
      //第一个参数获取当前地理信息成功是执行的回调函数，带3个参数，
      //第一个参数是必写的，表示获取当前地理位置信息成功时所执行的回调函数，该函数参数position也是必须。
      //第二个参数是获取地理位置信息失败的回调函数，该函数的参数error也是必写的，第三个参数是一些可选属性列表（2、3个参数可省略）
    } else {
      alert('该浏览器不支持获取地理位置')
    }
  }

  return (
    <>
      <div>
        <label for="long">您当前的经度为</label>
        <input type="text" name="" id="longitude" />
        <button type="button" id="lal" onClick={handleClick}>
          获取经纬度
        </button>
      </div>
      <div>
        <label for="lat">您当前的纬度为</label>
        <input type="text" name="" id="latitude" />
      </div>
      <input type="file" ref={inputRef} />
      <ReactMarkdown children={markdown} rehypePlugins={[remarkGfm]} />
    </>
  )
}
