import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getFarmReviewsThunk, deleteReviewThunk, editReviewThunk} from '../../store/review'

function FarmReviews () {
    const {id} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    let reviews = Object.values(useSelector(state => state.reviews))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFarmReviewsThunk(id))
    }, [dispatch, id])

    const handleDelete = async (e, review) => {
        e.preventDefault()
        await dispatch(deleteReviewThunk(review.id))
        dispatch(getFarmReviewsThunk(id))

    }


    let reviewBox = reviews.slice(0).reverse().map(review => {
        return (
            <div>
                {review ?
                    <div>
                        <p>{review.review}</p>
                    </div>
                : null}
                {sessionUser && review.userId === sessionUser.id ?
                    <button onClick={(e) => handleDelete(e, review)}>X</button>
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
