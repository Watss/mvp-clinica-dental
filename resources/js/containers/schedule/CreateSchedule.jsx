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
    },
    resize: {
        fontSize: 23
    }
}));



const CreateSchedule = () => {


    const [schedule, setSchedule] = useState([])
    const [nameSchedule, setNameSchedule] = useState("")
    const [showDialogCopyDays, setShowDialogCopyDays] = useState(false)
    const [dayCompleted, setDayCompleted] = useState(null)
    const [daysEnabled, setDaysEnabled] = useState([0, 1, 2, 3, 4, 5]) //TODO : Obtener los dias de trabajo desde la configuración de la aplicación

    useEffect(() => {
        console.log(schedule)
        setSchedule(loadDaysSchedule(daysEnabled))

    }, [])

    const targetNameDay = (day) => {
        switch (day) {
            case 0: return "Lunes"; break
            case 1: return "Martes"; break
            case 2: return "Miércoles"; break
            case 3: return "Jueves"; break
            case 4: return "Viernes"; break
            case 5: return "Sábado"; break
            case 6: return "Domingo"; break
        }

        return daySelected
    }

    const loadDaysSchedule = (daysEnabled) => {

        let target_schedule = daysEnabled.reduce((acc, day) => {
            return [...acc, {
                id: day,
                day_name: targetNameDay(day),
                start_work: "",
                end_work: "",
                launch_time: false,
                start_launch_time: "",
                end_launch_time: "",
                work: false,
            }]
        }, [])

        return target_schedule
    }

    const handleChange = (scheduleDay, completed, valueDay, id) => {

        if (completed && dayCompleted === null) {

            setDayCompleted(id)

            setShowDialogCopyDays(true)
        }

        let tempSchedule = [...schedule];

        let tempItemSchedule = { ...tempSchedule[id] };

        tempItemSchedule = { ...scheduleDay }

        tempSchedule[id] = tempItemSchedule

        setSchedule(tempSchedule)


    };

    /**
     * Realiza una copia del primer dia completado a los demas dias.
     */
    const handleAcceptDialog = (daysSelected) => {


        let daysSelectedChecked = daysSelected.filter(dia => (dia.checked && dia.id)) // Devuelve checked seleccionados

        let daysSelectedNotChecked = daysSelected.filter(dia => (!dia.checked && dia.id)) // Devuelve checked  no seleccionados

        let objectDaySelected = daysSelected.find(day => day.id === dayCompleted) // Busca el objeto del dia completado

        let objectToCopy = Object.values(schedule).find(day => day.id === objectDaySelected.id) // Obtiene el objeto a copiar

        const daysNotSelected = daysSelectedNotChecked.reduce((acc, day) => {
            return [...acc, {
                ...objectToCopy, day_name: day.name, id: day.id, start_work: "",
                end_work: "",
                launch_time: false,
                start_launch_time: "",
                end_launch_time: "",
                work: false,
            }]
        }, [])

        const daysCopied = daysSelectedChecked.reduce((acc, day) => { // Crea copias del dia seleccionado por primera vez
            return [...acc, { ...objectToCopy, day_name: day.name, id: day.id, copied: false, }]
        }, [objectToCopy])

        setSchedule(daysCopied.concat(daysNotSelected))


        setShowDialogCopyDays(false)

    }

    const handleSubmit = () => { };

    const renderSchedule = schedule.map((day, index) => {
        return <Grid key={index} item lg={2} md={2} >
            <Day id={index} name={day.day_name} onChange={handleChange} schedule={day}  ></Day>
        </Grid>
    })

    const classes = useStyles()

    return (
        <Page className={classes.root} title="CreateSchedule" >

            <Container className={classes.container} >
                <Grid container spacing={1}>
                    <Grid item lg={12}>

                        <Box mt={2} mb={2}>
                            <TextField InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                            }} className={classes.nameTextField} onChange={(event) => setNameSchedule(event.target.value)} value={nameSchedule} id="outlined-basic" label="Agregar nombre" color="secondary" />
                        </Box>

                    </Grid>
                    <Grid item container lg={12} md={12} mt={5} mb={20} spacing={1} >
                        {renderSchedule}
                    </Grid>
                    <Grid item lg={12} mt={13} alignItems="flex-end" justify="flex-end" >
                        <Box mt={5} p={0}>
                            <Button disabled disableElevation color="secondary" variant="contained" size="small" onClick={handleSubmit} fullWidth>Guardar</Button>
                        </Box>


                    </Grid>

                </Grid>

            </Container>

            <DialogRepeatDay show={showDialogCopyDays} AcceptDialog={handleAcceptDialog} dayCompleted={dayCompleted}></DialogRepeatDay>
        </Page>

    );
}

export default CreateSchedule;
