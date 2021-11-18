import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import {Elements} from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51JGgdREVyU5rfZ6fRFWNO42LSrSFAFP522phQWoR9c99uxiT0jmZ8mInbCM2ECpimNwtrBVi0bULuTYEe10u64t000HvCQ2dcK');
const Payment = () => {
    const [appointment, setAppointment] = React.useState({})
    const {appointmentId} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/appointments/${appointmentId}`)
            .then(res => {
                setAppointment(res.data)
            })
    }, [appointmentId])
    return (
        <div>
            <h2>Please pay for: {appointment.patientName} for {appointment.serviceName}</h2>
            <h4>${appointment.price}</h4>

            {
                appointment?.price &&
                <Elements stripe={stripePromise}>
                    <CheckOutForm appointment={appointment}/>
                </Elements>
            }
        </div>
    );
};

export default Payment;