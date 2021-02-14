import React ,{useState} from 'react';
import { Container, Grid, makeStyles, Box, Paper, TextField, Button, Checkbox, CircularProgress } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { axiosInstance } from '../../utils/axios'
import { useSnackbar } from 'notistack';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { usePostApi } from '../../hooks/usePostApi';
import { validate, clean, format } from 'rut.js';

export const FormPatients = ({ classes }) => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { dataForm, handleChangeForm,setForm } = useForm({ "password": "", "office_id": 1 }); // El campo 'office_id' esta por defecto hasta que se cree la funcionalidad de sucursales
    const {loader,errors,postData: createPatitens} = usePostApi(); 
    const [errorRut, setErrorRut ] = useState(true);
    const [rutValue, setRutValue ] = useState('');
    

    const handleChangeRut = e => {
        let rutFormated = format(e.target.value);
        setRutValue(rutFormated);
        setErrorRut(validate(rutFormated));
        setForm({...dataForm, rut : clean(rutFormated)});
    }

    const sendForm = async event =>  {
        const success = await createPatitens('patients',dataForm);
        if(success){
            enqueueSnackbar('Paciente Registrado Correctamente',{variant: 'success'});
            navigate('/patients');
        }else{
            enqueueSnackbar('Ocurrio un error, verifique los datos ingresados',{variant: 'error'});
        }
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
                                    error={!errorRut || errors.rut ? true : false}
                                    name="rut"
                                    className={classes.textField}
                                    id="rut"
                                    label="Rut"
                                    variant="outlined"
                                    size="small"
                                    value={rutValue}
                                    helperText={errors.rut ? errors.rut[0] : !errorRut ? "Rut Invalido, Verifique" : "Ej : 19187259-2" }
                                    onChange={handleChangeRut}
                                    onKeyUp={handleChangeRut}
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
                                    helperText={errors.names ?  errors.names[0] : "Ej : Pablo Luna"} 
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleChangeForm}
                                    required
                                />
                                <TextField
                                    error={errors.last_names ? true : false}
                                    name="last_name"
                                    className={classes.textField}
                                    id="last_names"
                                    label="Apellidos"
                                    defaultValue=""
                                    helperText={errors.last_names ? errors.last_names[0] : 'ej: Perez Perez'}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleChangeForm}
                                    required
                                />

                            </Grid>
                            <Grid container  >
                                <Grid item lg={4} >
                                    <TextField
                                        error={errors.adress ? true : false }
                                        name="adress"
                                        className={classes.textField}
                                        id="adress"
                                        label="Dirección"
                                        defaultValue=""
                                        helperText={errors.adress ? errors.adress[0] : "Ej : 5 de abril 1071"}
                                        variant="outlined"
                                        size="small"
                                        onChange={handleChangeForm}
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
                                        helperText={errors.phone_number ?  errors.phone_number[0] : 'Ej : 999999999' }
                                        variant="outlined"
                                        size="small"
                                        onChange={handleChangeForm}
                                        required

                                    />
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField
                                        error={errors.city ? true : false}
                                        name="city"
                                        className={classes.textField}
                                        id="city"
                                        label="city"
                                        defaultValue=""
                                        helperText={errors.city ?  errors.city[0] : "Chillan" }
                                        variant="outlined"
                                        size="small"
                                        onChange={handleChangeForm}
                                        required

                                    />
                                </Grid>

                                <Grid item lg={12}>

                                </Grid>
                            </Grid>



                        </Grid>
                        <Grid container item lg={12} className={classes.actionsButton} justify="space-between" >

                            <Button component={Link} to="/patients" variant="contained" size="small" disableElevation>cancelar</Button>
                            <Button variant="contained" size="small" color="secondary" type="submit"  disableElevation  endIcon={loader && <CircularProgress color={"inherit"} size={20} />}>Siguiente</Button>

                        </Grid>
                    </Grid>

                </Container>
            </form>
        </Paper>
    )

}

export default FormPatients;
