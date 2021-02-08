import React, { useEffect, useState } from 'react';
import { makeStyles, Button, DialogActions, DialogContentText, DialogContent, DialogTitle, Dialog, Box, FormControlLabel, Checkbox } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: 70,
        paddingRight: 70
    },
}));


const DialogRepeatDay = (props) => {

    const [workDays, setWorkDays] = useState([
        { id: 0, name: 'Lunes', checked: false },
        { id: 1, name: 'Martes', checked: false },
        { id: 2, name: 'Miercoles', checked: false },
        { id: 3, name: 'Jueves', checked: false },
        { id: 4, name: 'Viernes', checked: false },
        { id: 5, name: 'Sábado', checked: false },
    ])

    const { AcceptDialog, dayCompleted } = props



    const handleAcceptDialog = () => {

        AcceptDialog(workDays)
    };

    const handleSelectDay = (index, name) => (event) => {

        let editDay = workDays.map(dia => {return {...dia}})

        editDay.find(dia => dia.id === index ).checked = !editDay.find(dia => dia.id === index).checked;

        setWorkDays(editDay)

    };

    const classes = useStyles()

    return (

        <div>

            <Dialog
                open={props.show}
                onClose={handleAcceptDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"¿Desea repetir esta configuración?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Eliga los dias que quiera repetir la configuración.
                    </DialogContentText>
                    <Box display="flex" mt={5}>
                        {workDays.map((day, index) => {
                            return <FormControlLabel
                                key={index}
                                value="top"
                                control={<Checkbox name={day.name} checked={index === dayCompleted ? true : day.checked} disabled={index === dayCompleted ? true : false} color="secondary" onChange={handleSelectDay(day.id, day.name)} />}
                                label={day.name}
                                labelPlacement="top"
                            />
                        })}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAcceptDialog} color="secondary">
                        Seguir día a día
                    </Button>
                    <Button onClick={handleAcceptDialog} color="secondary" autoFocus>
                        Aceptar
                     </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default DialogRepeatDay;
