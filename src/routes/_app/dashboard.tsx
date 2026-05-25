import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Bell, ArrowUpRight, ArrowLeftRight, BarChart3, TrendingUp, Eye, EyeOff, Sparkles } from "lucide-react";
import { useState } from "react";
import { useHabitStore, formatIDR, NudgeKey } from "@/stores/useHabitStore";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Beranda — wondr" }] }),
  component: Dashboard,
});

const SCENARIOS: { key: NudgeKey; label: string }[] = [
  { key: "salary", label: "Gajian" },
  { key: "bali_goal", label: "Goal Bali" },
  { key: "diaspora_rate", label: "Diaspora" },
];

function Dashboard() {
  const balance = useHabitStore((s) => s.balance);
  const goals = useHabitStore((s) => s.goals);
  const transactions = useHabitStore((s) => s.transactions);
  const triggered = useHabitStore((s) => s.triggeredNudges);
  const dashboardNudge = useHabitStore((s) => s.dashboardNudge);
  const showNudge = useHabitStore((s) => s.showNudge);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (dashboardNudge) {
      const t = setTimeout(() => showNudge(dashboardNudge), 600);
      return () => clearTimeout(t);
    }
  }, [dashboardNudge, showNudge]);

  return (
    <div className="px-5 pt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs text-muted-foreground">Selamat pagi</div>
          <div className="text-base font-bold">Naufal Rizky</div>
        </div>
        <div className="relative">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
        </div>
      </div>

      {/* Balance card */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-card to-card/60 border border-border shadow-[var(--shadow-card)] mb-5">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs text-muted-foreground">Total saldo wondr</div>
          <button onClick={() => setHide(!hide)} className="text-muted-foreground">
            {hide ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <div className="text-3xl font-black tracking-tight mb-3">
          {hide ? "Rp •••••••" : formatIDR(balance)}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-accent">
          <Sparkles className="w-3 h-3" />
          Engine learning · {triggered.length} habit baru ter-track minggu ini
        </div>
      </div>

      {/* Scenario switcher */}
      <div className="mb-5">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
          Demo skenario nudge
        </div>
        <div className="flex gap-2 flex-wrap">
          {SCENARIOS.map((s) => (
            <button
              key={s.key}
              onClick={() => showNudge(s.key)}
              className="px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium hover:border-accent transition"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Dimensi */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <DimensionTile to="/transaction" icon={ArrowLeftRight} label="Transaction" sub="Present" tint="orange" />
        <DimensionTile to="/insight" icon={BarChart3} label="Insight" sub="Past" tint="cyan" />
        <DimensionTile to="/growth" icon={TrendingUp} label="Growth" sub="Future" tint="purple" />
      </div>

      {/* Goal progress preview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">Saving goals</h3>
          <Link to="/growth" className="text-xs text-accent flex items-center gap-1">
            Lihat semua <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {goals.slice(0, 2).map((g) => {
            const pct = Math.round((g.current / g.target) * 100);
            return (
              <div key={g.id} className="rounded-2xl bg-card border border-border p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{g.emoji}</span>
                    <div>
                      <div className="text-sm font-semibold">{g.name}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {formatIDR(g.current)} / {formatIDR(g.target)}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-accent">{pct}%</div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-cyan-300 shadow-[0_0_10px_var(--accent)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h3 className="text-sm font-bold mb-3">Aktivitas terbaru</h3>
        <div className="rounded-2xl bg-card border border-border divide-y divide-border">
          {transactions.slice(0, 4).map((t) => (
            <div key={t.id} className="flex items-center justify-between p-3">
              <div>
                <div className="text-sm font-medium">{t.label}</div>
                <div className="text-[11px] text-muted-foreground">{t.category} · {t.time}</div>
              </div>
              <div className={`text-sm font-bold ${t.amount > 0 ? "text-accent" : "text-foreground"}`}>
                {t.amount > 0 ? "+" : ""}{formatIDR(t.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DimensionTile({
  to, icon: Icon, label, sub, tint,
}: { to: string; icon: any; label: string; sub: string; tint: "orange" | "cyan" | "purple" }) {
  const tintMap = {
    orange: "from-primary/30 to-primary/5 text-primary",
    cyan: "from-accent/30 to-accent/5 text-accent",
    purple: "from-purple-400/30 to-purple-400/5 text-purple-300",
  } as const;
  return (
    <Link to={to} className="rounded-2xl border border-border bg-card p-3 flex flex-col items-start gap-2 active:scale-95 transition">
      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${tintMap[tint]} flex items-center justify-center`}>
        <Icon className="w-4.5 h-4.5" />
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{sub}</div>
        <div className="text-xs font-bold">{label}</div>
      </div>
    </Link>
  );
}
