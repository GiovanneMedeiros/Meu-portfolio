export default function Hero({ typedText }) {
  return (
    <section className="hero section" id="inicio">
      <div className="container hero-content reveal">
        <p className="hero-tag">Portfolio para Estagio em Desenvolvimento</p>
        <h1>Giovanne Medeiros</h1>
        <h2>
          <span aria-live="polite">{typedText}</span>
          <span className="cursor" aria-hidden="true">
            |
          </span>
        </h2>
        <p className="hero-description">
          Estudante de Bacharelado em Ciencia da Computacao (6o semestre), focado
          em desenvolvimento web com JavaScript, HTML, CSS e React.
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#projetos">
            Ver Projetos
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
    </section>
  );
}
