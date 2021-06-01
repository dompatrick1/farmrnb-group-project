import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFarmReviewsThunk } from '../../store/review'
import SingleReview from '../SingleReview/SingleReview'

function FarmReviews () {
    const {id} = useParams()
    let reviews = Object.values(useSelector(state => state.reviews))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFarmReviewsThunk(id))
    }, [dispatch, id])


    let reviewBox = reviews.slice(0).reverse().map(review => {
        return (
            <div key={review.id}>
                {review ?
                    <SingleReview review={review} />
                : null}
            </div>
        )
    })

    return (
        <div>
            {reviewBox}
        </div>
    )
}
export default FarmReviews
