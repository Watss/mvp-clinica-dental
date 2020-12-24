import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Menu,
  MenuItem,
  Toolbar,
  makeStyles,
  Typography,
  IconButton
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  },
  logoColor : {
    color: theme.palette.text.logo
  }
}));

const TopBar = ({
  className,
}) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={3}
    >
      <Toolbar variant="dense">
        <RouterLink to="/">
            <Typography color="error" className={classes.logoColor} variant="h5">{process.env.MIX_REACT_APP_NAME}</Typography>
        </RouterLink>
        <Box flexGrow={1} />

        <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                
              >
                <MenuItem >Profile</MenuItem>
                <MenuItem >My account</MenuItem>
              </Menu>
            </div>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;