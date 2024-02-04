import ReactJson from 'react-json-view'

const json = {
  a: '很长的字符串很长的字符串很长的字符串很长的字符串很长的字符串很长的字符串很长的字符串很长的字符串',
  b: [1, 3, 4],
  c: {
    c1: 'ddd',
    c2: [
      {
        key: 'c21',
        key2: 'c22',
      },
      {
        key3: 'c3',
      },
    ],
  },
}

export default function () {
  return (
    <div>
      <ReactJson
        src={json}
        onAdd={false}
        onEdit={false}
        onDelete={false}
        enableClipboard={false}
        displayDataTypes={false}
        displayObjectSize={false}
        theme="summerfruit"
      />
    </div>
  )
}
