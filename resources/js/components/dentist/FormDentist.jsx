import React ,{useState} from 'react';
import { Container, Grid, makeStyles, Box, Paper, TextField, Button, Checkbox, CircularProgress } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useForm } from '../../hooks/useForm';
import {Link, useNavigate} from "react-router-dom";
import { usePostApi } from '../../hooks/usePostApi';
import { useSnackbar } from 'notistack';
import { validate, clean, format } from 'rut.js';

export const FormDentist = ({ classes }) => {

    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();
    const [checked, setChecked] = useState(true);
    const { dataForm: form, handleChangeForm : handleInputChange } = useForm({ "password": "", "office_id": 1 }) // El campo 'office_id' esta por defecto hasta que se cree la funcionalidad de sucursales
    
    const {loader : loaderCreateDentist,errors,postData,} = usePostApi(); 

    const [passwordIsValid, setpasswordIsValid] = useState(false);
    const [buttonCreateEnabled, setButtonCreateEnabled] = useState(true);

    const [errorRut, setErrorRut ] = useState(false);
    const [rutValue, setRutValue ] = useState('');

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleChangeRut = e => {
        let rutFormated = format(e.target.value);
        setRutValue(rutFormated);
        setErrorRut(validate(rutFormated));
        setForm({...dataForm, rut : clean(rutFormated)});
    }

    const createDentist = async () => {
        const success = await postData('dentists',form);
        if(success){
            enqueueSnackbar('Dentista Creado Correctamente',{variant: 'success'});

            Navigate('/dentists');
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
                    <Grid container>
                        <Grid item lg={12}><Box fontSize="h5.fontSize" fontWeight="medium" fontFamily="fontFamily" mt={5} mb={5}>Registo odontologo</Box></Grid>
                        <Grid item lg={6} className={classes.containerFormDentist}>
                            <Grid container>
                                <TextField
                                    error={!errorRut || errors.rut ? true : false}
                                    name="rut"
                                    className={classes.textField}
                                    id="rut"
                                    label="Rut"
                                    defaultValue=""
                                    helperText=""
                                    value={rutValue}
                                    variant="outlined"
                                    size="small"
                                    helperText={errors.rut ? errors.rut[0] : !errorRut ? "Rut Invalido, Verifique" : "Ej : 19187259-2" }
                                    onChange={handleChangeRut}
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
                                    helperText={errors.names ? errors.names[0] : "Ej : Alejando Andres"}
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
                                    helperText={errors.last_names ? errors.last_names[0] : "Ej : Perez Perez"}
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
                                        helperText={errors.adress ? errors.adress[0] : "Ej : Pje Cau Cau"}
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
                                        helperText={errors.phone_number ? errors.phone_number[0] : "Ej : 95443443"}
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
                                        helperText={errors.account_number ? errors.account_number[0] : "Ej : 4222222222" }
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
                                        helperText={errors.user ?  errors.user[0] : "Ej : Luis." }
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
                                        helperText={errors.password ? errors.password[0] : ''}
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