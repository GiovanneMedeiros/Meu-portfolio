import { useState } from "react";

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
  const [style, setStyle] = useState(undefined);

  const hasDemo = Boolean(demoLink && demoLink.trim());
  const hasGithub = Boolean(githubLink && githubLink.trim());

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = (x / rect.width - 0.5) * 6;
    const rotateX = (y / rect.height - 0.5) * -6;
    setStyle({
      transform: `translateY(-8px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
    });
  }

  function handleMouseLeave() {
    setStyle(undefined);
  }

  return (
    <article
      className="project-card"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className="project-image"
        src={image}
        alt={alt}
        onError={(event) => {
          if (fallbackImage) {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImage;
          }
        }}
      />
      <div className="project-content">
        <div className="project-meta">
          <span className="project-badge">{formatCategory(category)}</span>
          {inDevelopment && <span className="project-badge" style={{backgroundColor: "#ff9500"}}>Em Desenvolvimento</span>}
        </div>
        <h4>{title}</h4>
        <p>{description}</p>
        <p className="project-tech">{technologies.join(" • ")}</p>

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
