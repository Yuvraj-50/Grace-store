import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import {
  Button,
  CardContent,
  CardMedia,
  Rating,
  TextField,
  useTheme,
} from "@mui/material";
import { getSubtotal } from "../utlis";
import { addToCart, removeFromCart } from "../features/cart-slice";
import { useNavigate } from "react-router-dom";
function Cart() {
  const cartItems = useSelector((state) => state.cart?.value);
  const subTotal = getSubtotal(cartItems).toFixed(2);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function updateQuantity(e, { product, quantity }) {
    const updatedQuantity = e.target.valueAsNumber;

    if (updatedQuantity < quantity) {
      // remove product from the cart
      dispatch(removeFromCart({ product }));
    } else {
      dispatch(addToCart({ product }));
    }
  }

  function goToHome() {
    navigate("/");
  }

  function goToCheckout() {
    navigate("/checkout");
  }

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} md={8}>
          {cartItems?.map(({ product, quantity }) => {
            const { title, price, id, description, rating, image } = product;
            return (
              <Grid item key={id} xs={12}>
                <Card sx={{ display: "flex", py: 2 }}>
                  <CardMedia
                    component="img"
                    image={image}
                    sx={{
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: "contain",
                      padding: theme.spacing(),
                    }}
                    alt={title}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Typography variant="h5">{title}</Typography>
                      <Rating readOnly precision={0.5} value={rating.rate} />
                      <form>
                        <TextField
                          inputProps={{ min: 0, max: 10 }}
                          label="Quantity"
                          value={quantity}
                          sx={{ width: theme.spacing(8) }}
                          id={`${id}-product-id`}
                          type="number"
                          variant="standard"
                          onChange={(e) =>
                            updateQuantity(e, { product, quantity })
                          }
                        ></TextField>
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h5" paragraph>
                        {getSubtotal([{ product, quantity }]).toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          container
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Card
              sx={{
                padding: 2,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h4" paragraph>
                SubTotal
              </Typography>
              <Typography variant="h5">{subTotal}</Typography>
              {subTotal > 0 ? (
                <Button variant="contained" onClick={goToCheckout}>
                  Buy Now
                </Button>
              ) : (
                <Button variant="contained" onClick={goToHome}>
                  shop Products
                </Button>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;
