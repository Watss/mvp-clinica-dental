import { Button, CircularProgress, Container, Drawer, 
    Grid, IconButton, List, ListItem, ListItemIcon, 
    ListItemSecondaryAction, ListItemText, ListSubheader, 
    makeStyles,Paper, TextField, Toolbar, Typography} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState,useEffect } from 'react';
import axiosInstance from '../../utils/axios';
import {useGetApi} from '../../hooks/useGetApi';
import {useForm} from '../../hooks/useForm';

const useStyles = makeStyles((theme) => ({
    drawer:{
        width: 320
    },
    container:{
        marginTop: theme.spacing(2)
    },
    textField: {
        margin: 5
    },
}));

//TODO: REFACTOR COMPONENT AND LIMIT CATEGORIES

export const DrawerCategories = ({open,handleCloseDialog}) => {
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const { dataForm, handleOnChange} = useForm({});
    const [errors, setErrors] = useState([]);
    const [buttonLoader,setButtonLoader] = useState(false);
    const {
        data: categories,
        loader,
        getData:getCategories
    } = useGetApi('/categories');
    console.log(categories);
    const saveCategory = async () => {
        try {
            setButtonLoader(true);
            const res = await axiosInstance.post('/categories',dataForm);
            enqueueSnackbar('Categoria Guardada Correctamente',{variant: 'success'});
            getCategories();
        } catch (error) {
            setErrors(error.response.data.errors);
            enqueueSnackbar('Error al Guardar la Categoria',{variant: 'error'});
        } finally {
            setNameCategory(null);
            setButtonLoader(false);
        }
    }

    useEffect( () => {
        getCategories();
    },[]);

    return <Drawer classes={{
        paper: classes.drawer,
      }} anchor='right' variant="temporary" open={open} onClose={handleCloseDialog} className={classes.drawer}>
          <Toolbar>
            <IconButton edge="start" color="inherit"  aria-label="close" onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        <Container maxWidth="lg" >
            <Typography align="center">Nueva Categoria</Typography>
            <Grid container justify="center" className={classes.container}>
                <TextField
                    error={errors.name ? true : false}
                    name="name"
                    className={classes.textField}
                    id="name-category"
                    label="Nombre"
                    defaultValue=""
                    onChange={handleOnChange}
                    helperText={errors.name ? errors.name[0] : ''}
                    variant="outlined"
                    size="small"
                    required
                />
            </Grid>
            <Grid container justify="center" className={classes.container}>
                <Button variant="contained" size="small" color="secondary" disableElevation endIcon={buttonLoader && <CircularProgress color={"inherit"} size={20} />} onClick={saveCategory}>Guardar</Button>
            </Grid>
            <Grid container className={classes.container} justify="center">
                { loader ? <CircularProgress style={{ marginTop:'20px' }} /> : <GetListCategories categories={categories} getCategories={getCategories}/>}
            </Grid>
        </Container>
    </Drawer>
}

const GetListCategories = ({categories,getCategories}) => {
    const { enqueueSnackbar } = useSnackbar();
    const [loader,setLoader] = useState(false);

    const deleteCategory = async (id) => {
        try {
            setLoader(true);
            const res = await axiosInstance.delete(`categories/${id}`);
            enqueueSnackbar(res.data.message,{variant:'success'});
            getCategories();
            
        } catch (error) {
            enqueueSnackbar(error.response.data.message,{variant:'error'});
        } finally {
            //setLoader(false);
        }
    }

    return <List style={{ width: '100%'}} subheader={<ListSubheader>Registradas</ListSubheader>}>
        {
        
        categories.length > 0 ?
        categories.map( (category) => {
                return <ListItem alignItems="center" key={category.id}>
                    <ListItemText primary={category.attributes.name}/>
                    <ListItemIcon>
                        <IconButton onClick={() => deleteCategory(category.id)}>
                             <Delete />
                        </IconButton>
                    </ListItemIcon>
                </ListItem>
            })
        : <ListItem alignItems="center">
                <ListItemText primary="No hay categorias registradas"/>
          </ListItem>
        }
            </List>
}