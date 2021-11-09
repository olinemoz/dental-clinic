import React, {useState} from 'react';
import {Grid} from "@mui/material";
import Calendar from "../../Shared/Calendar/Calendar";
import Appointments from "../Appointments/Appointments";

const DashboardHome = () => {
    const [date, setDate] = useState(new Date());
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
                <Calendar date={date} setDate={setDate}/>
            </Grid>
            <Grid item xs={12} md={7}>
                <Appointments date={date}/>
            </Grid>
        </Grid>
    );
};

export default DashboardHome;