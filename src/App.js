import classes from "./App.module.css";
import Drawer from "./components/Drawer";
import { React, useState } from "react";

function App() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	return (
		<main>
			<Drawer isOpen={isDrawerOpen} />
			<button className={classes.dashboard} onClick={() => setIsDrawerOpen((isDrawerOpen) => !isDrawerOpen)} />
		</main>
	);
}

export default App;
