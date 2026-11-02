import { useEffect, useState } from "react";

const ROLES = [
  "Desenvolvedor Front-End Júnior",
  "Desenvolvedor Web Júnior",
  "Desenvolvedor JavaScript Júnior",
];

export function useTypewriter() {
  const [text, setText] = useState("");

  useEffect(() => {
    let roleIndex = 0;
    let letterIndex = 0;
    let deleting = false;
    let timeoutId;

    function tick() {
      const currentRole = ROLES[roleIndex];

      if (!deleting) {
        setText(currentRole.slice(0, letterIndex + 1));
        letterIndex += 1;

        if (letterIndex === currentRole.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1200);
          return;
        }
      } else {
        setText(currentRole.slice(0, letterIndex - 1));
        letterIndex -= 1;

        if (letterIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
        }
      }

      timeoutId = setTimeout(tick, deleting ? 45 : 85);
    }

    tick();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return text;
}
