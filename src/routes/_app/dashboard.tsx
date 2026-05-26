import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bell, ArrowUpRight, ArrowLeftRight, BarChart3, TrendingUp, Eye, EyeOff,
  Sparkles, History, ChevronRight, User,
} from "lucide-react";
import { useHabitStore, formatIDR, NudgeKey } from "@/stores/useHabitStore";
import { NudgeIcon } from "@/components/NudgeIcon";
import { CategoryIcon } from "@/components/CategoryIcon";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Beranda — wondr" }] }),
  component: Dashboard,
});

const SCENARIOS: { key: NudgeKey; label: string }[] = [
  { key: "salary", label: "Gajian" },
  { key: "bali_goal", label: "Goal Bali" },
  { key: "diaspora_rate", label: "Diaspora" },
  { key: "wellness", label: "Wellness" },
  { key: "travel", label: "Travel" },
];

function Dashboard() {
  const navigate = useNavigate();
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
    <div className="px-5 pt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => alert("Profile coming soon")} className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-full bg-[var(--navy)] text-white flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-muted-foreground">Selamat pagi</div>
            <div className="text-sm font-bold">Naufal Rizky</div>
          </div>
        </button>
        <div className="flex items-center gap-2">
          <Link to="/nudges" className="relative p-2 rounded-full hover:bg-muted transition" aria-label="Riwayat nudge">
            <History className="w-5 h-5 text-foreground" />
          </Link>
          <button onClick={() => alert("Notifikasi (mock)")} className="relative p-2 rounded-full hover:bg-muted transition" aria-label="Notifikasi">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          </button>
        </div>
      </div>

      {/* Balance card */}
      <button
        onClick={() => alert("Statement & rekening detail (mock)")}
        className="w-full text-left rounded-3xl p-5 bg-gradient-to-br from-[var(--navy)] to-[var(--navy-soft)] text-white shadow-[var(--shadow-card)] mb-5 active:scale-[0.99] transition"
      >
        <div className="flex items-center justify-between mb-1">
          <div className="text-[11px] uppercase tracking-wider text-white/60 font-semibold">Total Saldo wondr</div>
          <span onClick={(e) => { e.stopPropagation(); setHide(!hide); }} className="text-white/70 p-1 -mr-1">
            {hide ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </span>
        </div>
        <div className="text-3xl font-black tracking-tight mb-3">
          {hide ? "Rp •••••••" : formatIDR(balance)}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-cyan-300">
            <Sparkles className="w-3 h-3" />
            {triggered.length} habit baru ter-track minggu ini
          </div>
          <ChevronRight className="w-4 h-4 text-white/60" />
        </div>
      </button>

      {/* Scenario switcher */}
      <div className="mb-5">
        <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2 font-bold">
          Demo Skenario Nudge
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {SCENARIOS.map((s) => (
            <button
              key={s.key}
              onClick={() => showNudge(s.key)}
              className="px-3 py-1.5 rounded-full bg-muted border border-border text-xs font-semibold whitespace-nowrap hover:border-primary hover:text-primary transition"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Dimensi */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <DimensionTile to="/transaction" icon={ArrowLeftRight} label="Transaction" sub="Present" />
        <DimensionTile to="/insight" icon={BarChart3} label="Insight" sub="Past" />
        <DimensionTile to="/growth" icon={TrendingUp} label="Growth" sub="Future" />
      </div>

      {/* Goal progress preview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">Saving Goals</h3>
          <Link to="/growth" className="text-xs text-primary font-semibold flex items-center gap-1">
            Lihat semua <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {goals.slice(0, 2).map((g) => {
            const pct = Math.round((g.current / g.target) * 100);
            return (
              <button
                key={g.id}
                onClick={() => navigate({ to: "/growth" })}
                className="w-full text-left rounded-2xl bg-card border border-border p-4 hover:border-primary/40 transition shadow-[var(--shadow-soft)]"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <NudgeIcon iconKey={g.iconKey} size="md" tone="accent" />
                    <div>
                      <div className="text-sm font-bold">{g.name}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {formatIDR(g.current)} dari {formatIDR(g.target)}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-black text-primary">{pct}%</div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">Aktivitas Terbaru</h3>
          <Link to="/insight" className="text-xs text-primary font-semibold flex items-center gap-1">
            Detail <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="rounded-2xl bg-card border border-border divide-y divide-border shadow-[var(--shadow-soft)]">
          {transactions.slice(0, 5).map((t) => (
            <button
              key={t.id}
              onClick={() => alert(`${t.label}\n${t.category}\n${formatIDR(t.amount)}\n${t.time}`)}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/40 transition first:rounded-t-2xl last:rounded-b-2xl"
            >
              <CategoryIcon category={t.category} size={40} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{t.label}</div>
                <div className="text-[11px] text-muted-foreground">{t.category} · {t.time}</div>
              </div>
              <div className={`text-sm font-bold ${t.amount > 0 ? "text-emerald-600" : "text-foreground"}`}>
                {t.amount > 0 ? "+" : ""}{formatIDR(t.amount)}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DimensionTile({
  to, icon: Icon, label, sub,
}: { to: string; icon: any; label: string; sub: string }) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-border bg-card p-3 flex flex-col items-start gap-2 active:scale-95 hover:border-primary/40 transition shadow-[var(--shadow-soft)]"
    >
      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{sub}</div>
        <div className="text-xs font-bold">{label}</div>
      </div>
    </Link>
  );
}
