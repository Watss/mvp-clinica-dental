import React, { useEffect, useState } from 'react';
import { makeStyles, Button, DialogActions, DialogContentText, DialogContent, DialogTitle, Dialog, Box, FormControlLabel, Checkbox } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: 70,
        paddingRight: 70
    },
}));

const workdays = [
    'Lunes', 'Martes', 'Miécoles', 'Jueves', 'Viernes', 'Sábado'
]

const DialogRepeatDay = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles()

    return (

        <div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"¿Desea repetir esta configuración?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Eliga los dias que quiera repetir la configuración.
                    </DialogContentText>
                    <Box display="flex" mt={5}>
                        {workdays.map((day, index) => {
                            return <FormControlLabel
                                key={index}
                                value="top"
                                control={<Checkbox color="secondary" />}
                                label={day}
                                labelPlacement="top"
                            />
                        })}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Seguir día a día
                    </Button>
                    <Button onClick={handleClose} color="secondary" autoFocus>
                        Aceptar
                     </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default DialogRepeatDay;
