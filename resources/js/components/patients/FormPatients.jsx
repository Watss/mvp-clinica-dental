import React ,{useState} from 'react';
import { Container, Grid, makeStyles, Box, Paper, TextField, Button, Checkbox, CircularProgress } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { axiosInstance } from '../../utils/axios'
import {Link} from "react-router-dom";

export const FormPatients = ({ classes }) => {


    const [checked, setChecked] = useState(true);
    const [form, setForm] = useState({ "password": "", "office_id": 1 }) // El campo 'office_id' esta por defecto hasta que se cree la funcionalidad de sucursales
    const [loaderCreatePatients, setLoaderCreatePatients] = useState(false)
    const [buttonCreateEnabled, setButtonCreateEnabled] = useState(true)

    const [errors, setErrors] = useState({
        rut: [],
        names: [],
        last_names: [],
        adress: [],
        phone_number:[],
        email:[],
        city:[],
    })

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const createPatitens = async () => {
        try {
            setLoaderCreatePatients(true)
            const res = await axiosInstance.post('patients', form);
            // Realizar acciones si la peticion fue correcta
            alert("paciente registrado ")
            setLoaderCreatePatients(false)
        } catch (error) {

            setErrors(
                {
                    ...errors,

                    "rut": error.response.data.errors.rut ? error.response.data.errors.rut : [],
                    "names": error.response.data.errors.names ? error.response.data.errors.names : [],
                    "last_names": error.response.data.errors.last_names ? error.response.data.errors.last_names : [],
                    "adress": error.response.data.errors.adress ? error.response.data.errors.adress : [],
                    "phone_number": error.response.data.errors.phone_number ? error.response.data.errors.phone_number : [],
                    "email": error.response.data.errors.email ? error.response.data.errors.email:[],
                    "city":error.response.data.errors.city ? error.response.data.errors.city:[],
                }
            )
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


        createPatitens()


        event.preventDefault()
    }

    return (
        <Paper elevation={0}>
            <form onSubmit={sendForm}>
                <Container>
                    <Grid container >

                        <Grid item lg={12}><Box fontSize="h5.fontSize" fontWeight="medium" fontFamily="fontFamily" mt={5} mb={5}>Registo Pacientes</Box></Grid>
                        <Grid item lg={12} className={classes.containerFormPatients}>

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
                                    helperText={errors.names.length === 0 ? "Ej : Pablo Luna" : errors.names}
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
                                    helperText={errors.rut.length === 0 ? "Ej : Arteaga XD" : errors.rut}
                                    helperText="Arteaga XD"
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
                                        helperText={errors.adress.length === 0 ? "Ej : 5 de abril 1071" : errors.adress}
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
                                        helperText={errors.phone_number.length === 0 ? "Ej : 999999999" : errors.phone_number}
                                        variant="outlined"
                                        size="small"
                                        onChange={handleInputChange}
                                        required

                                    />
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField
                                        error={errors.city.length === 0 ? false : true}
                                        name="city"
                                        className={classes.textField}
                                        id="city"
                                        label="city"
                                        defaultValue=""
                                        helperText={errors.city.length === 0 ? "Chillan" : errors.city}
                                        variant="outlined"
                                        size="small"
                                        onChange={handleInputChange}
                                        required

                                    />
                                </Grid>

                                <Grid item lg={12}>

                                </Grid>
                            </Grid>



                        </Grid>
                        <Grid container item lg={12} className={classes.actionsButton} justify="space-between" >

                            <Button component={Link} to="/patients" variant="contained" size="small" disableElevation>cancelar</Button>
                            <Button variant="contained" size="small" color="secondary" type="submit"  disableElevation  endIcon={loaderCreatePatients && <CircularProgress color={"inherit"} size={20} />}>Siguiente</Button>

                        </Grid>
                    </Grid>

                </Container>
            </form>
        </Paper>
    )

}

export default FormPatients;
