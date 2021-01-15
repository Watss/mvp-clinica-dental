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
        listHours,
        type,
        inputValue,
        label,
        work
    } = props

    const classes = useStyles()

    const handleChange = event => {
        props.ChangeTime(event.target.value, type)
    }

    return (
        <FormControl variant="outlined" className={classes.formControl} fullWidth size="small">
            <InputLabel id="demo-simple-select-outlined-label" color={'secondary'}>{label}</InputLabel>
            <Select
                disabled={work ? true : false}
                fullWidth
                labelId="demo-simple-select-outlined-label"
                id={`select-hour-${type}`}
                value={inputValue}
                onChange={handleChange}
                label="time"
                color={"secondary"}

            >
                <MenuItem value={undefined}>
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
