import React, {useState} from "react";

// 1
// unlike register, won't need name or password2
const Login = () => {
	const [user, setUser] = useState({
		email: "",
		password: ""
	});
	// 2 Destructure out to use as variables
	const {email, password} = user;

	// 4
	const onChange = e => setUser({...user, [e.target.name]: e.target.value});

	// 6
	const onSubmit = e => {
		e.preventDefault();
		// ultimately, we'll want to sign in the user
		console.log('Form "Login" was submitted');
	};

	return (
		// 3
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Login</span>
			</h1>
			{/* 5 onSubmit */}
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input type='email' name='email' value={email} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input type='password' name='password' value={password} onChange={onChange} />
				</div>

				<input type='submit' value='login' className='btn btn-primary btn-block' />
			</form>
		</div>
	);
};

export default Login;

/*
To make it work,
	- import it into App.js
	- Add route to login: <Route exact path = "/login" component = {Login} />
	- CONFIRM: go to localhost:3000/login
*/
