import React from 'react';
import Grid from '@mui/material/Grid';
import chair from '../../../images/chair.png';
import bg from '../../../images/bg.png';
import {Typography, Button, Container} from '@mui/material';
import Box from '@mui/material/Box';
import {useHistory} from "react-router-dom";


const bannerBg = {
    background: `url(${bg})`,
}

const verticalCenter = {
    display: 'flex',
    alignItems: 'center',
    height: 400
}

const Banner = () => {
    const history = useHistory()
    const goToAppointment = () => {
        history.push('/appointment')
    }
    return (
        <Container style={bannerBg} sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item style={{...verticalCenter, textAlign: 'left'}} xs={12} md={6}>
                    <Box>
                        <Typography variant="h3">
                            Your New Smile <br/>
                            Starts Here
                        </Typography>
                        <Typography variant="h6" sx={{my: 3, fontSize: 13, fontWeight: 300, color: 'gray'}}>
                            Get Appointment Here
                        </Typography>
                        <Button variant="contained" style={{backgroundColor: '#5CE7ED'}} onClick={goToAppointment}>Get
                            Appointment</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} style={verticalCenter}>
                    <img style={{width: '350px'}} src={chair} alt=""/>
                </Grid>

            </Grid>
        </Container>
    );
};

export default Banner;