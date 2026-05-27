import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bell, ArrowUpRight, ArrowLeftRight, BarChart3, TrendingUp, Eye, EyeOff,
  Sparkles, History, ChevronRight, User, QrCode, Send, Wallet, Plus, Zap,
} from "lucide-react";
import { useHabitStore, formatIDR, NudgeKey } from "@/stores/useHabitStore";
import { NudgeIcon } from "@/components/NudgeIcon";
import { CategoryIcon } from "@/components/CategoryIcon";
import { WondrLogo } from "@/components/WondrLogo";
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
    <div className="pb-4">
      {/* Top app bar — wondr existing chrome */}
      <div className="px-5 pt-10 pb-3 flex items-center justify-between bg-white sticky top-0 z-20">
        <WondrLogo size={22} />
        <div className="flex items-center gap-1">
          <Link to="/nudges" className="relative p-2 rounded-full hover:bg-muted transition" aria-label="Riwayat nudge">
            <History className="w-5 h-5 text-foreground" />
          </Link>
          <button onClick={() => alert("Notifikasi (mock)")} className="relative p-2 rounded-full hover:bg-muted transition" aria-label="Notifikasi">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "var(--wondr-orange)" }} />
          </button>
          <button onClick={() => alert("Profile")} className="ml-1 w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: "var(--wondr-black)" }}>
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-5">
        <div className="mb-4">
          <div className="text-[11px] text-muted-foreground">Selamat pagi,</div>
          <div className="text-xl font-black tracking-tight">Hi, Naufal Rizky</div>
        </div>

        {/* Balance card — wondr orange */}
        <button
          onClick={() => alert("Detail rekening wondr")}
          className="w-full text-left rounded-3xl p-5 text-white shadow-[var(--shadow-card)] mb-4 active:scale-[0.99] transition relative overflow-hidden"
          style={{ background: "var(--wondr-orange)" }}
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full" style={{ background: "var(--wondr-teal)", opacity: 0.85 }} />
          <div className="absolute -right-4 bottom-6 w-16 h-16 rounded-full" style={{ background: "var(--wondr-pink)", opacity: 0.55 }} />
          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[11px] uppercase tracking-wider text-white/90 font-bold">wondr Taplus · 0223383830</div>
              <span onClick={(e) => { e.stopPropagation(); setHide(!hide); }} className="text-white p-1 -mr-1">
                {hide ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </span>
            </div>
            <div className="text-3xl font-black tracking-tight mb-3">
              {hide ? "Rp •••••••" : formatIDR(balance)}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-white font-bold">
              <Sparkles className="w-3 h-3" />
              {triggered.length} habit baru ter-track minggu ini
            </div>
          </div>
        </button>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          <QuickAction icon={Send} label="Transfer" bg="var(--wondr-teal)" onClick={() => navigate({ to: "/transaction" })} />
          <QuickAction icon={QrCode} label="QRIS" bg="var(--wondr-orange)" onClick={() => navigate({ to: "/transaction" })} />
          <QuickAction icon={Wallet} label="Top Up" bg="var(--wondr-purple)" onClick={() => alert("Top Up (mock)")} />
          <QuickAction icon={Plus} label="Lainnya" bg="var(--wondr-pink)" fg="var(--wondr-black)" onClick={() => alert("Menu lainnya")} />
        </div>

        {/* NEW FEATURE BANNER — Nurture */}
        <div className="rounded-3xl p-5 mb-5 relative overflow-hidden" style={{ background: "var(--wondr-lime)" }}>
          <div className="absolute right-3 top-3 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider" style={{ background: "var(--wondr-black)", color: "var(--wondr-lime)" }}>
            Baru
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-black mb-2" style={{ color: "var(--wondr-black)" }}>
            <Zap className="w-3.5 h-3.5" /> Fitur wondr
          </div>
          <h3 className="text-2xl font-black leading-tight mb-1" style={{ color: "var(--wondr-black)" }}>
            Nurture the Habit
          </h3>
          <p className="text-xs font-medium mb-3" style={{ color: "var(--wondr-black)", opacity: 0.75 }}>
            Engine nudge yang ubah transaksimu jadi rutinitas finansial sehat.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate({ to: "/insight" })}
              className="px-3.5 py-2 rounded-full text-xs font-black text-white"
              style={{ background: "var(--wondr-black)" }}
            >
              Mulai eksplor →
            </button>
            <Link to="/nudges" className="px-3.5 py-2 rounded-full text-xs font-black border-2" style={{ borderColor: "var(--wondr-black)", color: "var(--wondr-black)" }}>
              Riwayat
            </Link>
          </div>
        </div>

        {/* Scenario switcher */}
        <div className="mb-5">
          <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2 font-black">
            Demo Skenario Nudge
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {SCENARIOS.map((s) => (
              <button
                key={s.key}
                onClick={() => showNudge(s.key)}
                className="px-3 py-1.5 rounded-full bg-white border-2 border-border text-xs font-bold whitespace-nowrap transition"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Dimensi — brand color blocks */}
        <div className="mb-6">
          <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2 font-black">
            3 Dimensi Nurture
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <DimensionTile to="/transaction" icon={ArrowLeftRight} label="Transaction" sub="Present" bg="var(--wondr-orange)" fg="#fff" />
            <DimensionTile to="/insight" icon={BarChart3} label="Insight" sub="Past" bg="var(--wondr-teal)" fg="var(--wondr-black)" />
            <DimensionTile to="/growth" icon={TrendingUp} label="Growth" sub="Future" bg="var(--wondr-purple)" fg="#fff" />
          </div>
        </div>

        {/* Goal progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-black">Saving Goals</h3>
            <Link to="/growth" className="text-xs font-bold flex items-center gap-1" style={{ color: "var(--wondr-orange)" }}>
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
                  className="w-full text-left rounded-2xl bg-card border-2 border-border p-4 hover:border-[color:var(--wondr-orange)] transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <NudgeIcon iconKey={g.iconKey} size="md" tone="accent" />
                      <div>
                        <div className="text-sm font-black">{g.name}</div>
                        <div className="text-[11px] text-muted-foreground font-semibold">
                          {formatIDR(g.current)} / {formatIDR(g.target)}
                        </div>
                      </div>
                    </div>
                    <div className="text-base font-black" style={{ color: "var(--wondr-orange)" }}>{pct}%</div>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "var(--wondr-orange)" }}
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
            <h3 className="text-sm font-black">Aktivitas Terbaru</h3>
            <Link to="/insight" className="text-xs font-bold flex items-center gap-1" style={{ color: "var(--wondr-orange)" }}>
              Detail <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="rounded-2xl bg-card border-2 border-border divide-y divide-border overflow-hidden">
            {transactions.slice(0, 5).map((t) => (
              <button
                key={t.id}
                onClick={() => alert(`${t.label}\n${t.category}\n${formatIDR(t.amount)}\n${t.time}`)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/40 transition"
              >
                <CategoryIcon category={t.category} size={40} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">{t.label}</div>
                  <div className="text-[11px] text-muted-foreground font-semibold">{t.category} · {t.time}</div>
                </div>
                <div className={`text-sm font-black ${t.amount > 0 ? "text-emerald-600" : "text-foreground"}`}>
                  {t.amount > 0 ? "+" : ""}{formatIDR(t.amount)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, bg, fg = "#fff", onClick }: { icon: any; label: string; bg: string; fg?: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 active:scale-95 transition">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[var(--shadow-soft)]" style={{ background: bg, color: fg }}>
        <Icon className="w-5 h-5" strokeWidth={2.4} />
      </div>
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}

function DimensionTile({
  to, icon: Icon, label, sub, bg, fg,
}: { to: string; icon: any; label: string; sub: string; bg: string; fg: string }) {
  return (
    <Link
      to={to}
      className="rounded-2xl p-3 flex flex-col items-start gap-3 active:scale-95 transition relative overflow-hidden"
      style={{ background: bg, color: fg, minHeight: 110 }}
    >
      <div className="w-9 h-9 rounded-xl bg-white/25 flex items-center justify-center">
        <Icon className="w-4 h-4" strokeWidth={2.4} />
      </div>
      <div>
        <div className="text-[9px] uppercase tracking-wider font-black opacity-80">{sub}</div>
        <div className="text-sm font-black leading-tight">{label}</div>
      </div>
    </Link>
  );
}
