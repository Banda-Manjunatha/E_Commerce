import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext'; // Make sure to import your ShopContext
import Item from '../Components/Item/Item';
import './CSS/ShopCategory.css'

const ShopCategory = (props) => {
  const { allProduct } = useContext(ShopContext);

  if (!allProduct) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div className="shop-context">
      <img src={props.banner} alt="" className='banner'/>
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-2</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src='https://res.cloudinary.com/dmn7qksnf/image/upload/v1709533334/dropdown_icon_wn91gb.png' alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {
          allProduct.map((item, i) => {
            if (props.category === item.category) {
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
            } else {
              return null;
            }
          })
        }
      </div>
      <div className="shopcategory-loadmore">
        Explore more
      </div>
    </div>
  );
}

export default ShopCategory;
