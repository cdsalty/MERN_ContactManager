import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

// need to determine if I can remove <React.StrictMode> and where it came from/how it was added?
