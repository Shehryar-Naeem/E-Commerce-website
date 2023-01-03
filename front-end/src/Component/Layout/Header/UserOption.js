import React, { useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop  from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import ListAltIcon from "@material-ui/icons/ListAlt"
import { useNavigate } from "react-router-dom";
import { logout } from "../../../Actions/UserAction";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";



const UserOption = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alert = useAlert()
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(true);
  const options=[
    {icon:<ListAltIcon/>, name:"order", func:orders},
    {icon:<PersonIcon/>, name:"profile", func:account},
    {icon:<ExitToAppIcon/>, name:"logout", func:logoutUser}
  ]
  if(user.role==="admin"){
    
    options.unshift({icon:<DashboardIcon/>, name:"dashboard", func:dashboard})
  }

  function orders(){
    navigate("/order")
  }
  function account(){
    navigate("/account")
  }
  function logoutUser(){
    dispatch(logout())
    alert.success("logout Successfully")
    navigate("/")
  }
  function dashboard() {
    navigate("/dashboard")
  }
  return (
    <>
      <div>
        <Backdrop open={open} style={{zIndex:10}}/>
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          onClose={() => setClose(false)}
          onOpen={() => setOpen(true)}
          open={open}
          className="speed_Dial"
          direction="down"
          style={{zIndex:11}}
          icon={<img  className="speed_dial_icon" src={user.avatar.img_url ? user.avatar.img_url :"/profile.png" } alt="avatar"/>}
        >
            {options.map((item)=> (
                <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func}/>
            ))}
        </SpeedDial>
      </div>
    </>
  );
};

export default UserOption;
