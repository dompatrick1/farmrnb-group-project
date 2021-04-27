import { getOneFarmThunk } from '../../store/farm'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Farm () {
    const dispatch = useDispatch()
    const farm = useSelector(state => state.farms);

    const { id } = useParams();

    useEffect(() => {
        dispatch(getOneFarmThunk(id))
    }, [dispatch, id])

    return (
        <div>
            <p>{farm.name}</p>
            <p>{farm.description}</p>
            <p>{farm.job}</p>
        </div>
    )

}

export default Farm