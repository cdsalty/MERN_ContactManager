import React, {useContext} from "react";
import AlertContext from "../../context/alert/alertContext";

const Alerts = () => {
	const alertContext = useContext(AlertContext); // alertContext represents the functionality inside alertReducer and AlertState

	return (
		// check if the lenth of the array is greater than 0. If it is, THEN (&&)... (comes from the value of AlertState.js)
		alertContext.alerts > 0 &&
		alertContext.alerts.map(alert => (
			<div key={alert.id} className={`alert alert-${alert.type}`}>
				<i className='fas fa-info-circle' /> {alert.msg}
			</div>
		))
	);
};

export default Alerts;

/*
it's going to look at the alerts inside the alertContext; If there IS anything, then we will map through it and output the 'JSX' of the div
*/
