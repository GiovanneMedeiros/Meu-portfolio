export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="mono">
          <span className="t-comment">//</span> © {new Date().getFullYear()} Giovanne
          Medeiros — feito com React, café e muita animação
        </p>
      </div>
    </footer>
  );
}
