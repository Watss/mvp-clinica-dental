import React from 'react';
import { makeStyles, InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

}));



const SelectDentist = () => {

    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div className={classes.root}>
            <FormControl fullWidth variant="outlined" className={classes.formControl} size="small">
                <InputLabel id="demo-simple-select-outlined-label">Ondontologo</InputLabel>
                <Select

                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Odontologo 1</MenuItem>
                    <MenuItem value={20}>Odontologo 2</MenuItem>
                    <MenuItem value={30}>Odontologo 3</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default SelectDentist;
