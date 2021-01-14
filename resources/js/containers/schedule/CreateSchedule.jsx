import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { makeStyles, Container, Paper, Box, Grid, Button, Fab, Tooltip, DialogActions, DialogContentText, DialogContent, DialogTitle, Dialog, TextField } from '@material-ui/core';
import axiosInstance from '../../utils/axios';
import ListDentist from '../../components/dentist/ListDentist';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import Day from '../../components/schedule/Day';
import DialogRepeatDay from '../../components/schedule/DialogRepeatDay'
import moment from 'moment'


const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: 70,
        paddingRight: 70
    },
    nameTextField: {
        width: "28em"
    }
}));



const CreateSchedule = () => {

    const [open, setOpen] = useState(false);
    const [schedule, setSchedule] = useState({})
    const [showInputEditName, setShowInputEditName] = useState(false)
    const [nameSchedule, setNameSchedule] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (scheduleDay) => {

        setShowInputEditName(false)
        const target_schedule = { ...schedule, [scheduleDay.day_name]: scheduleDay }
        console.log(target_schedule);
        setSchedule(target_schedule)

    };

    const handleSubmit = () => {


    };


    const classes = useStyles()

    return (
        <Page className={classes.root} title="CreateSchedule" >

            <Container className={classes.container} >
                <Grid container spacing={1}>
                    <Grid item lg={12}>
                        {showInputEditName &&

                            <Box mt={2} mb={2}>
                                <TextField className={classes.nameTextField} onChange={(event) => setNameSchedule(event.target.value)} value={nameSchedule} id="outlined-basic" label="Nombre horario" variant="outlined" size="small" />
                            </Box>
                        }

                        {!showInputEditName &&
                            <Box onClick={() => setShowInputEditName(true)} fontSize="h6.fontSize" fontWeight="medium" fontFamily="fontFamily" mt={2} mb={2}>
                                { nameSchedule ? nameSchedule :  (`Presione para ingresar el nombre del horario ` )}
                            </Box>
                        }


                    </Grid>
                    <Grid item container lg={12} md={12} mt={5}>
                        <Grid item lg={2} md={2}>
                            <Day name="Lunes" onChange={handleChange} ></Day>
                        </Grid>



                    </Grid>
                    <Grid item lg={12} mt={12} container alignItems="flex-end" justify="flex-end" >

                        <Button color="secondary" variant="contained" size="small" onClick={handleSubmit}>Guardar</Button>

                    </Grid>

                </Grid>

            </Container>

            <DialogRepeatDay></DialogRepeatDay>
        </Page>

    );
}

export default CreateSchedule;
