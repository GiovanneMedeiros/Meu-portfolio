import { useMemo, useState } from "react";
import { projects } from "../data/projects.js";
import ProjectCard from "./ProjectCard.jsx";

const FILTERS = [
  { value: "todos", label: "Todos" },
  { value: "frontend", label: "Front-end" },
  { value: "backend", label: "Back-end" },
  { value: "api", label: "APIs" },
];

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
        <h3 className="section-title">Projetos com foco em interface e experiência</h3>
        <p className="section-text projects-intro">
          Cada projeto destaca aplicação prática de layout responsivo,
          organização de código e evolução contínua em desenvolvimento web.
        </p>

        <div className="project-filters" role="group" aria-label="Filtro de projetos">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              className={`filter-btn ${filter === value ? "active" : ""}`}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
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
