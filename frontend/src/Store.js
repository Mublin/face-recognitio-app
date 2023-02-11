import { createContext, useReducer } from "react";


export const Store = createContext();


// export function StoreProvider(props) {
//     const [state, dispatch] = useReducer(reducer, initialState)
//     const value = {state, dispatch}
//     return <Store.Provider value={value}>{props.children}</Store.Provider>
// }

const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
}
const reducer = (state, action)=>{
    switch (action.type) {
        case "USER_SIGNIN_SUCCESS":
            return {...state, userInfo: action.payload}
        case "CREATE_USER_SUCCESS":
            return {...state, userInfo: action.payload};
        case "SIGNOUT_SUCCESS":
            return { userInfo: null};
        default:
            return state
    }
}
export const StoreProvider = (props)=>{
    const [state, Cdispatch]= useReducer(reducer, initialState)
    const value = {state, Cdispatch}
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}