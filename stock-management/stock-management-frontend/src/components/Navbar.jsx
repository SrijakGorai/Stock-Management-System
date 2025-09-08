import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { isAdmin, logout, getToken } from "../auth";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLoggedIn = getToken();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleClose();
  };

  const loggedInLinks = [
    { label: "Dashboard", path: "/dashboard" },
    ...(isAdmin()
      ? [
          { label: "Add Material", path: "/add" },
          { label: "Issue Material", path: "/issue" },
          { label: "Remaining Material", path: "/remaining" },
        ]
      : []),
    { label: "Logout", action: handleLogout },
  ];

  const guestLinks = [
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ];

  const links = isLoggedIn ? loggedInLinks : guestLinks;

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, color: "white", fontWeight: 600 }}
        >
          Stock Management
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenu}>
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {links.map((link, idx) => (
                <MenuItem
                  key={idx}
                  onClick={() => {
                    handleClose();
                    if (link.path) navigate(link.path);
                    else if (link.action) link.action();
                  }}
                >
                  {link.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <>
            {links.map((link, idx) =>
              link.path ? (
                <Button
                  key={idx}
                  color="inherit"
                  onClick={() => navigate(link.path)}
                  sx={{ color: "white" }}
                >
                  {link.label}
                </Button>
              ) : (
                <Button
                  key={idx}
                  color="inherit"
                  onClick={link.action}
                  sx={{ color: "white" }}
                >
                  {link.label}
                </Button>
              )
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
