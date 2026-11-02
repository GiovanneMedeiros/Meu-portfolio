const ITEMS = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Vite",
  "Git",
  "GitHub",
  "REST API",
  "Supabase",
  "Node.js",
  "Python",
];

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {track.map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`}>
            <span className="marquee-star">✦</span> {item}
          </span>
        ))}
      </div>
    </div>
  );
}
