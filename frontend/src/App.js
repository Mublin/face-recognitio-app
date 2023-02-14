import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import { getError } from './Components/getError';
// import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
import HomeScreen from './Screens/HomeScreen';
import LandScreen from './Screens/LandScreen';
import ProfileScreen from './Screens/ProfileScreen';
import RegisterScreen from './Screens/RegisterScreen';
import SignInScreen from './Screens/SignInScreen';
import { Store, StoreProvider } from './Store';
// const reducer = (state, action)=>{
//   switch (action.type) {
//     case "FETCH_REQUEST":
//       return {...state, loading: true}
//     case "FETCH_SUCCESS":
//       return {...state, loading: false}
//     default:
//       return state
//   }}
function App() {
  const {state, dispatch : Cdispatch} = useContext(Store)
    const {userInfo} = state
    const signOutHandler =()=>{
        Cdispatch({type: "SIGNOUT_SUCCESS"})
        localStorage.removeItem("userInfo")
    }
    // const [{loading, error}, dispatch] = useReducer(reducer, {
    //   error: ""
    // })
  // useEffect(()=>{
  //   const fetchData = async ()=>{
  //     dispatch({type: "FETCH_REQUEST"});
  //   try {
  //     const {data} = await axios.get(`http://localhost:4550/api/users/profile/${userInfo.username}`,{
  //       headers: { Authorization: `Bearer ${userInfo.token}`}
  //     })
  //     dispatch({type: "FETCH_SUCCESS"})
  //     Cdispatch({type: "USER_SIGNIN_SUCCESS", payload: data})
  //     localStorage.setItem(userInfo, JSON.stringify(data))
  //   } catch (error) {
  //     dispatch({type:"FETCH_FAIL", payload: error})
  //     window.alert(getError(error))
  //   }
  //   }
  //   fetchData()
  // },[])
  return (
    
    
    <div className="App">
    <div className='nav'>
        <nav>
            <div>
                <img src='' alt='logo' />
            </div>
            {/* {console.log(state)} */}
            <div>
                <ul>
                    <li><Link to={"/"} className="nav-item">Home</Link></li>
                    {/* {console.log(userInfo)} */}
                    <li><Link to={"/about"} className="nav-item">About Us</Link></li>
                    <li><Link to={"/contact"} className="nav-item">Contact Us</Link></li>
                    { userInfo && userInfo.username ? <div className='sign'><li className='nav-item name'><Link to={`/profile/${userInfo.username}`} className="nav-item">{userInfo.username}</Link></li> <li><Link to="/" className="nav-item"><button className='action' onClick={signOutHandler}>SIGN OUT</button></Link></li></div> : ( 
                    <div className='sign'><li><Link to="/signin" className="nav-item"><button className='action'>LOG IN</button></Link></li>
                    <li><Link to="/register" className="nav-item"><button className='action'>SIGN UP</button></Link></li></div>)}
                </ul>
            </div>
        </nav>
    </div>
      {/* <div className='home divs'> */}
      <Routes>
      <Route path='/' element={<LandScreen />} />
      <Route path='/home' element={
      <ProtectedRoute> 
      <HomeScreen />
      </ProtectedRoute>
    } />
      <Route path='/profile/:id' element={
      <ProtectedRoute>
        <ProfileScreen/>
        </ProtectedRoute>
      } 
        />
      <Route path='/signin' element={<SignInScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      </Routes>
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default App;
