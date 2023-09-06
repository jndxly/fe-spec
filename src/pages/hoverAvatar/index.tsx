import avatar from './avatar.png'
import './index.css'

export default function HoverAvatar() {
  return (
    <div className="wrap">
      <img className="icon" src={avatar} alt="image" />
    </div>
  )
}
