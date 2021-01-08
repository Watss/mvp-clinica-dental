import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { makeStyles, Container, Paper, Box, Grid, Button, Fab, Tooltip } from '@material-ui/core';
import axiosInstance from '../../utils/axios';
import ListPatients from '../../components/patients/ListPatients';
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

    Avatar: {
        background: theme.palette.secondary.main

    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
        background: 'white'
    },
    'listItem': {
        '&:hover' : {
            borderRadius: '50px'
        }

    }
}));

const Dentist = () => {

    const classes = useStyles();
    const [dentists, setDentists] = useState([])



    useEffect(() => {

        async function fetchDentists() {

            try {
                const res = await axiosInstance.get('dentists')
                const { data } = res.data
                setDentists(data)


            } catch (error) {

            }


        }
        fetchDentists()


    }, [])

    return (
        <Page className={classes.root} title="ListPatients">
            <Tooltip title="Nuevo dentista" placement="bottom">
                <Fab color="inherit" size="medium" aria-label="add" className={classes.fab} component={Link} to="/patients/create">
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Container className={classes.container}>
                <Paper elevation={0}>
                    <Container>
                        <Grid container>

                            <Grid item container lg={6} container
                                direction="row"
                                justify="flex-end"
                                alignItems="center"
                            >
                            </Grid>
                        </Grid>
                    </Container>



                    <ListPatients classes={classes} dentists={dentists}></ListPatients>
                </Paper>
            </Container>
        </Page >

    );
}

export default Dentist;
