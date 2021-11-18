import React from 'react';
import Navigation from "../../Shared/Navigation/Navigation";
import Services from "../Services/Services";
import AppointmentBanner from "../AppointmentBanner/AppointmentBanner";
import Banner from "../Banner/Banner";
import Doctors from "../Doctors/Doctors";

const Home = () => {
    return (
        <div>
            <Navigation/>
            <Banner/>
            <Services/>
            <Doctors/>
            <AppointmentBanner/>
        </div>
    );
};

export default Home;