import React, { useState, useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import { collectionGroup, getDocs } from "firebase/firestore";
import { db } from "../../Auth/firebase";
import styles from "./Sell.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../Navbar/UserNavbar";
import Footer from "./../Navbar/Footer";

function SellDashboard() {
  const [sellList, setSellList] = useState([]);
  const currentUser = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSells = async () => {
      const querySnapshot = await getDocs(collectionGroup(db, "sell"));
      const fetchedSells = querySnapshot.docs.map((doc) => doc.data());
      setSellList(fetchedSells);
    };
    console.log(sellList);
    fetchSells();
  }, []);
  const handleClick = (item) => {
    console.log("item", item);
    const items = item;
    navigate('/viewItem', { state: { item } });
  };
  

  return (
    <>
    <UserNavbar/>
    <h1  style={{ color: 'blue', fontSize: '24px', textAlign: 'center' }}>SELLING LIST</h1>
    <div className={styles.sell_container}>
   
  {sellList.map((item, index) => (
    <div key={index} className={styles.slick_item}>
      <div className={styles.abc}>
        {/* Map over the images array */}
        {item.images.length > 0 && (
  <img
    key={0}
    src={item.images[0].url}
    alt={`Image 1 of ${item.images.length}`}
  />
)}

        <p className={styles.p}>
          <LocationOnIcon style={{ fontSize: "17px", color: "black" }} />{" "}
          {item.city}
        </p>
        <div className={styles.feature}>
          <span>
            <BedroomParentIcon style={{ fontSize: "15px" }} />{" "}
            {item.bedroom} Bedroom
          </span>
          <span>
            <BathtubIcon style={{ fontSize: "15px" }} /> {item.bathroom}{" "}
            Bathroom
          </span>
        </div>
        <Link
          to={`/conversation?senderId=${currentUser.id}&receiverId=${encodeURIComponent(item.price)}`}
        >
          <button>
            <i className="fas fa-comments">Chat</i>
          </button>
        </Link>
        <span></span>
        <button style={{ marginLeft: "5px" }}>
          <i className="fas fa-comments" id="helo" onClick={() => handleClick(item)}>
            View Item
          </i>
        </button>
      </div>
    </div>
  ))}
  <Footer />
</div>

</>

  );
}

export default SellDashboard;
