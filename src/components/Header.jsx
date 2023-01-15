import Autocomplete from "@mui/material/Autocomplete";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useEffect, useState } from "react";
import { Box, color } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Alert, getItemsCount } from "../utlis";
import { styled, alpha } from "@mui/material/styles";
import { fetchAllCategories } from "../features/category-slice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../firebase/auth";
import { Menu } from "@mui/material";
import { HorizontalRule } from "@mui/icons-material";
import Swal from "sweetalert2";

const Search = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  background: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    background: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  border: "none",
  "& .MuiTextfield-root": {
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
  },
  "& .MuiInputBase-input": {
    color: theme.palette.common.white,
  },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& .MuiSvgIcon-root": { color: theme.palette.common.white },
}));

const SearchIconWrapper = styled("section")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: "0",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center ",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
}));

function SearchBar() {
  const products = useSelector((state) => state.products.value);
  const categories = useSelector((state) => state.categories?.value);
  const dispatch = useDispatch();
  const [selectedCategory, SetselectedCategory] = useState("");
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchTerm = searchParams.get("searchTerm");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    SetselectedCategory(category ? category : "all");
  }, [category]);

  if (!categories.length) {
    dispatch(fetchAllCategories());
  }

  function handleCategoryChange(e) {
    const value = e.target.value;
    navigate(
      value === "all"
        ? "/"
        : `/?category=${value}${searchTerm ? "&seachTerm" + searchTerm : ""}`
    );
  }

  function handleSearchChange(searchText) {
    if (searchText) {
      navigate(
        selectedCategory == "all"
          ? `/?searchTerm=${searchText}`
          : `/?category=${selectedCategory}&searchTerm=${searchText}`
      );
    } else {
      navigate(
        selectedCategory == "all" ? "/" : `/?category=${selectedCategory}`
      );
    }
  }
  return (
    <Search>
      <Select
        value={selectedCategory}
        size="small"
        sx={{
          m: 1,
          textTransform: "capitalize",
          "&": {
            "::before": {
              ":hover": {
                border: "none",
              },
            },

            "::before , &::after": {
              border: "none",
            },
            ".MuiSelect-standard": {
              color: "common.white",
            },
            ".MuiSelect-icon": { color: "common.white" },
          },
        }}
        variant="standard"
        labelId="selected-category"
        id="selected-category-id"
        onChange={handleCategoryChange}
      >
        <MenuItem sx={{ textTransform: "capitalize" }} value="all">
          all
        </MenuItem>

        {categories.map((category) => (
          <MenuItem
            sx={{ textTransform: "capitalize" }}
            key={category}
            value={category}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
      <StyledAutocomplete
        freeSolo
        id="selected-product"
        onChange={(e, value) => handleSearchChange(value?.label)}
        disablePortal
        sx={{ width: "90%" }}
        options={Array.from(
          selectedCategory == "all"
            ? products
            : products.filter((prod) => prod.category == selectedCategory),
          (prod) => ({
            id: prod.id,
            label: prod.title,
          })
        )}
        renderInput={(params) => <TextField {...params} />}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
}

function Header() {
  const cartItems = useSelector((state) => state.cart?.value);
  const count = getItemsCount(cartItems);
  const navigate = useNavigate();
  const { user, signOutUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const IsMenuOpen = Boolean(anchorEl);

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleProfileMenuOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  async function handleLogout() {
    try {
      Alert({ msg: "Signed out successfully", time: 1500, icon: "success" });
      await signOutUser();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="user-profile-menu"
      keepMounted
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={IsMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>MyAccount</MenuItem>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );

  function navigateToCart() {
    navigate("/cart");
  }

  function navigateToLogin() {
    navigate("/login");
  }

  return (
    <>
      <AppBar position="sticky" sx={{ py: 1, zIndex: 10 }}>
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          <Typography variant="h6" color="inherit">
            <StyledLink to="/">Grace Store</StyledLink>
          </Typography>
          <SearchBar />
          <Box sx={{ display: { md: "flex" } }}>
            <IconButton
              onClick={navigateToCart}
              size="large"
              aria-label="shows card items count"
              color="inherit"
            >
              <Badge badgeContent={count > 9 ? "9+" : count} color="error">
                <ShoppingCartIcon></ShoppingCartIcon>
              </Badge>
            </IconButton>
          </Box>
          {user ? (
            <Button onClick={handleProfileMenuOpen} color="inherit">
              {user.displayName ?? user.email}
            </Button>
          ) : (
            <Button onClick={navigateToLogin} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
}
export default Header;
