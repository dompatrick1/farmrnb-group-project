import React, { useState, useEffect } from 'react'
import { getFarmsThunk } from '../../store/farm'
import { getImagesThunk } from '../../store/image'
import { useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './SearchResults.css'

const SearchResults = (props) => {
  const farms = Object.values(useSelector(state => state.farms))
  const images = Object.values(useSelector(state => state.images))
  const dispatch = useDispatch()
  const [selected, setSelected] = useState({})
  let location = useLocation()


  useEffect(async() => {
    dispatch(getFarmsThunk())
    dispatch(getImagesThunk())
  }, [dispatch])

  const onSelect = (item) => {
    setSelected(item)
  }

  let stateVal = location.state.val


  let searchedFarms = farms.filter(farm => {
    return (farm.state === stateVal)
  })

  let locations
  let resultsBox

  if(images.length){
  locations = searchedFarms.map(farm => {
    const farmImage = images.filter(image => image.farmId === farm.id)[0]
    console.log('Here', farm)
    if (farmImage) {
      return {
        id: farm.id,
        name: farm.name,
        type: farm.type,
        address: farm.address,
        image: farmImage.image,
        location: {
          lat: farm.latitude,
          lng: farm.longitude
        }
      }

    }
  })

  resultsBox = searchedFarms.map(farm => {
    const farmImage = images.filter(image => image.farmId === farm.id)[1]
    return (
        <Link to={`/farm/${farm.id}`} key={farm.id} className="searchFarmLink">
          {farmImage ?
            <div>
              <img src={farmImage.image} className="searchFarmImage"/>
            </div>
          : null}
          <div>
            <h2>{farm.name}</h2>
            <p>{farm.address}</p>
            <p>{farm.description}</p>
            <p>{farm.type}</p>
          </div>
        </Link>
    )
  })
} else {
  locations = []
  resultsBox = []
}

  const mapStyles = {
    height: "100vh",
    width: "50%"
  };

  const defaultCenter = {
    lat: 42.434719, lng: -83.985001
  }

  // const resultsBox = searchedFarms.map(farm => {
  //   const farmImage = images.filter(image => image.farmId === farm.id)[1]
  //   return (
  //       <Link to={`/farm/${farm.id}`} key={farm.id} className="farmLink">
  //         <div>
  //           <h2>{farm.name}</h2>
  //           <p>{farm.address}</p>
  //           <p>{farm.description}</p>
  //           <p>{farm.type}</p>
  //         </div>
  //         <div>
  //           <img src={farmImage.image} />
  //         </div>
  //       </Link>
  //   )
  // })

  // useEffect(async() => {
  //   await dispatch(getFarmsThunk())
  //   await dispatch(getImagesThunk())
  // }, [dispatch])

  console.log("$$$$$$", locations)
  if (locations) {
  return (
    <div className="searchParent">

      <LoadScript
        googleMapsApiKey='AIzaSyAiEd7_jUnGgEA1n3RFdoJ1WnrCyDApSX4'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={5}
          center={locations.length ?
            locations[0].location
          : defaultCenter}
        >
          {locations.length ?
            locations.map(farm => {
              console.log("^^^^^^^^^^", farm)
              return (
                <Marker key={farm.name} position={farm.location} onClick={() => onSelect(farm)} />
              )
          })
          : null}

          {
            selected.location &&
            (
              <InfoWindow
                position={selected.location}
                clickable={true}
                onCloseClick={() => setSelected({})}
              >
                <div className="mapSelected">
                  <div>
                    <a href={`/farm/${selected.id}`}>{selected.name}</a>
                    <p>{selected.type}</p>
                    <p>{selected.address}</p>
                  </div>
                  <img src={selected.image} alt={selected.name} className="mapImage"/>
                </div>
              </InfoWindow>
            )
          }
        </GoogleMap>

      </LoadScript>

      <div className="searchedList">
        {resultsBox}
      </div>
    </div>
  )} else return null
}
export default SearchResults;
