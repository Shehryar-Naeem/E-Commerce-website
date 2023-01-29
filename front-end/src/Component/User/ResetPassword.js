import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./updatePofile.css";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrorAction,
  ResetPasswordAction,
} from "../../Actions/UserAction";
import LoadingComp from "../Layout/Loader/Loading";

import MetaData from "../Layout/MetaData";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {token} = useParams()
 
  const { loading, error, success } = useSelector(
    (state) => state.forgetPassword
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const updatePassWordHandler = (e) => {
    e.preventDefault();
    const MyForm = new FormData();
    // console.log(password);
    // console.log(confirmPassword);
    MyForm.set("password", password);
    MyForm.set("confirmPassword", confirmPassword);
    dispatch(ResetPasswordAction(token,MyForm))
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorAction());
    }
    // console.log(success);
    if (success) {
      alert.success(`password successfully updated`);
      navigate("/login");
    }
  }, [alert, navigate, success,  dispatch, error]);
  return (
    <>
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          <MetaData title={`Update Password`} />
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
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
