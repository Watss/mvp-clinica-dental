import React from 'react';
import { List } from '@material-ui/core';
import ItemDentist from './ItemDentist';




const ListDentist = ({ dentists, classes }) => {
    
    return (
        <List dense={true}>
            {dentists.map((dentist , index)=>{
                  return <ItemDentist key={index} dentist={dentist} classes={classes}></ItemDentist>
            })}
       
        </List>
    );
}

export default ListDentist;