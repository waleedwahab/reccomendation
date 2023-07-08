import React, {  useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./viewItem.css"
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

const Viewitems = () => {
  const location = useLocation();
  const item = location.state.item;


  console.log(item.area);

  // Access and use the 'item' data here

  return (
    <>
    <UserNavbar/>
       <Slider images={item.images.map((image) => image.url)} />
        <div className='table-container'>
         
         <div>
            <h2  className='det'>Details</h2>
            <TableContainer component={Paper} className="custom-table-container">
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Area</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Bathroom</TableCell>
            <TableCell align="right">Bedroom</TableCell>
            <TableCell align="right">city</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">Title</TableCell>
            
            <TableCell align="right"><EmailIcon/></TableCell>
            <TableCell align="right"><PhoneIcon/></TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow>
             
              <TableCell align="right">{item.area}</TableCell>
              <TableCell align="right">{item.type}</TableCell>
              <TableCell align="right"> {item.bathroom}</TableCell>
              <TableCell align="right">{item.bedroom}</TableCell>
              <TableCell align="right">{item.city}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.title}</TableCell>
              <TableCell align="right">{item.email}</TableCell>
              <TableCell align="right">{item.number}</TableCell>

            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
         </div>
        </div>
        <div className="description-box">
      <h2>Description</h2>
      <p>{item.description}</p>
    </div>
    <Footer/>
    </>
  );
};

export default Viewitems;


  