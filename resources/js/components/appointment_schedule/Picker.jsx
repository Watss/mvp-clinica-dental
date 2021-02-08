import React from 'react';
import { makeStyles, Box, createMuiTheme } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from "@material-ui/styles";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
const useStyles = makeStyles((theme) => ({

}));

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary:{
          main: "#28a745"
      }
    },
  });

const Picker = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <div className={classes.root}>
            <Box>
            <ThemeProvider theme={defaultMaterialTheme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        color="secondary"
                        disableToolbar
                        variant="static"
                        format="MM/dd/yyyy"
                        margin="small"
                        id="date-picker-inline"
                        label="Date picker inline"
                        size="small"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    /></MuiPickersUtilsProvider>
                     </ThemeProvider>
            </Box>

        </div>
    );
};

export default Picker;
