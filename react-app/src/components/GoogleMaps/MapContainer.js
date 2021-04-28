import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {

    const mapStyles = {
      height: "100vh",
      width: "100%"};

    const defaultCenter = {
      lat: 42.434719, lng: -83.985001
    }

    return (
       <LoadScript
         googleMapsApiKey='AIzaSyAiEd7_jUnGgEA1n3RFdoJ1WnrCyDApSX4'>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={5}
            center={defaultCenter}
          />
       </LoadScript>
    )
  }
  export default MapContainer;
