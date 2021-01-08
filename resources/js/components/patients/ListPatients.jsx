import React from 'react';
import { List, ListSubheader, Box } from '@material-ui/core';
import ItemPatients from './ItemPatients';




const ListDentist = ({ dentists, classes }) => {

    return (
        <List dense={true}>
            <ListSubheader component="div" id="nested-list-subheader">

                <Box fontSize="h6.fontSize" fontWeight="medium" fontFamily="fontFamily" mt={2} mb={2}>Pacientes</Box>
            </ListSubheader>
            {dentists.map((dentist, index) => {
                return <ItemPatients key={index} dentist={dentist} classes={classes}></ItemPatients>
            })}

        </List>
    );
}

export default ListDentist;
