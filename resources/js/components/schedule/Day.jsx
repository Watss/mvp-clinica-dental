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

    const { name, DoesNotAttend,value,data} = props
    const classes = useStyles()
    const [does_not_attend, setDoesNotAttend] = useState(DoesNotAttend)
    const [firtsHourSelected, setFirtsHourSelected] = useState(false)
    const [dayCompleted, setDayCompleted] = useState(false)


    const [workDay, setWorkDay] = useState({
        start_work: "09:30",
        end_work: "17:00"
    })

    const [schedule, setSchedule] = useState({
        day_name: name,
        start_work: "",
        end_work: "",
        launch_time: false,
        start_launch_time: "",
        end_launch_time: "",
        work: false,

    })

    useEffect(()=>{
        console.log(data);
    },[])

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
                start_work = schedule.start_work === "" ? moment(workDay.start_work, 'HH:mm') : moment(schedule.start_work, 'HH:mm')
                end_work = schedule.end_work === "" ? moment(workDay.end_work, 'HH:mm') : moment(schedule.end_work, 'HH:mm')

                break
            case "end_launch_time":

                start_work = schedule.start_launch_time === "" ? moment(workDay.start_work, 'HH:mm') : moment(schedule.start_launch_time, 'HH:mm')
                end_work = moment(schedule.end_work, 'HH:mm')
                break
            default:
                break
        }


        let current_time = start_work

        while (current_time < end_work) {

            let time = current_time.add(30, 'minutes')

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


    const handleChangeTime = (time, type) => { // No pudimos ejecutar dos setSchedule

        let newSchedule = { ...schedule };

        if (type === 'start_work') {  // restable el select 'end work' cuando la hora de de inicio es sekleccionada
            newSchedule = { ...newSchedule, end_work: "" };

        }
        if (type === 'start_launch_time') {  // restable el select 'end launch time' cuando la hora de de inicio es sekleccionada
            newSchedule = { ...newSchedule, end_launch_time: "" };

        }


        let target_schedule = { ...newSchedule, [type]: time }


        setSchedule(target_schedule)

        if(isSheduleComplete(schedule)){ // Verifica si hay un dia completado

           setDayCompleted(true)
        }


        props.onChange(target_schedule,dayCompleted,value)
    };


    const isSheduleComplete = (schedule)=>{

        if(schedule.start_work === "" || schedule.end_work === "" || schedule.start_launch_work === ""  || schedule.end_launch_work === ""  ){
            return false
        }else{
            return true
        }


    }


    // 00000008  start_launch_time
    return (

        <Paper className={!schedule.work ? classes.paper : classes.paperDisabled} elevation={1}  >
            <Box fontFamily="fontFamily" fontSize="h6.fontSize" mb={2} className={schedule.work ? classes.titleDisabled : ""}>{schedule.day_name}</Box>

            <TextFieldHour type="start_work" label="Inicio"  work={schedule.work} ChangeTime={handleChangeTime} inputValue={schedule.start_work} listHours={getRangeHours('start_work')}></TextFieldHour>
            <TextFieldHour type="end_work" label="Fin" work={schedule.work} ChangeTime={handleChangeTime} inputValue={schedule.end_work} listHours={getRangeHours('end_work')}></TextFieldHour>
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
            <TextFieldHour type="start_launch_time" label="Inicio " launchTime={schedule.launch_time}  work={schedule.work} ChangeTime={handleChangeTime} inputValue={schedule.start_launch_time} listHours={getRangeHours('start_launch_time')}></TextFieldHour>
            <TextFieldHour type="end_launch_time" label="Fin" launchTime={schedule.launch_time} work={schedule.work} ChangeTime={handleChangeTime} inputValue={schedule.end_launch_time} listHours={getRangeHours('end_launch_time')}></TextFieldHour>
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
