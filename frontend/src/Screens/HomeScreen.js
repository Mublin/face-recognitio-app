import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {Store} from "../Store"
// import { Link } from 'react-router-dom'

export default function HomeScreen() {
  const [imageSrc, setImageSrc] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [box, setBox] =useState({})
  const {state} = useContext(Store)
  const {userInfo} = state
  // const inputRef = useRef()
  const submitPicture = async ()=>{
    setImageUrl(imageSrc)
    const {data} = await axios.post(`/api/users/image/`, {
      imageSrc
    },{
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    if (data) {
      const corners = data.result[0].regions[0].region_info.bounding_box;
      let imageSip = document.querySelector(".image-display");
      // console.log(imageSip)
      const height = Number(imageSip.height);
      // console.log(height)
      const width = Number(imageSip.width)
      const cornersTop = corners.top_row * height
      const cornersLeft = corners.left_col * width
      const cornersBottom = height - (corners.bottom_row * height)
      const cornersRight = width - (corners.right_col * width)
      setBox({cornersBottom, cornersLeft, cornersTop, cornersRight})
    } else {
      
    }
    // console.log(cornersBottom, cornersLeft, cornersRight)
  }
  // console.log(box)
  return (
    <div className='home'>
        <main className='input'>
          <div>
            <div>
            <input className='url' type={"text"} value={imageSrc} onChange={(e)=>setImageSrc(e.target.value)}/><button className='action' onClick={submitPicture}>SUBMIT</button></div>
            {imageUrl && <div className="position"><img src={imageUrl} className="image-display" width= "500px" height= "500px" />
            <div className='boundingbox' style={{top: box.cornersTop, bottom: box.cornersBottom, left: box.cornersLeft, right: box.cornersRight}}></div>
            </div>}
          </div>
        </main>
    </div>
  )
}
