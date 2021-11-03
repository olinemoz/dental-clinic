import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from "./Pages/Home/Home/Home";
import Appointment from "./Pages/Appointment/Appoinment/Appointment";

function App() {
    return (
        <div className="App">
          <Router>
            <Switch>
                 <Route exact path="/" component={Home}/>
                 <Route exact path="/home" component={Home}>
                   <Redirect to="/" />
                 </Route>
                <Route exact path="/appointment" component={Appointment}/>
            </Switch>
          </Router>
        </div>
    );
}

export default App;
