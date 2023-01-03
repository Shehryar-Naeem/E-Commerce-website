import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet, Route } from "react-router-dom"

const ProtectedRoute =()=>{
    const {user, loading ,isAuthenicated} = useSelector(state =>state.loginUser)

    if(!isAuthenicated){
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