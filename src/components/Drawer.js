import React, { useState } from "react";
import classes from "./Drawer.module.css";
import { createPortal } from "react-dom";
import testIcon from "../images/call.svg";

function Drawer(props) {
	const drawerClasses = props.isOpen ? `${classes.drawer} ${classes.active}` : classes.drawer;
	const backdropClasses = props.isOpen ? `${classes.backdrop} ${classes.activeBackdrop}` : classes.backDrop;

	const [classParticipents, setClassParticipents] = useState([
		{ name: "Walter White", participates: false, photo: testIcon },
		{ name: "Michal Scott", participates: false, photo: testIcon },
		{ name: "Todd Chavez", participates: false, photo: testIcon },
	]);
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);

	function renderUtilityButtonsSection() {
		return (
			<div className={classes.utilityButtons}>
				<button className={`${classes.utilityButtons__editClass} icon`}>
					<span className={classes.utilityButtons__buttonText}>Edit</span>
				</button>
				<button className={`${classes.utilityButtons__cancelClass} icon`}>
					<span className={classes.utilityButtons__buttonText}>Cancel Class</span>
				</button>
			</div>
		);
	}

	function renderWorkoutOfTheDaySection() {
		return (
			<div className={classes.workoutOfTheDay}>
				<div className={`${classes.workoutOfTheDay__icon} icon`}></div>
				{/* TODO: change to something funny */}
				<p>Workout of the day</p>
			</div>
		);
	}

	function renderClassInformationSection() {
		return (
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
					{/* TODO: change this according to number of participents */}
					<h4>3/15</h4>
					<p className={classes.classInformation__text}>Participents</p>
				</div>
			</div>
		);
	}

	function renderYouShouldKnowSection() {
		return (
			<div className={classes.youShouldKnow}>
				{/* TODO: make it less bold */}
				<h3>You Should Know...</h3>

				{/* TODO: make this something funny and according to the participent */}
				<p className={classes.youShouldKnowText}>Dagan & Eden which participates in the class have a debt</p>
			</div>
		);
	}

	function renderDropDownMenu() {
		return (
			<div className={classes.participents}>
				<p>Participents</p>
				<div className={classes.dropDown}>
					<button
						className={classes.dropDown__stateButton}
						onClick={() => {
							setIsDropDownOpen(!isDropDownOpen);
						}}>
						<span>Add Client</span>
						<span className={classes.dropDown__plus}>+</span>
					</button>
					{isDropDownOpen && (
						<div className={classes.dropDown__clients}>
							{classParticipents.map(
								(participent) =>
									!participent.participates && (
										<button className={classes.dropDown__client} key={participent.name}>
											<img src={participent.photo} width={24} height={24}></img>
											{participent.name}
										</button>
									)
							)}
						</div>
					)}
				</div>
			</div>
		);
	}

	return (
		<>
			{createPortal(
				<>
					<div className={backdropClasses} />
					<div className={drawerClasses}>
						{renderUtilityButtonsSection()}
						{renderWorkoutOfTheDaySection()}
						<hr />
						{renderClassInformationSection()}
						<hr />
						{renderYouShouldKnowSection()}
						<hr />
						{renderDropDownMenu()}
					</div>
				</>,
				document.getElementById("drawer-root")
			)}
		</>
	);
}

export default Drawer;
