import { useRef } from "react";

function formatCategory(category) {
  const labels = {
    frontend: "Front-end",
    backend: "Back-end",
    api: "API",
  };
  if (Array.isArray(category)) {
    return category.map(cat => labels[cat] || cat).join(" • ");
  }
  return labels[category] || category;
}

export default function ProjectCard({
  index,
  title,
  description,
  technologies,
  githubLink,
  demoLink,
  image,
  alt,
  category,
  fallbackImage,
  inDevelopment,
}) {
  const cardRef = useRef(null);

  const hasDemo = Boolean(demoLink && demoLink.trim());
  const hasGithub = Boolean(githubLink && githubLink.trim());

  function handleMouseMove(event) {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 8;
    const rotateX = (y / rect.height - 0.5) * -8;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  }

  return (
    <article
      className="project-card"
      ref={cardRef}
      style={{ "--delay": `${Math.min(index, 8) * 70}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-media">
        <img
          className="project-image"
          src={image}
          alt={alt}
          loading="lazy"
          onError={(event) => {
            if (fallbackImage) {
              event.currentTarget.onerror = null;
              event.currentTarget.src = fallbackImage;
            }
          }}
        />
        <span className="project-index mono" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="project-content">
        <div className="project-meta">
          <span className="project-badge">{formatCategory(category)}</span>
          {inDevelopment && (
            <span className="project-badge project-badge-wip">Em Desenvolvimento</span>
          )}
        </div>
        <h4>{title}</h4>
        <p>{description}</p>
        <p className="project-tech mono">{technologies.join(" • ")}</p>

        <div className="project-actions">
          {hasGithub ? (
            <a
              className="btn btn-small btn-ghost"
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver no GitHub
            </a>
          ) : (
            <span className="btn btn-small btn-disabled" aria-disabled="true">
              GitHub em breve
            </span>
          )}

          {hasDemo && (
            <a
              className="btn btn-small btn-primary"
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
