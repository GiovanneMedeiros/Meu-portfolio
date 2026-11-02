const LINKS = [
  { href: "#inicio", id: "inicio", label: "Início" },
  { href: "#sobre", id: "sobre", label: "Sobre" },
  { href: "#tecnologias", id: "tecnologias", label: "Tecnologias" },
  { href: "#projetos", id: "projetos", label: "Projetos" },
  { href: "#contato", id: "contato", label: "Contato" },
];

export default function Header({
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  isScrolled,
  activeSection,
}) {
  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`} id="topo">
      <nav className="navbar container" aria-label="Navegação principal">
        <a className="brand mono" href="#inicio" aria-label="Ir para o início">
          <span className="brand-tag">&lt;</span>GM<span className="brand-tag"> /&gt;</span>
        </a>

        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="menu-lista"
          onClick={onToggleMenu}
        >
          <span></span>
          <span></span>
        </button>

        <ul className={`menu ${menuOpen ? "open" : ""}`} id="menu-lista">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={activeSection === link.id ? "active" : ""}
                aria-current={activeSection === link.id ? "true" : undefined}
                onClick={onCloseMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
