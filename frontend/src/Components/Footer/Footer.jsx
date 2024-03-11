import React from 'react'
import './Footer.css'
import { FaTwitter, FaInstagram, FaPinterest, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src="https://res.cloudinary.com/dmn7qksnf/image/upload/v1709533335/logo_big_dael4x.png" alt="" />
            <p>TRENDIFY</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <ul className='social-icons'>
            <li><FaTwitter className='Sicon'/></li>
            <li><FaPinterest className='Sicon'/></li>
            <li><FaInstagram className='Sicon'/></li>
            <li><FaFacebook className='Sicon'/></li>
        </ul>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2024 - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer