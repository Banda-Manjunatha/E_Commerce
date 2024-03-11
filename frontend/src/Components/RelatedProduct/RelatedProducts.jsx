import React from 'react'
import './RelatedProducts.css'
import data_product from '../../Data/data'
import Item from '../Item/Item'

const RelatedProduct = () => {
  return (
    <div className='relatedProducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relProducts-item">
        {data_product.map((item, i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProduct