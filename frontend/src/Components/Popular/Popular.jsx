import React, { useEffect, useState } from 'react';
import './Popular.css';
// import data_product from '../../Data/data';
import Item from '../Item/Item';

const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/popularinwomen');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        setPopularProducts(data);
        console.log('Popular in women products fetched successfully.', data);
      } catch (error) {
        console.error('Error fetching popular in women products:', error);
      }
    };

    fetchPopularProducts();
  }, []);
  
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className='popular-item'>
            {popularProducts.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default Popular