import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, makeStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({

    Avatar: {
        background: theme.palette.secondary.main

    },
    'listItem': {
        '&:hover' : {
            borderRadius: '50px'
        }

    }
}));

const ItemDentist = ({item}) => {
    
    const classes = useStyles();
    moment.locale("es");
    return (

        <ListItem button className={classes.listItem}>
            <ListItemAvatar>
                <Avatar className={classes.Avatar} >{item.attributes.name.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText secondary={'Valor: $'+ item.attributes.price}>{item.attributes.name}</ListItemText>
            <ListItemSecondaryAction>
                <IconButton disabled>
                    <MoreVertIcon fontSize="small"></MoreVertIcon>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>


    );
}

export default ItemDentist;