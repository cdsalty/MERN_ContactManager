import React, {useContext, useRef} from "react";
import ContactContext from "../../context/contacts/contactContext";

const ContactFilter = () => {
	const contactContext = useContext(ContactContext);
	const text = useRef("");

	const onChange = e => {
		// text.current.value // will give access to the current input value
		if (text.current.value !== "") {
			contactContext.filterConacts(e.target.value);
		} else {
			contactContext.clearFilter();
		}
	};

	return (
		<form>
			<input
				ref={text}
				type='text'
				placeholder='Search Contacts...'
				onChange={onChange}
			/>
		</form>
	);
};

export default ContactFilter;
