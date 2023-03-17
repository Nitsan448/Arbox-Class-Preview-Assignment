import React, { useState } from "react";
import classes from "./Drawer.module.css";
import { createPortal } from "react-dom";
import testIcon from "../images/MichalScott.jpg";

function Drawer(props) {
	const drawerClasses = props.isOpen ? `${classes.drawer} ${classes.active}` : classes.drawer;
	const backdropClasses = props.isOpen ? `${classes.backdrop} ${classes.activeBackdrop}` : classes.backDrop;

	const [isDropDownOpen, setIsDropDownOpen] = useState(false);

	const [classParticipents, setClassParticipents] = useState([
		{ id: 0, name: "Walter White", photo: testIcon, checkedIn: false, participates: true },
		{ id: 1, name: "Michal Scott", photo: testIcon, checkedIn: false, participates: true },
		{ id: 2, name: "Todd Chavez", photo: testIcon, checkedIn: false, participates: false },
	]);

	function toggleParticipentCheckedInState(participentId) {
		setClassParticipents(
			classParticipents.map((participent) =>
				participent.id === participentId ? { ...participent, checkedIn: !participent.checkedIn } : participent
			)
		);
	}

	function toggleParticipentParticipatesState(participentId) {
		setClassParticipents(
			classParticipents.map((participent) =>
				participent.id === participentId
					? { ...participent, participates: !participent.participates }
					: participent
			)
		);
	}

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
			// TODO: Make text length not change position of each div
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
		// TODO: Add animation to drop down?
		return (
			<div className={classes.dropDownSection}>
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
										<button
											onClick={() => toggleParticipentParticipatesState(participent.id)}
											className={classes.dropDown__client}
											key={participent.id}>
											<img
												className={classes.clientImage}
												alt={participent.name}
												src={participent.photo}></img>
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

	function renderParticipents() {
		return (
			<div>
				{classParticipents.map(
					(participent) =>
						participent.participates && (
							<div className={classes.participents} key={participent.id}>
								<img
									className={classes.participentImage}
									alt={participent.name}
									src={participent.photo}
									width={24}
									height={24}></img>
								<p className={classes.participentName}>{participent.name}</p>
								<button
									onClick={() => toggleParticipentCheckedInState(participent.id)}
									className={classes.checkInButton}>
									{participent.checkedIn ? "Checked" : "Check In"}
								</button>
								<button className={`${classes.callButton} icon`} />
								<button
									onClick={() => toggleParticipentParticipatesState(participent.id)}
									className={`${classes.deleteButton} icon`}
								/>
							</div>
						)
				)}
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
						{renderParticipents()}
					</div>
				</>,
				document.getElementById("drawer-root")
			)}
		</>
	);
}

export default Drawer;
