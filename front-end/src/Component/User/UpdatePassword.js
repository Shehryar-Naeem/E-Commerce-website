import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./updatePofile.css";
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import LockkeyIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrorAction,
  updatePasswordAction,
  LoadLoginUser,
} from "../../Actions/UserAction";
import LoadingComp from "../Layout/Loader/Loading";
import { UPDATE_PASSWORD_RESET } from "../../Constant/UserAction";
import MetaData from "../Layout/MetaData";

const UpdatePassowrd = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.loginUser);

  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const updatePassWordHandler = (e) => {
    e.preventDefault();
    const MyForm = new FormData()

    MyForm.set("oldPassword",oldPassword)
    MyForm.set("newPassword",newPassword)
    MyForm.set("confirmPassword",confirmPassword)
    dispatch(updatePasswordAction(MyForm))
  };

  useEffect(()=>{
    if(error){
        alert.error(error)
        dispatch(clearErrorAction())
    }
    if(isUpdated){
        alert.success(`${user.name} password successfully updated`)
        navigate("/account")
        dispatch({type:UPDATE_PASSWORD_RESET})
    }
  },[alert,navigate,isUpdated,user.name,dispatch,error  ])

  return (
    <>
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          <MetaData title={`Mr ${user.name} Update Password`} />
          <div className="update_profile_container">
            <div className="update_profile_box">
              <h2 className="update_profile_heading">Update Password</h2>
              <form
                className="update_profile_form"
                onSubmit={updatePassWordHandler}
                encType="multipart/form-data"
              >
                <div className="signUp_password">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="oldPassword"
                    required
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                  />
                </div>
                <div className="signUp_password">
                  <LockkeyIcon />
                  <input
                    type="password"
                    placeholder="newPassword"
                    required
                    name="newPassword"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                  />
                </div>
                <div className="signUp_password">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="confirmPassword"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="update_profile_btn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassowrd;
