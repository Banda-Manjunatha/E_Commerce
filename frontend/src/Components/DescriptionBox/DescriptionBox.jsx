import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionBox'>
        <div className="descriptionBox-nav">
          <div className="descriptionBox-nav-box">
            Description
          </div>
          <div className="descriptionBox-nav-box fade">
            Reviews (122)
          </div>
        </div>
        <div className="descriptionBox-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eaque facilis molestiae maxime impedit! Rerum omnis enim voluptatum minima ab ea atque provident, dignissimos consectetur incidunt facere, praesentium eius dolores.</p>
        </div>
    </div>
  )
}

export default DescriptionBox