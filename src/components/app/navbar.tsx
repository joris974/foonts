import React from "react";
import { NavLink as RouterLink } from "react-router";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Foonts
        </Typography>
        <Button color="inherit" component={RouterLink} to="/generate">
          Generate
        </Button>
        <Button color="inherit" component={RouterLink} to="/explore/recent">
          Explore
        </Button>
        <Button color="inherit" component={RouterLink} to="/fonts">
          Fonts
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
