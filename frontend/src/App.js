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
  useEffect(()=>{
    changeNav()
    // console.log("siu")
  },[])
  const changeNav = ()=>{
    // console.log(window.innerWidth)
    if(window.innerWidth < 750){
      let bars = document.querySelector(".fa-bars")
      bars.classList.add("visible")
      document.querySelector(".siu7").classList.add("invisible")
    }else if(window.innerWidth > 749){
      let bar = document.querySelector(".fa-bars")
      bar.classList.remove("visible")
      bar.classList.add("invisible")
      let siu8 = document.querySelector(".siu8")
      siu8.classList.remove("visible")
      siu8.classList.add("invisible")
    }else{
      return
    }
  }
  const openNav = ()=>{
    console.log("click")
    document.querySelector(".siu8").classList.toggle("toggle")
  }
  window.addEventListener("resize", changeNav)
  return (
    
    
    <div className="App">
    <div className='nav'>
        <nav>
            <div>
                <img src='' alt='logo' />
            </div>
            {/* {console.log(state)} */}
            <div className='nav-adjust'>
                <i className='fas fa-bars' onClick={openNav}></i>
                <ul className='siu8 invisible'>
                    <li><Link to={"/"} className="nav-item">Home</Link></li>
                    {/* {console.log(userInfo)} */}
                    <li><Link to={"/about"} className="nav-item">About Us</Link></li>
                    <li><Link to={"/contact"} className="nav-item">Contact Us</Link></li>
                    { userInfo && userInfo.username ? <div className='sign'><li className='nav-item name'><Link to={`/profile/${userInfo.username}`} className="nav-item">{userInfo.username}</Link></li> <li><Link to="/" className="nav-item"><button className='action' onClick={signOutHandler}>SIGN OUT</button></Link></li></div> : ( 
                    <div className='sign'><li><Link to="/signin" className="nav-item"><button className='action'>LOG IN</button></Link></li>
                    <li><Link to="/register" className="nav-item"><button className='action'>SIGN UP</button></Link></li></div>)}
                </ul>
                <ul className='siu7'>
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
