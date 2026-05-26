import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, X as XIcon, Eye, Sparkles } from "lucide-react";
import { useHabitStore, NUDGES, formatIDR, formatRelative } from "@/stores/useHabitStore";
import { NudgeIcon } from "@/components/NudgeIcon";

export const Route = createFileRoute("/_app/nudges")({
  head: () => ({ meta: [{ title: "Riwayat Nudge — wondr" }] }),
  component: NudgesPage,
});

type Filter = "all" | "accepted" | "dismissed";

function NudgesPage() {
  const navigate = useNavigate();
  const history = useHabitStore((s) => s.nudgeHistory);
  const showNudge = useHabitStore((s) => s.showNudge);
  const [filter, setFilter] = useState<Filter>("all");

  const stats = useMemo(() => {
    const shown = history.length;
    const accepted = history.filter((h) => h.action === "accepted").length;
    const dismissed = history.filter((h) => h.action === "dismissed").length;
    const moved = history
      .filter((h) => h.action === "accepted" && h.amount)
      .reduce((a, h) => a + (h.amount ?? 0), 0);
    const rate = shown ? Math.round((accepted / Math.max(shown, 1)) * 100) : 0;
    return { shown, accepted, dismissed, moved, rate };
  }, [history]);

  const filtered = history.filter((h) => filter === "all" ? true : h.action === filter);

  return (
    <div className="px-5 pt-10">
      <button onClick={() => navigate({ to: "/dashboard" })} className="flex items-center gap-2 text-sm font-semibold mb-4 -ml-1">
        <ArrowLeft className="w-4 h-4" /> Beranda
      </button>

      <h1 className="text-2xl font-black">Riwayat Nudge</h1>
      <p className="text-xs text-muted-foreground mb-5">Semua interaksi engine wondr</p>

      {/* Stats */}
      <div className="rounded-3xl bg-gradient-to-br from-[var(--navy)] to-[var(--navy-soft)] text-white p-5 mb-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-cyan-300 font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Engine Performance
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="text-2xl font-black">{stats.shown}</div>
            <div className="text-[10px] text-white/60 uppercase tracking-wide">Total nudge</div>
          </div>
          <div>
            <div className="text-2xl font-black">{stats.rate}%</div>
            <div className="text-[10px] text-white/60 uppercase tracking-wide">Acceptance</div>
          </div>
          <div>
            <div className="text-lg font-black">{formatIDR(stats.moved)}</div>
            <div className="text-[10px] text-white/60 uppercase tracking-wide">Auto-transfer</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {([
          { k: "all", l: `Semua (${stats.shown})` },
          { k: "accepted", l: `Diterima (${stats.accepted})` },
          { k: "dismissed", l: `Dilewati (${stats.dismissed})` },
        ] as { k: Filter; l: string }[]).map((f) => (
          <button
            key={f.k}
            onClick={() => setFilter(f.k)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
              filter === f.k ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border text-muted-foreground"
            }`}
          >
            {f.l}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-card border border-border p-8 text-center text-sm text-muted-foreground">
          Belum ada nudge di kategori ini.
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((h) => {
            const n = NUDGES[h.key];
            const badge = h.action === "accepted"
              ? { text: "Diterima", cls: "bg-emerald-50 text-emerald-700", Icon: Check }
              : h.action === "dismissed"
              ? { text: "Dilewati", cls: "bg-rose-50 text-rose-700", Icon: XIcon }
              : { text: "Dilihat", cls: "bg-slate-100 text-slate-600", Icon: Eye };
            return (
              <button
                key={h.id}
                onClick={() => showNudge(h.key)}
                className="w-full text-left rounded-2xl bg-card border border-border p-4 flex items-start gap-3 hover:border-primary/30 transition shadow-[var(--shadow-soft)]"
              >
                <NudgeIcon iconKey={n.iconKey} size="md" tone="accent" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="text-sm font-bold truncate">{n.headline}</div>
                    <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${badge.cls}`}>
                      <badge.Icon className="w-2.5 h-2.5" /> {badge.text}
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground line-clamp-2">{n.body}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-[10px] text-muted-foreground">{formatRelative(h.timestamp)}</div>
                    {h.amount && (
                      <div className="text-xs font-bold text-primary">{formatIDR(h.amount)}</div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
