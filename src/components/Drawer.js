import React from "react";
import classes from "./Drawer.module.css";
import { createPortal } from "react-dom";

function Drawer(props) {
	const drawerClasses = props.isOpen ? `${classes.drawer} ${classes.active}` : classes.drawer;

	return (
		<>
			{createPortal(
				<>
					{props.isOpen && <div className={classes.backdrop} />}
					<div className={drawerClasses}>
						<div className={classes.utilityButtons}>
							<button className={classes.editClass}>
								<span className={classes.buttonText}>Edit</span>
							</button>
							<button className={classes.cancelClass}>
								<span className={classes.buttonText}>Cancel Class</span>
							</button>
						</div>
						<div className={classes.workoutOfTheDay}>
							<div className={classes.workoutOfTheDayIcon}></div>
							<p>Workout of the day</p>
						</div>

						<hr />
					</div>
				</>,
				document.getElementById("drawer-root")
			)}
		</>
	);
}

export default Drawer;
