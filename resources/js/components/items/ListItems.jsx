import React, { useState,useEffect } from 'react';
import { List, ListSubheader,Grid, ListItemText, ListItem, CircularProgress } from '@material-ui/core';
import IndividualItem from './IndividualItem';
import { Alert, Pagination } from '@material-ui/lab';
import { FilterItems } from './FiltersItems';
import { useForm } from '../../hooks/useForm';
import { useGetApi } from '../../hooks/useGetApi';



const ListItems = () => {

    const [page,setPage] = useState(1);
    const {dataForm, handleChangeForm,setForm }  = useForm({});
    const {
        data: items,
        loader,
        getData: getItems,
        lastPage
    } = useGetApi('/items');
    
    const filter = () => {
        getItems(dataForm,page);
    }
    
    const handleChangePage = (event,value) => {
        setPage(value);
        getItems(dataForm,value);
    }
    //TODO: FIX BUG CATEGORIES
    const handleOnChange = (e,value) => {
        if(!value){
            setForm({...dataForm,category : ''});
        }
        value ?
        setForm({...dataForm, category: value.id ? value.id : ''}) : handleChangeForm(e);
    }

    useEffect( () => {
        getItems();
    },[]);

    return ( 
    <div>
        <List dense={true}>
            <ListSubheader component="div" id="nested-list-subheader">
                <FilterItems handleOnChange={handleOnChange} filter={filter}/>
            </ListSubheader>
            { items.length == 0 ?<ListItem selected> <ListItemText primary="No se Econtraron Prestaciones Para Mostrar">
            </ListItemText> </ListItem> : '' }
            {items.map((item, index) => {
                return <IndividualItem key={index} item={item}></IndividualItem>
            })}

        </List>
        <Grid container justify="center">
            <Grid item lg={6} sm={12}>
                {lastPage > 1 ? <Pagination count={lastPage} color="secondary" onChange={handleChangePage} /> : ''}
            </Grid>
        </Grid>
    </div>
    );
}

export default ListItems;