import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "../components/AddressForm";
import PaymentForm from "../components/PaymentForm";
import ReviewForm from "../components/ReviewForm";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart-slice";
import { clearCheckoutInformation } from "../features/checkout-slice";
import { Alert } from "../utlis";

const steps = ["Shipping Address", "Payments Details", "Review Order"];

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (activeStep == steps.length) {
      dispatch(clearCart());
      dispatch(clearCheckoutInformation());
    }
  }, [activeStep]);

  function getStepsContent(activeStep) {
    if (activeStep == 0) {
      return <AddressForm />;
    } else if (activeStep == 1) {
      return <PaymentForm />;
    } else if (activeStep == 2) {
      return <ReviewForm />;
    } else {
      return <h1>Unknown step</h1>;
    }
  }

  function handleNext() {
    if (activeStep == 2) {
      Alert({ msg: "placed successfully", time: 1500, icon: "success" });
    }
    setActiveStep((activeStep) => activeStep + 1);
  }

  function handleBack() {
    setActiveStep((activeStep) => activeStep - 1);
  }

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep == steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order
            </Typography>
            <Typography>
              Your order number is #124598 we have emailed you about your order
              confirmation.
            </Typography>
          </>
        ) : (
          <>
            {getStepsContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              {activeStep !== 0 && (
                <Button sx={{ mt: 3 }} onClick={handleBack} variant="contained">
                  Back
                </Button>
              )}
              <Button sx={{ mt: 3 }} onClick={handleNext} variant="contained">
                {activeStep === steps.length - 1 ? "Place Order" : "next"}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Checkout;
