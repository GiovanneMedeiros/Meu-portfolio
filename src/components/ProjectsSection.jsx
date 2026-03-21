import { useMemo, useState } from "react";
import { projects } from "../data/projects.js";
import ProjectCard from "./ProjectCard.jsx";

export default function ProjectsSection() {
  const [filter, setFilter] = useState("todos");

  const filteredProjects = useMemo(() => {
    if (filter === "todos") {
      return projects;
    }

    return projects.filter((project) => {
      const categories = Array.isArray(project.category) ? project.category : [project.category];
      return categories.includes(filter);
    });
  }, [filter]);

  return (
    <section className="section" id="projetos">
      <div className="container reveal">
        <p className="section-label">Projetos</p>
        <h3 className="section-title">Projetos com foco em interface e experiencia</h3>
        <p className="section-text projects-intro">
          Cada projeto destaca aplicacao pratica de layout responsivo,
          organizacao de codigo e evolucao continua em desenvolvimento web.
        </p>

        <div className="project-filters" role="tablist" aria-label="Filtro de projetos">
          <button className={`filter-btn ${filter === "todos" ? "active" : ""}`} type="button" onClick={() => setFilter("todos")}>
            Todos
          </button>
          <button className={`filter-btn ${filter === "frontend" ? "active" : ""}`} type="button" onClick={() => setFilter("frontend")}>
            Front-end
          </button>
          <button className={`filter-btn ${filter === "backend" ? "active" : ""}`} type="button" onClick={() => setFilter("backend")}>
            Back-end
          </button>
          <button className={`filter-btn ${filter === "api" ? "active" : ""}`} type="button" onClick={() => setFilter("api")}>
            APIs
          </button>
        </div>

        <div className="projects-grid" id="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              githubLink={project.githubLink}
              demoLink={project.demoLink}
              image={project.image}
              alt={project.alt}
              category={project.category}
              fallbackImage={project.fallbackImage}
              inDevelopment={project.inDevelopment}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
