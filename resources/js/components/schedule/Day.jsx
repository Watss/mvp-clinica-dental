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


    const getRangeHours = (type) => {

            let hours = [];
            var start_work = undefined
            var end_work = undefined
    
            switch (type) {
    
                case "start_work":
                    start_work = moment(workDay.start_work, 'HH:mm')
                    end_work = moment(workDay.end_work, 'HH:mm')
                    break
    
                case "end_work":
                    start_work = schedule.start_work === "" ? moment(workDay.start_work, 'HH:mm') : moment(schedule.start_work, 'HH:mm')
                    end_work = moment(workDay.end_work, 'HH:mm')
                    break
                case "start_launch_time":
                    start_work = moment(workDay.start_work, 'HH:mm')
                    end_work = moment(workDay.end_work, 'HH:mm')
    
                    break
                case "end_launch_time":
    
                    start_work = schedule.start_launch_time === "" ? moment(workDay.start_work, 'HH:mm') : moment(schedule.start_launch_time, 'HH:mm')
                    end_work = moment(workDay.end_work, 'HH:mm')
                    break
                default:
                    break
            }
    
            
            var current_time = start_work
    
            while (current_time < end_work) {
    
                const time = current_time.add(30, 'minutes')
    
                current_time = time
    
                hours.push(moment(time))
            }
    
            return hours
    
        
    }

    const handleChangeChecked = (event) => {

        const target_schedule = { ...schedule, [event.target.name]: event.target.name === "work" ? !schedule.work : !schedule.launch_time }
        setSchedule(target_schedule)
        props.onChange(target_schedule)
    };


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

            <TextFieldHour type="start_work" label="Inicio" work={schedule.work} ChangeTime={handleChangeTime} inputValue={schedule.start_work} listHours={ getRangeHours('start_work') }></TextFieldHour>
            <TextFieldHour type="end_work" label="Fin" work={schedule.work} ChangeTime={handleChangeTime} inputValue={schedule.end_work} listHours={ getRangeHours('end_work') }></TextFieldHour>
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
            <TextFieldHour type="start_launch_time" label="Inicio" work={schedule.work} ChangeTime={handleChangeTime} inputValue={schedule.start_launch_time} listHours={ getRangeHours('start_launch_time') }></TextFieldHour>
            <TextFieldHour type="end_launch_time" label="Fin" work={schedule.work} ChangeTime={handleChangeTime} inputValue={schedule.end_launch_time} listHours={ getRangeHours('end_launch_time') }></TextFieldHour>
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
