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
    const [nameSchedule, setNameSchedule] = useState("")
    const [showDialogCopyDays, setShowDialogCopyDays] = useState(false)
    const [dayCompleted, setDayCompleted] = useState(null)


    const handleChange = (scheduleDay, completed, valueDay) => {

        if (completed && dayCompleted === null) {

            setDayCompleted(valueDay)

            setShowDialogCopyDays(true)
        }

        const target_schedule = { ...schedule, [scheduleDay.day_name]: scheduleDay }

        setSchedule(target_schedule);

    };

    const handleSubmit = () => { };

    const handleAcceptDialog = (daysSelected) => {

        let daysSelectedChecked = getDaySelected(daysSelected); // Devuelve checked seleccionados

        let objectDaySelected = daysSelected.find(day => day.id === dayCompleted) // Busca el objeto del dia completado

        let objectToCopy = Object.values(schedule).find(day => day.day_name === objectDaySelected.name) // Obtiene el objeto a copiar


        const dayCopied = daysSelectedChecked.reduce((acc, day) => { // Crea copias del dia seleccionado por primera vez
            return { ...acc, [day.name]: { ...objectToCopy, day_name: day.name } }
        }, {})

        setSchedule({ ...schedule, ...dayCopied })


        setShowDialogCopyDays(false)

    }


    const getDaySelected = (arr) => {
        return arr.filter(dia => (dia.checked && dia.id))
    }

    const indexedSchedule = Object.entries(schedule).length === 0 && Object.values(schedule).reduce((acc, el) => ({...acc,[el.day_name] : el}),{})

    console.log(indexedSchedule("Lunes"));

    const classes = useStyles()

    return (
        <Page className={classes.root} title="CreateSchedule" >

            <Container className={classes.container} >
                <Grid container spacing={1}>
                    <Grid item lg={12}>

                        <Box mt={2} mb={2}>
                            <TextField className={classes.nameTextField} onChange={(event) => setNameSchedule(event.target.value)} value={nameSchedule} id="outlined-basic" label="Agregar nombre" color="secondary" />
                        </Box>

                    </Grid>
                    <Grid item container lg={12} md={12} mt={5} spacing={1} >
                        <Grid item lg={2} md={2} >
                            <Day name="Lunes" onChange={handleChange} value={0}  ></Day>
                        </Grid>
                        <Grid item lg={2} md={2}>
                            <Day name="Martes" onChange={handleChange} value={1}  ></Day>
                        </Grid>
                        <Grid item lg={2} md={2}>
                            <Day name="Miercoles" onChange={handleChange} value={2}   ></Day>
                        </Grid>
                        <Grid item lg={2} md={2}>
                            <Day name="Jueves" onChange={handleChange} value={3} ></Day>
                        </Grid>
                        <Grid item lg={2} md={2}>
                            <Day name="Viernes" onChange={handleChange} value={4} ></Day>
                            <Grid item lg={2} md={2}>
                                <Day name="Sábado" onChange={handleChange} value={5} ></Day>
                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item lg={12} mt={12} container alignItems="flex-end" justify="flex-end" >

                        <Button color="secondary" variant="contained" size="small" onClick={handleSubmit}>Guardar</Button>

                    </Grid>

                </Grid>

            </Container>

            <DialogRepeatDay show={showDialogCopyDays} AcceptDialog={handleAcceptDialog} dayCompleted={dayCompleted}></DialogRepeatDay>
        </Page>

    );
}

export default CreateSchedule;
