import React from 'react'
import styles from "./UserDashboard.module.css";
import Slider from "react-slick";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";

export default function HotList() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div><div className={styles.slider}>
    <h2>
      Hot Listing <span className={styles.hh}>🔥</span>
    </h2>
    <Slider {...settings}>
      <div className={styles.slick_item}>
        <div className={styles.abc}>
          <img src="https://architecturebeast.com/wp-content/uploads/2018/04/Simple-modern-house-with-an-amazing-floating-stairs-Architecture-Beast-33-main-min.jpg" />
          <p className={styles.p}>
            <LocationOnIcon
              style={{ fontSize: "17px", color: "black" }}
            />{" "}
            Islamabad, Pakistan
          </p>
          <div className={styles.feature}>
            <span>
              <BedroomParentIcon style={{ fontSize: "15px" }} /> 2 Bedroom
            </span>
            <span>
              <BathtubIcon style={{ fontSize: "15px" }} /> 2 Bedroom
            </span>
          </div>
        </div>
      </div>
      <div className={styles.slick_item}>
        <div className={styles.abc}>
          <img src="https://www.mydomaine.com/thmb/XLIl7bniDtQ-zx8o_9R-wgmAsHE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/MaydanArchitects2-7d8ed56fa3a846e08130ac68bf41267d.jpg" />
          <p className={styles.p}>
            <LocationOnIcon
              style={{ fontSize: "17px", color: "black" }}
            />{" "}
            Islamabad, Pakistan
          </p>
          <div className={styles.feature}>
            <span>
              <BedroomParentIcon style={{ fontSize: "15px" }} /> 2 Bedroom
            </span>
            <span>
              <BathtubIcon style={{ fontSize: "15px" }} /> 2 Bedroom
            </span>
          </div>
        </div>
      </div>
      <div className={styles.slick_item}>
        <div className={styles.abc}>
          <img src="https://www.mydomaine.com/thmb/uYobv04JAzweRmKAceORrM6ycUs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1369-03-copy-1b6760fab1984e4393ca4082b2780c7c.jpg" />
          <p className={styles.p}>
            <LocationOnIcon
              style={{ fontSize: "17px", color: "black" }}
            />{" "}
            Islamabad, Pakistan
          </p>
          <div className={styles.feature}>
            <span>
              <BedroomParentIcon style={{ fontSize: "15px" }} /> 2 Bedroom
            </span>
            <span>
              <BathtubIcon style={{ fontSize: "15px" }} /> 2 Bedroom
            </span>
          </div>
        </div>
      </div>
      <div className={styles.slick_item}>
        <div className={styles.abc}>
          <img src="https://www.mydomaine.com/thmb/TUFH7cxIFbCymov0SeRu1ZX-bPQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/IMG_1266-1240x827-740d518231c54b98bd6316437e9408d3.jpg" />
          <p className={styles.p}>
            <LocationOnIcon
              style={{ fontSize: "17px", color: "black" }}
            />{" "}
            Islamabad, Pakistan
          </p>
          <div className={styles.feature}>
            <span>
              <BedroomParentIcon style={{ fontSize: "15px" }} /> 2 Bedroom
            </span>
            <span>
              <BathtubIcon style={{ fontSize: "15px" }} /> 2 Bedroom
            </span>
          </div>
        </div>
      </div>
      <div className={styles.slick_item}>
        <div className={styles.abc}>
          <img src="https://www.mydomaine.com/thmb/5nIJnosgE-8xlolwB8bLZNQhrOM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/MaydenArchitects-578f1bca194b4d0aaeabdb8695673130.jpg" />
          <p className={styles.p}>
            <LocationOnIcon
              style={{ fontSize: "17px", color: "black" }}
            />{" "}
            Islamabad, Pakistan
          </p>
          <div className={styles.feature}>
            <span>
              <BedroomParentIcon style={{ fontSize: "15px" }} /> 2 Bedroom
            </span>
            <span>
              <BathtubIcon style={{ fontSize: "15px" }} /> 2 Bedroom
            </span>
          </div>
        </div>
      </div>
      <div className={styles.slick_item}>
        <div className={styles.abc}>
          <img src="https://www.mydomaine.com/thmb/qfc13qpHnxMkqp8Ja-XwYjC1JQ8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SuCasaDesign-Modern-9335be77ca0446c7883c5cf8d974e47c.jpg" />
          <p className={styles.p}>
            <LocationOnIcon
              style={{ fontSize: "17px", color: "black" }}
            />{" "}
            Islamabad, Pakistan
          </p>
          <div className={styles.feature}>
            <span>
              <BedroomParentIcon style={{ fontSize: "15px" }} /> 2 Bedroom
            </span>
            <span>
              <BathtubIcon style={{ fontSize: "15px" }} /> 2 Bedroom
            </span>
          </div>
        </div>
      </div>
      <div className={styles.slick_item}>
        <div className={styles.abc}>
          <img src="https://www.mydomaine.com/thmb/8Gqt3pK0zRXK9dJ9kHl-7AUaEeo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SuCasaDesign-Modern2-ec89013bd4d74c6693f8247eee10134b.jpg" />
          <p className={styles.p}>
            <LocationOnIcon
              style={{ fontSize: "17px", color: "black" }}
            />{" "}
            Islamabad, Pakistan
          </p>
          <div className={styles.feature}>
            <span>
              <BedroomParentIcon style={{ fontSize: "15px" }} /> 2 Bedroom
            </span>
            <span>
              <BathtubIcon style={{ fontSize: "15px" }} /> 2 Bedroom
            </span>
          </div>
        </div>
      </div>
    </Slider>
    </div></div>
  )
}
