import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {Store} from "../Store"
// import { Link } from 'react-router-dom'

export default function HomeScreen() {
  const [imageSrc, setImageSrc] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [box, setBox] =useState([])
  const {state} = useContext(Store)
  const {userInfo} = state
  // console.log(state, "state")
  // console.log(userInfo, "userinfo")
  // const inputRef = useRef()
  async function imageWork() {
    setImageUrl(imageSrc)
    const {data} = await axios.post(`/api/users/image`, {
      imageSrc
    },{
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })
    // console.log(data)
    if (data) {
      const faces = data.result[0].regions
      let imageSip = document.querySelector(".image-display");
      let height = Number(imageSip.height);
      const width = Number(imageSip.width)
      const face = faces.map(x=>{
        let eachFace = x.region_info.bounding_box
        let cornersTop = eachFace.top_row * height
        let cornersLeft = eachFace.left_col * width
        let cornersBottom = height - (eachFace.bottom_row * height)
        let cornersRight = width - (eachFace.right_col * width)
        return {cornersBottom, cornersLeft, cornersTop, cornersRight}
      })
      setBox(face)
      
      // console.log(box)
      // console.log(corners)
      
      // console.log(imageSip)
     
      // console.log(height)
    } else {
    }
  }
  const submitPicture = async ()=>{
    if (imageUrl) {
      setImageUrl(null)
      imageWork()
    } else {
      imageWork()
    }
    // console.log(cornersBottom, cornersLeft, cornersRight)
  }
  // console.log(box)
  return (
    <div className='action-screen'>
        <main className='input'>
          <div>
            <div>
            <input className='url' type={"text"} value={imageSrc} onChange={(e)=>setImageSrc(e.target.value)}/><button className='action' onClick={submitPicture}>SUBMIT</button></div>
            {imageUrl && <div className="position"><img src={imageUrl} className="image-display" width= "500px" height= "500px" />
            {box.map((x, i)=>( 
              <div key={i} className='boundingbox' style={{top: x.cornersTop, bottom: x.cornersBottom, left: x.cornersLeft, right: x.cornersRight}}></div>
            )) }
            </div>}
          </div>
        </main>
    </div>
  )
}
