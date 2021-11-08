import React, {useState} from 'react';
import {Alert, CircularProgress, Container, Grid, TextField, Typography} from "@mui/material";
import login from '../../../images/login.png'
import Button from "@mui/material/Button";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
    const [loginData, setLoginData] = useState({})
    const {user, loginUser, isLoading, error, handleGoogleSignedIn} = useAuth()
    const location = useLocation()
    const history = useHistory()

    const handleOnChange = event => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const handleLoginSubmit = event => {
        loginUser(loginData.email, loginData.password, location, history)
        event.preventDefault();
    }

    const handleGoogleLogin = () => {
        handleGoogleSignedIn(location, history)
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{mt: 8}} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Login
                    </Typography>

                    {
                        !isLoading && <form onSubmit={handleLoginSubmit}>
                            <TextField
                                sx={{width: '75%', m: 1}}
                                id="standard-basic1"
                                label="Your Email"
                                variant="standard"
                                name="email"
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
                            <Button sx={{width: '75%', m: 1}} variant="contained" type="submit">Login</Button>


                            <NavLink to="/register" style={{textDecoration: "none"}}>
                                <Button variant="text">New User? Please Register</Button>
                            </NavLink>
                        </form>
                    }
                    <p>-------------</p>
                    {
                        !isLoading &&
                        <Button variant="contained" onClick={handleGoogleLogin}>Google Sign In</Button>
                    }

                    {
                        isLoading && <CircularProgress/>
                    }
                    {
                        user?.email && <Alert severity="success">Login Successfully!</Alert>
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

export default Login;