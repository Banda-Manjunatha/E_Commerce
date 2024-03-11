import React, { useContext } from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext'

const CartItems = () => {
    const {getTotalCartAmount, allProduct, cartItems, removeFromCart } = useContext(ShopContext);
  return (
    <div className='cartItems'>
        <div className="cartItems-format-main">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {
            allProduct.filter((e) => cartItems[e.id] > 0).map((e) => {
                return <div key={e.id}>
                    <div className="cartItems-format cartItems-format-main">
                        <img src={e.image} alt="" className='Cartproduct-image'/>
                        <p>{e.name}</p>
                        <p>₹{e.new_price}</p>
                        <button className='cartItems-quantity'>{cartItems[e.id]}</button>
                        <p>₹{e.new_price * cartItems[e.id]}</p>
                        <img className='removeProduct' src="https://res.cloudinary.com/dmn7qksnf/image/upload/v1709533334/cart_cross_icon_caktkr.png" alt="" onClick={()=>{removeFromCart(e.id)}}/>
                    </div>
                    <hr />
                </div>
                }
            )
        }
        <div className="allCart">
            <div className="cart-total">
                <h1>Price Details</h1>
                <div>
                    <div className='cartItems-total-item'>
                        <p>Subtotal</p>
                        <p>₹{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartItems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartItems-total-item">
                        <h3>Total Amount</h3>
                        <h3>₹{getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>Process To CheckOut</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have any promocode, Enter it here.</p>
                <div className='cartitems-promobox'>
                    <input type="text" placeholder='Enter the code'/>
                    <button>Submit</button>
                </div>
            </div>
            
        </div>

    </div>
  )
}

export default CartItems