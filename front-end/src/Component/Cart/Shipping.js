import React, { useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfoAcion } from "../../Actions/CartAction";
import MetaData from "../Layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransformWithInAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import CheckOutStep from "./CheckOutStep.js"
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert()
  const navigate = useNavigate()
  const { shippingInfo } = useSelector((state) => state.Cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phone, setPhone] = useState(shippingInfo.phone);
  const shippingSubmit = (e) => {
    e.preventDefault()
    if(phone.length < 10 || phone.length > 10){
      alert.error("please Enter the valid number")
      return
    }
   dispatch(
    saveShippingInfoAcion({address,city,state,country,postalCode,phone}))
    navigate("/order/confirm")

  };
  return (
    <>
      <MetaData title="Shipping_Info" />
      <CheckOutStep activeStep={0}/> 
      <div className="shipping_container">
        <div className="shipping_box">
          <h2 className="shipping_heading">Shipping Detail</h2>
          <form
            className="shipping_form"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                size="10"
              />
            </div>
            <div>
              <PublicIcon />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div>
                <TransformWithInAStationIcon />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                    <option value="">State</option>
                    {
                        State && (
                            State.getStatesOfCountry(country).map((item)=>(
                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                            ))
                        )
                    }
                </select>
              </div>
            )}
            <input type="submit" value="Continue" className="shipping_btn" disabled={state ? false :true}/>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
