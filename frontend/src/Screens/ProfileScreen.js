import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getError } from '../Components/getError'
import { Store } from '../Store'


const reducer = (state, action)=>{
  switch (action.type) {
    case "FETCH_REQUEST":
      return {...state, loading: true}
    case "FETCH_SUCCESS":
      return {...state, loading: false}
    case "FETCH_FAIL":
      return {...state, loading: false, error: action.payload}
    case "UPDATE_REQUEST":
      return {...state, updateLoading: true}
    case "UPDATE_SUCCESS":
      return {...state, updateLoading: false}
    case "UPDATE_FAIL":
      return {...state, updateLoading: false, errorUpdate: action.payload}
    default:
      return state
  }
}
export default function ProfileScreen() {
  const {id} = useParams()
  const navigate = useNavigate()
  const {state, dispatch: Cdispatch } = useContext(Store)
  const {userInfo} = state
  const [{loading, error}, dispatch] = useReducer(reducer, {
    error: ""
  })
  const [fullName, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDOB] = useState()
  const [profilepic, setProfilepic] = useState("")
  // console.log(fullName, username, email)
  // console.log(id)
  const submitHandler = async (e)=>{
    e.preventDefault()
    try {
      dispatch({type:"UPDATE_REQUEST"})
      const {data} = await axios.put(`http://localhost:4550/api/users/profile/update`,
      {
        fullName,
        username,
        dob,
        profilepic,
        email
      },{
        headers:{
          Authorization: `Bearer ${userInfo.token}`
        }
      })
      // console.log(data)
      Cdispatch({ type: "USER_SIGNIN_SUCCESS", payload: data.updatedUser})
      dispatch({type: "UPDATE_SUCCESS"})
      localStorage.setItem(userInfo, JSON.stringify(data.updatedUser))
      window.alert("User Updated Successful")
      // navigate("/home")
    } catch (error) {
      window.alert(error)
    }

  }
  useEffect(()=>{
    const fetchData = async ()=>{
      dispatch({type: "FETCH_REQUEST"});
    try {
      const {data} = await axios.get(`http://localhost:4550/api/users/profile/${id}`,{
        headers: { Authorization: `Bearer ${userInfo.token}`}
      })
      // console.log(data)
      dispatch({type: "FETCH_SUCCESS"})
      setEmail(data.email);
      setFullname(data.name);
      setUsername(data.username);
      setProfilepic(data.picture)
      // setDOB(data.dob)
      // console.log(userInfo)
    } catch (error) {
      dispatch({type:"FETCH_FAIL", payload: error})
      window.alert(getError(error))
    }
    }
    fetchData()
  },[])
  return (
    <div className='action-screen'>
      <section className='forms'>
        {loading ? <div>loading...</div> : error ? <h3>Error fetching data</h3> : <form className='input' onSubmit={submitHandler}>
          <div>
            <label htmlFor='Profile-Pic'>
              <input type={'image'} name="Profile-Picture"/>
            </label>
          </div>
          <div>
            <label htmlFor='Full-Name'>Full-Name <br></br>
              <input type={'text'} name="Full Name" value={fullName} onChange={(e)=>setFullname(e.target.value)} required/>
            </label>
          </div>
          <div>
            <label htmlFor='Full-Name'>Username <br></br>
              <input disabled type={'text'} name="username" value={username}/>
            </label>
          </div>
          <div>
            <label className='password' htmlFor='Full-Name'>Email <br></br>
              <input type={'text'} name="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
            </label>
          </div>
          <button type='submit' className='action'>submit</button>
        </form>}
      </section>
    </div>
  )
}
