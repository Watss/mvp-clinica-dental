import React from 'react';
import { List, ListSubheader, Box } from '@material-ui/core';
import ItemDentist from './ItemDentist';




const ListDentist = ({ dentists, classes }) => {

    return (
        <List dense={true}>
            <ListSubheader component="div" id="nested-list-subheader">

                <Box fontSize="h6.fontSize" fontWeight="medium" fontFamily="fontFamily" mt={2} mb={2}>Odontologos</Box>
            </ListSubheader>
            {dentists.map((dentist, index) => {
                return <ItemDentist key={index} dentist={dentist} classes={classes}></ItemDentist>
            })}

        </List>
    );
}

export default ListDentist;