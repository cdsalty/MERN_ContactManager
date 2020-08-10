import React, {useContext, useRef, useEffect} from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
	const contactContext = useContext(ContactContext);
	const text = useRef(""); // must initialize a value

	// Destructure contactContext
	const {filterContacts, clearFilter, filtered} = contactContext;

	useEffect(() => {
		if (filtered === null) {
			text.current.value = "";
		}
	});

	const onChange = e => {
		// text.current.value // will give access to the current input value
		if (text.current.value !== "") {
			// run filterContacts and pass in the target value which is the text entered
			filterContacts(e.target.value);
		} else {
			clearFilter();
		}
	};

	return (
		<form>
			<input
				ref={text}
				type='text'
				placeholder='Search Contacts...'
				onChange={onChange} // we call it on itself because we want to filter each input
			/>
		</form>
	);
};

export default ContactFilter;
