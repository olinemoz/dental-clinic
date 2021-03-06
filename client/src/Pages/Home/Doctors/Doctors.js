import React, {useEffect, useState} from 'react';
import {Container, Grid} from '@mui/material';
import Doctor from '../Doctor/Doctor';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/doctors')
            .then(res => res.json())
            .then(data => setDoctors(data))
    }, [])

    return (
        <>
            {
                doctors.length > 0 ? <div>
                    <h2>Our Doctors: </h2>
                    <Container>
                        <Grid container spacing={2}>
                            {
                                doctors.map(doctor => <Doctor
                                    key={doctor._id}
                                    doctor={doctor}
                                />)
                            }
                        </Grid>
                    </Container>
                </div> : ''
            }
        </>
    );
};

export default Doctors;