import React from 'react';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

}));

const ViewCalendar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            Vista calendario
        </div>
    );
};

export default ViewCalendar;
