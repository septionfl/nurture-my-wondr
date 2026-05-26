import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Globe2, Repeat, Sparkles, TrendingUp, TrendingDown, X, PiggyBank, ChevronRight } from "lucide-react";
import { useHabitStore, formatIDR, Goal } from "@/stores/useHabitStore";
import { NudgeIcon } from "@/components/NudgeIcon";

export const Route = createFileRoute("/_app/growth")({
  head: () => ({ meta: [{ title: "Growth — wondr" }] }),
  component: GrowthPage,
});

const RATES = [
  { code: "USD", country: "Amerika Serikat", rate: 15_420, change: -0.8, hint: "Terendah 7 hari" },
  { code: "SGD", country: "Singapura", rate: 11_890, change: 0.2 },
  { code: "MYR", country: "Malaysia", rate: 3_450, change: -0.3 },
  { code: "JPY", country: "Jepang", rate: 102, change: 1.1 },
];

function GrowthPage() {
  const goals = useHabitStore((s) => s.goals);
  const transactions = useHabitStore((s) => s.transactions);
  const showNudge = useHabitStore((s) => s.showNudge);
  const toggleAuto = useHabitStore((s) => s.toggleAutoTransfer);
  const topUpGoal = useHabitStore((s) => s.topUpGoal);
  const [showRecurring, setShowRecurring] = useState(false);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [detailGoal, setDetailGoal] = useState<Goal | null>(null);
  const [rateDetail, setRateDetail] = useState<typeof RATES[number] | null>(null);

  const autoTxns = transactions.filter((t) => t.auto);

  return (
    <div className="px-5 pt-10">
      <h1 className="text-2xl font-black">Growth</h1>
      <p className="text-xs text-muted-foreground mb-5">Perencanaan masa depan · Future dimension</p>

      {/* Auto-transfer activity */}
      {autoTxns.length > 0 && (
        <div className="rounded-3xl bg-gradient-to-br from-accent/10 via-card to-card border border-accent/30 p-5 mb-5 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-accent font-bold mb-3">
            <PiggyBank className="w-3.5 h-3.5" /> Auto-Transfer Aktif
          </div>
          <div className="space-y-2">
            {autoTxns.slice(0, 3).map((t) => (
              <button
                key={t.id}
                onClick={() => alert(`${t.label}\n${t.time}\n${formatIDR(t.amount)}`)}
                className="w-full flex items-center justify-between rounded-xl bg-background/60 p-2.5 text-left hover:bg-background transition"
              >
                <div>
                  <div className="text-xs font-semibold">{t.label}</div>
                  <div className="text-[10px] text-muted-foreground">{t.time}</div>
                </div>
                <div className="text-sm font-bold text-accent">{formatIDR(Math.abs(t.amount))}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Goals */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold">Tabungan Perencanaan (Tapenas)</h3>
        <button onClick={() => setShowNewGoal(true)} className="text-xs flex items-center gap-1 text-primary font-semibold">
          <Plus className="w-3.5 h-3.5" /> Baru
        </button>
      </div>
      <div className="space-y-3 mb-6">
        {goals.map((g) => {
          const pct = Math.round((g.current / g.target) * 100);
          return (
            <button
              key={g.id}
              onClick={() => setDetailGoal(g)}
              className="w-full text-left rounded-2xl bg-card border border-border p-4 hover:border-primary/40 transition shadow-[var(--shadow-soft)]"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <NudgeIcon iconKey={g.iconKey} size="md" tone="accent" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{g.name}</span>
                      {g.autoTransfer && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-1.5 py-0.5 rounded">
                          Auto
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-muted-foreground">{formatIDR(g.current)} / {formatIDR(g.target)}</div>
                  </div>
                </div>
                <div className="text-lg font-black text-primary">{pct}%</div>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-orange-500"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Multicurrency */}
      <div className="rounded-3xl bg-gradient-to-br from-[var(--navy)] to-[var(--navy-soft)] text-white p-5 mb-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-cyan-300 mb-2">
          <Globe2 className="w-3.5 h-3.5" /> Multicurrency Wallet
        </div>
        <h3 className="text-lg font-bold mb-1">Your Financial Passport</h3>
        <p className="text-xs text-white/70 mb-4">
          Untuk traveler & diaspora — transaksi mata uang asing tanpa biaya konversi tinggi.
        </p>
        <div className="space-y-2 mb-4">
          {RATES.map((r) => (
            <button
              key={r.code}
              onClick={() => setRateDetail(r)}
              className="w-full flex items-center justify-between rounded-xl bg-white/10 hover:bg-white/15 p-2.5 transition text-left"
            >
              <div>
                <div className="text-xs font-bold">{r.code}/IDR · <span className="text-white/60 font-normal">{r.country}</span></div>
                {r.hint && <div className="text-[10px] text-cyan-300 mt-0.5">{r.hint}</div>}
              </div>
              <div className="text-right flex items-center gap-2">
                <div>
                  <div className="text-sm font-bold">Rp {r.rate.toLocaleString("id-ID")}</div>
                  <div className={`text-[10px] flex items-center gap-0.5 justify-end font-semibold ${r.change < 0 ? "text-cyan-300" : "text-orange-300"}`}>
                    {r.change < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                    {Math.abs(r.change)}%
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/50" />
              </div>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => showNudge("travel")} className="rounded-xl bg-primary text-primary-foreground font-bold py-2.5 text-xs">
            Aktifkan wallet
          </button>
          <button onClick={() => showNudge("diaspora_rate")} className="rounded-xl bg-white/15 text-white font-semibold py-2.5 text-xs">
            Set rate alert
          </button>
        </div>
      </div>

      {/* Behavioral loop */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-primary font-bold mb-1">
          <Sparkles className="w-3.5 h-3.5" /> Behavioral Loop
        </div>
        <p className="text-xs text-muted-foreground">
          Setiap transaksi jadi data baru untuk engine. Semakin sering pakai wondr, rekomendasi makin presisi.
        </p>
      </div>

      <GoalDetailSheet
        goal={detailGoal}
        onClose={() => setDetailGoal(null)}
        onTopUp={(amt) => detailGoal && topUpGoal(detailGoal.id, amt)}
        onToggleAuto={() => detailGoal && toggleAuto(detailGoal.id)}
      />
      <RateDetailSheet rate={rateDetail} onClose={() => setRateDetail(null)} onAlert={() => { setRateDetail(null); showNudge("diaspora_rate"); }} />
      <RecurringModal open={showRecurring} onClose={() => setShowRecurring(false)} />
      <NewGoalModal open={showNewGoal} onClose={() => setShowNewGoal(false)} />
    </div>
  );
}

function GoalDetailSheet({
  goal, onClose, onTopUp, onToggleAuto,
}: { goal: Goal | null; onClose: () => void; onTopUp: (amt: number) => void; onToggleAuto: () => void }) {
  const [amount, setAmount] = useState(500_000);
  return (
    <AnimatePresence>
      {goal && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--navy)]/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 400 }} animate={{ y: 0 }} exit={{ y: 400 }}
            transition={{ type: "spring", damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-3xl bg-background border-t border-border p-6 pb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <NudgeIcon iconKey={goal.iconKey} size="md" tone="accent" />
                <div>
                  <h3 className="text-lg font-bold">{goal.name}</h3>
                  <div className="text-xs text-muted-foreground">{formatIDR(goal.current)} / {formatIDR(goal.target)}</div>
                </div>
              </div>
              <button onClick={onClose} className="p-1.5"><X className="w-4 h-4" /></button>
            </div>

            <div className="rounded-xl bg-muted p-3 mb-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold">Auto-transfer dari nudge</div>
                <div className="text-[10px] text-muted-foreground">Engine otomatis pindahkan dana ke goal ini</div>
              </div>
              <button
                onClick={onToggleAuto}
                className={`relative w-11 h-6 rounded-full transition ${goal.autoTransfer ? "bg-primary" : "bg-muted-foreground/30"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition ${goal.autoTransfer ? "left-5" : "left-0.5"}`} />
              </button>
            </div>

            <label className="text-xs text-muted-foreground">Top up manual</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full mt-1 mb-3 rounded-xl bg-muted border border-border p-3 font-bold"
            />
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[100_000, 500_000, 1_000_000].map((a) => (
                <button key={a} onClick={() => setAmount(a)} className="rounded-lg bg-muted text-xs font-semibold py-2 hover:bg-muted/70">
                  {formatIDR(a)}
                </button>
              ))}
            </div>
            <button
              onClick={() => { onTopUp(amount); onClose(); }}
              className="w-full rounded-2xl bg-primary text-primary-foreground font-bold py-3.5 shadow-[var(--shadow-premium)]"
            >
              Top up sekarang
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RateDetailSheet({
  rate, onClose, onAlert,
}: { rate: typeof RATES[number] | null; onClose: () => void; onAlert: () => void }) {
  return (
    <AnimatePresence>
      {rate && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--navy)]/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 400 }} animate={{ y: 0 }} exit={{ y: 400 }}
            transition={{ type: "spring", damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-3xl bg-background border-t border-border p-6 pb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold">{rate.code} · {rate.country}</h3>
                <div className="text-2xl font-black mt-1">Rp {rate.rate.toLocaleString("id-ID")}</div>
                <div className={`text-xs font-semibold ${rate.change < 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {rate.change < 0 ? "▼" : "▲"} {Math.abs(rate.change)}% hari ini
                </div>
              </div>
              <button onClick={onClose} className="p-1.5"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2">
              <button onClick={onAlert} className="w-full rounded-2xl bg-primary text-primary-foreground font-bold py-3.5">
                Pasang rate alert
              </button>
              <button onClick={onClose} className="w-full rounded-2xl bg-muted font-semibold py-3.5">
                Tukar nanti
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RecurringModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState(500_000);
  const [freq, setFreq] = useState<"weekly" | "monthly">("weekly");
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--navy)]/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 400 }} animate={{ y: 0 }} exit={{ y: 400 }}
            transition={{ type: "spring", damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-3xl bg-background border-t border-border p-6 pb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2"><Repeat className="w-4 h-4" /> Auto-debit recurring</h3>
              <button onClick={onClose}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground">Nominal per debit</label>
                <input
                  type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full mt-1 rounded-xl bg-muted border border-border p-3 font-bold"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Frekuensi</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {(["weekly", "monthly"] as const).map((f) => (
                    <button key={f} onClick={() => setFreq(f)}
                      className={`rounded-xl py-2.5 text-sm font-semibold border ${
                        freq === f ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border"
                      }`}>
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
          className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--navy)]/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 400 }} animate={{ y: 0 }} exit={{ y: 400 }}
            transition={{ type: "spring", damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-3xl bg-background border-t border-border p-6 pb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Buat saving goal baru</h3>
              <button onClick={onClose}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Nama goal (mis. Macbook Pro)" className="w-full rounded-xl bg-muted border border-border p-3 text-sm" />
              <input placeholder="Target nominal" type="number" className="w-full rounded-xl bg-muted border border-border p-3 text-sm" />
              <input placeholder="Target tanggal" type="date" className="w-full rounded-xl bg-muted border border-border p-3 text-sm text-muted-foreground" />
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
