import React from 'react'
import './Sidebar.css';
import {Link} from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:'none'}}>
            <div className="sidebar-item">
                <img src="https://res.cloudinary.com/dmn7qksnf/image/upload/v1709793757/Product_Cart_n7ijmy.svg" alt="" />
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:'none'}}>
            <div className="sidebar-item">
                <img src="https://res.cloudinary.com/dmn7qksnf/image/upload/v1709793757/Product_list_icon_jzmy3h.svg" alt="" />
                <p>Product List</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar