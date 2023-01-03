import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingComp from "../Layout/Loader/Loading";
import MetaData from "../Layout/MetaData";
import "./account.css"
const Account = () => {
  const navigate = useNavigate()
  const { user, loading, isAuthenicated} = useSelector((state) => state.loginUser);
  useEffect(()=>{
    if(isAuthenicated=== false){
      navigate("/login")
    }
  },[isAuthenicated,navigate])
  return (
    <>
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          <MetaData title={`${user.name}'s profile`} />
          <div className="profile_container">
            <div>
              <h2>My profile</h2>
              <img src={user.avatar.img_url} alt="profile" />
              <Link to="/me/update">Edit or update Profie</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <Link to="/orders">My orders</Link>
                <Link to="/update/password">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Account;
