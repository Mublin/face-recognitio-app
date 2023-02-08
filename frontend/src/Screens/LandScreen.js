import React from 'react'
import { Link } from 'react-router-dom'

export default function LandScreen() {
  return (
    <div className='home'>
        <main>
            <div className='intro'>
                <h2 className='hero'>Revolutionize Your Face Detection Experience</h2> <br></br>
                <h4 className='tagline'>Unlock the Power of Cutting-Edge Technology</h4>
                <button className='button action'><Link to={"/home"} className="call">Get Started Today</Link></button>
            </div>
            <div></div>
        </main>
    </div>
  )
}
