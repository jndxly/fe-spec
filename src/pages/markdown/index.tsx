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

  return (
    <>
      <input type="file" ref={inputRef} />
      <ReactMarkdown children={markdown} rehypePlugins={[remarkGfm]} />
    </>
  )
}
