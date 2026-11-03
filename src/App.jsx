import { useEffect, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Technologies from "./components/Technologies.jsx";
import ProjectsSection from "./components/ProjectsSection.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import DotMatrix from "./components/DotMatrix.jsx";
import DeveloperBadge from "./components/DeveloperBadge.jsx";
import { useTypewriter } from "./hooks/useTypewriter.js";

const SECTION_IDS = ["inicio", "sobre", "tecnologias", "projetos", "contato"];

export default function App() {
  const typedText = useTypewriter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const progressRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setIsScrolled(y > 40);
      setShowBackToTop(y > 280);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? y / max : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }

      // seção ativa = a última cujo topo já passou da linha de leitura
      const line = window.innerHeight * 0.35;
      let current = SECTION_IDS[0];
      SECTION_IDS.forEach((id) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) {
          current = id;
        }
      });
      setActiveSection(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      // threshold 0: blocos mais altos que a tela (ex.: projetos no mobile) nunca atingiriam uma porcentagem mínima visível
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true"></div>
      <DotMatrix />
      <DeveloperBadge />

      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((value) => !value)}
        onCloseMenu={closeMenu}
        isScrolled={isScrolled}
        activeSection={activeSection}
      />

      <main>
        <Hero typedText={typedText} />
        <Marquee />
        <About />
        <Technologies />
        <ProjectsSection />
        <Contact />
      </main>

      <button
        className={`back-to-top ${showBackToTop ? "show" : ""}`}
        aria-label="Voltar ao topo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>

      <Footer />
    </>
  );
}
