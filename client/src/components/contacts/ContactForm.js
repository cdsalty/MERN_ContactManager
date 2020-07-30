import React, {useState} from "react";

const ContactForm = () => {
	// define state
	const [contact, setContact] = [
		{
			name: "",
			email: "",
			phone: "",
			type: "personal" // default
		}
	];

	// pull the values from contact:
	const {name, email, phone, type} = contact; //

	return (
		<form>
			<h3 className='text-primary'>Add Contact</h3>
			<input
				type='text'
				placeholder='Name'
				name='name'
				value={name}
				onChange={onChange}
			/>
			<input
				type='email'
				placeholder='Email'
				name='email'
				value={email}
				onChange={onChange}
			/>
			<input
				type='text'
				placeholder='Phone'
				name='phone'
				value={phone}
				onChange={onChange}
			/>
			<input
				type='text'
				placeholder='Type'
				name='type'
				value={type}
				onChange={onChange}
			/>
			<h5>Contact Type:</h5>
			{/* Create Radio Button: */}
		</form>
	);
};

export default ContactForm;

/*
the ContactForm will be used to add and update contacts; 
- step 1: get form dislayed and setup correctly
  - set/define the state;
  - extra the values from contact to work call on individually
  - create the form in the return
  *** reminder: The value corressponds with state 
    - create/define onClick handler
- Step 2: repeat for email, phone and type, changing each accordingly.     


*/
