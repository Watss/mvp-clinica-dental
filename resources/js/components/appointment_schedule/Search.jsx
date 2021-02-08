import React from 'react';
import { Box, Button, makeStyles, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

}));

const Search = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root} m={2} >
           <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" size="small"/>

        </Box>
    );
};

export default Search;
