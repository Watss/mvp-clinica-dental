import React from 'react';
import { ListItem, List, makeStyles, ListItemIcon, Avatar, ListItemText, ListItemSecondaryAction, Box } from '@material-ui/core';
import Appointment from './Appointment';


const useStyles = makeStyles((theme) => ({

}));

const ViewList = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root} mr={2}>
            <List>
                <Appointment></Appointment>
                <Appointment></Appointment>
                <Appointment></Appointment>
                <Appointment></Appointment>
                <Appointment></Appointment>
            </List>
        </Box>
    );
};

export default ViewList;
