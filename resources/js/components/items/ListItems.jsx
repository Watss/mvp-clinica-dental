import React, { useState,useEffect } from 'react';
import { List, ListSubheader, Box,Grid, TextField,Button, ListItemText, ListItem } from '@material-ui/core';
import IndividualItem from './IndividualItem';
import axiosInstance from '../../utils/axios';
import { AutoCompleteCategory } from '../catogory/AutoCompleteCategory';
import { Alert, Pagination } from '@material-ui/lab';




const ListItems = () => {

    const [items,setItems] = useState([]);
    const [pages,setPages] = useState({
        total: 0,
        actually: 1
    })
    const [form,setForm] = useState({category_id:'',name:''});
    const [loader, setLoader] = useState(true);

    const getItems = async (page=1) => {
        setLoader(true);
        try {
            const res = await axiosInstance.get('/items',{params:{
                'filter[name]': `${form.name}`,
                'filter[category]' : `${form.category_id}`,
                'page[number]': page
            }});
            const { data,meta } = res.data
            
            setItems(data);
            setPages({...pages, total: meta.total / meta.per_page, actually: meta.current_page});

        } catch (error) {
            
        } finally {
            setLoader(false);
        }
    }
    
    const handleChangePage = (event,value) => {
        getItems(value);
    }

    const handleOnChange = (e,value) => {
        if(value){
            setForm({
                ...form,
                'category_id': value.id
            })
        }else{
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }

        console.log(form);
    }

    useEffect( () => {
        getItems();
    },[]);

    return ( 
    <div>
        <List dense={true}>
            <ListSubheader component="div" id="nested-list-subheader">
                <Grid container>
                    <Grid item lg={5}>
                        <Box fontSize="h6.fontSize" fontWeight="medium" fontFamily="fontFamily" mt={2} mb={2}>Prestaciones</Box>
                    </Grid>
                    <Grid item lg={7}>
                        <Box mt={2} mb={2}>
                            <Grid container justify="space-between">
                                <Grid item lg={3}>
                                    <AutoCompleteCategory onChange={handleOnChange}></AutoCompleteCategory>
                                </Grid>
                                <Grid item lg={3}>
                                    <TextField
                                    style={{ margin: 5 }}
                                        id="search-name"
                                        label="Buscar"
                                        name="name"
                                        variant="outlined"
                                        size="small"
                                        color="primary"
                                        onKeyUp={handleOnChange}
                                        onChange={handleOnChange}
                                    />
                                </Grid>
                                <Grid item lg={3}>
                                    <Button variant="contained" size="small" color="secondary" onClick={() => getItems()}>Buscar</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                
                
            </ListSubheader>
            { items.length == 0 ?<ListItem selected> <ListItemText primary="No se Econtraron Prestaciones Para Mostrar">
            </ListItemText> </ListItem> : '' }
            {items.map((item, index) => {
                return <IndividualItem key={index} item={item}></IndividualItem>
            })}

        </List>
        <Grid container justify="center">
            <Grid item lg={6} sm={12}>
                {pages.total > 1 ? <Pagination count={pages.total} color="secondary" onChange={handleChangePage} /> : ''}
            </Grid>
        </Grid>
    </div>
    );
}

export default ListItems;