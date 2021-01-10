import React, { useEffect, useState } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment'



const ItemPatients = ({ Patients, classes }) => {

    moment.locale("es");
    return (

        <ListItem button className={classes.listItem}>
            <ListItemAvatar>
                <Avatar className={classes.Avatar} >{Patients.attributes.names.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText secondary={moment(Patients.attributes.created_at).fromNow()}>{Patients.attributes.names} {Patients.attributes.last_name}  </ListItemText>
            <ListItemSecondaryAction>
                <IconButton disabled>
                    <MoreVertIcon fontSize="small"></MoreVertIcon>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>


    );
}

export default ItemPatients;
