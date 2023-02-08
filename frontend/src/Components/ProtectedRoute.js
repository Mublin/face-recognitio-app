import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";


export default function ProtectedRoute({children}){
    const {state} = useContext(Store)
    const {userInfo} = state
    const navigate = useNavigate()
    useEffect(()=>{
        if (!userInfo) {
            navigate('/signin')
        }
    })
    return userInfo && userInfo.username ? children : navigate('/signin')
}
