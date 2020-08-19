import React, {useContext} from "react";
import AlertContext from "../../context/alert/alertContext";

const Alerts = () => {
	const alertContext = useContext(AlertContext);

	return (
		alertContext.alerts.length > 0 &&
		alertContext.alerts.map(alert => (
			<div key={alert.id} className={`alert alert-${alert.type}`}>
				<i className='fas fa-info-circle' /> {alert.msg}
			</div>
		))
	);
};

export default Alerts;

/*
The goal is to out put this inside the main App.js
it's going to look at the alerts inside the alertContext; If there IS anything, then we will map through it and output the 'JSX' of the div

This would not work: What is difference:
// 	const alertContext = useContext(AlertContext); // alertContext represents the functionality inside alertReducer and AlertState

	// 	return (
	// 		alertContext.alerts.lengths > 0 &&
	// 		alertContext.alerts.map(alert => (
	// 			// the className needs to be dynamic since there are different alert types
	// 			<div key={alert.id} className={`alert alert-${alert.type}`}>
	// 				<i className='fas fa-info-circle' /> {alert.msg}
	// 			</div>
	// 		))
	// 	);
	// };

*/
