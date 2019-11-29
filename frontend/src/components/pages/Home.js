import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(5),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    gaaa: {
        marginTop: 100
    },

}));

const Home = () => {


    const [data, setData] = useState({
        name: '',
        lastname: '',
        email: '',
        cellphone: '',
        dni: '',
        university: '',
        assistance: false
    });


    const submit = (e) => {
        e.preventDefault();
        const user = { name: data.name, lastname: data.lastname, email: data.email, cellphone: data.cellphone, dni: data.dni, university: data.university, assistance: false };
        Axios.post('/attendees/', user)
            .then(res => {
                console.log(res.data)
            }).catch((error) =>
                console.log(error));
    }

    const onChange = (e) => {
        e.persist();
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs" className={classes.gaaa}>
            <CssBaseline />
            <div className={classes.paper} >
                <form className={classes.form} onSubmit={submit}>
                    <Grid  >
                        <Grid item xs={12} >
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                type="text"
                                label="Name"
                                autoFocus
                                value={data.name}
                                onChange={onChange}
                            />
                        </Grid>

                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastname"
                                type="text"
                                label="Last Name"
                                name="lastname"
                                value={data.lastname}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                type="text"
                                label="Email Address"
                                name="email"
                                autoComplete="femail"
                                value={data.email}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="cellphone"
                                label="Cell Phone"
                                type="text"
                                id="cellphone"
                                autoComplete="fcellphone"
                                value={data.cellphone}
                                onChange={onChange} c
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="dni"
                                label="DNI"
                                type="text"
                                id="dni"
                                autoComplete="fdni"
                                value={data.dni}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="university"
                                label="University"
                                type="text"
                                id="university"
                                autoComplete="fcellphone"
                                value={data.university}
                                onChange={onChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >Registrarse            </Button>

                </form>
            </div>
        </Container >
    );
};

export default Home;