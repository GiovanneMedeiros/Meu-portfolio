const groups = [
  {
    title: "Front-end",
    items: ["HTML5", "CSS3", "JavaScript", "React"],
  },
  {
    title: "Ferramentas",
    items: ["Git", "GitHub", "VS Code"],
  },
  {
    title: "Estudando atualmente",
    items: ["Python", "Node.js"],
  },
];

export default function Technologies() {
  return (
    <section className="section" id="tecnologias">
      <div className="container reveal">
        <p className="section-label">Tecnologias</p>
        <h3 className="section-title">Stack principal e aprendizado continuo</h3>

        <div className="skills-grid">
          {groups.map((group) => (
            <article className="skill-card" key={group.title}>
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
