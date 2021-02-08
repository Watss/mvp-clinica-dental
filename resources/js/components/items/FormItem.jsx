import React ,{useState} from 'react';
import { Container, Grid, makeStyles, Box, Paper, TextField, Button, Checkbox, CircularProgress,FormControlLabel,Switch, Drawer } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import { Alert, AlertTitle } from '@material-ui/lab';
import { axiosInstance } from '../../utils/axios'
import {useNavigate} from "react-router-dom";
import { AutoCompleteCategory } from '../catogory/AutoCompleteCategory';
import { DrawerCategories } from '../catogory/DrawerCategories';
import {Link} from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useForm } from '../../hooks/useForm';


export const FormItem = ({ classes }) => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [openDialog,setOpenDialog] = useState(false);
    const [checked, setChecked] = useState(true);
    const {dataForm, handleChangeForm,setForm }  = useForm({});
    const [loader, setLoader] = useState(false)
    const [buttonEnabled, setButtonEnabled] = useState(true)
    console.log(dataForm);
    const [errors, setErrors] = useState([]);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const createItem = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);
            const res = await axiosInstance.post('items', dataForm);
            enqueueSnackbar('Item Guardado Correctamente',{variant: 'success'});
            navigate('/');
        } catch (error) {
            setErrors(error.response.data.errors);
            enqueueSnackbar(error.response.data.message,{variant: 'error'});
            setLoader(false);
        }
    } 

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleSetCategory = (event,value) => {
        setForm({...dataForm, category_id: value.id});
    }

    return (
        <Paper elevation={0}>
            <form onSubmit={createItem}>
                <Container>
                    <Grid container justify="center">

                        <Grid item lg={8}><Box fontSize="h5.fontSize" fontWeight="medium" fontFamily="fontFamily" mt={5} mb={5}>Agregar Nuevo Item</Box></Grid>
                        <Grid item lg={8} className={classes.containerFormDentist}>

                        <Grid container>
                                <Grid item lg={4} >
                                    <TextField
                                        error={errors.name ? true : false}
                                        name="name"
                                        label="Nombre"
                                        className={classes.textField}
                                        id="name"
                                        defaultValue=""
                                        helperText={errors.name ? errors.name[0] : ''}
                                        variant="outlined"
                                        size="small"
                                        onChange={handleChangeForm}
                                        required
                                    />
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField
                                        error={errors.price ? true : false}
                                        name="price"
                                        className={classes.textField}
                                        id="price"
                                        label="Valor"
                                        defaultValue=""
                                        helperText={errors.price ? errors.price[0] : ''}
                                        variant="outlined"
                                        size="small"
                                        onChange={handleChangeForm}
                                        required

                                    />
                                </Grid>
                                <Grid item lg={4}>
                                    <AutoCompleteCategory onChange={handleSetCategory}/>
                                    <Button size="small" color="primary" onClick={handleOpenDialog}>
                                        Administrar Categorias
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container justify="space-between">
                                <Grid item lg={7}>
                                    <TextField
                                    fullWidth
                                    name="description"
                                    id="description-input"
                                    label="Descripción"
                                    multiline
                                    onChange={handleChangeForm}
                                    rows={3}
                                    variant="outlined"
                                    />
                                </Grid>

                                <Grid item lg={4} >
                                    <FormControlLabel
                                        className={classes.textField}
                                        control={
                                        <Switch
                                            checked={checked}
                                            onChange={handleChange}
                                            name="checkedB"
                                            color="secondary"
                                        />
                                        }
                                        label="Activo"
                                    />
                                </Grid>
                               
                            </Grid>
                            
                        </Grid>
                        <Grid container item lg={8} className={classes.actionsButton} justify="space-between" >
                        <Button component={Link} to="/item" variant="contained" size="small" disableElevation>Cancelar</Button>
                            <Button variant="contained" size="small" color="secondary" type="submit" disableElevation disabled={!buttonEnabled} endIcon={loader && <CircularProgress color={"inherit"} size={20} />}>Guardar</Button>

                        </Grid>
                    </Grid>

                </Container>
            </form>
            <DrawerCategories open={openDialog} handleCloseDialog={handleCloseDialog}/>
        </Paper>
    )

}

export default FormItem;