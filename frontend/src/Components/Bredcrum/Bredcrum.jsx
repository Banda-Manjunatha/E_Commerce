import React from 'react'
import './Bredcrum.css'

const Bredcrum = (props) => {
    const {product} = props;
    let arrow_image = 'https://res.cloudinary.com/dmn7qksnf/image/upload/v1709533333/breadcrum_arrow_lam5pa.png'
  return (
    <div className='bredcrum'>
        HOME <img src={arrow_image} alt="" /> SHOP <img src={arrow_image} alt="" /> {product.category} <img src={arrow_image} alt="" /> {product.name}
    </div>
  )
}

export default Bredcrum