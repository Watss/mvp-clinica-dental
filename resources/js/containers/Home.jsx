import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Page from '../components/Page';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(0)
    },
  }));

const Home = () => {
    const classes = useStyles();
    return (
        <Page className={classes.root} title="Home">
            <Container>
                <Grid container spacing={3}>
                    <Grid item
                        lg={12}
                        sm={12}
                        xl={12}
                        xs={12}
                    > 
                        <Typography align="center">
                            Home Page de ejemplo clinica dental
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Page>
        
    );
}

export default Home;