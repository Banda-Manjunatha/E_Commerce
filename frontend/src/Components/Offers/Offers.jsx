import React from 'react';
import './Offers.css';

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Out Now</button>
        </div>
        <div className="offers-right">
            <img src="https://res.cloudinary.com/dmn7qksnf/image/upload/v1709533334/exclusive_image_k5vzo8.png" alt="" />
        </div>
    </div>
  )
}

export default Offers