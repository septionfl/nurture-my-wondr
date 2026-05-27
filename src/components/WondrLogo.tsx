export function WondrLogo({ size = 22, withBni = true, light = false }: { size?: number; withBni?: boolean; light?: boolean }) {
  return (
    <div className="flex items-end gap-1.5 leading-none">
      <div className="flex flex-col items-start">
        <span
          className="wondr-mark"
          style={{ fontSize: size, color: light ? "#fff" : "var(--wondr-orange)", lineHeight: 1 }}
        >
          wondr
        </span>
        <span
          className="block rounded-full mt-0.5"
          style={{ width: size * 0.45, height: Math.max(2, size * 0.09), background: "var(--wondr-teal)" }}
        />
      </div>
      {withBni && (
        <span
          className="font-extrabold tracking-tight"
          style={{ fontSize: size * 0.5, color: light ? "rgba(255,255,255,0.85)" : "var(--navy)", letterSpacing: "-0.02em" }}
        >
          by BNI
        </span>
      )}
    </div>
  );
}
