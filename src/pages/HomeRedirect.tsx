import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function HomeRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/home');
        }, 500)
    }, [])
  return (
    <></>
  )
}

export default HomeRedirect