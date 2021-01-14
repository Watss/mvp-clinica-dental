import React, { useEffect, useState } from 'react';
import TextFieldHour from '../schedule/TextFieldHours'
import { Grid, makeStyles, Paper, TextField, Box, Checkbox, FormControlLabel, FormControl, InputLabel, Select, Button } from '@material-ui/core';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 15
    },
    paperDisabled: {
        padding: 15,
        background: "#f7f7f7"
    },
    titleDisabled: {
        color: "#00000052"
    }
}));

const Day = (props) => {

    const { name, DoesNotAttend } = props
    const classes = useStyles()
    const [does_not_attend, setDoesNotAttend] = useState(DoesNotAttend)
    const [firtsHourSelected, setFirtsHourSelected] = useState(false)


    const [workDay, setWorkDay] = useState({
        start_work: "09:30",
        end_work: "17:00"
    })

    const [schedule, setSchedule] = useState({
        day_name: name,
        start_work: "",
        end_work: "",
        launch_time: false,
        start_lauch_time: "",
        end_lauch_time: "",
        work: false,

    })




    const handleChangeChecked = (event) => {

        const target_schedule = { ...schedule, [event.target.name]: event.target.name === "work" ? !schedule.work : !schedule.launch_time }
        setSchedule(target_schedule)
        props.onChange(target_schedule)
    };

    console.log(schedule);




    const handleChangeTime = (time, type) => {

        let newSchedule = { ...schedule };

        if (type === 'start_work') {
            newSchedule = { ...newSchedule, end_work: "" };

        }

        const target_schedule = { ...newSchedule, [type]: time }

        setSchedule(target_schedule)




        props.onChange(target_schedule)








    };


    // 00000008  start_launch_time
    return (

        <Paper className={!schedule.work ? classes.paper : classes.paperDisabled} elevation={1}  >
            <Box fontFamily="fontFamily" fontSize="h6.fontSize" mb={2} className={schedule.work ? classes.titleDisabled : ""}>{schedule.day_name}{schedule.end_work}</Box>
            <TextFieldHour interval={10} type="start_work" label="Inicio" work={schedule.work} ChangeTime={handleChangeTime} work_day={workDay} schedule={schedule}  ></TextFieldHour>
            <TextFieldHour interval={10} type="end_work" label="Termino" work={schedule.work} ChangeTime={handleChangeTime} work_day={workDay} schedule={schedule} ></TextFieldHour>
            <FormControlLabel
                control={
                    <Checkbox
                        disabled={schedule.work}
                        checked={!schedule.launch_time}
                        onChange={handleChangeChecked}
                        name="launch_time"
                        color="secondary"
                    />
                }
                label="Descanso"
            />
            <TextFieldHour interval={10} type="start_launch_time" label="Inicio" work={schedule.work} ChangeTime={handleChangeTime} work_day={workDay} schedule={schedule}  ></TextFieldHour>
            <TextFieldHour interval={10} type="end_launch_time" label="Termino" work={schedule.work} ChangeTime={handleChangeTime} work_day={workDay} schedule={schedule} ></TextFieldHour>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={schedule.work}
                        onChange={handleChangeChecked}
                        name="work"
                        color="secondary"
                    />
                }
                label="No atiende"
            />


        </Paper>
    );
}

export default Day;
