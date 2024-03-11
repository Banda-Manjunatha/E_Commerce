import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Bredcrum from '../Components/Bredcrum/Bredcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProduct/RelatedProducts';

const Product = () => {
    const {allProduct} = useContext(ShopContext);
    const {productId} = useParams();
    const product = allProduct.find((e)=>e.id === Number(productId));
  return (
    <div className='product'>
        <Bredcrum product={product}/>
        <ProductDisplay product={product}/>
        <DescriptionBox/>
        <RelatedProducts/>
    </div>
  )
}

export default Product