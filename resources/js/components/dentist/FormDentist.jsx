import React ,{useState} from 'react';
import { Container, Grid, makeStyles, Box, Paper, TextField, Button, Checkbox, CircularProgress } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useForm } from '../../hooks/useForm';
import {Link} from "react-router-dom";
import { usePostApi } from '../../hooks/usePostApi';
import { useSnackbar } from 'notistack';

export const FormDentist = ({ classes }) => {

    const { enqueueSnackbar } = useSnackbar();
    const [checked, setChecked] = useState(true);
    const { dataForm: form, handleChangeForm : handleInputChange } = useForm({ "password": "", "office_id": 1 }) // El campo 'office_id' esta por defecto hasta que se cree la funcionalidad de sucursales
    
    const {loader : loaderCreateDentist,errors,postData,} = usePostApi(); 

    const [passwordIsValid, setpasswordIsValid] = useState(false)
    const [buttonCreateEnabled, setButtonCreateEnabled] = useState(true)

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const createDentist = async () => {
        const success = await postData('dentists',form);
        if(success){
            enqueueSnackbar('Dentista Creado Correctamente',{variant: 'success'});
        }else{
            enqueueSnackbar('No se pudo guardar el dentista',{variant: 'error'}); 
        }
    }
    const handleInputChangePassword = (event) => {

        if (form.password !== event.target.value) {
            setpasswordIsValid(true)
           
        }
        if (form.password === event.target.value || event.target.value.length === 0) {
            setpasswordIsValid(false)
            setButtonCreateEnabled(false)
        }
     
    }


    const sendForm = (event) => {
        if(!passwordIsValid){
            createDentist()
        }
        event.preventDefault()
    }

    return (
        <Paper elevation={0}>
            <form onSubmit={sendForm}>
                <Container>
                    <Grid container >

                        <Grid item lg={12}><Box fontSize="h5.fontSize" fontWeight="medium" fontFamily="fontFamily" mt={5} mb={5}>Registo odontologo</Box></Grid>
                        <Grid item lg={6} className={classes.containerFormDentist}>

                            <Grid container>
                                <TextField
                                    error={errors.rut ? true : false}
                                    name="rut"
                                    className={classes.textField}
                                    id="rut"
                                    label="Rut"
                                    defaultValue=""
                                    helperText=""
                                    variant="outlined"
                                    size="small"
                                    helperText={errors.rut ? "Ej : 19187259-2" : errors.rut}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid container  >

                                <TextField
                                    error={errors.names ? true : false}
                                    name="names"
                                    className={classes.textField}
                                    id="names"
                                    label="Nombres"
                                    defaultValue=""
                                    helperText={errors.names ? "Ej : Alejando Andres" : errors.names}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextField
                                    error={errors.last_names ? true : false}
                                    name="last_name"
                                    className={classes.textField}
                                    id="last_names"
                                    label="Apellidos"
                                    defaultValue=""
                                    helperText={errors.rut ? "Ej : Constanzo Rivas" : errors.rut}
                                    helperText="Ej : Contanzo Rivas"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleInputChange}
                                    required
                                />

                            </Grid>
                            <Grid container  >
                                <Grid item lg={4} >
                                    <TextField
                                        error={errors.adress ? true : false}
                                        name="adress"
                                        className={classes.textField}
                                        id="adress"
                                        label="Dirección"
                                        defaultValue=""
                                        helperText={errors.adress ? "Ej : Pje Cau Cau" : errors.adress}
                                        variant="outlined"
                                        size="small"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField
                                        error={errors.phone_number ? true : false}
                                        name="phone_number"
                                        className={classes.textField}
                                        id="phone_number"
                                        label="Telefono"
                                        defaultValue=""
                                        helperText={errors.phone_number ? "Ej : 95443443" : errors.phone_number}
                                        variant="outlined"
                                        size="small"
                                        onChange={handleInputChange}
                                        required

                                    />
                                </Grid>
                                <Grid item lg={4}>

                                    <TextField
                                        error={errors.account_number ? true : false}
                                        name="account_number"
                                        className={classes.textField}
                                        id="account_number"
                                        label="Numero de cuenta "
                                        defaultValue=""
                                        helperText={errors.account_number ? "Ej : 434334343433" : errors.account_number}
                                        variant="outlined"
                                        size="small"
                                        onChange={handleInputChange}


                                    />

                                </Grid>
                                <Grid item lg={12}>
                                    <Box display="flex" alignContent="flex-row">

                                        <Checkbox
                                            disabled
                                            checked={checked}
                                            onChange={handleChange}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                        <Box className={classes.labelCheckbox}> Asignar horario predeterminado</Box>
                                    </Box>
                                </Grid>
                            </Grid>



                        </Grid>
                        <Grid container item lg={6} justify="flex-end" direction="row">

                            <Paper elevation={0} className={classes.paperFormUser}>

                                <Grid container className={classes.formUser} >
                                    <Alert severity="info" className={classes.alertInfo}>
                                        <AlertTitle>Información</AlertTitle>
                                This is an info alert — <strong>check it out!</strong>
                                    </Alert>
                                </Grid>
                                <Grid container className={classes.formUser} >

                                    <TextField
                                        error={errors.user ? true : false}
                                        name="user"
                                        className={classes.textField}
                                        id="user"
                                        label="Usuario "
                                        defaultValue=""
                                        helperText={errors.user ? "Ej : Luis." : errors.user}
                                        variant="filled"
                                        size="small"
                                        fullWidth
                                        onChange={handleInputChange}
                                        required

                                    />
                                    <TextField
                                        name="email"
                                        className={classes.textField}
                                        id="email"
                                        label="Email "
                                        defaultValue=""
                                        helperText="Ej : usuario@gmail.com"
                                        variant="filled"
                                        size="small"
                                        fullWidth
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        error={errors.password ? true : false}
                                        name="password"
                                        className={classes.textField}
                                        id="password"
                                        label="Contraseña"
                                        defaultValue=""
                                        helperText="Campo obligatorio *"
                                        variant="filled"
                                        size="small"
                                        fullWidth
                                        type="password"
                                        helperText={errors.password ? "*******" : errors.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <TextField
                                        disabled={form.password === "" ? true : false}
                                        error={passwordIsValid}
                                        name="re_password"
                                        className={classes.textField}
                                        id="re_password"
                                        label="Repetir contraseña"
                                        defaultValue=""
                                        helperText="Campo obligatorio *"
                                        variant="filled"
                                        size="small"
                                        fullWidth
                                        type="password"
                                        onChange={handleInputChangePassword}
                                        required
                                    />
                                </Grid>


                            </Paper>


                        </Grid>
                        <Grid container item lg={12} className={classes.actionsButton} justify="space-between" >

                            <Button component={Link} to="/dentist" variant="contained" size="small" disableElevation>cancelar</Button>
                            <Button variant="contained" size="small" color="secondary" type="submit" disableElevation disabled={buttonCreateEnabled} endIcon={loaderCreateDentist && <CircularProgress color={"inherit"} size={20} />}>Siguiente</Button>

                        </Grid>
                    </Grid>

                </Container>
            </form>
        </Paper>
    )

}

export default FormDentist;