import React from 'react';
import { List, ListSubheader, Box } from '@material-ui/core';
import ItemPatients from './ItemPatients';




const ListDentist = ({ Patients, classes }) => {

    return (
        <List dense={true}>
            <ListSubheader component="div" id="nested-list-subheader">

                <Box fontSize="h6.fontSize" fontWeight="medium" fontFamily="fontFamily" mt={2} mb={2}>Pacientes</Box>
            </ListSubheader>
            {Patients.map((Patients, index) => {
                return <ItemPatients key={index} Patients={Patients} classes={classes}></ItemPatients>
            })}

        </List>
    );
}

export default ListDentist;
