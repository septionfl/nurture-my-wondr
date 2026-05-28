import { useHabitStore, Persona } from "@/stores/useHabitStore";

const OPTIONS: { id: Persona; label: string }[] = [
  { id: "beni", label: "Beni" },
  { id: "wanda", label: "Wanda" },
];

export function PersonaToggle() {
  const persona = useHabitStore((s) => s.persona);
  const setPersona = useHabitStore((s) => s.setPersona);
  return (
    <div className="inline-flex items-center gap-1 rounded-full p-1 border-2 border-border bg-card" role="tablist" aria-label="Demo persona">
      {OPTIONS.map((o) => {
        const active = persona === o.id;
        return (
          <button
            key={o.id}
            role="tab"
            aria-selected={active}
            onClick={() => setPersona(o.id)}
            className="px-2.5 py-0.5 rounded-full text-[10px] font-black transition"
            style={{
              background: active ? "var(--wondr-black)" : "transparent",
              color: active ? "white" : "var(--color-muted-foreground)",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
