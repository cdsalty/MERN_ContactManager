import React from "react";
import Contacts from "../contacts/Contacts";

import ContactForm from "../contacts/ContactForm";

const Home = () => {
	return (
		// have the page will be a form, half will be contacts
		<div className='grid-2'>
			<div>
				<ContactForm />
			</div>
			<div>
				<Contacts />
			</div>
		</div>
	);
};

export default Home;

// http://localhost:3000
