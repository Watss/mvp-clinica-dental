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
    color:'black'
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
    marginRight:2,

    '&:hover': {
        color: "#28a745"
     },
     '&:focus': {
        outline: "none !important"
     },

  },



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

  const settingsLinks = [
    { link: '/dentist', name: 'Odontologos'},
    { link: '/item', name: 'Prestaciones'},
  ]

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      color="inherit"
    >
      <Toolbar variant="dense">
        <RouterLink to="/">
          <Typography color="error" className={classes.logoColor} variant="h6">DentaCloud</Typography>
        </RouterLink>
        <Box className={classes.listMenu}>
          <Button size="small" color="inherit" disableElevation component={Link} to="/appointment-schedule" className={classes.listMenuLink}>Agenda</Button>
          <Button size="small" color="inherit" component={Link} to="/patients" disableElevation className={classes.listMenuLink}>Pacientes</Button>
          <Button size="small" color="inherit" disableElevation className={classes.listMenuLink} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} endIcon={<ExpandMoreIcon />}>Administración</Button>
          <Menu
            elevation={1}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {settingsLinks.map((menu,index) => (<MenuItem key={index} component={Link} to={menu.link} className={classes.listMenuLink}  onClick={handleClose}>{menu.name}</MenuItem>))}

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
