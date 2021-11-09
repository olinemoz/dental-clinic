import {Button, TextField, Alert} from '@mui/material';
import React, {useState} from 'react';
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const {token} = useAuth()

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }
    const handleAdminSubmit = e => {
        const user = {email};


        axios.put('http://localhost:5000/users/admin', user, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.data.modifiedCount) {
                    console.log(res.data);
                    setSuccess(true);
                }
            })

        e.preventDefault()
    }
    return (
        <div>
            <h2>Make an Admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField
                    sx={{width: '50%'}}
                    label="Email"
                    type="email"
                    onBlur={handleOnBlur}
                    variant="standard"/>
                <Button type="submit" variant="contained">Make Admin</Button>
            </form>
            {success && <Alert severity="success">Made Admin successfully!</Alert>}
        </div>
    );
};

export default MakeAdmin;