import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./updatePofile.css";
import FaceIcon from "@material-ui/icons/Face";
import MailOutline from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrorAction,
  profileUpdateAction,
  LoadLoginUser,
} from "../../Actions/UserAction";
import LoadingComp from "../Layout/Loader/Loading";
import { UPDATE_PROFILE_RESET } from "../../Constant/UserAction";
import MetaData from "../Layout/MetaData";


const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  // state get from store in reudx
  const { user } = useSelector((state) => state.loginUser);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("./profile.png");

  const UpdateProfileDataHandler = (e) => {
    e.preventDefault();
    const updateFormData = new FormData();
    updateFormData.set("name", name);
    updateFormData.set("email", email);
    updateFormData.set("avatar", avatar);

    dispatch(profileUpdateAction(updateFormData));
  };

  const updateDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewAvatar(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPreviewAvatar(user.avatar.img_url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrorAction());
    }
    if (isUpdated) {
      alert.success("user successfully updated");
      dispatch(LoadLoginUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [error, dispatch, navigate, user, alert, isUpdated]);
  return (
    <>
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          <MetaData title={`Mr ${user.name} Update profile`} />
          <div className="update_profile_container">
            <div className="update_profile_box">
              <h2 className="update_profile_heading">Update Profile</h2>
              <form
                className="update_profile_form"
                onSubmit={UpdateProfileDataHandler}
                encType="multipart/form-data"
              >
                <div className="update_profile_name">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                  />
                </div>
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
                <div id="update_profile_image">
                  <img src={previewAvatar} alt="images" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateDataChange}
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

export default UpdateProfile;
