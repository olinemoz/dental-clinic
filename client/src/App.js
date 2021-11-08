import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from "./Pages/Home/Home/Home";
import Appointment from "./Pages/Appointment/Appoinment/Appointment";
import Login from "./Pages/Login/Login/Login";
import Register from "./Pages/Register/Register";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./Pages/Login/Login/PrivateRoute/PrivateRoute";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/home" component={Home}>
                            <Redirect to="/"/>
                        </Route>
                        <PrivateRoute exact path="/appointment">
                            <Appointment/>
                        </PrivateRoute>
                        <PrivateRoute exact path="/dashboard">
                            <Dashboard/>
                        </PrivateRoute>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                    </Switch>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
