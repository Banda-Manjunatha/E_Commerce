import React, { useEffect, useState } from 'react'
import './ListProduct.css'

const ListProduct = () => {

  const [allProducts, setAllProducts] = useState([]);

  // const fetchInfo = async() => {
  //   await fetch('http://localhost:5000/allproducts')
  //   .then((resp)=>{resp.json()})
  //   .then((data)=>{setAllProducts(data)});
  // }

  // //useEffect(()=>{ fetchInfo() }, []);
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/allproduct');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchInfo();
  }, []); 
  
  const removeProduct = async (id) => {
    await fetch('http://localhost:5000/removeproduct',{
      method : 'POST',
      headers : {
        Accept:'application/jsos',
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({id : id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
      <div className="list-products">
        <h1>All Producst List</h1>
        <div className="listproducts-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old_Price</p>
          <p>New_Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproducts-allproducts">
            <hr />
            {allProducts.map((product, index)=>{
              return <>
                <div key={index} className="listproducts-format-main listproduct-format">
                  <img src={product.image} alt="" className='listproduct-product-icon'/>
                  <p className='nameProduct'>{product.name}</p>
                  <p>₹{product.old_price}</p>
                  <p>₹{product.new_price}</p>
                  <p>{product.category}</p>
                  <img src="https://res.cloudinary.com/dmn7qksnf/image/upload/v1709533334/cart_cross_icon_caktkr.png" alt="" className='listproduct-remove-icon' onClick={()=>{removeProduct(product.id)}}/>
                </div>
                <hr />
              </>
            })}
        </div>
      </div>
    </div>
  )
}

export default ListProduct