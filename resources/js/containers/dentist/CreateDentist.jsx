import React from 'react';
import Page from '../../components/Page';
import FormDentist from '../../components/dentist/FormDentist';
import { makeStyles ,Container} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    formUser: {

        padding: 15
    },
    paperFormUser: {
        width: '27em',
    },
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(0)
    },
    container: {
        paddingLeft: 70,
        paddingRight: 70
    },
    containerFormDentist: {
        padding: 0,

    },
    labelCheckbox: {
        marginTop: '12px'
    },

    textField: {
        margin: 5
    },

    actionsButton: {
        marginTop: 25,
        marginBottom: 15

    },
    alertInfo: {
        width: '100%'
    }

}));

const CreateDentist = () => {

    const classes = useStyles();


    return (
        <Page className={classes.root} title="CreateDentist">
            <Container className={classes.container}>
                <FormDentist classes={classes}></FormDentist>
            </Container>
        </Page>

    );
}

export default CreateDentist;