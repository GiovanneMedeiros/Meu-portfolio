import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Technologies from "./components/Technologies.jsx";
import ProjectsSection from "./components/ProjectsSection.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { useTypewriter } from "./hooks/useTypewriter.js";

export default function App() {
  const typedText = useTypewriter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setIsScrolled(y > 40);
      setShowBackToTop(y > 280);

      document.querySelectorAll(".bg-blur").forEach((blur, index) => {
        const speed = index === 0 ? 0.07 : 0.05;
        blur.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll);

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
      { threshold: 0.18 }
    );

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index * 90, 420)}ms`;
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
      <div className="bg-blur bg-blur-1" aria-hidden="true"></div>
      <div className="bg-blur bg-blur-2" aria-hidden="true"></div>

      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((value) => !value)}
        onCloseMenu={closeMenu}
        isScrolled={isScrolled}
      />

      <main>
        <Hero typedText={typedText} />
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
