import React from "react";
import classes from "./Participant.module.css";

function participant(props) {
	const { id, name, image, checkedIn } = props.participant;
	return (
		<div className={classes.participants}>
			<img className={classes.participantImage} alt={name} src={image} width={24} height={24}></img>
			<p className={classes.participantName}>{name}</p>
			<button onClick={() => props.toggleCheckedInState(id)} className={classes.checkInButton}>
				{checkedIn ? "Checked" : "Check In"}
			</button>
			<button className={`${classes.callButton} icon`} />
			<button onClick={() => props.toggleInClassState(id)} className={`${classes.deleteButton} icon`} />
		</div>
	);
}

export default participant;
