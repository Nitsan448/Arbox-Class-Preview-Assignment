import React, { useState } from "react";
import classes from "./Drawer.module.css";
import { createPortal } from "react-dom";
import walterWhiteImage from "../images/characters/walterWhite.png";
import michalScottImage from "../images/characters/michalScott.jpg";
import toddChavezImage from "../images/characters/toddChavez.png";
import mortySmithImage from "../images/characters/mortySmith.jpg";
import kratosImage from "../images/characters/kratos.jpeg";
import tyrionLannisterImage from "../images/characters/tyrionLannister.png";
import Participant from "./Participant";

function Drawer(props) {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [searchText, setSearchText] = useState("");

	const [clients, setClients] = useState([
		{ id: 0, name: "Walter White", image: walterWhiteImage, checkedIn: false, participates: false, hasDebt: true },
		{ id: 1, name: "Michal Scott", image: michalScottImage, checkedIn: false, participates: false, hasDebt: true },
		{ id: 2, name: "Todd Chavez", image: toddChavezImage, checkedIn: false, participates: false, hasDebt: true },
		{ id: 3, name: "Morty Smith", image: mortySmithImage, checkedIn: false, participates: false, hasDebt: true },
		{ id: 4, name: "Kratos", image: kratosImage, checkedIn: false, participates: false, hasDebt: false },
		{
			id: 5,
			name: "Tyrion Lannister",
			image: tyrionLannisterImage,
			checkedIn: false,
			participates: false,
			importantInfo: "",
			hasDebt: false,
		},
	]);

	function renderClassButtons() {
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
			<section className={classes.workoutOfTheDay}>
				<div className={`${classes.zumbaIcon} icon`}></div>
				<h3>Zumba</h3>
			</section>
		);
	}

	function renderClassInformationSection() {
		return (
			<section className={classes.classInformation}>
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
					<h4>{getParticipants().length}/15</h4>
					<p className={classes.classInformation__text}>Participants</p>
				</div>
			</section>
		);
	}

	function getParticipants() {
		return clients.map((client) => client.participates);
	}

	function renderYouShouldKnowSection() {
		const youShouldKnowText = getYouShouldKnowText();

		return (
			<>
				{youShouldKnowText !== "" && (
					<section className={classes.youShouldKnow}>
						<h3>You Should Know...</h3>

						{/* TODO: make this something funny and according to the participant */}
						<p className={classes.youShouldKnowText}>{youShouldKnowText}</p>
					</section>
				)}
			</>
		);
	}

	function getYouShouldKnowText() {
		const participantsWithDebt = clients.filter((client) => client.hasDebt && client.participates);
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
			<section className={classes.dropDownSection}>
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
			</section>
		);
	}

	function renderDropDownMenu() {
		return (
			<div className={classes.dropDown__clients}>
				{getFoundClients()
					.slice(0, 3)
					.map((client) => (
						<button
							onMouseDown={(event) => {
								event.preventDefault();
								setSearchText("");
								toggleClientInClassState(client.id);
							}}
							className={classes.dropDown__client}
							key={client.id}>
							<img className={classes.clientImage} alt={client.name} src={client.image}></img>
							{client.name}
						</button>
					))}
			</div>
		);
	}

	function getFoundClients() {
		return clients.filter((client) => {
			const clientMatchesSearch = client.name.toLowerCase().startsWith(searchText.toLowerCase());
			return !client.participates && clientMatchesSearch;
		});
	}

	function renderParticipantsSection() {
		return (
			<>
				{clients.map(
					(client) =>
						client.participates && (
							<Participant
								client={client}
								toggleCheckedInState={toggleClientCheckedInState}
								toggleInClassState={toggleClientInClassState}
								key={client.id}
							/>
						)
				)}
			</>
		);
	}

	function toggleClientCheckedInState(clientId) {
		setClients(
			clients.map((client) => (client.id === clientId ? { ...client, checkedIn: !client.checkedIn } : client))
		);
	}

	function toggleClientInClassState(clientId) {
		setClients(
			clients.map((client) =>
				client.id === clientId ? { ...client, participates: !client.participates } : client
			)
		);
	}

	return (
		<>
			{createPortal(
				<>
					<div className={`${classes.backdrop} ${props.isOpen && classes.active}`} />
					<div className={`${classes.drawer} ${props.isOpen && classes.active}`}>
						{renderClassButtons()}
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
