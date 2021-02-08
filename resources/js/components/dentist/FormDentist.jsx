import React ,{useState} from 'react';
import { Container, Grid, makeStyles, Box, Paper, TextField, Button, Checkbox, CircularProgress } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { axiosInstance } from '../../utils/axios'
import {Link} from "react-router-dom";

export const FormDentist = ({ classes }) => {


    const [checked, setChecked] = useState(true);
    const [form, setForm] = useState({ "password": "", "office_id": 1 }) // El campo 'office_id' esta por defecto hasta que se cree la funcionalidad de sucursales
    const [loaderCreateDentist, setLoaderCreateDentist] = useState(false)
    const [passwordIsValid, setpasswordIsValid] = useState(false)
    const [buttonCreateEnabled, setButtonCreateEnabled] = useState(true)

    const [errors, setErrors] = useState({
        adress: [],
        names: [],
        last_names: [],
        oficce_id: [],
        password: [],
        phone_number: [],
        rut: [],
        user: [],
        account_number: []

    })

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const createDentist = async () => {
        try {
            setLoaderCreateDentist(true)
            const res = await axiosInstance.post('dentists', form);
            // Realizar acciones si la peticion fue correcta 
            alert("dentista registrado ")
            setLoaderCreateDentist(false)
        } catch (error) {

            setErrors(
                {
                    ...errors,
                    "adress": error.response.data.errors.adress ? error.response.data.errors.adress : [],
                    "rut": error.response.data.errors.rut ? error.response.data.errors.rut : [],
                    "names": error.response.data.errors.names ? error.response.data.errors.names : [],
                    "last_names": error.response.data.errors.last_names ? error.response.data.errors.last_names : [],
                    "oficce_id": error.response.data.errors.oficce_id ? error.response.data.errors.oficce_id : [],
                    "password": error.response.data.errors.password ? error.response.data.errors.password : [],
                    "phone_number": error.response.data.errors.phone_number ? error.response.data.errors.phone_number : [],
                    "user": error.response.data.errors.user ? error.response.data.errors.user : [],
                    "account_number": error.response.data.errors.account_number ? error.response.data.errors.account_number : [],
                }
            )
            setLoaderCreateDentist(false)
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

    const handleInputChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
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
                                    error={errors.rut.length === 0 ? false : true}
                                    name="rut"
                                    className={classes.textField}
                                    id="rut"
                                    label="Rut"
                                    defaultValue=""
                                    helperText=""
                                    variant="outlined"
                                    size="small"
                                    helperText={errors.rut.length === 0 ? "Ej : 19187259-2" : errors.rut}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid container  >

                                <TextField
                                    error={errors.names.length === 0 ? false : true}
                                    name="names"
                                    className={classes.textField}
                                    id="names"
                                    label="Nombres"
                                    defaultValue=""
                                    helperText={errors.names.length === 0 ? "Ej : Alejando Andres" : errors.names}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextField
                                    error={errors.last_names.length === 0 ? false : true}
                                    name="last_name"
                                    className={classes.textField}
                                    id="last_names"
                                    label="Apellidos"
                                    defaultValue=""
                                    helperText={errors.rut.length === 0 ? "Ej : Constanzo Rivas" : errors.rut}
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
                                        error={errors.adress.length === 0 ? false : true}
                                        name="adress"
                                        className={classes.textField}
                                        id="adress"
                                        label="Dirección"
                                        defaultValue=""
                                        helperText={errors.adress.length === 0 ? "Ej : Pje Cau Cau" : errors.adress}
                                        variant="outlined"
                                        size="small"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField
                                        error={errors.phone_number.length === 0 ? false : true}
                                        name="phone_number"
                                        className={classes.textField}
                                        id="phone_number"
                                        label="Telefono"
                                        defaultValue=""
                                        helperText={errors.phone_number.length === 0 ? "Ej : 95443443" : errors.phone_number}
                                        variant="outlined"
                                        size="small"
                                        onChange={handleInputChange}
                                        required

                                    />
                                </Grid>
                                <Grid item lg={4}>

                                    <TextField
                                        error={errors.account_number.length === 0 ? false : true}
                                        name="account_number"
                                        className={classes.textField}
                                        id="account_number"
                                        label="Numero de cuenta "
                                        defaultValue=""
                                        helperText={errors.account_number.length === 0 ? "Ej : 434334343433" : errors.account_number}
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
                                        error={errors.user.length === 0 ? false : true}
                                        name="user"
                                        className={classes.textField}
                                        id="user"
                                        label="Usuario "
                                        defaultValue=""
                                        helperText={errors.user.length === 0 ? "Ej : Luis." : errors.user}
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
                                        error={errors.password.length === 0 ? false : true}
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
                                        helperText={errors.password.length === 0 ? "*******" : errors.password}
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