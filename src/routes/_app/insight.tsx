import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, TrendingUp, Target, Wallet } from "lucide-react";
import { useHabitStore, formatIDR } from "@/stores/useHabitStore";
import { CategoryIcon, categoryColor } from "@/components/CategoryIcon";
import { NudgeIcon } from "@/components/NudgeIcon";

export const Route = createFileRoute("/_app/insight")({
  head: () => ({ meta: [{ title: "Insight — wondr" }] }),
  component: InsightPage,
});

const CATEGORY_DATA = [
  { name: "Makanan", value: 2_100_000 },
  { name: "Travel", value: 1_850_000 },
  { name: "Belanja", value: 680_000 },
  { name: "Wellness", value: 450_000 },
  { name: "Kafe", value: 420_000 },
  { name: "Transport", value: 320_000 },
];

const TREND_DATA = [
  { m: "Des", in: 11.5, out: 8.2 },
  { m: "Jan", in: 12.0, out: 7.8 },
  { m: "Feb", in: 12.5, out: 9.1 },
  { m: "Mar", in: 12.5, out: 8.4 },
  { m: "Apr", in: 13.0, out: 9.6 },
  { m: "Mei", in: 12.5, out: 5.8 },
];

const TOP_MERCHANTS = [
  { name: "Janji Jiwa", category: "Kafe", visits: 8, total: 304_000 },
  { name: "GoFood", category: "Makanan", visits: 12, total: 850_000 },
  { name: "Grab", category: "Transport", visits: 18, total: 320_000 },
  { name: "AirAsia", category: "Travel", visits: 1, total: 1_850_000 },
  { name: "Tokopedia", category: "Belanja", visits: 4, total: 480_000 },
];

