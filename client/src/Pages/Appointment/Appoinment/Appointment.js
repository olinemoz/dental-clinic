import React, {useState} from 'react';
import Navigations from "../../Shared/Navigation/Navigations";
import AppointmentHeader from "../AppointmentHeader/AppointmentHeader";
import AvailableAppointments from "../AvailableAppointments/AvailableAppointments";

const Appointment = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div>
            <Navigations/>
            <AppointmentHeader date={date} setDate={setDate}/>
            <AvailableAppointments date={date}/>
        </div>
    );
};

export default Appointment;