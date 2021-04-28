import React, { useEffect } from "react"
import { getFarmsThunk } from "../../store/farm"
import { useDispatch, useSelector } from "react-redux";

import "./HomePage.css"

function Home() {
  const dispatch = useDispatch()
  const farms = useSelector(state => state.farms)


  useEffect(() => {
    dispatch(getFarmsThunk())
  }, [dispatch])

  //maybe talk about validators if farms is not in database(but it really is)


  //filter by type of farms (Winery and Dairy)
  const agricultureElement = Object.values(farms).filter(farm => farm.type === "Agriculture").map(farm => {

    return (
      <>
        <div key={farm.id}>
          <p>{farm.name}</p>
          <p>{farm.type}</p>
        </div>
      </>
    )
  })

  return (
    <>

      <h1>This is rendering Homepage</h1>

      <div>{agricultureElement}</div>
    </>
  )
}

export default Home
