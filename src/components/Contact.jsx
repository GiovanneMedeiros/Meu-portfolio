export default function Contact() {
  return (
    <section className="section" id="contato">
      <div className="container reveal">
        <p className="section-label">Contato</p>
        <h3 className="section-title">Disponivel para oportunidades de estagio</h3>

        <div className="contact-card">
          <p>
            Se voce busca um estagiario com base solida em front-end, disciplina
            de estudos e vontade de evoluir rapidamente, vamos conversar.
          </p>
          <div className="contact-actions">
            <a
              className="btn btn-primary"
              href="https://www.linkedin.com/in/giovanne-medeiros/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="btn btn-ghost"
              href="https://github.com/giovannemedeiros"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a className="btn btn-ghost" href="mailto:giovannemedeiros22@gmail.com">
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
