import React, {useState} from "react";

const ContactForm = () => {
	const [contact, setContact] = [
		{
			name: "",
			email: "",
			phone: "",
			type: "personal" // default
		}
	];

	const {name, email, phone, type} = contact; // destructure (pulling the values from contacts)

	// Event Handler
	const onChange = (e) => {
		// update the target's name to the value given(get the key of the target(in this case, it's name) and set it to the user's input.)
		setContact({...contact, [e.target.name]: e.target.value});
	};

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
				value={email} // will set the user's email to the value entered
				onChange={onChange}
			/>
			<input
				type='text'
				placeholder='Phone'
				name='phone'
				value={phone} // phone will now equal the value of the user's input
				onChange={onChange}
			/>
			<h5>Contact Type:</h5>
			<input type='radio' name='type' value='personal' checked={type === "personal"} />
			Personal{" "}
			{/* if the current type is personal, then have it checked otherwise, check the professional; it's personal by default */}
			<input
				type='radio'
				name='type'
				value='professional'
				checked={type === "professional"}
			/>
			Professional {/* Add Submit Button */}
			<div>
				<input type='submit' value='Add Contact' className='btn btn-primary btn-block' />
			</div>
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
- Step 3: Add inputs and Button to Add the contact
- Step 4: Create the functionality for the "onChange" handler
	- pass in the event

*/
