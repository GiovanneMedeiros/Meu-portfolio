export default function Header({ menuOpen, onToggleMenu, onCloseMenu, isScrolled }) {
  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`} id="topo">
      <nav className="navbar container" aria-label="Navegacao principal">
        <a className="brand" href="#inicio" aria-label="Ir para o inicio">
          GM.
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          aria-controls="menu-lista"
          onClick={onToggleMenu}
        >
          <span></span>
          <span></span>
        </button>

        <ul className={`menu ${menuOpen ? "open" : ""}`} id="menu-lista">
          <li>
            <a href="#inicio" onClick={onCloseMenu}>
              Inicio
            </a>
          </li>
          <li>
            <a href="#sobre" onClick={onCloseMenu}>
              Sobre
            </a>
          </li>
          <li>
            <a href="#tecnologias" onClick={onCloseMenu}>
              Tecnologias
            </a>
          </li>
          <li>
            <a href="#projetos" onClick={onCloseMenu}>
              Projetos
            </a>
          </li>
          <li>
            <a href="#contato" onClick={onCloseMenu}>
              Contato
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
