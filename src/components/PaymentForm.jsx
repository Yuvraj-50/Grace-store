import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { updatePayments } from "../features/checkout-slice";

function PaymentForm() {
  const dispatch = useDispatch();
  const payment = useSelector((state) => state.checkout.payment);

  function handlePaymentFormSubmit(e) {
    e.preventDefault();
    dispatch(updatePayments({ [e.target.id]: e.target.value }));
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Box component={"form"} onChange={handlePaymentFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              defaultValue={payment.cardName ?? ""}
              required
              id="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              name="cardName"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              defaultValue={payment.cardNumber ?? ""}
              required
              id="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              name="cardNumber"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              defaultValue={payment.expDate ?? ""}
              required
              id="expDate"
              name="expDate"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              defaultValue={payment.cvv ?? ""}
              required
              id="cvv"
              name="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              type="password"
              autoComplete="cc-csc"
              variant="standard"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default PaymentForm;
