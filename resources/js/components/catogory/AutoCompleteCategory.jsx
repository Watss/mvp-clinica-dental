import { CircularProgress, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axiosInstance from '../../utils/axios';
import { useGetApi } from '../../hooks/useGetApi';

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: 5
    },
}));

export const AutoCompleteCategory = ({onChange}) => {
    const classes = useStyles();
    const {data: categories,errors,loader,getData} = useGetApi('/categories');

    useEffect( () => {
        getData();
        return () => {
            //TODO: FIX BUG CLEAN FUNCTION
        };
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