import React, { useEffect, useState } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment'



const ItemDentist = ({ dentist, classes }) => {
  
    moment.locale("es");
    return (

        <ListItem button className={classes.listItem}>
            <ListItemAvatar>
                <Avatar className={classes.Avatar} >{dentist.attributes.names.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText secondary={moment(dentist.attributes.created_at).fromNow()}>{dentist.attributes.names} {dentist.attributes.last_name}  </ListItemText>
            <ListItemSecondaryAction>
                <IconButton disabled>
                    <MoreVertIcon fontSize="small"></MoreVertIcon>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>


    );
}

export default ItemDentist;