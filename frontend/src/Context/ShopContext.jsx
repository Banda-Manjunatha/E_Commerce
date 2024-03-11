import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const defaultCart = () => {
  let cart = {};
  for (let i = 0; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [allProduct, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState(defaultCart());

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/allproduct');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        setAllProduct(data);
        console.log('All Products fetched successfully:', data); // Log for debugging & verification
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
   
    fetchData(); // Call the async function immediately within useEffect

    async function fetchCartData() {
      const token = localStorage.getItem('auth-token');
    
      // Check if token exists
      if (!token) {
        console.log('No auth token found. User might be not logged in.');
        // Optionally handle cases where a user might not be logged in (e.g., display a message)
        return; // Exit if no token
      }
    
      try {
        const response = await fetch('http://localhost:5000/getcart', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'auth-token': token, // Use the retrieved token
            'Content-Type': 'application/json', // Assuming the server expects an empty body for GET requests (check server logic)
          },
          body: '', // Assuming the server expects an empty body for GET requests (check server logic)
        });
    
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
    
        const data = await response.json();
        setCartItems(data); // Assuming you have a setCartItems function to update state
      } catch (error) {
        console.error('Error fetching cart items:', error); // Log the error for debugging
      }
    }
    
    // Call the fetchCartItems function when needed (e.g., on component mount or button click):
    fetchCartData(); // Assuming you're calling this within a React component or similar context
    
      

  }, []); // Empty dependency array ensures fetching only once on component mount
  
  
    // Fetch cart items only if there's an auth token
  //   const authToken = localStorage.getItem('auth-token');
  //   if (authToken) {
  //     try {
  //       const cartResponse = await fetch('http://localhost:5000/getcart', {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'auth-token': authToken,
  //           'Content-Type': 'application/json',
  //         },
  //         body: '', // Assuming no body data is required for getCart
  //       });
  //       if (!cartResponse.ok) {
  //         throw new Error(`Network response was not ok: ${cartResponse.status}`);
  //       }
  //       const cartData = await cartResponse.json();
  //       setCartItems(cartData);
  //     } catch (error) {
  //         console.error('Error fetching cart items:', error);
  //       // Optionally display an error message to the user
  // }
  //   }
  // }, []);
  

  const addToCart = async (itemId) => {
    try {
      // Update local cart state
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] ? prev[itemId] + 1 : 1 }));

      // Send update to backend only if authenticated
      if (localStorage.getItem('auth-token')) {
        const response = await fetch('http://localhost:5000/addtocart', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'auth-token': `${localStorage.getItem('auth-token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'itemId' : itemId }), // Concise object destructuring
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        console.log('Added to cart successfully:', data); // Optional for debugging
      }
    } catch (error) {
      console.error('Error adding item to cart:', error); // Log the error for debugging
    }
  };

  const removeFromCart = async (itemId) => {
    try {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) })); // Ensures quantity doesn't go negative
    if (localStorage.getItem('auth-token')) {
      const response = await fetch('http://localhost:5000/removefromcart', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'auth-token': `${localStorage.getItem('auth-token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'itemId' : itemId }),
      })
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      console.log(' item removed from cart successfully:', data); 
    }
  }
  catch (error) {
    console.error('Error removing item from cart:', error);
  }};

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allProduct.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  }

   const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const ContextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    allProduct,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
