import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { maxWidth } from "@mui/system";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useAuth } from "../firebase/auth";

function Register() {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
  }));

  async function registerUser(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      await signUp(data.get("email"), data.get("password"), data.get("name"));
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (user != null) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component={"h1"} variant="h5">
          Sign Up
        </Typography>
        <Box component={"form"} sx={{ mt: 3 }} onSubmit={registerUser}>
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <TextField
                name="name"
                id="name"
                autoFocus
                label="Your Name"
                fullWidth
                required
                autoComplete="given-name"
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="email"
                id="email"
                label="Email"
                fullWidth
                required
                autoComplete="email"
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="password"
                id="password"
                label="password"
                fullWidth
                required
                type="password"
                autoComplete="new-password "
              ></TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

          <Grid container justifyContent="center">
            <Grid item sx={{ display: "flex", gap: 2 }}>
              <Typography>Already have an account?</Typography>
              <StyledLink variant="body2" to="/login">
                Sign in
              </StyledLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