function InsightPage() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const showNudge = useHabitStore((s) => s.showNudge);
  const slides = [<ProfilingSlide key="0" />, <SpendingSlide key="1" />, <AllocationSlide key="2" />];

  const totalSpend = CATEGORY_DATA.reduce((a, b) => a + b.value, 0);
  const habitScore = 78;

  return (
    <div className="px-5 pt-10">
      <h1 className="text-2xl font-black">Insight</h1>
      <p className="text-xs text-muted-foreground mb-5">Pola masa lalu · Past dimension</p>

      {/* Habit score */}
      <button
        onClick={() => alert("Habit Score breakdown:\n• Saving Rate: 82%\n• Budget Adherence: 71%\n• Goal Progress: 80%")}
        className="w-full text-left rounded-3xl bg-gradient-to-br from-[var(--navy)] to-[var(--navy-soft)] text-white p-5 mb-5 shadow-[var(--shadow-card)]"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">Habit Score</div>
          <Sparkles className="w-4 h-4 text-cyan-300" />
        </div>
        <div className="flex items-end gap-3 mb-3">
          <div className="text-5xl font-black">{habitScore}</div>
          <div className="text-sm text-white/70 pb-2">/ 100</div>
          <div className="ml-auto text-xs text-cyan-300 flex items-center gap-1 pb-2">
            <TrendingUp className="w-3 h-3" /> +6 vs bulan lalu
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Mini label="Saving" v={82} />
          <Mini label="Budget" v={71} />
          <Mini label="Goal" v={80} />
        </div>
      </button>

      {/* Wrap carousel */}
      <div className="relative rounded-3xl overflow-hidden bg-card border border-border mb-5 shadow-[var(--shadow-soft)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="p-5 min-h-[260px]"
          >
            {slides[slide]}
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-between px-5 pb-4">
          <button onClick={() => setSlide((s) => Math.max(0, s - 1))} disabled={slide === 0} className="p-1.5 rounded-full bg-muted disabled:opacity-30">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${i === slide ? "w-6 bg-primary" : "w-1.5 bg-muted"}`} />
            ))}
          </div>
          <button onClick={() => setSlide((s) => Math.min(slides.length - 1, s + 1))} disabled={slide === slides.length - 1} className="p-1.5 rounded-full bg-muted disabled:opacity-30">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Spending breakdown donut */}
      <div className="rounded-3xl bg-card border border-border p-5 mb-5 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Spending Breakdown</div>
            <h3 className="text-lg font-bold">{formatIDR(totalSpend)}</h3>
            <div className="text-[11px] text-muted-foreground">Mei 2026</div>
          </div>
        </div>
        <div className="h-44 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={CATEGORY_DATA} dataKey="value" innerRadius={48} outerRadius={75} paddingAngle={2} stroke="none">
                {CATEGORY_DATA.map((c) => <Cell key={c.name} fill={categoryColor(c.name)} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12 }}
                formatter={(v: number) => formatIDR(v)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-1.5 mt-2">
          {CATEGORY_DATA.map((c) => {
            const pct = Math.round((c.value / totalSpend) * 100);
            return (
              <button
                key={c.name}
                onClick={() => navigate({ to: "/insight/$category", params: { category: c.name } })}
                className="w-full flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-muted/60 transition"
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: categoryColor(c.name) }} />
                <span className="text-xs font-semibold flex-1 text-left">{c.name}</span>
                <span className="text-xs text-muted-foreground">{pct}%</span>
                <span className="text-xs font-bold w-24 text-right">{formatIDR(c.value)}</span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Monthly trend */}
      <div className="rounded-3xl bg-card border border-border p-5 mb-5 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Tren 6 Bulan</div>
            <h3 className="text-sm font-bold">Pemasukan vs Pengeluaran (Rp jt)</h3>
          </div>
        </div>
        <div className="h-44 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={TREND_DATA}>
              <defs>
                <linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gOut" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF8500" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#FF8500" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="m" stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="in" stroke="#10B981" strokeWidth={2} fill="url(#gIn)" />
              <Area type="monotone" dataKey="out" stroke="#FF8500" strokeWidth={2} fill="url(#gOut)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top merchants */}
      <div className="mb-5">
        <h3 className="text-sm font-bold mb-3">Top Merchants</h3>
        <div className="rounded-2xl bg-card border border-border divide-y divide-border shadow-[var(--shadow-soft)]">
          {TOP_MERCHANTS.map((m) => (
            <button
              key={m.name}
              onClick={() => navigate({ to: "/insight/$category", params: { category: m.category } })}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/40 first:rounded-t-2xl last:rounded-b-2xl transition"
            >
              <CategoryIcon category={m.category} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{m.name}</div>
                <div className="text-[11px] text-muted-foreground">{m.category} · {m.visits}x</div>
              </div>
              <div className="text-sm font-bold">{formatIDR(m.total)}</div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Smart recommendation */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-primary/10 via-card to-card border border-primary/30 mb-5 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Smart Recommendation
        </div>
        <div className="flex items-start gap-3 mb-3">
          <NudgeIcon iconKey="heart-pulse" size="md" tone="primary" />
          <div>
            <h3 className="text-base font-bold mb-1">Pola wellness terdeteksi</h3>
            <p className="text-xs text-muted-foreground">
              Pendaftaran marathon + 3 sesi olahraga minggu ini. Buat goal Marathon Jakarta dengan auto-transfer Rp 500.000/bulan.
            </p>
          </div>
        </div>
        <button
          onClick={() => showNudge("wellness")}
          className="w-full rounded-2xl bg-primary text-primary-foreground font-bold py-3 text-sm flex items-center justify-center gap-2"
        >
          Set goal & budget <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <h3 className="text-sm font-bold mb-3">Pattern Detection</h3>
      <div className="space-y-2 pb-2">
        <PatternRow iconKey="plane" title="Travel pattern" desc="3 trip terdeteksi 6 bulan terakhir" onClick={() => showNudge("travel")} />
        <PatternRow iconKey="coffee" title="Kafe rutin" desc="Rata-rata 7x/minggu · tren naik" onClick={() => showNudge("cafe_qris")} />
        <PatternRow iconKey="utensils" title="Food delivery" desc="Rp 2,1 jt bulan ini · over budget" onClick={() => showNudge("high_food")} />
      </div>

      <Link
        to="/nudges"
        className="block text-center text-xs font-semibold text-primary py-3"
      >
        Lihat semua riwayat nudge →
      </Link>
    </div>
  );
}

function Mini({ label, v }: { label: string; v: number }) {
  return (
    <div className="rounded-xl bg-white/10 p-2.5">
      <div className="text-[10px] text-white/60 uppercase tracking-wide font-semibold">{label}</div>
      <div className="text-base font-black mt-0.5">{v}%</div>
    </div>
  );
}

function ProfilingSlide() {
  return (
    <>
      <div className="text-[10px] uppercase tracking-wider text-primary font-bold mb-2">Your Spending DNA</div>
      <h2 className="text-2xl font-black mb-2">Urban Explorer</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Kamu termasuk 12% pengguna wondr yang aktif eksplor kota, suka kopi specialty, dan rutin traveling tiap quarter.
      </p>
      <div className="grid grid-cols-3 gap-2 text-center">
        <Stat icon={Target} label="Total trx" value="142" />
        <Stat icon={Wallet} label="Avg/hari" value="4.7" />
        <Stat icon={TrendingUp} label="Streak" value="23 hari" />
      </div>
    </>
  );
}

function SpendingSlide() {
  return (
    <>
      <div className="text-[10px] uppercase tracking-wider text-primary font-bold mb-2">Top Preference</div>
      <h2 className="text-xl font-bold mb-4">Kategori favoritmu</h2>
      <div className="space-y-2.5">
        {CATEGORY_DATA.slice(0, 4).map((c) => {
          const total = CATEGORY_DATA.reduce((a, b) => a + b.value, 0);
          const pct = Math.round((c.value / total) * 100);
          return (
            <div key={c.name}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold">{c.name}</span>
                <span className="font-bold">{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${pct * 2}%` }} className="h-full" style={{ background: categoryColor(c.name) }} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function AllocationSlide() {
  return (
    <>
      <div className="text-[10px] uppercase tracking-wider text-primary font-bold mb-2">Allocation Trend</div>
      <h2 className="text-xl font-bold mb-3">Pengeluaran 6 bulan</h2>
      <div className="h-40 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={TREND_DATA}>
            <defs>
              <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF8500" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#FF8500" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="m" stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12 }} />
            <Area type="monotone" dataKey="out" stroke="#FF8500" strokeWidth={2} fill="url(#gA)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted py-2.5">
      <Icon className="w-3.5 h-3.5 mx-auto text-primary mb-1" />
      <div className="text-base font-black text-foreground">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}

function PatternRow({ iconKey, title, desc, onClick }: { iconKey: string; title: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 rounded-2xl bg-card border border-border p-3 text-left active:scale-[0.98] hover:border-primary/30 transition shadow-[var(--shadow-soft)]"
    >
      <NudgeIcon iconKey={iconKey} size="md" tone="accent" />
      <div className="flex-1">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-[11px] text-muted-foreground">{desc}</div>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}
