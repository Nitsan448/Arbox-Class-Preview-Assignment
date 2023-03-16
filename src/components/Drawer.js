import React from "react";
import classes from "./Drawer.module.css";
import { createPortal } from "react-dom";

function Drawer(props) {
	const drawerClasses = props.isOpen ? `${classes.drawer} ${classes.active}` : classes.drawer;

	return (
		<>
			{createPortal(
				<>
					{/* {<div className={classes.backdrop} />} */}
					<div className={drawerClasses}></div>
				</>,
				document.getElementById("drawer-root")
			)}
		</>
	);
}

export default Drawer;
