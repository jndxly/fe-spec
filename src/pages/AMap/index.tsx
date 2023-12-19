import { useEffect, useState } from 'react'
import styles from './index.less'

export default function AMapLbs() {
  const [text, setText] = useState('')
  useEffect(() => {
    var map = new AMap.Map('container', {
      zoom: 11,
    })
    AMap.plugin('AMap.Geolocation', function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：5s
        position: 'RB', //定位按钮的停靠位置
        offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
        zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
      })
      map.addControl(geolocation)
      geolocation.getCurrentPosition(function (status, result) {
        if (status == 'complete') {
          onComplete(result)
        } else {
          onError(result)
        }
      })
    })
    //解析定位结果
    function onComplete(data) {
      document.getElementById('status').innerHTML = '定位成功'
      var str = []
      str.push('定位结果：' + data.position)
      str.push('定位类别：' + data.location_type)
      if (data.accuracy) {
        str.push('精度：' + data.accuracy + ' 米')
      } //如为IP精确定位结果则没有精度信息
      str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'))
      document.getElementById('result').innerHTML = str.join('<br>')
    }
    //解析定位错误信息
    function onError(data) {
      // document.getElementById('status').innerHTML = '定位失败'
      // document.getElementById('result').innerHTML =
      //   '失败原因排查信息:' +
      //   data.message +
      //   '</br>浏览器返回信息：' +
      //   data.originMessage
    }

    const handleMapClick = (e) => {
      const str =
        '您在 [ ' +
        e.lnglat.getLng() +
        ',' +
        e.lnglat.getLat() +
        ' ] 的位置单击了地图！'
      setText(str)
    }
    map.on('click', handleMapClick)
  }, [])

  return (
    <>
      <div id="container" className={styles.container}></div>
      <div className={styles.info}>{text}</div>
    </>
  )
}
