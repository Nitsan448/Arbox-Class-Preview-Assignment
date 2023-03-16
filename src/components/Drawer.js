import React from "react";
import classes from "./Drawer.module.css";
import { createPortal } from "react-dom";

function Drawer(props) {
	const drawerClasses = props.isOpen ? `${classes.drawer} ${classes.active}` : classes.drawer;
	const backdropClasses = props.isOpen ? `${classes.backdrop} ${classes.activeBackdrop}` : classes.backDrop;

	return (
		<>
			{createPortal(
				<>
					<div className={backdropClasses} />
					<div className={drawerClasses}>
						<div className={classes.utilityButtons}>
							<button className={`${classes.utilityButtons__editClass} icon`}>
								<span className={classes.utilityButtons__buttonText}>Edit</span>
							</button>
							<button className={`${classes.utilityButtons__cancelClass} icon`}>
								<span className={classes.utilityButtons__buttonText}>Cancel Class</span>
							</button>
						</div>
						<div className={classes.workoutOfTheDay}>
							<div className={`${classes.workoutOfTheDay__icon} icon`}></div>
							<p>Workout of the day</p>
						</div>
						<hr />
						<div className={classes.classInformation}>
							<div>
								<div className={`${classes.classInformation__coachIcon} icon`} />
								<h4>Tom A</h4>
								<p className={classes.classInformation__text}>Coach</p>
							</div>
							<div>
								<div className={`${classes.classInformation__startTimeIcon} icon`}></div>
								<h4>16:15</h4>
								<p className={classes.classInformation__text}>Start Time</p>
							</div>
							<div>
								<div className={`${classes.classInformation__participentsIcon} icon`}></div>
								<h4>3/15</h4>
								<p className={classes.classInformation__text}>Participents</p>
							</div>
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
