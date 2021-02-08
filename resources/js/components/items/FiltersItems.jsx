import { Box, Grid, TextField,Button } from '@material-ui/core';
import React from 'react';
import { AutoCompleteCategory } from '../catogory/AutoCompleteCategory';

export const FilterItems = ({handleOnChange,filter}) => {

    return (
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
                            <Button variant="contained" size="small" color="secondary" onClick={filter}>Buscar</Button>
                        </Grid>   
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}