import React, {  useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./viewdataset.css"
import UserNavbar from "../Navbar/UserNavbar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import { Margin } from '@mui/icons-material';
import Footer from "./../Navbar/Footer";
import image1 from "./images/image1.webp";
import image2 from "./images/image2.jpeg";
import image3 from "./images/image3.jpeg"


const Slider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
//const [rows, setrows] = useState ([1,2,3,4,5,6,6,7,8,9,9,90,])
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="slider" >
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

const ViewDatasetdata = () => {
    const [images, setimages] = useState([image1, image2, image3]);
  const location = useLocation();
  const item = location.state.data;
   
 

 // console.log(item.area);

  // Access and use the 'item' data here

  return (
    <>
    <UserNavbar/>
       <Slider images={images.map((image) => image)} />
        <div className='table-container'>
         
         <div>
            <h2  className='det'>Details</h2>

            <div className="property-details">
            <div className="row">
    <span className="label">Price: </span>
    <span className="value">{item.price}</span>
  </div>
  <div className="row">
    <span className="label">Area: </span>
    <span className="value">{item.area}</span>
  </div>
  <div className="row">
    <span className="label">City:</span>
    <span className="value">{item.city}</span>
  </div>
  <div className="row">
    <span className="label">Baths:</span>
    <span className="value">{item.baths}</span>
  </div>
  <div className="row">
    <span className="label">Bedroom:</span>
    <span className="value">{item.bedrooms}</span>
  </div>
  
  <div className="row">
    <span className="label">area_sqft:</span>
    <span className="value">{item.area_sqft}</span>
  </div>
  <div className="row">
    <span className="label">locality:</span>
    <span className="value">{item.locality}</span>
  </div>
  <div className="row">
    <span className="label">Location:</span>
    <span className="value">{item.location}</span>
  </div>
  <div className="row">
    <span className="label">Email:</span>
    <span className="value">khan123@gmail.com</span>
  </div>
  <div className="row">
    <span className="label">Contact:</span>
    <span className="value">0332768772</span>
  </div>
  <div className="row">
    <span className="label">content:</span>
    <span className="value">{item.content}</span>
  </div>
  
  
  
</div>

        
           
         </div>
        </div>
        <div className="description-box">
      <h2>Description</h2>
      <p>The house features 4 stylishly designed bathrooms, ensuring convenience and privacy for every member of the household. The contemporary architecture and thoughtful layout create a harmonious blend of functionality and aesthetics. The property also offers ample natural light, creating a bright and inviting atmosphere throughout.

Situated in a prime location, this house provides easy access to all the amenities and facilities you need for a convenient lifestyle. Nearby schools, parks, shopping centers, and restaurants cater to your daily needs and entertainment options. The secure neighborhood of Paragon City ensures a peaceful and secure environment for residents.</p>
    </div>
    <Footer/>
    </>
  );
};

export default ViewDatasetdata;


  