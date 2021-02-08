import React from 'react';
import { ListItem, List, makeStyles, ListItemIcon, Avatar, ListItemText, ListItemSecondaryAction, Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

}));

const Appointment = () => {
    const classes = useStyles();

    return (


        <ListItem>
            <ListItemIcon>
                <Avatar variant="rounded" >C</Avatar>
            </ListItemIcon>
            <ListItemText primary="Nombre de paciente" secondary="datos secundarios"></ListItemText>
            <ListItemSecondaryAction >
                <Box display="flex" >
                    <Box pl={2} ml={2}>Nombre del doctor</Box>
                    <Box pl={2} ml={2}>Estado de cita </Box>
                    <Box pl={2} ml={2}> Diagnostico</Box>
                </Box>

            </ListItemSecondaryAction>
        </ListItem>


    );
};

export default Appointment;
