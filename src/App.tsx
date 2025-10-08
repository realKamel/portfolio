import "./App.css";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Experience from "./components/sections/Experience";
import Footer from "./components/sections/Footer";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import TechStack from "./components/sections/TechStack";
function App() {
	return (
		<>
			<Hero />
			<About />
			<Skills />
			<Projects />
			<Experience />
			<TechStack />
			<Contact />
			<Footer />
		</>
	);
}

export default App;
