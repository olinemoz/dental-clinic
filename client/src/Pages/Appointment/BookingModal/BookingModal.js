import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookingModal = ({openBooking, handleBookingClose, date, setBookingSuccess, booking: {name, time}}) => {
    const {user} = useAuth()

    const initialInfo = {
        patientName: user.displayName,
        email: user.email,
        phoneNumber: ''
    }
    const [bookingInfo, setBookingInfo] = useState(initialInfo)

    const handleBookingBlur = (event) => {
        const name = event.target.name
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setBookingInfo({
            ...bookingInfo,
            [name]: value
        })
    }

    const handleBookSubmit = event => {
        const appointment = {
            ...bookingInfo,
            time,
            serviceName: name,
            date: date.toLocaleDateString()
        }
        //Collecting Data from From and Send to the Server.
        axios.post(`http://localhost:5000/appointments`, appointment)
            .then(response => {
                if (response.data.insertedId) {
                    setBookingSuccess(true)
                }
            })

        handleBookingClose()
        event.preventDefault();
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openBooking}
                onClose={handleBookingClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openBooking}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            {name}
                        </Typography>
                        <form onSubmit={handleBookSubmit}>
                            <TextField
                                sx={{
                                    width: "90%",
                                    m: 1
                                }}
                                id="outlined-size-small"
                                defaultValue={time}
                                disabled
                                size="small"
                            />
                            <TextField
                                sx={{
                                    width: "90%",
                                    m: 1
                                }}
                                id="outlined-size-small"
                                name="patientName"
                                defaultValue={user.displayName}
                                size="small"
                                onBlur={handleBookingBlur}
                            />
                            <TextField
                                sx={{
                                    width: "90%",
                                    m: 1
                                }}
                                id="outlined-size-small"
                                name="email"
                                defaultValue={user.email}
                                size="small"
                                onBlur={handleBookingBlur}
                            />
                            <TextField
                                sx={{
                                    width: "90%",
                                    m: 1
                                }}
                                id="outlined-size-small"
                                name="phoneNumber"
                                defaultValue=""
                                placeholder="Enter Phone Number"
                                size="small"
                                onBlur={handleBookingBlur}
                            />
                            <TextField
                                sx={{
                                    width: "90%",
                                    m: 1
                                }}
                                disabled={true}
                                id="outlined-size-small"
                                defaultValue={date.toDateString()}
                                size="small"
                            />
                            <Button type="submit" sx={{mt: 2, ml: 1}} variant="contained">Submit</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default BookingModal;