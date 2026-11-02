import CountUp from "./CountUp.jsx";
import { projects } from "../data/projects.js";

const STATS = [
  { value: 6, suffix: "º", label: "semestre de Ciência da Computação" },
  { value: projects.length, suffix: "", label: "projetos publicados" },
  { value: 5, suffix: "+", label: "tecnologias no dia a dia" },
];

export default function About() {
  return (
    <section className="section" id="sobre">
      <div className="container reveal">
        <p className="section-label">
          <span className="mono">01.</span> Sobre Mim
        </p>
        <h3 className="section-title">Quem está por trás do código</h3>

        <div className="about-grid">
          <p className="section-text">
            Sou Giovanne Medeiros, estudante de Bacharelado em Ciência da
            Computação (6º semestre), com foco em desenvolvimento web. Tenho
            experiência prática com JavaScript, HTML, CSS e React, além de
            rotina de versionamento com Git e GitHub. Estou em constante
            evolução, estudando Python e Node.js, e busco uma oportunidade de
            estágio para contribuir com times de desenvolvimento e acelerar meu
            crescimento técnico.
          </p>

          <ul className="stats">
            {STATS.map((stat) => (
              <li className="stat" key={stat.label}>
                <strong className="stat-number">
                  <CountUp to={stat.value} />
                  {stat.suffix}
                </strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
