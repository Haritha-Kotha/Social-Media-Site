import React from 'react'
import './ad.css'

export const Ad = () => {
  return (
    <div className='ad'>
      <h4 className="adTitle">
        Advertisement
      </h4>
      <div className="rightbarAdContainer">
          <img src="/assets/ad.jpg" alt="" className='rightbarAdimg'/>
      </div>
      
    </div>
  )
}
