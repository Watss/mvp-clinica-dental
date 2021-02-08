import React, { useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    formControlLabel: {
        margin: 0
    }
}));

const Filter = () => {
    const classes = useStyles();

    const [state, setState] = useState({
        check_all: true,
        confirmed: false,
        confirmed_by_phone: false,
        waiting_room: false,
        attended: false,
        in_atention: false,
        does_not_attend: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { check_all, confirmed, confirmed_by_phone, waiting_room, attended, in_atention, does_not_attend } = state;

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Filtrar por </FormLabel>
                <FormGroup>
                    <FormControlLabel
                        className={classes.formControlLabel}
                        control={<Checkbox checked={check_all} onChange={handleChange} name="check_all" />}
                        label="Selelccionar todos"
                    />
                    <FormControlLabel
                        className={classes.formControlLabel}
                        control={<Checkbox checked={confirmed} onChange={handleChange} name="confirmed" />}
                        label="Confirmados"
                    />
                    <FormControlLabel
                        className={classes.formControlLabel}
                        control={<Checkbox checked={confirmed_by_phone} onChange={handleChange} name="confirmed_by_phone" />}
                        label="Confirmado por telefono"
                    />
                    <FormControlLabel
                        className={classes.formControlLabel}
                        control={<Checkbox checked={waiting_room} onChange={handleChange} name="waiting_room" />}
                        label="En sala"
                    />
                    <FormControlLabel
                        className={classes.formControlLabel}
                        control={<Checkbox checked={attended} onChange={handleChange} name="attended" />}
                        label="Atendidos"
                    />
                    <FormControlLabel
                        className={classes.formControlLabel}
                        control={<Checkbox checked={in_atention} onChange={handleChange} name="in_atention" />}
                        label="En atención"
                    />
                    <FormControlLabel
                        className={classes.formControlLabel}
                        control={<Checkbox checked={does_not_attend} onChange={handleChange} name="does_not_attend" />}
                        label="No asiste "
                    />
                </FormGroup>

            </FormControl>
        </div>
    );
};

export default Filter;
