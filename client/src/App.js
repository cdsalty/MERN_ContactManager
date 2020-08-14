import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import "./App.css";

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<Router>
					<React.Fragment>
						<Navbar />
						<div className='container'>
							<Switch>
								<Route exact path='/' component={Home} />
								<Route exact path='/about' component={About} />
								<Route exact path='/register' component={Register} />
								<Route exact path='/login' component={Login} />
							</Switch>
						</div>
					</React.Fragment>
				</Router>
			</ContactState>
		</AuthState>
	);
};

export default App;

// Why use Fragment over React.Fragment or <></> ?
// Took in ContactState and placed it around everything, including the Router... Contact state is passing in the context provider.
