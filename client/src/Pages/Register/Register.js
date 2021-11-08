import React, {useState} from 'react';
import {Alert, CircularProgress, Container, Grid, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {NavLink, useHistory} from "react-router-dom";
import login from "../../images/login.png";
import useAuth from "../../hooks/useAuth";

const Register = () => {
    const [loginData, setLoginData] = useState({})
    const {user, registerUser, isLoading, error} = useAuth()
    const history = useHistory()

    const handleOnChange = event => {
        const name = event.target.name
        const value = event.target.value

        setLoginData({
            ...loginData,
            [name]: value
        })
    }
    const handleRegistration = event => {
        if (loginData.password !== loginData.password2) {
            alert('password did not matched! try again.')
            return
        }
        registerUser(loginData.email, loginData.password, history, loginData.name)
        event.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{mt: 8}} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Register
                    </Typography>

                    {
                        !isLoading &&
                        <form onSubmit={handleRegistration}>
                            <TextField
                                sx={{width: '75%', m: 1}}
                                id="standard-basic0"
                                label="Your Name"
                                variant="standard"
                                name="name"
                                type="text"
                                required={true}
                                onChange={(event) => handleOnChange(event)}
                            />
                            <TextField
                                sx={{width: '75%', m: 1}}
                                id="standard-basic1"
                                label="Your Email"
                                variant="standard"
                                name="email"
                                type="email"
                                required={true}
                                onChange={(event) => handleOnChange(event)}
                            />
                            <TextField
                                sx={{width: '75%', m: 1}}
                                id="standard-basic2"
                                label="Your Password"
                                type="password"
                                variant="standard"
                                required={true}
                                name="password"
                                onChange={(event) => handleOnChange(event)}
                            />

                            <TextField
                                sx={{width: '75%', m: 1}}
                                id="standard-basic3"
                                label="Re-type Your Password"
                                type="password"
                                variant="standard"
                                required={true}
                                name="password2"
                                onChange={(event) => handleOnChange(event)}
                            />
                            <Button sx={{width: '75%', m: 1}} variant="contained" type="submit">Register</Button>


                            <NavLink to="/login" style={{textDecoration: "none"}}>
                                <Button variant="text">Already Registered? Please Login</Button>
                            </NavLink>
                        </form>
                    }

                    {
                        isLoading && <CircularProgress/>
                    }
                    {
                        user?.email && <Alert severity="success">User Created Successfully!</Alert>
                    }
                    {
                        error && <Alert severity="error">{error}</Alert>
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={login} alt=""/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;