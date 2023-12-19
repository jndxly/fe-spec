import { district } from './setting'
import { getSpell } from 'jian-pinyin'

const getCity = (): any => {
  let result: any = []

  function doTranverse(item: any) {
    if (item.level === 'city') {
      result.push({
        citycode: item.citycode,
        adcode: item.adcode,
        name: item.name,
        position: item.center,
      })
      return
    } else if (item?.districts && item.districts.length > 0) {
      for (let i = 0; i < item.districts.length; i++) {
        doTranverse(item.districts[i])
      }
    }
  }
  doTranverse(district)

  let reg = /^[A-Za-z]*$/
  let pinyinArr = []
  result.map((v: any) => {
    var ken = getSpell(v.name[0], (character: any, spell: any) => {
      return spell[1]
    })
    pinyinArr.push({
      ...v,
      sepll: reg.test(ken[0]) ? ken[0].toUpperCase() : '#',
    })
  })
  let map = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    I: [],
    J: [],
    K: [],
    L: [],
    M: [],
    N: [],
    O: [],
    P: [],
    Q: [],
    R: [],
    S: [],
    T: [],
    U: [],
    V: [],
    W: [],
    X: [],
    Y: [],
    Z: [],
  }

  pinyinArr.forEach((item) => {
    map[item.sepll].push(item)
    delete item.sepll
  })

  return map
}

export default function District() {
  const result: any[] = getCity()
  console.log(JSON.stringify(result))

  return (
    <>
      <div>行政区域</div>
      {/* {
      result.map((key, values)=>{
        return <div>{key}:{values}</div>
      })
    } */}
    </>
  )
}
