import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Stack from "./components/Stack";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutMe />
      <Experience />
      <Stack />
      <Projects />
    </main>
  );
}