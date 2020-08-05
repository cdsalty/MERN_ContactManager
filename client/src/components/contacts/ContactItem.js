//to have each individual contact in the list to have it's own component.
import React, {useContext} from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext"; // to access the deleteContact method in ContactState

const ContactItem = ({contact}) => {
	const contactContext = useContext(ContactContext); // to access the deleteContact method
	const {deleteContact, setCurrent, clearCurrent} = contactContext; // de-structuring out the deleteContact method from the contactContext

	// destructure and take out what is needed to display in the ContactItem return
	const {id, name, email, phone, type} = contact;

	const onDelete = () => {
		deleteContact(id); // still need to create deleteContact functionility inside the ContactState component
		clearCurrent();
	};

	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{name}{" "}
				<span
					style={{float: "right"}}
					className={
						"badge " + (type === "professional" ? "badge-success" : "badge-primary")
					}
				>
					{/* {type} */}
					{/* Uppercase first letter of contact's type (only for frontend, display) */}
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			</h3>
			<ul className='list'>
				{email && (
					<li>
						<i className='fas fa-envelope-open'></i> {email}
					</li>
				)}
				{phone && (
					<li>
						<i className='fas fa-phone'></i> {phone}
					</li>
				)}
			</ul>
			<button
				className='btn btn-dark btn-sm'
				onClick={() => {
					setCurrent(contact); // created inside contactstate.js
				}}
			>
				Edit
			</button>
			<button className='btn btn-danger btn-sm' onClick={onDelete}>
				Delete
			</button>
		</div>
	);
};
// Need better clarification for this
ContactItem.propTypes = {
	contact: PropTypes.object.isRequired // ptor for short
};

export default ContactItem;

// {name}{" "} work-around to get a space between

/*

GOOD TO KNOW:
- for the type, it needs to have the first letter capitalized; not in the database, but on the display
	--> {type.charAt(0).toUpperCase() + type.slice(1)}
	
Next Task: 
- move the badge over the right (for professional or personal type)
- add in the id, email and phone 
- will also need to add in a couple buttons

** When adding the email and phone, it is very important to check if they exist first BECAUSE they are not required when creating a user/contact
				<ul className='list'>
					{email && (
						<li>
							<i className='fas fa-envelope-open'></i> {email}
						</li>
					)}
				</ul>

** There is also a "contact" prop; Bring in  " prop types" to get access too. 
*/
