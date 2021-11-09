import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
    Switch,
    Route,
    useRouteMatch,
    NavLink
} from "react-router-dom";
import {Button} from '@mui/material';
import DashboardHome from '../DashboardHome/DashboardHome';
import MakeAdmin from "./MakeAdmin";
import AddDoctor from "./AddDoctor";
import useAuth from "../../../hooks/useAuth";
import AdminRoute from "../../Login/Login/AdminRoute/AdminRoute";


const drawerWidth = 200;

function Dashboard(props) {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let {path, url} = useRouteMatch();
    const {admin} = useAuth()
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar/>
            <Divider/>
            <NavLink to="/appointment" style={{textDecoration: 'none', color: 'black'}}>
                <Button color="inherit">Appointment</Button>
            </NavLink>
            <NavLink to={`${url}`} style={{textDecoration: 'none', color: 'black'}}>
                <Button color="inherit">Dashboard</Button>
            </NavLink>
            {
                admin && <Box>
                    <NavLink to={`${url}/makeAdmin`} style={{textDecoration: 'none', color: 'black'}}>
                        <Button color="inherit">Make Admin</Button>
                    </NavLink>
                    <NavLink to={`${url}/addDoctor`} style={{textDecoration: 'none', color: 'black'}}>
                        <Button color="inherit">Add Doctor</Button>
                    </NavLink>
                </Box>
            }
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
            >
                <Toolbar/>

                <Switch>
                    <Route exact path={path}>
                        <DashboardHome/>
                    </Route>
                    <AdminRoute path={`${path}/makeAdmin`}>
                        <MakeAdmin/>
                    </AdminRoute>
                    <AdminRoute path={`${path}/addDoctor`}>
                        <AddDoctor/>
                    </AdminRoute>
                </Switch>

            </Box>
        </Box>
    );
}


export default Dashboard;