import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"
import React from "react";
import "./CheckOutStep.css"
const StepActive = ({ activeStep }) => {
  const step = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon/>
    },
  ];
  const stepStyle = {
    boxSizing: "border-box"
  }
  return (
    <>
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
            {
                step.map((item,index)=>(
                    <Step key={index} active={activeStep===index? true : false} completed={activeStep >= index ? true: false}>
                        <StepLabel icon={item.icon} style={{color:activeStep>=index ? "tomato": "rgba(0,0,0,0.643)"}}>
                            {item.label}
                        </StepLabel>
                    </Step>
                ))
            }
        </Stepper>
    </>
  );
};

export default StepActive;
