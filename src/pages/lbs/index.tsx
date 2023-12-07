import { useEffect, useRef, useState } from 'react'
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmapgl'

export default function Lbs() {
  const mapRef = useRef(null)

  const handleClick = (e) => {
    console.log(e.point.lng, e.point.lat)
  }

  const [pos, setPos] = useState({ lng: 116.402544, lat: 39.928216 })

  useEffect(() => {
    if (mapRef.current) {
      // const map = new BMapGL.Map("allmap")
      const geolocation = new BMapGL.Geolocation()
      geolocation.enableSDKLocation()
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMapGL.Marker(r.point)
          setPos(r.point)
          // map.addOverlay(mk);
          // map.panTo(r.point);
          // mapRef.current.addOverlay(mk);
          // mapRef.current.panTo(r.point);
          // alert('您的位置：'+r.point.lng+','+r.point.lat);
        } else {
          alert('failed' + this.getStatus())
        }
      })
      const myFunc = (result) => {
        console.log(result)
      }
      const myCity = new BMapGL.LocalCity()
      myCity.get(myFunc)
    }
  }, [])

  return (
    <Map ref={mapRef} center={pos} zoom="15" onClick={handleClick}>
      <Marker position={pos} />
      <NavigationControl />
      <InfoWindow position={pos} text="内容" title="标题" />
    </Map>
  )
}
