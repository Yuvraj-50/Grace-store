import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth } from "../firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { NavLink, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../utlis";

function Login() {
  const theme = useTheme();
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    const { email, password } = e.target;
    try {
      Alert({ msg: "Sign In successfully", time: 1500, icon: "success" });
      await signIn(email.value, password.value);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (user != null) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
  }));

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, background: theme.palette.secondary.main }}>
          <LockIcon></LockIcon>
        </Avatar>
        <Typography component={"h1"} variant="h5">
          Sign In
        </Typography>
        <form onSubmit={login} sx={{ width: "100%", mt: 1 }}>
          <TextField
            label="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoFocus
            autoComplete="off"
            type={"email"}
          ></TextField>
          <TextField
            label="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            autoComplete="current-password"
            type={"password"}
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{ m: theme.spacing(3, 0, 2) }}
          >
            Sign In
          </Button>

          <Grid container justifyContent="center">
            <Grid item sx={{ display: "flex", gap: 2 }}>
              <Typography>New User?</Typography>
              <StyledLink variant="body2" to="/register">
                Sign up
              </StyledLink>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
