import { IconButton, Dialog, AppBar, Slide, makeStyles, Toolbar, Typography, Button } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles((theme) => ({

    appBar: {
        position: 'relative',
        background: 'white'
    },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateAppointment = (props) => {
    const { open, setOpenCreateAppointment } = props
    const classes = useStyles();
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}       elevation={0}>
                <Toolbar>
                    <IconButton edge="start" color="black" aria-label="close" onClick={() => setOpenCreateAppointment(false)}>
                        <CloseIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>

        </Dialog>
    );
}

export default CreateAppointment;
