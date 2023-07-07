import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./viewItem.css"

const Slider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="slider">
      <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} className="slider-image" />
      <button className="slider-button left-button" onClick={goToPreviousImage}>
        &lt;
      </button>
      <button className="slider-button right-button" onClick={goToNextImage}>
        &gt;
      </button>
    </div>
  );
};

const Viewitems = () => {
  const location = useLocation();
  const item = location.state.item;

  console.log(item.area);

  // Access and use the 'item' data here

  return (
    <>
       <Slider images={item.images.map((image) => image.url)} />
        <div className='cont'>
         

        </div>
    </>
  );
};

export default Viewitems;


  