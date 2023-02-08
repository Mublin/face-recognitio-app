import { useContext } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
// import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
import HomeScreen from './Screens/HomeScreen';
import LandScreen from './Screens/LandScreen';
import ProfileScreen from './Screens/ProfileScreen';
import RegisterScreen from './Screens/RegisterScreen';
import SignInScreen from './Screens/SignInScreen';
import { Store, StoreProvider } from './Store';

function App() {
  const {state, Cdispatch} = useContext(Store)
    const {userInfo} = state
    const signOutHandler =()=>{
        Cdispatch({type: "SIGNOUT_SUCCESS"})
        localStorage.removeItem("userInfo")
    }
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
                    { userInfo && userInfo.username ? <div className='sign'><li className='nav-item name'>{userInfo.username}</li> <li><Link to="/" className="nav-item"><button className='action' onClick={signOutHandler}>SIGN OUT</button></Link></li></div> : ( 
                    <div className='sign'><li><Link to="/signin" className="nav-item"><button className='action'>LOG IN</button></Link></li>
                    <li><Link to="/register" className="nav-item"><button className='action'>SIGN UP</button></Link></li></div>)}
                </ul>
            </div>
        </nav>
    </div>
      <div className='home'>
      <Routes>
      <Route path='/' element={<LandScreen />} />
      <Route path='/home' element={
      <ProtectedRoute> 
      <HomeScreen />
      </ProtectedRoute>
    } />
      <Route path='/profile' element={
      // <ProtectedRoute>
        <ProfileScreen/>
        // </ProtectedRoute>
      } 
        />
      <Route path='/signin' element={<SignInScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
