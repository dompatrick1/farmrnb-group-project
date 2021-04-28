import React from 'react'
import { useLocation } from 'react-router-dom'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const SearchResults = (props) => {

    let location = useLocation()

    const mapStyles = {
      height: "100vh",
      width: "50%"};

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
    export default SearchResults;