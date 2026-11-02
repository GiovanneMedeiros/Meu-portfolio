const groups = [
  {
    title: "Front-end",
    icon: "</>",
    items: ["HTML5", "CSS3", "JavaScript", "React"],
  },
  {
    title: "Ferramentas",
    icon: "⚙",
    items: ["Git", "GitHub", "VS Code"],
  },
  {
    title: "Estudando atualmente",
    icon: "↻",
    items: ["Python", "Node.js"],
    learning: true,
  },
];

function handleMouseMove(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

export default function Technologies() {
  return (
    <section className="section" id="tecnologias">
      <div className="container reveal">
        <p className="section-label">
          <span className="mono">02.</span> Tecnologias
        </p>
        <h3 className="section-title">Stack principal e aprendizado contínuo</h3>

        <div className="skills-grid">
          {groups.map((group) => (
            <article
              className={`skill-card ${group.learning ? "learning" : ""}`}
              key={group.title}
              onMouseMove={handleMouseMove}
            >
              <span className="skill-icon mono" aria-hidden="true">
                {group.icon}
              </span>
              <h4>{group.title}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
