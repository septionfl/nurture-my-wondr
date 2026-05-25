import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Globe2, Repeat, Sparkles, TrendingUp, TrendingDown, X } from "lucide-react";
import { useHabitStore, formatIDR } from "@/stores/useHabitStore";

export const Route = createFileRoute("/_app/growth")({
  head: () => ({ meta: [{ title: "Growth — wondr" }] }),
  component: GrowthPage,
});

const RATES = [
  { code: "USD", flag: "🇺🇸", rate: 15420, change: -0.8, hint: "Terendah 7 hari" },
  { code: "SGD", flag: "🇸🇬", rate: 11890, change: 0.2 },
  { code: "MYR", flag: "🇲🇾", rate: 3450, change: -0.3 },
  { code: "JPY", flag: "🇯🇵", rate: 102, change: 1.1 },
];

function GrowthPage() {
  const goals = useHabitStore((s) => s.goals);
  const showNudge = useHabitStore((s) => s.showNudge);
  const [showRecurring, setShowRecurring] = useState(false);
  const [showNewGoal, setShowNewGoal] = useState(false);

  return (
    <div className="px-5 pt-12">
      <h1 className="text-2xl font-black">Growth</h1>
      <p className="text-sm text-muted-foreground mb-6">Future goal planning · Tapenas & investasi</p>

      {/* Goals */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold">Tabungan Perencanaan (Tapenas)</h3>
        <button onClick={() => setShowNewGoal(true)} className="text-xs flex items-center gap-1 text-accent">
          <Plus className="w-3.5 h-3.5" /> Baru
        </button>
      </div>
      <div className="space-y-3 mb-6">
        {goals.map((g) => {
          const pct = Math.round((g.current / g.target) * 100);
          return (
            <div key={g.id} className="rounded-2xl bg-card border border-border p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{g.emoji}</span>
                  <div>
                    <div className="text-sm font-bold">{g.name}</div>
                    <div className="text-[11px] text-muted-foreground">{formatIDR(g.current)} dari {formatIDR(g.target)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-accent">{pct}%</div>
                </div>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-accent to-cyan-300 shadow-[0_0_10px_var(--accent)]"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => g.id === "bali" ? showNudge("bali_goal") : setShowRecurring(true)}
                  className="flex-1 rounded-xl bg-primary text-primary-foreground text-xs font-bold py-2.5"
                >
                  Top up
                </button>
                <button onClick={() => setShowRecurring(true)} className="flex-1 rounded-xl bg-muted/40 text-xs font-semibold py-2.5 flex items-center justify-center gap-1">
                  <Repeat className="w-3.5 h-3.5" /> Auto-debit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multicurrency */}
      <div className="rounded-3xl bg-gradient-to-br from-accent/20 via-card to-card border border-accent/30 p-5 mb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-accent mb-2">
          <Globe2 className="w-3.5 h-3.5" /> Multicurrency Wallet
        </div>
        <h3 className="text-lg font-bold mb-1">Your Financial Passport</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Untuk traveler & diaspora — transaksi mata uang asing tanpa drama.
        </p>
        <div className="space-y-2 mb-4">
          {RATES.map((r) => (
            <div key={r.code} className="flex items-center justify-between rounded-xl bg-muted/30 p-2.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">{r.flag}</span>
                <div>
                  <div className="text-xs font-bold">{r.code}/IDR</div>
                  {r.hint && <div className="text-[10px] text-accent">{r.hint}</div>}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">Rp {r.rate.toLocaleString("id-ID")}</div>
                <div className={`text-[10px] flex items-center gap-0.5 justify-end ${r.change < 0 ? "text-accent" : "text-primary"}`}>
                  {r.change < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                  {Math.abs(r.change)}%
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => showNudge("travel")} className="rounded-xl bg-primary text-primary-foreground font-bold py-2.5 text-xs">
            Aktifkan wallet
          </button>
          <button onClick={() => showNudge("diaspora_rate")} className="rounded-xl bg-muted/40 font-semibold py-2.5 text-xs">
            Set rate alert
          </button>
        </div>
      </div>

      {/* Behavioral loop indicator */}
      <div className="rounded-2xl border border-border bg-card p-4 mb-2">
        <div className="flex items-center gap-2 text-xs text-accent mb-1">
          <Sparkles className="w-3.5 h-3.5" /> Behavioral Loop
        </div>
        <p className="text-xs text-muted-foreground">
          Setiap transaksi yang kamu lakukan jadi data baru buat engine. Semakin sering pakai wondr, rekomendasi makin presisi.
        </p>
      </div>

      <RecurringModal open={showRecurring} onClose={() => setShowRecurring(false)} />
      <NewGoalModal open={showNewGoal} onClose={() => setShowNewGoal(false)} />
    </div>
  );
}

function RecurringModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState(500000);
  const [freq, setFreq] = useState<"weekly" | "monthly">("weekly");
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 400 }} animate={{ y: 0 }} exit={{ y: 400 }}
            transition={{ type: "spring", damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-3xl bg-card border-t border-border p-6 pb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Auto-debit recurring</h3>
              <button onClick={onClose}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">Nominal per debit</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full mt-1 rounded-xl bg-muted/40 border border-border p-3 font-bold"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Frekuensi</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {(["weekly", "monthly"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFreq(f)}
                      className={`rounded-xl py-2.5 text-sm font-semibold border ${
                        freq === f ? "bg-accent text-accent-foreground border-accent" : "bg-muted/40 border-border"
                      }`}
                    >
                      {f === "weekly" ? "Mingguan" : "Bulanan"}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={onClose} className="w-full rounded-2xl bg-primary text-primary-foreground font-bold py-3.5">
                Aktifkan auto-debit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NewGoalModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 400 }} animate={{ y: 0 }} exit={{ y: 400 }}
            transition={{ type: "spring", damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-3xl bg-card border-t border-border p-6 pb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Buat saving goal baru</h3>
              <button onClick={onClose}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Nama goal (ex: Macbook Pro)" className="w-full rounded-xl bg-muted/40 border border-border p-3 text-sm" />
              <input placeholder="Target nominal" type="number" className="w-full rounded-xl bg-muted/40 border border-border p-3 text-sm" />
              <input placeholder="Target tanggal" type="date" className="w-full rounded-xl bg-muted/40 border border-border p-3 text-sm text-muted-foreground" />
              <button onClick={onClose} className="w-full rounded-2xl bg-primary text-primary-foreground font-bold py-3.5">
                Buat goal
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
