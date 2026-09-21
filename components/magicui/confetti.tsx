type ConfettiOptions = {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  origin?: { x?: number; y?: number };
  colors?: string[];
};

export function Confetti({
  particleCount = 10,
  angle = 90,
  spread = 45,
  startVelocity = 45,
  origin = { x: 0.5, y: 0.5 },
  colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"],
}: ConfettiOptions = {}) {
  if (typeof window === "undefined") return;

  const container = document.body;

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement("span");
    const x = origin.x ?? 0.5;
    const y = origin.y ?? 0.5;
    const xOffset = (Math.random() - 0.5) * 2;
    const dx = (Math.cos((angle * Math.PI) / 180) * (spread / 100 + 0.5)) * 120;
    const dy = (Math.sin((angle * Math.PI) / 180) * (spread / 100 + 0.5)) * 120;

    particle.style.position = "fixed";
    particle.style.left = `${window.innerWidth * x}px`;
    particle.style.top = `${window.innerHeight * y}px`;
    particle.style.width = "8px";
    particle.style.height = "8px";
    particle.style.borderRadius = "9999px";
    particle.style.background = colors[i % colors.length] ?? colors[0];
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "99999";
    particle.style.transform = "translate(-50%, -50%)";
    particle.style.opacity = "1";
    particle.style.boxShadow = `0 0 12px ${colors[i % colors.length] ?? colors[0]}`;
    particle.style.transition = "transform 1.2s ease, opacity 1.2s ease";

    container.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${xOffset * 120}px, ${dy}px)`;
      particle.style.opacity = "0";
      particle.style.filter = "blur(1px)";
    });

    window.setTimeout(() => {
      particle.remove();
    }, 1200);
  }
}
