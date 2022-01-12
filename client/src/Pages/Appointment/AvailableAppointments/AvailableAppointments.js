import React, {useEffect, useState} from 'react';
import {Alert, Container, Grid, Typography} from "@mui/material";
import Booking from "../Booking/Booking";
import axios from "axios";

const AvailableAppointments = ({date}) => {
    const [bookingSuccess, setBookingSuccess] = useState(false)
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/availableAppointments`)
            .then(response => setBookings(response.data))
    }, [])

    return (
        <Container style={{marginBottom: "30px"}}>
            <Typography variant="h4" sx={{color: 'info.main', mb: 3}} component="div">
                Available Appointments on {date.toDateString()}
            </Typography>
            {
                bookingSuccess && <Alert severity="success">Appointment Booked Successfully!</Alert>
            }
            <Grid container spacing={2}>
                {
                    bookings.map(booking => <Booking
                        key={booking.id}
                        booking={booking}
                        date={date}
                        setBookingSuccess={setBookingSuccess}
                    >
                    </Booking>)
                }
            </Grid>
        </Container>
    );
};

export default AvailableAppointments;