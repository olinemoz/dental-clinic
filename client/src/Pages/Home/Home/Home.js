import React from 'react';
import Services from "../Services/Services";
import AppointmentBanner from "../AppointmentBanner/AppointmentBanner";
import Banner from "../Banner/Banner";
import Doctors from "../Doctors/Doctors";
import Navigations from "../../Shared/Navigation/Navigations";

const Home = () => {
    return (
        <div>
            <Navigations/>
            <Banner/>
            <Services/>
            <Doctors/>
            <AppointmentBanner/>
        </div>
    );
};

export default Home;