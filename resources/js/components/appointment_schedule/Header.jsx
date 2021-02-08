import React from 'react';
import { Box, Button, makeStyles, Menu, MenuItem } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

}));

const Header = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box className={classes.root} display="flex"  flexDirection="row-reverse"  ml={3} mr={3}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Mostrar vista seleccionada
      </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Dia</MenuItem>
                <MenuItem onClick={handleClose}>Mes</MenuItem>

            </Menu>
        </Box>
    );
};

export default Header;
