import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { useHabitStore, formatIDR } from "@/stores/useHabitStore";

export const Route = createFileRoute("/_app/insight")({
  head: () => ({ meta: [{ title: "Insight — wondr" }] }),
  component: InsightPage,
});

const CATEGORY_DATA = [
  { name: "Kafe", value: 420000 },
  { name: "Makanan", value: 2100000 },
  { name: "Travel", value: 1850000 },
  { name: "Wellness", value: 450000 },
  { name: "Belanja", value: 680000 },
];

const TREND_DATA = [
  { m: "Jan", v: 4.2 }, { m: "Feb", v: 5.1 }, { m: "Mar", v: 4.6 },
  { m: "Apr", v: 6.3 }, { m: "Mei", v: 5.5 },
];

const COLORS = ["#3FD8D4", "#FF8500", "#A78BFA", "#34D399", "#F472B6"];

function InsightPage() {
  const [slide, setSlide] = useState(0);
  const showNudge = useHabitStore((s) => s.showNudge);
  const slides = [
    <ProfilingSlide key="0" />,
    <PreferenceSlide key="1" />,
    <SpendingSlide key="2" />,
    <AllocationSlide key="3" />,
  ];

  return (
    <div className="px-5 pt-12">
      <h1 className="text-2xl font-black">Your wondr Wrap</h1>
      <p className="text-sm text-muted-foreground mb-6">Past spending patterns · Insight dimension</p>

      {/* Wrap carousel */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-card to-background border border-border mb-5 min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="p-5"
          >
            {slides[slide]}
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-between px-5 pb-4">
          <button
            onClick={() => setSlide((s) => Math.max(0, s - 1))}
            disabled={slide === 0}
            className="p-1.5 rounded-full bg-muted/40 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${i === slide ? "w-6 bg-accent" : "w-1.5 bg-muted"}`} />
            ))}
          </div>
          <button
            onClick={() => setSlide((s) => Math.min(slides.length - 1, s + 1))}
            disabled={slide === slides.length - 1}
            className="p-1.5 rounded-full bg-muted/40 disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recommendation card */}
      <div className="rounded-3xl p-5 bg-gradient-to-br from-primary/25 via-card to-card border border-primary/30 mb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-primary mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Smart Recommendation
        </div>
        <div className="text-3xl mb-2">🏃</div>
        <h3 className="text-lg font-bold mb-1">Pola wellness terdeteksi</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Kamu baru daftar marathon. Set goal + budget wellness Rp 500K/bulan biar konsisten.
        </p>
        <button
          onClick={() => showNudge("wellness")}
          className="w-full rounded-2xl bg-primary text-primary-foreground font-bold py-3 text-sm flex items-center justify-center gap-2"
        >
          Set marathon goal & budget <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <h3 className="text-sm font-bold mb-3">Pattern detection</h3>
      <div className="space-y-2">
        <PatternRow emoji="✈️" title="Travel spending" desc="3 trip terdeteksi 6 bulan terakhir" onClick={() => showNudge("travel")} />
        <PatternRow emoji="☕" title="Kafe addict" desc="Avg 7x/minggu · trending naik" onClick={() => showNudge("cafe_qris")} />
        <PatternRow emoji="🍔" title="Food delivery" desc="Rp 2,1 jt bulan ini · over budget" onClick={() => showNudge("high_food")} />
      </div>
    </div>
  );
}

function ProfilingSlide() {
  return (
    <>
      <div className="text-xs uppercase text-accent font-semibold mb-2">Your spending DNA</div>
      <div className="text-4xl mb-3">🌆</div>
      <h2 className="text-2xl font-black mb-2">Urban Explorer</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Kamu termasuk 12% pengguna wondr yang aktif eksplor kota, suka kopi specialty, dan rutin traveling tiap quarter.
      </p>
      <div className="grid grid-cols-3 gap-2 text-center">
        <Stat label="Total trx" value="142" />
        <Stat label="Avg/hari" value="4.7" />
        <Stat label="Streak" value="23 hari" />
      </div>
    </>
  );
}

function PreferenceSlide() {
  return (
    <>
      <div className="text-xs uppercase text-accent font-semibold mb-2">Top preference</div>
      <h2 className="text-xl font-bold mb-4">Kategori favoritmu</h2>
      <div className="space-y-2">
        {[
          { e: "🍔", n: "Makanan", p: 36 },
          { e: "✈️", n: "Travel", p: 24 },
          { e: "🛍️", n: "Belanja", p: 18 },
          { e: "☕", n: "Kafe", p: 12 },
        ].map((c) => (
          <div key={c.n}>
            <div className="flex justify-between text-xs mb-1">
              <span>{c.e} {c.n}</span>
              <span className="font-bold">{c.p}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${c.p * 2.5}%` }} className="h-full bg-accent" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function SpendingSlide() {
  const total = CATEGORY_DATA.reduce((a, b) => a + b.value, 0);
  return (
    <>
      <div className="text-xs uppercase text-accent font-semibold mb-2">Monthly spent</div>
      <h2 className="text-xl font-bold mb-1">{formatIDR(total)}</h2>
      <p className="text-xs text-muted-foreground mb-3">Mei 2026</p>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={CATEGORY_DATA} dataKey="value" innerRadius={45} outerRadius={75} paddingAngle={3}>
              {CATEGORY_DATA.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="none" />)}
            </Pie>
            <Tooltip contentStyle={{ background: "#1a2540", border: "1px solid #2a3550", borderRadius: 8 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

function AllocationSlide() {
  return (
    <>
      <div className="text-xs uppercase text-accent font-semibold mb-2">Allocation trend</div>
      <h2 className="text-xl font-bold mb-3">Pengeluaran 5 bulan (Rp jt)</h2>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={TREND_DATA}>
            <XAxis dataKey="m" stroke="#757575" fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#1a2540", border: "1px solid #2a3550", borderRadius: 8 }} />
            <Bar dataKey="v" fill="#FF8500" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/40 py-2">
      <div className="text-base font-bold text-accent">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}

function PatternRow({ emoji, title, desc, onClick }: { emoji: string; title: string; desc: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 rounded-2xl bg-card border border-border p-3 text-left active:scale-[0.98] transition">
      <div className="w-10 h-10 rounded-xl bg-muted/40 flex items-center justify-center text-xl">{emoji}</div>
      <div className="flex-1">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-[11px] text-muted-foreground">{desc}</div>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}
