import React from "react";
import classes from "./Drawer.module.css";
import { createPortal } from "react-dom";

function Drawer(props) {
	return (
		<>
			{true &&
				createPortal(
					<>
						<div className={classes.backdrop} />
						<div className={classes.drawer}></div>
					</>,
					document.getElementById("drawer-root")
				)}
		</>
	);
}

export default Drawer;
