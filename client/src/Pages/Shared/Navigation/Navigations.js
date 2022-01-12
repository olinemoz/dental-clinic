import React from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {HashLink} from "react-router-hash-link";
import useAuth from "../../../hooks/useAuth";


const Navigations = () => {
    const {user, logOut} = useAuth()
    return (
        <Navbar variant="dark" fixed="top" expand="md" style={{backgroundColor: "black"}}>
            <Container>
                <Navbar.Brand as={HashLink} to="/">Dental Clinic</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <Nav.Link as={HashLink} to="/appointment">Appointment</Nav.Link>
                        <Nav.Link as={HashLink} to="/dashboard">Dashboard</Nav.Link>
                    </Nav>
                    {
                        user?.displayName && <Navbar.Text className="mx-3">
                            Signed in as: <a href="#login">{user?.displayName}</a>
                        </Navbar.Text>
                    }
                    {(user?.email || user?.displayName) ?
                        <div><a onClick={logOut} style={{color: 'blue', cursor: 'pointer'}}>Logout</a></div>
                        : <Nav.Link as={HashLink} to="/login">Login</Nav.Link>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigations;