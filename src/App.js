import classes from "./App.module.css";
import Drawer from "./components/Drawer";

function App() {
	return (
		<main>
			<Drawer />
			<button className={classes.dashboard} />
		</main>
	);
}

export default App;
