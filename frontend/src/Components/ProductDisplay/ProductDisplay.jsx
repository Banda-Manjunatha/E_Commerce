import React, { useContext } from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext)
    let starIcon = 'https://res.cloudinary.com/dmn7qksnf/image/upload/v1709533328/star_icon_bdhazk.png'
  return (
    <div className='productDisplay'>
        <div className="productDisplay-left">
            <div className="productDisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productDisplay-img">
                <img src={product.image} alt="" className='product-main-img'/>
            </div>
        </div>
        <div className="productDisplay-right">
            <h1>{product.name}</h1>
            <div className="productDisplay-right-star">
                <img src={starIcon} alt="" />
                <img src={starIcon} alt="" />
                <img src={starIcon} alt="" />
                <img src={starIcon} alt="" />
                <img src="https://res.cloudinary.com/dmn7qksnf/image/upload/v1709533328/star_dull_icon_fxtkdi.png" alt="" />
                <p>(122)</p>
            </div>
            <div className="product-right-prices">
                <div className="product-price-old">
                    ₹{product.old_price}
                </div>
                <div className="product-price-new">
                    ₹{product.new_price}
                </div>
            </div>
            <div className="product-discription">
                Los laboriosam quo, accusamus facere ratione voluptatibus nesciunt a ex ducimus reiciendis est! Explicabo architecto tenetur exercitationem reiciendis.
            </div>
            <div className="product-size-container">
                <h2>Select Size</h2>
                <div className="product-size">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
                <button onClick={()=>{addToCart(product.id) }}>ADD TO CART</button>
                <p className='product-right-category'><span>Category : </span>Women, T-Shirt, Crop Top</p>
                <p className='product-right-category'><span>Tags : </span>Modern, Latest</p>
            </div>
        </div>
    </div>
  )
}

export default ProductDisplay