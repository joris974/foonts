import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1
  }
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
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
