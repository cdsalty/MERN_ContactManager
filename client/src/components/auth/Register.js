import React, {useState} from "react";
// 1
const Register = () => {
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		password2: ""
	});
	// 2 Destructure out to use as variables
	const {name, email, password, password2} = user;

	// 4
	const onChange = e => setUser({...user, [e.target.name]: e.target.value});

	// 6
	const onSubmit = e => {
		e.preventDefault();
		// ultimately, we'll want to sign in the user
		console.log('Form "REGISTER" was submitted');
	};

	return (
		// 3
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Register</span>
			</h1>
			{/* 5 onSubmit */}
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input type='text' name='name' value={name} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input type='email' name='email' value={email} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input type='password' name='password' value={password} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='password2'>Confirm Password</label>
					<input type='password' name='password2' value={password2} onChange={onChange} />
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
