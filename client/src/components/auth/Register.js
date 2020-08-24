import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext"; // always initilize it after importing it

// 1
const Register = () => {
	// initialize the context
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	// step 7 after creating the AlertState, alertReducer and Alerts, etc.
	// pull/destructure setAlert from alertContext
	const { setAlert } = alertContext;
	const { register } = authContext;

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		password2: ""
	});
	// 2 Destructure out to use as variables
	const { name, email, password, password2 } = user;

	// 4
	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

	// 6
	const onSubmit = e => {
		e.preventDefault();
		// step 8: if name, email or password is empty
		if (name === "" || email === "" || password === "") {
			setAlert("Please complete all fields", "danger");
		} else if (password !== password2) {
			setAlert("Hey phat fingers, you mis-typed your password", "danger");
		} else {
			// console.log('The Form "REGISTER," (inside of Register.js) was submitted'); // ultimately, we'll want to sign in the user
			// register the user
			register({
				name, email, password
			});
		}
	};

	return (
		// 3
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Register</span>
			</h1>
			{/* 5 onSubmit */ }
			<form onSubmit={ onSubmit }>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input type='text' name='name' value={ name } onChange={ onChange } required />
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input type='email' name='email' value={ email } onChange={ onChange } required />
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={ password }
						onChange={ onChange }
						required
						minLength='6'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password2'>Confirm Password</label>
					<input
						type='password'
						name='password2'
						value={ password2 }
						onChange={ onChange }
						required
						minLength='6'
					/>
				</div>
				<input type='submit' value='Register' className='btn btn-primary btn-block' />
			</form>
		</div>
	);
};

export default Register;

/*
To make it work,
	- import it into App.js
	- Add route for register: <Route exact path = "/register" component = {Register} />
	- CONFIRM: go to localhost:3000/register
*/
