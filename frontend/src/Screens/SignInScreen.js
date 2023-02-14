import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Store, StoreProvider } from '../Store'
import { getError } from '../Components/getError'

export default function SignInScreen() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const {state, dispatch: Cdispatch} = useContext(Store)
    const {userInfo, isLoading, isLogged} = state;
    // const submitHandler = async (e) =>{
    //     e.preventDefault();
    //     try {
    //         const {data} = await axios.post(`http://localhost:4550/api/users/signin`, {
    //             email,
    //             password
    //         })
    //         dispatch({type: "USER_SIGNIN_SUCCESS", payload: data})
    //         localStorage.setItem("userInfo", JSON.stringify(data))
    //         navigate("/home");
    //     } catch (error) {
    //         window.alert(getError(error))
    //     }
    // }
    const submitHandler = async (e) =>{
        e.preventDefault();
        Cdispatch({type: "USER_SIGNIN_REQUEST"})
        try {
            const {data} = await axios.post(`http://localhost:4550/api/users/signin`, {
                email,
                password
            })
            localStorage.setItem("userInfo", JSON.stringify(data))
            Cdispatch({ type: "USER_SIGNIN_SUCCESS", payload: data })
            navigate('/home')
        } catch (error) {
            window.alert(getError(error))
        }
    }
    useEffect(()=>{
        if (userInfo) {
            navigate("/home")
        }
    }, [navigate, userInfo])
  return (
    <div className='action-screen'>
        <section>
            <div className='forms'>
                {isLoading ? <div>loading...</div> : 
                (<form className='input signin' onSubmit={submitHandler}>
                    <div>
                        <label htmlFor=''>Email <br></br>
                            <input type={"email"} name="email" onChange={(e)=> setEmail(e.target.value)} />
                        </label>
                    </div>
                    <div className='password'>
                        <label htmlFor=''>Password <br></br>
                            <input type={"password"} name="password" onChange={(e)=> setPassword(e.target.value)} />
                        </label>
                    </div>
                    <button className='action' type='submit'>Submit</button>
                </form>)}
                
            </div>
        </section>
    </div>
  )
}
