import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getError } from '../Components/getError'
import { Store } from '../Store'

export default function RegisterScreen() {
    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate()
    const {state, Cdispatch} = useContext(Store)
    const {userInfo} = state
    useEffect(()=>{
        if (userInfo) {
            navigate("/home")
        }
    }, [userInfo])
    const submitHandler = async (e) =>{
        e.preventDefault();
        if (password === cPassword) {
            try {
                const {data}= await axios.post(`/api/users/register`, {
                    fullName,
                    password,
                    username,
                    email
                })
                Cdispatch({type: "CREATE_USER_SUCCESS", payload: data})
                localStorage.setItem("userInfo", JSON.stringify(data))
                navigate("/home")
            } catch (error) {
                window.alert(getError(error))
            }
        } else {
            window.alert("Passwords do not match")
            return;
        }
    }
  return (
    <div>
        <main>
            <div>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor='Full-Name'> Full-Name:
                            <input type={"text"} name="Full-Name" onChange={(e)=> setFullName(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='email'> E-mail:
                            <input type={"email"} name="email" onChange={(e)=> setEmail(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='username'>Username:
                            <input type={"text"} name="username" onChange={(e)=> setUsername(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='Password'> Password:
                            <input type={"password"} name="password" onChange={(e)=> setPassword(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='c-password'> Confirm-Password:
                            <input type={"password"} name="confirm-password" onChange={(e)=> setCPassword(e.target.value)} />
                        </label>
                    </div>
                    <button className='action'>Submit</button>
                </form>
            </div>
        </main>
    </div>
  )
}
