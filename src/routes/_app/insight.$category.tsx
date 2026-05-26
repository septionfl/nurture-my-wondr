import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, TrendingDown, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { useHabitStore, formatIDR } from "@/stores/useHabitStore";
import { CategoryIcon, categoryColor } from "@/components/CategoryIcon";

export const Route = createFileRoute("/_app/insight/$category")({
  head: ({ params }) => ({ meta: [{ title: `${params.category} — Insight` }] }),
  component: CategoryDetail,
});

const WEEKLY: Record<string, { w: string; v: number }[]> = {
  Kafe: [{ w: "W1", v: 95 }, { w: "W2", v: 120 }, { w: "W3", v: 80 }, { w: "W4", v: 125 }],
  Makanan: [{ w: "W1", v: 480 }, { w: "W2", v: 620 }, { w: "W3", v: 510 }, { w: "W4", v: 490 }],
  Travel: [{ w: "W1", v: 0 }, { w: "W2", v: 1850 }, { w: "W3", v: 0 }, { w: "W4", v: 0 }],
  Wellness: [{ w: "W1", v: 100 }, { w: "W2", v: 150 }, { w: "W3", v: 100 }, { w: "W4", v: 100 }],
  Belanja: [{ w: "W1", v: 200 }, { w: "W2", v: 180 }, { w: "W3", v: 150 }, { w: "W4", v: 150 }],
  Transport: [{ w: "W1", v: 80 }, { w: "W2", v: 90 }, { w: "W3", v: 80 }, { w: "W4", v: 70 }],
};

const TOTALS: Record<string, { now: number; prev: number }> = {
  Kafe: { now: 420_000, prev: 380_000 },
  Makanan: { now: 2_100_000, prev: 1_780_000 },
  Travel: { now: 1_850_000, prev: 0 },
  Wellness: { now: 450_000, prev: 200_000 },
  Belanja: { now: 680_000, prev: 720_000 },
  Transport: { now: 320_000, prev: 290_000 },
};

function CategoryDetail() {
  const { category } = Route.useParams();
  const navigate = useNavigate();
  const transactions = useHabitStore((s) => s.transactions).filter((t) => t.category === category);
  const data = WEEKLY[category] ?? [];
  const totals = TOTALS[category] ?? { now: 0, prev: 0 };
  const delta = totals.prev === 0 ? 100 : Math.round(((totals.now - totals.prev) / totals.prev) * 100);
  const up = delta >= 0;

  return (
    <div className="px-5 pt-10">
      <button onClick={() => navigate({ to: "/insight" })} className="flex items-center gap-2 text-sm font-semibold mb-4 -ml-1">
        <ArrowLeft className="w-4 h-4" /> Insight
      </button>

      <div className="flex items-center gap-3 mb-5">
        <CategoryIcon category={category} size={56} />
        <div>
          <h1 className="text-2xl font-black">{category}</h1>
          <p className="text-xs text-muted-foreground">Detail bulan ini</p>
        </div>
      </div>

      <div className="rounded-3xl bg-card border border-border p-5 mb-5 shadow-[var(--shadow-soft)]">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">Total Mei 2026</div>
        <div className="flex items-end gap-3 mb-1">
          <div className="text-3xl font-black">{formatIDR(totals.now)}</div>
          <div className={`text-xs pb-1.5 flex items-center gap-1 font-bold ${up ? "text-rose-600" : "text-emerald-600"}`}>
            {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(delta)}% vs bulan lalu
          </div>
        </div>
        <div className="h-44 -mx-2 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="w" stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12 }}
                formatter={(v: number) => `Rp ${(v * 1000).toLocaleString("id-ID")}`}
              />
              <Bar dataKey="v" fill={categoryColor(category)} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h3 className="text-sm font-bold mb-3">Transaksi terkait</h3>
      <div className="rounded-2xl bg-card border border-border divide-y divide-border shadow-[var(--shadow-soft)] mb-5">
        {transactions.length === 0 ? (
          <div className="p-5 text-center text-xs text-muted-foreground">Belum ada transaksi.</div>
        ) : transactions.map((t) => (
          <button
            key={t.id}
            onClick={() => alert(`${t.label}\n${t.time}\n${formatIDR(t.amount)}`)}
            className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/40 first:rounded-t-2xl last:rounded-b-2xl transition"
          >
            <div>
              <div className="text-sm font-semibold">{t.label}</div>
              <div className="text-[11px] text-muted-foreground">{t.time}</div>
            </div>
            <div className={`text-sm font-bold ${t.amount > 0 ? "text-emerald-600" : "text-foreground"}`}>
              {t.amount > 0 ? "+" : ""}{formatIDR(t.amount)}
            </div>
          </button>
        ))}
      </div>

      <Link
        to="/growth"
        className="block w-full rounded-2xl bg-primary text-primary-foreground font-bold py-3.5 text-center text-sm shadow-[var(--shadow-premium)] mb-3"
      >
        Buat budget untuk {category}
      </Link>
    </div>
  );
}
