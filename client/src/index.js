import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Original layout
// ReactDOM.render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>,
// 	document.getElementById("root")
// );

ReactDOM.render(
	<App />,

	document.getElementById("root")
);

// need to determine if I can remove <React.StrictMode> and where it came from/how it was added?
