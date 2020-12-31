import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { makeStyles, Container, Paper, Box, Grid, Button } from '@material-ui/core';
import axiosInstance from '../../utils/axios';
import ListDentist from '../../components/dentist/ListDentist';
import {Link} from "react-router-dom";

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
        <Page className={classes.root} title="ListeDentist">
            <Container className={classes.container}>
                <Paper>
                    <Container>
                        <Grid container>
                            <Grid item lg={6}><Box fontSize="h5.fontSize" fontWeight="medium" fontFamily="fontFamily" mt={5} mb={5}>Odontologos</Box></Grid>
                            <Grid item container lg={6} container
                                direction="row"
                                justify="flex-end"
                                alignItems="center"
                            >
                                 <Button component={Link} to="/dentist/create" type="button" size="small" color={'secondary'} variant="contained" disableElevation >Registrar odontologo</Button>
                            </Grid>
                        </Grid>
                    </Container>



                    <ListDentist classes={classes} dentists={dentists}></ListDentist>
                </Paper>
            </Container>
        </Page>

    );
}

export default Dentist;