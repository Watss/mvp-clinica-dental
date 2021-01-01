import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {Link} from "react-router-dom";
import {
  AppBar,
  Box,
  Menu,
  MenuItem,
  Toolbar,
  makeStyles,
  Typography,
  IconButton,
  Avatar,
  Button
} from '@material-ui/core';
import { AccountCircle, Height } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {},

  logoColor: {
    color: theme.palette.text.logo
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    padding: 0,
    width: 34,
    height: 34
  },
  iconButtonAvatar: {
    padding: 0
  },
  listMenu: {
    marginLeft: 30
  },
  listMenuLink: {
    marginLeft: 2,
    marginRight:2
  }


}));

const TopBar = ({
  className,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={1}
      color="primary"
    >
      <Toolbar variant="dense">
        <RouterLink to="/">
          <Typography color="error" className={classes.logoColor} variant="h6">DentaCloud</Typography>
        </RouterLink>
        <Box className={classes.listMenu}>
          <Button size="small" color="inherit" disableElevation className={classes.listMenuLink}>Agenda</Button>
          <Button size="small" color="inherit" disableElevation className={classes.listMenuLink}>Pacientes</Button>
          <Button size="small" color="inherit" disableElevation className={classes.listMenuLink} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} endIcon={<ExpandMoreIcon />}>Administración</Button>
          <Menu
            elevation={1}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/dentist" onClick={handleClose}>Odonotologos</MenuItem>
          </Menu>
        </Box>


        <Box flexGrow={1} />

        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            className={classes.iconButtonAvatar}
            color="inherit"

          >
            <Avatar className={classes.avatar}>N</Avatar>
          </IconButton>
          
        </div>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;