import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { getSubtotal } from "../utlis";

function ReviewForm() {
  const cartItems = useSelector((state) => state.cart.value);
  const address = useSelector((state) => state.checkout.address);
  const payment = useSelector((state) => state.checkout.payment) ?? [];
  const addresses = address ? Object.values(address) : [];
  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: payment.cardName },
    { name: "Card number", detail: payment.cardNumber },
    { name: "Expiry date", detail: payment.expDate },
  ];
  return (
    <>
      <Typography> Order Summary</Typography>
      <List>
        {cartItems?.map(({ product, quantity }) => (
          <ListItem sx={{ py: 1, px: 0 }} key={product.title}>
            <ListItemText
              sx={{ py: 1, px: 1 }}
              primary={product.title}
              secondary={`Qty ${quantity}`}
            />
            <Typography variant="body2">
              {getSubtotal([{ product, quantity }])?.toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            {getSubtotal(cartItems)?.toFixed(2)}
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((pay) => (
              <React.Fragment key={pay.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{pay.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{pay.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ReviewForm;
