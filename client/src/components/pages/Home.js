import React from "react";
import Contacts from "../contacts/Contacts";

const Home = () => {
	return (
		// have the page will be a form, half will be contacts
		<div className='grid-2'>
			<div>
				{/* will replace the paragraph below with a contact form */}
				<p>ContactForm will be here</p>
			</div>
			<div>
				<Contacts />
			</div>
		</div>
	);
};

export default Home;

// http://localhost:3000
