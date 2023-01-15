import { ShoppingCartSharp } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart-slice";
import { fetchAllProducts } from "../features/product-slice";
import { useSearchParams } from "react-router-dom";
import { Alert } from "../utlis";
function Home() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchTerm = searchParams.get("searchTerm");
  const theme = useTheme();
  const state = useSelector((state) => state.products);
  const { value: products, loading } = state ?? {};
  const dispatch = useDispatch();

  if (!products.length) {
    dispatch(fetchAllProducts());
  }

  let filteredProducts =
    category && category !== "all"
      ? products.filter((prod) => prod.category == category)
      : products;

  filteredProducts = searchTerm
    ? filteredProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  function addProductToCart(product) {
    // dispatch an acction
    Alert({ msg: "Added to cart", time: 1500, icon: "success" });

    dispatch(addToCart({ product, quantity: 1 }));
  }

  if (state.loading) {
    return (
      <Backdrop
        sx={{
          color: theme.palette.primary.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={state.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid sx={{ zIndex: -10 }} container spacing={4}>
        {filteredProducts?.map(
          ({ title, id, description, price, rating, image }) => {
            return (
              <Grid key={id} item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: theme.spacing(2, 0),
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    alt={title}
                    sx={{
                      alignSelf: "center",
                      width: theme.spacing(25),
                      height: theme.spacing(25),
                      objectFit: "contain",
                      pt: theme.spacing(),
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {title}
                    </Typography>

                    <Typography
                      paragraph
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {description}
                    </Typography>
                    <Typography paragraph fontSize="large">
                      {price}
                    </Typography>
                    <Rating
                      readOnly
                      precision={0.5}
                      value={rating.rate}
                    ></Rating>
                  </CardContent>
                  <CardActions
                    sx={{
                      alignSelf: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() =>
                        addProductToCart({
                          title,
                          id,
                          description,
                          price,
                          rating,
                          image,
                        })
                      }
                    >
                      <ShoppingCartSharp />
                      Add To Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          }
        )}
      </Grid>
    </Container>
  );
}

export default Home;
