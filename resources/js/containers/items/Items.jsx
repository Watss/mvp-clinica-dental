import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { makeStyles, Container, Paper, Box, Grid, Button, Fab, Tooltip, Typography } from '@material-ui/core';
import axiosInstance from '../../utils/axios';
import ListItems from '../../components/items/ListItems';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme) => ({
    formUser: {

        padding: 15
    },
    paperFormUser: {
        width: '27em',
    },
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(0)
    },
    container: {
        paddingLeft: 70,
        paddingRight: 70
    },

   
    fab: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
        background: 'white'
    },
}));

const Items = () => {

    const classes = useStyles();

    return (
        <Page className={classes.root} title="ListItems">
            <Tooltip title="Nuevo dentista" placement="bottom">
                <Fab color="inherit" size="medium" aria-label="add" className={classes.fab} component={Link} to="/items/create">
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Container className={classes.container}>
                <Paper elevation={0}>

                    <ListItems></ListItems>

                </Paper>
            </Container>
        </Page >

    );
}

export default Items;