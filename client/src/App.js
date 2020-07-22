import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import "./App.css";

const App = () => {
	return (
		// Surround everything from the return around "Router" <Router>
		<Router>
			<React.Fragment>
				<Navbar />
				<div className='container'>
					<Switch>
						{/* Temp setup until I create the Home and About page */}
						<Route exact path='/' component={Home} />
						<Route exact path='/about' component={About} />
					</Switch>
				</div>
			</React.Fragment>
		</Router>
	);
};

export default App;

// Why use Fragment over React.Fragment or <></> ?
