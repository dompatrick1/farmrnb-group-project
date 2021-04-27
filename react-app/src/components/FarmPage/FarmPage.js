import { getOneFarmThunk } from '../../store/farm'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CreateReviewForm from "../reviews/createReview"

function Farm () {
    const dispatch = useDispatch()
    const farm = useSelector(state => state.farms);

    const { id } = useParams();

    useEffect(() => {
        dispatch(getOneFarmThunk(id))
    }, [dispatch, id])
    console.log(farm)
    return (
        <>
            <div>
                <p>{farm.name}</p>
                <p>{farm.description}</p>
                <p>{farm.job}</p>
            </div>
            <div>
                <CreateReviewForm />
            </div>
        </>
    )

}

export default Farm
