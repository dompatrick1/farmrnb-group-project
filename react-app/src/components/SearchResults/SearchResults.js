import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './SearchResults.css'

const SearchResults = (props) => {
  const farms = Object.values(useSelector(state => state.farms))
  let location = useLocation()

  let searchedFarms = farms.filter(farm => {
    return (farm.state === location.state.val)
  })

  console.log('---------------', searchedFarms)

    const mapStyles = {
      height: "100vh",
      width: "50%"};

    const defaultCenter = {
      lat: 42.434719, lng: -83.985001
    }

    const resultsBox = searchedFarms.map(farm => {
      return (
        <Link to={`/farm/${farm.id}`} key={farm.id} className="farmLink">
          <p>{farm.name}</p>
          <p>{farm.type}</p>
        </Link>
      )
    })


    return (
      <div className="searchParent">

        <LoadScript
          googleMapsApiKey='AIzaSyAiEd7_jUnGgEA1n3RFdoJ1WnrCyDApSX4'>
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={5}
              center={defaultCenter}
            />
        </LoadScript>

        <div className="searchedList">
          {resultsBox}
        </div>
      </div>
    )
  }
    export default SearchResults;
