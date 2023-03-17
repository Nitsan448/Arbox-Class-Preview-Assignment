import React, { useState } from "react";
import classes from "./Drawer.module.css";
import { createPortal } from "react-dom";
import testIcon from "../images/MichalScott.jpg";
import Participant from "./Participant";

function Drawer(props) {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [participants, setParticipants] = useState([
		{ id: 0, name: "Walter White", image: testIcon, checkedIn: false, inClass: false },
		{ id: 1, name: "Michal Scott", image: testIcon, checkedIn: false, inClass: false },
		{ id: 2, name: "Todd Chavez", image: testIcon, checkedIn: false, inClass: false },
		{ id: 3, name: "Morty Smith", image: testIcon, checkedIn: false, inClass: false },
		{ id: 4, name: "Test 3", image: testIcon, checkedIn: false, inClass: false },
		{ id: 5, name: "Test 4", image: testIcon, checkedIn: false, inClass: false },
		{ id: 6, name: "Test 5", image: testIcon, checkedIn: false, inClass: false },
		{ id: 7, name: "Test 6", image: testIcon, checkedIn: false, inClass: false },
		{ id: 8, name: "Test 7", image: testIcon, checkedIn: false, inClass: false },
	]);
	const [searchText, setSearchText] = useState("");

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
				<h3>You Should Know...</h3>

				{/* TODO: make this something funny and according to the participant */}
				<p className={classes.youShouldKnowText}>Dagan & Eden which participates in the class have a debt</p>
			</div>
		);
	}

	function handleSearch(event) {
		setSearchText(event.target.value);
	}

	function getFilteredParticipants() {
		return participants.filter((participant) => {
			const participantMatchesSearch = participant.name.toLowerCase().startsWith(searchText.toLowerCase());
			return !participant.inClass && participantMatchesSearch;
		});
	}

	function renderDropDownSection() {
		return (
			<div className={classes.dropDownSection}>
				<h3 className={classes.participantsText}>Participants</h3>
				<ul className={classes.dropDown}>
					<input
						type="text"
						value={searchText}
						placeholder="Add Client"
						onClick={() => {
							setIsDropDownOpen(!isDropDownOpen);
						}}
						onChange={handleSearch}
						className={`${classes.dropDown__stateButton} ${isDropDownOpen && classes.active}`}
					/>
					{isDropDownOpen && renderDropDownMenu()}
				</ul>
			</div>
		);
	}

	function renderDropDownMenu() {
		return (
			<div className={classes.dropDown__clients}>
				{getFilteredParticipants().map((participant) => (
					<button
						onClick={() => {
							setIsDropDownOpen(false);
							setSearchText("");
							toggleParticipantInClassState(participant.id);
						}}
						className={classes.dropDown__client}
						key={participant.id}>
						<img className={classes.clientImage} alt={participant.name} src={participant.image}></img>
						{participant.name}
					</button>
				))}
			</div>
		);
	}

	function renderParticipantsSection() {
		return (
			<>
				{participants.map(
					(participant) =>
						participant.inClass && (
							<Participant
								participant={participant}
								toggleCheckedInState={toggleParticipantCheckedInState}
								toggleInClassState={toggleParticipantInClassState}
								key={participant.id}
							/>
						)
				)}
			</>
		);
	}

	function toggleParticipantCheckedInState(participantId) {
		setParticipants(
			participants.map((participant) =>
				participant.id === participantId ? { ...participant, checkedIn: !participant.checkedIn } : participant
			)
		);
	}

	function toggleParticipantInClassState(participantId) {
		setParticipants(
			participants.map((participant) =>
				participant.id === participantId ? { ...participant, inClass: !participant.inClass } : participant
			)
		);
	}

	return (
		<>
			{createPortal(
				<>
					<div className={`${classes.backdrop} ${props.isOpen && classes.active}`} />
					<div className={`${classes.drawer} ${props.isOpen && classes.active}`}>
						{renderClassButtonsSection()}
						{renderWorkoutOfTheDaySection()}
						<hr />
						{renderClassInformationSection()}
						<hr />
						{renderYouShouldKnowSection()}
						<hr />
						{renderDropDownSection()}
						{renderParticipantsSection()}
					</div>
				</>,
				document.getElementById("drawer-root")
			)}
		</>
	);
}

export default Drawer;
