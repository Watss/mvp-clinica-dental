import React, { useEffect, useState } from 'react';

import { makeStyles, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import moment from 'moment'
import { Schedule } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: 10,
        marginBottom: 10
    }
}));

const TextFieldHour = (props) => {

    const {
        interval,
        label,
        type,
        launch_time,
        work,
        work_day,
        schedule
    } = props

    const [listHours, setListHours] = useState([]);
    const [timeSelected, setTimeSelected] = useState("");
    const classes = useStyles()


    useEffect(() => {
        setListHours(setListHourStart(interval))
    }, [schedule])



    /**
     *    Si no hay hora seleccionada , comoenzara desde la hora que viene por el sistema
     *
     *    {
     *        start_work : "09:30",
     *       end_work : "17:00"
     *    }
     *    TODO : En el proximo spring se debe obtener la hora desde el backend
     */
    const setListHourStart = () => { // Genera un listado de horas dado un intervalo, hora inicio y fin


        var start_work = undefined
        var end_work = undefined

        switch (type) {

            case "start_work":
                start_work = moment(work_day.start_work, 'HH:mm')
                end_work = moment(work_day.end_work, 'HH:mm')
                break

            case "end_work":
                start_work = schedule.start_work === "" ? moment(work_day.start_work, 'HH:mm') : moment(schedule.start_work, 'HH:mm')
                end_work = moment(work_day.end_work, 'HH:mm')
                break
            case "start_launch_time":
                start_work = moment(work_day.start_work, 'HH:mm')
                end_work = moment(work_day.end_work, 'HH:mm')

                break
            case "end_launch_time":

                start_work = schedule.start_launch_time === "" ? moment(work_day.start_work, 'HH:mm') : moment(schedule.start_launch_time, 'HH:mm')
                end_work = moment(work_day.end_work, 'HH:mm')
                break
            default:
                break
        }

        let hours = []
        var current_time = start_work

        while (current_time < end_work) {

            const time = current_time.add(30, 'minutes')

            current_time = time

            hours.push(moment(time))
        }

        return hours

    }



    const handleChange = event => {


        setTimeSelected(event.target.value);
        props.ChangeTime(event.target.value, type)

    }




    return (
        <FormControl variant="outlined" className={classes.formControl} fullWidth size="small">
            <InputLabel id="demo-simple-select-outlined-label" color={'secondary'}>{label}</InputLabel>
            <Select
                disabled={work || launch_time ? true : false}
                fullWidth
                labelId="demo-simple-select-outlined-label"
                id={`select-hour-${type}`}
                value={timeSelected}
                onChange={handleChange}
                onClick={setListHourStart}
                label="time"
                color={"secondary"}

            >
                <MenuItem value="" >
                    <em>None</em>
                </MenuItem>
                {listHours.map((hour, index) => {
                    return <MenuItem key={index} value={hour.format('h:mm a')}>{hour.format('h:mm a')}</MenuItem>
                })}


            </Select>
        </FormControl>

    );
}

export default TextFieldHour;
