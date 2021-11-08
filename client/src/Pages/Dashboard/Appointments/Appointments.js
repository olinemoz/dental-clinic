import React, {useEffect, useState} from 'react';
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Appointments = ({date}) => {
    const {user} = useAuth()
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        const url = `http://localhost:5000/appointments?email=${user.email}&date=${date}`
        axios.get(url)
            .then(response => setAppointments(response.data))
    }, [user.email, date])

    return (
        <div>
            <h2>Appointments: {appointments.length}</h2>
            <TableContainer component={Paper}>
                <Table  aria-label="Appointments table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient Name</TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Service</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.patientName}
                                </TableCell>
                                <TableCell align="right">{row.time}</TableCell>
                                <TableCell align="right">{row.serviceName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Appointments;