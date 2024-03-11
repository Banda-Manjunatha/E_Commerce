import React from "react"
import Navbar from "./Components/Navbar/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Shop from "./Pages/Shop"
import ShopCategory from "./Pages/ShopCategory"
import Product from "./Pages/Product"
import Cart from "./Pages/Cart"
import LoginSignup from "./Pages/LoginSignup"
import Footer from "./Components/Footer/Footer"

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/mens"
            element={
              <ShopCategory
                banner="https://res.cloudinary.com/dmn7qksnf/image/upload/v1709533333/banner_mens_q5fyzh.png"
                category="men"
              />
            }
          />
          <Route
            path="/womens"
            element={
              <ShopCategory
                banner="https://res.cloudinary.com/dmn7qksnf/image/upload/v1709533334/banner_women_zv3j8x.png"
                category="women"
              />
            }
          />
          <Route
            path="/kids"
            element={
              <ShopCategory
                banner="https://res.cloudinary.com/dmn7qksnf/image/upload/v1709533334/banner_kids_o19h9l.png"
                category="kid"
              />
            }
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
