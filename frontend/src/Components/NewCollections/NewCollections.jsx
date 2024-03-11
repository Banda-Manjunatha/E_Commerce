import React, { useEffect, useState } from 'react'
import Item from '../Item/Item'
//import new_collection from '../../Data/new_collections'
import './NewCollections.css'

const NewCollections = () => {

  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/newcollections');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        setNewCollection(data);
        console.log('New collections data fetched successfully:', data);
      } catch (error) {
        console.error('Error fetching new collections data:', error);
        // Optionally display a user-friendly error message
      }
    }
  
    fetchData(); // Call the async function immediately within useEffect
  }, []); // Empty dependency array ensures fetching only once on component mount
  
  

  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className='collections'>
            {newCollection.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default NewCollections