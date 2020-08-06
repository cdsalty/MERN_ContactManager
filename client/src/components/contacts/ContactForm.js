import React, {useState, useContext, useEffect} from "react"; // to submit and add contacts to state, need useContext
import ContactContext from "../../context/contact/contactContext"; // to access state

const ContactForm = () => {
	// initialize context to use(to give access to any state or methods; we need a function: addContact)
	const contactContext = useContext(ContactContext);

	// Destructure contactContext
	const {addContact, clearCurrent, current} = contactContext;

	// Bring in 'useEffect' hook (runs if the contactContext or the current state is changed) (IF/WHEN USER CLICKS THE EDIT BUTTON)
	useEffect(() => {
		if (current !== null) {
			setContact(current); // add the current contacts value for whatever contact the user clicked edit for
		} else {
			// just clear it
			setContact({
				name: "",
				email: "",
				phone: "",
				type: "personal"
			});
		}
	}, [contactContext, current]);

	const [contact, setContact] = useState({
		name: "",
		email: "",
		phone: "",
		type: "personal" // default
	});

	const {name, email, phone, type} = contact; // destructure (pulling the values from contacts)

	const onChange = e => {
		setContact({...contact, [e.target.name]: e.target.value});
	};

	const onSubmit = e => {
		e.preventDefault();
		// contactContext.addContact(contact)
		addContact(contact); // once the form is submitted, it will look for addContact in ContactState and pass in the contact object
		setContact({
			name: "",
			email: "",
			phone: "",
			type: "personal"
		});
	};

	const clearAll = () => {
		clearCurrent(); // to set the 'current' state back to null;
	};

	return (
		<form onSubmit={onSubmit}>
			{/* <h3 className='text-primary'>Add Contact</h3> */}
			<h3 className='text-primary'>{current ? "Edit Contact" : "Add Contact"}</h3>
			<input
				type='text'
				placeholder='Name'
				name='name'
				value={name} // value will pertain to state
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
			{/* RADIO BUTTONS FOR CONTACT TYPE: Professional or Personal */}
			<h5>Contact Type:</h5>
			{/* Personl by default; {' '} for adding in a space */}
			<input
				type='radio'
				name='type'
				value='personal'
				checked={type === "personal"}
				onChange={onChange}
			/>
			Personal{" "}
			<input
				type='radio'
				name='type'
				value='professional'
				checked={type === "professional"}
				onChange={onChange}
			/>
			Professional
			<div>
				{/* Add Submit Button */}
				<input
					type='submit'
					value={current ? "Update Contact" : "Add Contact"}
					className='btn btn-primary btn-block'
				/>
			</div>
			{current && (
				<div>
					<button className='btn btn-light btn-block' onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
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
- Step 4: Create the functionality for the "onChange" handler to update state

---------------------------------------------------------------------------------------------------------------------
Handling Multiple Inputs in React:
	- When you need to handle multiple controlled input elements, you can add a name attribute to each element and let the 
		handler function choose what to do based on the value of event.target.name.
		EXAMPLE of how you would use this --> [name]: value



-------------_____________--------------->

Next: Once we fill out the 'add contact' form and click it, we need to add it to state
- ** Things you must know... if you are working with state, need to make sure to bring it in. (know we need to use ContactContext and useContext hook)
- Once you bring in the state via context, I can then start creating functionality to add a contact



*/
