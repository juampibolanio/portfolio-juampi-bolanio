import AboutMe from "../../features/home/components/AboutMe";
import Experience from "../../features/home/components/Experience";
import Contact from "../../features/home/components/Form";
import Hero from "../../features/home/components/Hero";
import Projects from "../../features/home/components/Projects";
import Stack from "../../features/home/components/Stack";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutMe />
      <Experience />
      <Stack />
      <Projects />
      <Contact />  
    </main>
  );
}
