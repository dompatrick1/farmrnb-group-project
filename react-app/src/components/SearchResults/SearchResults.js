import React, { useState, useEffect } from 'react'
import { getFarmsThunk } from '../../store/farm'
import { useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './SearchResults.css'

const SearchResults = (props) => {
  const farms = Object.values(useSelector(state => state.farms))
  const dispatch = useDispatch()
  let location = useLocation()
  const locations = [
    {
      name: "Glorie Farms Winery",
      location: { lat: 41.61781002082245, lng: -74.01261700215811 }
    }
  ]
  // const [farms, setFarms] = useState()

  let stateVal = location.state.val


  let searchedFarms = farms.filter(farm => {
    return (farm.state === stateVal)
  })

  console.log('---------------', searchedFarms)

  const mapStyles = {
    height: "100vh",
    width: "50%"
  };

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

  useEffect(() => {
    dispatch(getFarmsThunk())
  }, [dispatch])


  return (
    <div className="searchParent">

      <LoadScript
        googleMapsApiKey='AIzaSyAiEd7_jUnGgEA1n3RFdoJ1WnrCyDApSX4'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={5}
          center={defaultCenter}
        >
          <Marker key={locations[0].name} position={locations[0].location} />
        </GoogleMap>

      </LoadScript>

      <div className="searchedList">
        {resultsBox}
      </div>
    </div>
  )
}
export default SearchResults;
