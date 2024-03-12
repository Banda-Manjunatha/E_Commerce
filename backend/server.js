const port = 5000;
const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const jwtToken = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { read } = require('fs');
const Product = require('./models/product');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

// MongoDb database connection
mongoose.connect('mongodb+srv://manjunath:manju2002@cluster0.vwh2wmo.mongodb.net/e-commerce');

// API creation
app.get('/', (req, res)=>{
    res.send('Express App is running');
})

// Image storage Engine
const imgStorage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage:imgStorage})

// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'),(req, res)=>{
    if(!req.file){
        return res.status(400).send('No files are uploaded.');
    }
    //If ffile uploaded successfully, return the file.
    res.send({
        success:1,
        'image_url':`http://localhost:${port}/images/${req.file.filename}`
    })
})

// // Schmea for the product


// API for adding product to the DB.
app.post('/addproduct', async(req, res)=>{
    const data = req.body
    console.log(data);

    let products = await Product.find({});
    console.log(products);
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let lastProduct = last_product_array[0];
        id = lastProduct.id + 1;
    }
    else {id=1};

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product); 
    await product.save();
    console.log('Saved');
    res.json({
        success: true,
        name: req.body.name,
    })
})

// API for deleting product in DB.
 app.post('/removeproduct', async(req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log('Removed Successfully.');
    res.json({
        success:1,
        name: req.body.name
    })
 })

// API to get all teh products.
app.get('/allproduct', async(req, res)=>{
    let products = await Product.find({});
    console.log('All Products fetched.');
    res.send(products);
})

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Schema for user model
const Users = mongoose.model('Users', {
    name:{type:String},
    email:{type:String, unique:true},
    password:{type:String,},
    cartData:{type:Object},
    date:{
        type:Date,
        default:Date.now,
    }
})


// API for creating the user
app.post('/signup',  async (req, res)=>{
    const {username, email, password} = req.body;
    let check = await Users.findOne({email});
    if(check){
        return res.status(400).json({success:false, error:'User already exist!'});
    }
    let cart = {};
    for(let i=0; i< 300+1; i++){
        cart[i] = 0;
    }
    const user = new Users({
        name:username,
        email:email,
        password:password,
        cartData:cart,
    })
    await user.save();
    const data = {id:user.id}
    const token = jwtToken.sign(data, '1234');
    res.send({success:true, token});
})


// //API endpoint for user Login.
app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find user by username using Mongoose
      const user = await Users.findOne({ email });
      const passwordString = password.toString();
      console.log(user);
      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid username.' });
      }
        const passwordMatch = passwordString === user.password;
        if (!passwordMatch) {
        return res.status(401).json({ success: false, error: 'Invalid password.' });
        }
    
        // Login successful (consider generating a token here)
        const data = { id: user.id }; // Use 'data' instead of 'userData'
        const token = jwtToken.sign(data, '1234');
        res.json({ success: true, token, message: 'Login successful.' });
        console.log( 'Login Successfull.')// Consider sending relevant user data
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred.' });
    }
  });


// API end point for newcollection data
app.get('/newcollections', async(req, res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log('New collections fetched.');
    res.send(newcollection);
})

//end point for the popular section
app.get('/popularinwomen', async(req, res)=>{
    let products = await Product.find({category:'women'});
    let popular_in_women = products.slice(0,4);
    console.log('popular in women is fetched.')
    res.send(popular_in_women)
})



//middleware for to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token'); // Corrected to use req.header('auth-token')
    if (!token) {
        return res.status(401).send({error: "Please authenticate using valid email and password."}); // Typo corrected
    }
    try {
        const data = jwtToken.verify(token, '1234');
        console.log(data);
        console.log('token successfully verified by middleware .')
        req.user = data.id ;
        next();
    } catch (error) {
        console.error('Error verifying token:', error); // Log specific error for debugging
        return res.status(401).send({error: 'Please authenticate using a valid token.'});
    }
}


//API end point for adding products in cartData.
app.post('/addtocart', fetchUser, async(req, res)=>{
    console.log('Added to cart',  req.body.itemId)
    console.log(req.body, req.user);
    let userData = await Users.findOne({_id:req.user});
    userData.cartData[req.body.itemId] +=1;
    await Users.findOneAndUpdate({_id:req.user}, {cartData:userData.cartData});
    res.send('Added to cart');
    console.log('Updated the added item in Db',  req.body.itemId)
})

//creating end point te remove product from cart.
app.post('/removefromcart', fetchUser, async(req, res)=>{
    console.log('removed from cart', req.body.itemId)
    let userData = await Users.findOne({_id:req.user});
    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId] -=1
    };
    await Users.findOneAndUpdate({_id:req.user}, {cartData:userData.cartData});
    res.send('Removed from cart');
    console.log('Updated the removed item from DB',  req.body.itemId)
})

// api endpoint for getting cart data.
app.post('/getcart',  fetchUser, async(req, res)=>{
    console.log('Cart details');
    let userData = await Users.findOne({_id:req.user});
    console.log(userData);
    res.json(userData.cartData);
})

// To run on browser
app.listen(port, (err)=>{
    if(!err){
        console.log('Server running on port', port);
    }
    else console.log('Error occured', err);
})
