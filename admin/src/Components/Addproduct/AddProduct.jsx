import React, { useState } from 'react'
import './AddProduct.css'

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const[productDetails, setProductDetails] = useState({
        name:'',
        image:'',
        category:'women',
        new_price:'',
        old_price:''
    })
    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }
    const changeHanler = (e) =>{
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }
    const addProduct = async()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        try {
            const data = await fetch('http://localhost:5000/upload', {
                method : 'POST',
                headers : {
                    Accept : 'application/json',
                },
                body : formData,
            })

            responseData = await data.json()
        } catch (error) {
            console.log(error);
        }

        // await fetch('http://localhost:5000/upload', {
        //     method : 'POST',
        //     headers : {
        //         Accept : 'application/json',
        //     },
        //     body : formData,
        // }).then((resp)=>{resp.json()})
        // .then((data)=>{responseData = data});

        console.log(responseData);
        
        if(responseData.success){
            product.image = responseData.image_url; 
            console.log(product);
            await fetch('http://localhost:5000/addproduct',{
                method:'POST',
                headers:{
                    Acccept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>{resp.json()})
            .then((data)=>alert('Product was succesfully added.')).catch((error)=>alert("Error"))
        }
    }

    return (
    <div className='addProduct'>
        <div className="addproduct-itemfield">
            <p>Product Name</p>
            <input value={productDetails.name} onChange={changeHanler} type="text" name='name' placeholder='type here..'/>
        </div>
        <div className='addproduct-price'>
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHanler} type="text" name='old_price' placeholder='type here..'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHanler} type="text" name='new_price' placeholder='type here..'/>
            </div>
        </div>
        <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHanler} name="category" className='add-product-selection'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):'https://res.cloudinary.com/dmn7qksnf/image/upload/v1709793758/upload_area_xxwlvc.svg'} alt="" className='addproduct-thumbnail-image'/>
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
            <button className='addproductbtn' onClick={()=>{addProduct()}}>Add Product</button>
        </div>

    </div>
  )
}

export default AddProduct