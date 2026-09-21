type MeteorsProps = {
  number?: number;
};

export default function Meteors({ number = 20 }: MeteorsProps) {
  const meteors = Array.from({ length: number }, (_, index) => ({
    id: `${index}-${Math.random()}`,
    left: `${(index * 7) % 100}%`,
    animationDelay: `${(index % 6) * 0.3}s`,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {meteors.map(meteor => (
        <span
          key={meteor.id}
          className="absolute top-0 h-1 w-1 rotate-[45deg] rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
          style={{
            left: meteor.left,
            animationDelay: meteor.animationDelay,
            animation: "meteorFall 2.5s linear infinite",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes meteorFall {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0.8);
          }
          15% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate3d(180px, 160px, 0) scale(1.4);
          }
        }
      `}</style>
    </div>
  );
}
