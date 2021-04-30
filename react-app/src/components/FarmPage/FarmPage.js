import { getFarmsThunk } from '../../store/farm'
import { getFarmImagesThunk } from '../../store/image'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CreateReviewForm from "../reviews/createReview"
import CreateReservationForm from "../reservations/createReservation"
import FarmReviews from "../reviews/reviewBox"

import './FarmPage.css'

function Farm() {
    const dispatch = useDispatch()
    const farms = useSelector(state => state.farms);
    const images = useSelector(state => state.images);
    const [picture, setPicture] = useState(0)


    const { id } = useParams();
    const farm = farms[id]

    const imagesArray = Object.values(images)

    useEffect(() => {
        dispatch(getFarmsThunk())
        dispatch(getFarmImagesThunk(id))
    }, [dispatch, id])

    // let i = 0

    const nextImage = async (e) => {
        e.preventDefault()

        if (picture < 2) {
            setPicture(picture + 1)
        } else if (picture === 2) {
            setPicture(0)
        }
    }

    const prevImage = async (e) => {
        e.preventDefault()

        if (picture > 0) {
            setPicture(picture - 1)
        } else if (picture === 0) {
            setPicture(2)
        }
    }

    console.log('------------', picture)

    return (
        <>
            {farm ?
                <div>
                    <div className="farmPageName">
                        <h1>{farm.name}</h1>
                    </div>
                    <div className="farmPageContainer">
                        <div className="farmPageImages">
                            <div className="farmPageImageContainer">
                                <button className="imageSelect" onClick={e => prevImage(e)}>{'<'}</button>
                                {imagesArray.length ?
                                    <img className="imageCarousel" key={imagesArray[picture].id} src={imagesArray[picture].image} alt={imagesArray[picture].image}/>
                                : null}
                                <button className="imageSelect" onClick={e => nextImage(e)}>{'>'}</button>
                            </div>
                            <div>
                                <p>{farm.description}</p>
                                <p>{farm.job}</p>
                            </div>
                        </div>
                        <div className="farmPageReservation">
                            <CreateReservationForm />
                            <div className="farmPageReviews">
                                <CreateReviewForm />
                                <FarmReviews/>
                            </div>
                        </div>
                    </div>
                </div>
            : null}
        </>
    )

}

export default Farm
