import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="head">
            <img src="https://res.cloudinary.com/dmn7qksnf/image/upload/v1709533335/logo_kdof1y.png" alt="" className='nav-logo'/>
            <div className='name'>
                <p className='brandName'>TRENDIFY</p>
                <p className='heading'>Admin Panel</p>
            </div>
        </div>
        <div className="profile">
            <img src="https://res.cloudinary.com/dmn7qksnf/image/upload/v1709793765/nav-profile_isradf.svg" alt="" />
        </div>
    </div>
  )
}

export default Navbar