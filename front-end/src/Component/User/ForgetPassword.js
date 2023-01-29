import React, { useState, useEffect } from "react";
import "./updatePofile.css";
import MailOutline from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrorAction,
  forgetPasswordAction,
} from "../../Actions/UserAction";
import LoadingComp from "../Layout/Loader/Loading";
import MetaData from "../Layout/MetaData";

const ForgetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    // state get from store in reudx

    const { loading, error, message } = useSelector(
      state => state.forgetPassword
    );
  
    const [email, setEmail] = useState("");

  
    const UpdateProfileDataHandler = (e) => {
      e.preventDefault();
      const updateFormData = new FormData();
      updateFormData.set("email", email);
    
  
      dispatch(forgetPasswordAction(updateFormData));
    };
    useEffect(() => {
        // if (user) {
        
        //   setEmail(user.email);
        //   setPreviewAvatar(user.avatar.img_url);
        // }
        if (error) {
          alert.error(error);
          dispatch(clearErrorAction());
        }
        if (message) {
          alert.success("token send successfully");
          dispatch(clearErrorAction());
    
         
        }
      }, [error, dispatch,  alert, message]);
  return (
    <>
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          <MetaData title={`Mr Update profile`} />
          <div className="update_profile_container">
            <div className="update_profile_box">
              <h2 className="update_profile_heading">Update Profile</h2>
              <form
                className="update_profile_form"
                onSubmit={UpdateProfileDataHandler}
              >
                <div className="update_profile_email">
                  <MailOutline />
                  <input
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
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

export default ForgetPassword;
