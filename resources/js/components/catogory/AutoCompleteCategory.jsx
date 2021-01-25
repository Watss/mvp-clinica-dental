import { CircularProgress, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axiosInstance from '../../utils/axios';

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: 5
    },
}));

export const AutoCompleteCategory = ({onChange}) => {
    const classes = useStyles();
    const [loader,setLoader] = useState(true);
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const res = await axiosInstance.get('/categories');
            const { data } = res.data;
            setCategories(data);
            setLoader(false);
        } catch (error) {
            
        }
    }

    useEffect( () => {
        getCategories();
    },[])

   return <Autocomplete
        size="small"
        loading={loader}
        loadingText="Cargando..."
        id="category-input"
        className={classes.textField}
        options={categories}
        onChange={onChange}
        getOptionLabel={(option) => option.attributes.name}
        fullWidth
        renderInput={(params) => <TextField {...params} name="category" label="Categoria" variant="outlined" />}                                
    /> 
}