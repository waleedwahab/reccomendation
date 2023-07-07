import React, { useState } from 'react';
import styles from './GoogleMaps2.module.css';
import MapPicker from 'react-google-map-picker';

const DefaultLocation = {
  lat: 30.166556316646023,
  lng: 69.34510000000002
};
const DefaultZoom = 6;

const GoogleMaps2 = ({ closeUpload, onLocationChange }) => {
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  const handleChangeLocation = (lat, lng) => {
    setLocation({ lat, lng });
  };

  const handleChangeZoom = (newZoom) => {
    setZoom(newZoom);
  };

  const handleResetLocation = () => {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  };

  const handleClose = () => {
    if (closeUpload && typeof closeUpload === 'function') {
      if (onLocationChange && typeof onLocationChange === 'function') {
        onLocationChange(location.lat, location.lng);
      }
      closeUpload(false);
    }
  };

  return (
    <>
      <div className={styles.modalBackground} onClick={() => closeUpload(false)}></div>
      <div className={styles.modalContainer}>
        <MapPicker
          defaultLocation={defaultLocation}
          zoom={zoom}
          mapTypeId="roadmap"
          style={{
            maxWidth: "1200px",
            height: "100%",
          }}
          onChangeLocation={handleChangeLocation}
          onChangeZoom={handleChangeZoom}
          apiKey="AIzaSyCjQY4CjdsL-C83_sSbLzP4cwDy8dkSmmY" // Replace with your Google Maps API key
          libraries={['places']}
        />
        <button className={styles.button1} onClick={handleClose}>Add</button>
      </div>
    </>
  );
}

export default GoogleMaps2;


// apiKey='AIzaSyCjQY4CjdsL-C83_sSbLzP4cwDy8dkSmmY'