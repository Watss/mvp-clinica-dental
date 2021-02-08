import { Box, Container, Fab, Grid, makeStyles, Tooltip, Button } from '@material-ui/core';
import React, { useState } from 'react';
import Page from '../../components/Page';
import Picker from '../../components/appointment_schedule/Picker'
import SelectDentist from '../../components/appointment_schedule/SelectDentist'
import Filter from '../../components/appointment_schedule/Filter';
import Header from '../../components/appointment_schedule/Header';
import ViewList from '../../components/appointment_schedule/ViewList';
import Search from '../../components/appointment_schedule/Search';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";
import CreateAppointment from './CreateAppointment';
const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
        background: 'white'
    },
}));

const AppointmentSchedule = () => {

    const [openCreateAppointment, setOpenCreateAppointment] = useState(false);

    const handleClickOpen = () => {
        setOpenCreateAppointment(true);
      };



    const classes = useStyles();
    return (
        <Page className={classes.root} title="AppointmentSchedule">
            <Tooltip title="Nuevo Paciente" placement="bottom">
                <Fab color="inherit" size="medium" aria-label="add" className={classes.fab} component={Button} onClick={handleClickOpen}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Grid container>
                <Grid item lg={3}>
                    <Grid container>
                        <Grid item lg={12}><Picker></Picker></Grid>
                        <Grid item lg={12}><SelectDentist></SelectDentist></Grid>
                        <Grid item lg={12}><Filter></Filter></Grid>
                    </Grid>

                </Grid>
                <Grid item lg={9}>
                    <Grid item lg={12}><Header></Header></Grid>

                    <Grid item lg={12}><ViewList></ViewList></Grid>
                </Grid>
            </Grid>
            <CreateAppointment open={openCreateAppointment} setOpenCreateAppointment={setOpenCreateAppointment}></CreateAppointment>
        </Page>

    );
}

export default AppointmentSchedule;
