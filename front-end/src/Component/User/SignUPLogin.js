import React, { useRef, useState,useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./signUpLogin.css";
import EmailIcon from "@material-ui/icons/Email";
import PasswordIcon from "@material-ui/icons/Visibility";
import FaceIcon from "@material-ui/icons/Face";
import MailOutline from "@material-ui/icons/MailOutline";
import LockOpen from "@material-ui/icons/LockOpen";
// import profile from "../../Images/profile.png"
import {useDispatch, useSelector} from "react-redux";
import { useAlert } from "react-alert";
import {loginAction,clearErrorAction, registerUser} from "../../Actions/UserAction"
import LoadingComp from "../Layout/Loader/Loading";
const SingUpLogin = () => {
  const loginTab = useRef(null);
  const RegisterTab = useRef(null);
  const switchertab = useRef(null);
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { loading,error , isAuthenicated} = useSelector(state=>state.loginUser)
  const alert = useAlert()
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user,setUser]= useState({
    name:"",
    email:"",
    password:"",
  })
  const {name,email,password}= user

  const [avatar,setAvatar] = useState("")
  const [previewAvatar,setPreviewAvatar] = useState("/profile.png")
  // const LoginUser = useSelector((state)=> state.loginUser)
  const redirect = location.search ?"/"+ location.search.split("=")[1] : "/account";
  useEffect(()=>{
    if(error){
      alert.error(error)
      dispatch(clearErrorAction())
    }
    if(isAuthenicated){
      navigate(redirect)
    }
  },[dispatch,error,alert,isAuthenicated,navigate,redirect])
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginAction(loginEmail,loginPassword))
  };
  const registerHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData()
    myForm.set("name",name)
    myForm.set("email",email)
    myForm.set("password",password)
    myForm.set("avatar",avatar)
    dispatch(registerUser(myForm))
  };
  const registerDataChange=(e)=>{
    const { name, value } = e.target;
    if(name==="avatar"){
      const reader = new FileReader()
      reader.onload=()=>{
        if(reader.readyState===2){
            setPreviewAvatar(reader.result)
            setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }else{
      setUser((preVal)=>{
        return {
          ...preVal,
          [name]:value  
        }
      })
    }
  }

  const switchTab = (e, tab) => {
    if (tab === "login") {
      switchertab.current.classList.add("shift_to_neutral");
      switchertab.current.classList.remove("shift_to_right");

      RegisterTab.current.classList.remove("shift_to_neutral_form");
      loginTab.current.classList.remove("shift_to_left");
    }
    if (tab === "register") {
      switchertab.current.classList.add("shift_to_right");
      switchertab.current.classList.remove("shift_to_neutral");

      RegisterTab.current.classList.add("shift_to_neutral_form");
      loginTab.current.classList.add("shift_to_left");
    }
  };
  return (
    <>
      {
        loading ? <LoadingComp/> : <>
        <div className="login_signup_container">
          <div className="login_signup_box">
            <div>
              <div className="login_signup_toggle">
                <p onClick={(e) => switchTab(e, "login")}>Login</p>
                <p onClick={(e) => switchTab(e, "register")}>Register</p>
              </div>
              <button ref={switchertab}></button>
            </div>
            <form className="login_form" ref={loginTab} onSubmit={loginHandler}>
              <div className="login_Email">
                <EmailIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="login_password">
                <PasswordIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forget">forget Password</Link>
              <input type="submit" value="login" className="login_btn" />
            </form>
            <form
              className="signUp_form"
              ref={RegisterTab}
              onSubmit={registerHandler}
              encType="multipart/form-data"
            >
              <div className="signUp_name">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUp_email">
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUp_password">
                <LockOpen />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>
              <div id="signUp_image">
                <img src={previewAvatar} alt="images"/>
                <input type="file" name="avatar" accept="image/*" onChange={registerDataChange}/>
              </div>
              <input type="submit" value="register" className="signUp_btn"/>
            </form>
          </div>
        </div>
      </>
      }
    </>
  );
};

export default SingUpLogin;
