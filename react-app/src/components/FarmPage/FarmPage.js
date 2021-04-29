import { getFarmsThunk } from '../../store/farm'
import { getFarmImagesThunk } from '../../store/image'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CreateReviewForm from "../reviews/createReview"
import CreateReservationForm from "../reservations/createReservation"
import FarmReviews from "../reviews/reviewBox"

function Farm() {
    const dispatch = useDispatch()
    const farms = useSelector(state => state.farms);
    const images = useSelector(state => state.images);


    const { id } = useParams();
    const farm = farms[id]

    const imagesArray = Object.values(images)

    useEffect(() => {
        dispatch(getFarmsThunk())
        dispatch(getFarmImagesThunk(id))
    }, [dispatch, id])

    return (
        <>
            <div>
                {imagesArray.map((image) => <img key={image.id} src={image.image} alt={image.image}/>)}
            </div>
            <div>
                {farm ?
                    <div>
                        <p>{farm.name}</p>
                        <p>{farm.description}</p>
                        <p>{farm.job}</p>
                    </div>
                : null}
            </div>
            <div>
                <CreateReviewForm />
                <FarmReviews/>
            </div>
            <div>
                <CreateReservationForm />
            </div>
        </>
    )

}

export default Farm
