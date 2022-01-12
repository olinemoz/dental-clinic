import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Container} from "@mui/material";
import Service from "../Service/Service";
import fluoride from '../../../images/fluoride.png';
import cavity from '../../../images/cavity.png';
import whitening from '../../../images/whitening.png';
import Typography from "@mui/material/Typography";

const services = [
    {
        name: 'Fluoride Treatment',
        description: 'Fluoride treatments are typically professional treatments containing a high concentration of fluoride that a dentist or hygienist will apply to a person\'s teeth to improve health and reduce the risk of cavities.',
        img: fluoride
    },
    {
        name: 'Cavity Filling',
        description: 'Fillings treat tooth decay, preventing further damage and tooth loss, as well as the possibility of pain and infection. A filling seals a hole, or cavity, in the tooth.',
        img: cavity
    },
    {
        name: 'Teeth Whitening',
        description: 'Teeth whitening involves bleaching your teeth to make them lighter. It can\'t make your teeth brilliant white, but it can lighten the existing colour by several shades.',
        img: whitening
    }
]

const Services = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <Container>
                <Typography
                    sx={{fontWeight: '500', color: 'success.main', m: 2}}
                    variant="h6" component="div"
                >
                    OUR SERVICES
                </Typography>
                <Typography sx={{fontWeight: '600', m: 5}} variant="h4" component="div">
                    Services We Provide
                </Typography>
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                    {services.map(service => (
                        <Service service={service} key={service.name}/>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;