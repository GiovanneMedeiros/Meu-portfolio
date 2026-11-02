import { useRef } from "react";

export default function Hero({ typedText }) {
  const sectionRef = useRef(null);

  function handleMouseMove(event) {
    const rect = sectionRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    sectionRef.current.style.setProperty("--px", px.toFixed(3));
    sectionRef.current.style.setProperty("--py", py.toFixed(3));
  }

  return (
    <section
      className="hero section"
      id="inicio"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="hero-status">
            <span className="status-dot" aria-hidden="true"></span>
            Disponível para estágio
          </p>

          <p className="hero-hello">
            <span className="mono">&gt;</span> olá, mundo! eu sou
          </p>

          <h1 className="glitch" data-text="Giovanne Medeiros">
            Giovanne <span className="text-gradient">Medeiros</span>
          </h1>

          <h2>
            <span className="sr-only">Estagiário Front-End e desenvolvedor web em formação</span>
            <span className="mono prompt" aria-hidden="true">
              ~/dev $
            </span>{" "}
            <span aria-hidden="true">{typedText}</span>
            <span className="cursor" aria-hidden="true">
              ▍
            </span>
          </h2>

          <p className="hero-description">
            Estudante de Ciência da Computação (6º semestre) que transforma
            ideias em interfaces rápidas, responsivas e cheias de vida com
            JavaScript, HTML, CSS e React.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#projetos">
              <span>Ver Projetos</span>
              <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn-ghost" href="#contato">
              Falar Comigo
            </a>
            <a
              className="btn btn-ghost"
              href="https://github.com/giovannemedeiros"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="terminal">
            <div className="terminal-bar">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
              <span className="terminal-title">giovanne.js</span>
            </div>
            <pre className="terminal-body">
              <code>
                <span className="line" style={{ "--i": 0 }}>
                  <span className="t-kw">const</span> <span className="t-var">dev</span> = {"{"}
                </span>
                <span className="line" style={{ "--i": 1 }}>
                  {"  "}nome: <span className="t-str">"Giovanne"</span>,
                </span>
                <span className="line" style={{ "--i": 2 }}>
                  {"  "}cargo: <span className="t-str">"Dev Front-End Jr"</span>,
                </span>
                <span className="line" style={{ "--i": 3 }}>
                  {"  "}stack: [<span className="t-str">"React"</span>,{" "}
                  <span className="t-str">"JS"</span>,{" "}
                  <span className="t-str">"CSS"</span>],
                </span>
                <span className="line" style={{ "--i": 4 }}>
                  {"  "}aprendendo: [<span className="t-str">"Python"</span>,{" "}
                  <span className="t-str">"Node"</span>],
                </span>
                <span className="line" style={{ "--i": 5 }}>
                  {"  "}cafe: <span className="t-num">Infinity</span>,
                </span>
                <span className="line" style={{ "--i": 6 }}>
                  {"  "}abertoParaEstagio: <span className="t-bool">true</span>,
                </span>
                <span className="line" style={{ "--i": 7 }}>
                  {"}"};
                </span>
                <span className="line" style={{ "--i": 8 }}>
                  <span className="t-comment">// pronto para contribuir 🚀</span>
                </span>
                <span className="line" style={{ "--i": 9 }}>
                  <span className="t-prompt">$</span> npm run dev
                  <span className="cursor">▍</span>
                </span>
              </code>
            </pre>
          </div>

          <span className="float-badge fb-1">&lt;React /&gt;</span>
          <span className="float-badge fb-2">{"{ JS }"}</span>
          <span className="float-badge fb-3">git push ✓</span>
          <span className="float-badge fb-4">.css</span>
        </div>
      </div>

      <a className="scroll-hint" href="#sobre" aria-label="Rolar para a próxima seção">
        <span className="scroll-mouse"></span>
      </a>
    </section>
  );
}
