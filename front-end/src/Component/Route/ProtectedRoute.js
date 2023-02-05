import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet,  } from "react-router-dom"

const ProtectedRoute =()=>{
    const {loading ,isAuthenicated} = useSelector(state =>state.loginUser)

    if(isAuthenicated===false){
        return <Navigate to={"/login"}/>
    }
    return (
        <>
            {
                !loading && <Outlet/>
            }
        </>
    )
}

export default ProtectedRoute