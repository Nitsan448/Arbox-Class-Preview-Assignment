import React, { useState } from "react";
import classes from "./Drawer.module.css";
import { createPortal } from "react-dom";
import testIcon from "../images/MichalScott.jpg";
import Participant from "./Participant";

function Drawer(props) {
	const drawerClasses = props.isOpen ? `${classes.drawer} ${classes.active}` : classes.drawer;
	const backdropClasses = props.isOpen ? `${classes.backdrop} ${classes.activeBackdrop}` : classes.backDrop;

	const [isDropDownOpen, setIsDropDownOpen] = useState(false);

	const [participants, setparticipants] = useState([
		{ id: 0, name: "Walter White", image: testIcon, checkedIn: false, inClass: false },
		{ id: 1, name: "Michal Scott", image: testIcon, checkedIn: false, inClass: false },
		{ id: 2, name: "Todd Chavez", image: testIcon, checkedIn: false, inClass: false },
	]);

	function renderClassButtonsSection() {
		return (
			<div className={classes.classButtons}>
				<button className={`${classes.classButtons__editClass} icon`}>
					<span className={classes.classButtons__buttonText}>Edit</span>
				</button>
				<button className={`${classes.classButtons__cancelClass} icon`}>
					<span className={classes.classButtons__buttonText}>Cancel Class</span>
				</button>
			</div>
		);
	}

	function renderWorkoutOfTheDaySection() {
		return (
			<div className={classes.workoutOfTheDay}>
				<div className={`${classes.zumbaIcon} icon`}></div>
				<h3>Zumba</h3>
			</div>
		);
	}

	function renderClassInformationSection() {
		return (
			// TODO: Make text length not change position of each div
			<div className={classes.classInformation}>
				<div>
					<div className={`${classes.classInformation__coachIcon} icon`} />
					<h4>Leslie Knope</h4>
					<p className={classes.classInformation__text}>Coach</p>
				</div>
				<div>
					<div className={`${classes.classInformation__startTimeIcon} icon`}></div>
					<h4>19:00</h4>
					<p className={classes.classInformation__text}>Start Time</p>
				</div>
				<div>
					<div className={`${classes.classInformation__participantsIcon} icon`}></div>
					<h4>{getNumberOfClassparticipants()}/15</h4>
					<p className={classes.classInformation__text}>Participants</p>
				</div>
			</div>
		);
	}

	function getNumberOfClassparticipants() {
		return participants.filter((particpent) => particpent.inClass).length;
	}

	function renderYouShouldKnowSection() {
		return (
			<div className={classes.youShouldKnow}>
				{/* TODO: make it less bold */}
				<h3>You Should Know...</h3>

				{/* TODO: make this something funny and according to the participant */}
				<p className={classes.youShouldKnowText}>Dagan & Eden which is in the class have a debt</p>
			</div>
		);
	}

	function renderDropDownSection() {
		// TODO: Add animation to drop down?
		return (
			<div className={classes.dropDownSection}>
				<p>participants</p>
				<div className={classes.dropDown}>
					<button
						className={classes.dropDown__stateButton}
						onClick={() => {
							setIsDropDownOpen(!isDropDownOpen);
						}}>
						<span>Add Client</span>
						<span className={classes.dropDown__plus}>+</span>
					</button>
					{isDropDownOpen && renderDropDownMenu()}
				</div>
			</div>
		);
	}

	function renderDropDownMenu() {
		return (
			<div className={classes.dropDown__clients}>
				{participants.map(
					(participant) =>
						!participant.inClass && (
							<button
								onClick={() => {
									setIsDropDownOpen(false);
									toggleparticipantInClassState(participant.id);
								}}
								className={classes.dropDown__client}
								key={participant.id}>
								<img
									className={classes.clientImage}
									alt={participant.name}
									src={participant.image}></img>
								{participant.name}
							</button>
						)
				)}
			</div>
		);
	}

	function renderparticipantsSection() {
		return (
			<>
				{participants.map(
					(participant) =>
						participant.inClass && (
							<Participant
								participant={participant}
								toggleCheckedInState={toggleparticipantCheckedInState}
								toggleInClassState={toggleparticipantInClassState}
								key={participant.id}
							/>
						)
				)}
			</>
		);
	}

	function toggleparticipantCheckedInState(participantId) {
		setparticipants(
			participants.map((participant) =>
				participant.id === participantId ? { ...participant, checkedIn: !participant.checkedIn } : participant
			)
		);
	}

	function toggleparticipantInClassState(participantId) {
		setparticipants(
			participants.map((participant) =>
				participant.id === participantId ? { ...participant, inClass: !participant.inClass } : participant
			)
		);
	}

	return (
		<>
			{createPortal(
				<>
					<div className={backdropClasses} />
					<div className={drawerClasses}>
						{renderClassButtonsSection()}
						{renderWorkoutOfTheDaySection()}
						<hr />
						{renderClassInformationSection()}
						<hr />
						{renderYouShouldKnowSection()}
						<hr />
						{renderDropDownSection()}
						{renderparticipantsSection()}
					</div>
				</>,
				document.getElementById("drawer-root")
			)}
		</>
	);
}

export default Drawer;
