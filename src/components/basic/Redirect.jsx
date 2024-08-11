import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = ({ contestCode }) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`/contestactive/${contestCode}`)
    }, [])
    return (
        <div>Redirect</div>
    )
}

export default Redirect