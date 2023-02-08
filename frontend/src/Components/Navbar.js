// import React, { useContext, useEffect} from 'react'
// import { Link } from 'react-router-dom'
// import { Store } from '../Store'

// export default function Navbar() {
    
//   return (
//     <div className='nav'>
//         <nav>
//             <div>
//                 <img src='' alt='logo' />
//             </div>
//             {console.log(state)}
//             <div>
//                 <ul>
//                     <li><Link to={"/"} className="nav-item">Home</Link></li>
//                     {console.log(userInfo)}
//                     <li><Link to={"/about"} className="nav-item">About Us</Link></li>
//                     <li><Link to={"/contact"} className="nav-item">Contact Us</Link></li>
//                     { userInfo && userInfo.username ? <div className='sign'><li className='nav-item name'>{userInfo.username}</li> <li><Link to="/" className="nav-item"><button className='action' onClick={signOutHandler}>SIGN OUT</button></Link></li></div> : ( 
//                     <div className='sign'><li><Link to="/signin" className="nav-item"><button className='action'>LOG IN</button></Link></li>
//                     <li><Link to="/register" className="nav-item"><button className='action'>SIGN UP</button></Link></li></div>)}
//                 </ul>
//             </div>
//         </nav>
//     </div>
//   )
// }
