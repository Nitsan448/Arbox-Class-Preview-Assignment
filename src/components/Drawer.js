import React, { useState } from "react";
import classes from "./Drawer.module.css";
import { createPortal } from "react-dom";
import michalScottImage from "../images/characters/michalScott.jpg";
import walterWhiteImage from "../images/characters/walterWhite.png";
import toddChavezImage from "../images/characters/toddChavez.png";
import mortySmithImage from "../images/characters/mortySmith.jpg";
import kratosImage from "../images/characters/kratos.jpeg";
import tyrionLannisterImage from "../images/characters/tyrionLannister.png";
import Participant from "./Participant";

function Drawer(props) {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [searchText, setSearchText] = useState("");

	const [participants, setParticipants] = useState([
		{ id: 0, name: "Walter White", image: walterWhiteImage, checkedIn: false, inClass: false, hasDebt: true },
		{ id: 1, name: "Michal Scott", image: michalScottImage, checkedIn: false, inClass: false, hasDebt: true },
		{ id: 2, name: "Todd Chavez", image: toddChavezImage, checkedIn: false, inClass: false, hasDebt: true },
		{ id: 3, name: "Morty Smith", image: mortySmithImage, checkedIn: false, inClass: false, hasDebt: true },
		{ id: 4, name: "Kratos", image: kratosImage, checkedIn: false, inClass: false, hasDebt: false },
		{
			id: 5,
			name: "Tyrion Lannister",
			image: tyrionLannisterImage,
			checkedIn: false,
			inClass: false,
			importantInfo: "",
			hasDebt: false,
		},
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
		const youShouldKnowText = getYouShouldKnowText();

		return (
			<>
				{youShouldKnowText !== "" && (
					<div className={classes.youShouldKnow}>
						<h3>You Should Know...</h3>

						{/* TODO: make this something funny and according to the participant */}
						<p className={classes.youShouldKnowText}>{youShouldKnowText}</p>
					</div>
				)}
			</>
		);
	}

	function getYouShouldKnowText() {
		const participantsWithDebt = participants.filter((participant) => participant.hasDebt && participant.inClass);
		const participantsNames = participantsWithDebt.map((participant) => participant.name);

		let youShouldKnowText = "";
		if (participantsNames.length === 1) {
			youShouldKnowText = participantsNames[0] + " which participates in this class has a debt";
		} else if (participantsNames.length > 1) {
			youShouldKnowText =
				participantsNames.slice(0, -1).join(", ") +
				" and " +
				participantsNames[participantsNames.length - 1] +
				" which participate in this class have a debt";
		}

		return youShouldKnowText;
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
						onBlur={() => setIsDropDownOpen(false)}
						onFocus={() => setIsDropDownOpen(true)}
						onChange={(event) => setSearchText(event.target.value)}
						className={`${classes.dropDown__searchBar} ${isDropDownOpen && classes.active}`}
					/>
					<p className={classes.dropDown__plus}>+</p>
					{isDropDownOpen && renderDropDownMenu()}
				</ul>
			</div>
		);
	}

	function renderDropDownMenu() {
		return (
			<div className={classes.dropDown__clients}>
				{getFilteredParticipants()
					.slice(0, 3)
					.map((participant) => (
						<button
							onMouseDown={(event) => {
								event.preventDefault();
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

	function getFilteredParticipants() {
		return participants.filter((participant) => {
			const participantMatchesSearch = participant.name.toLowerCase().startsWith(searchText.toLowerCase());
			return !participant.inClass && participantMatchesSearch;
		});
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
