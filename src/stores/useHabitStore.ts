import { create } from "zustand";

export type NudgeKey =
  | "salary"
  | "bali_goal"
  | "diaspora_rate"
  | "cafe_qris"
  | "high_food"
  | "wellness"
  | "travel";

export interface NudgeContent {
  key: NudgeKey;
  emoji: string;
  headline: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  amount?: number;
}

export const NUDGES: Record<NudgeKey, NudgeContent> = {
  salary: {
    key: "salary",
    emoji: "🎉",
    headline: "Gajian masuk!",
    body: "Kami deteksi pemasukan Rp 12,5 jt. Aktifkan Auto-Save 20% biar mimpi makin dekat?",
    primaryCta: "Auto-save Rp 2,5 jt sekarang",
    secondaryCta: "Nanti aja",
    amount: 2500000,
  },
  bali_goal: {
    key: "bali_goal",
    emoji: "✈️",
    headline: "80% menuju Bali",
    body: "Sedikit lagi! Tambah Rp 500 rb minggu ini biar trip-mu fix bulan depan.",
    primaryCta: "Top up Rp 500K",
    secondaryCta: "Atur ulang target",
    amount: 500000,
  },
  diaspora_rate: {
    key: "diaspora_rate",
    emoji: "📉",
    headline: "USD lagi turun",
    body: "Rate hari ini Rp 15.420 — terendah 7 hari terakhir. Pasang alert biar nggak ketinggalan?",
    primaryCta: "Set rate alert",
    secondaryCta: "Tukar sekarang",
  },
  cafe_qris: {
    key: "cafe_qris",
    emoji: "☕",
    headline: "Kopi ke-8 bulan ini",
    body: "Total Rp 420 rb buat kafe. Alokasikan Rp 300 rb ke tabungan biar tetap balance?",
    primaryCta: "Yes, pindahkan Rp 300K",
    secondaryCta: "Skip",
    amount: 300000,
  },
  high_food: {
    key: "high_food",
    emoji: "🍔",
    headline: "Rp 2,1 jt untuk makan bulan ini",
    body: "Saatnya jaga komitmen — top up Tapenas-mu sekarang?",
    primaryCta: "Top up Tapenas",
    secondaryCta: "Lihat detail",
  },
  wellness: {
    key: "wellness",
    emoji: "🏃",
    headline: "Kamu makin aktif",
    body: "Kami lihat kamu daftar lomba lari. Yuk set Marathon Goal + budget wellness bulanan.",
    primaryCta: "Buat goal marathon",
    secondaryCta: "Nanti",
  },
  travel: {
    key: "travel",
    emoji: "🌏",
    headline: "Trip berikutnya kemana?",
    body: "Dompet multicurrency siap nemenin. Aktifkan biar transaksi luar negeri tanpa drama.",
    primaryCta: "Aktifkan multicurrency",
    secondaryCta: "Lihat info",
  },
};

export interface Goal {
  id: string;
  name: string;
  emoji: string;
  target: number;
  current: number;
}

export interface Txn {
  id: string;
  label: string;
  category: string;
  amount: number;
  time: string;
}

interface HabitState {
  balance: number;
  goals: Goal[];
  transactions: Txn[];
  triggeredNudges: NudgeKey[];
  dashboardNudge: NudgeKey | null;
  pendingNudge: NudgeContent | null;
  setDashboardNudge: (k: NudgeKey | null) => void;
  showNudge: (k: NudgeKey) => void;
  dismissNudge: () => void;
  acceptNudge: () => void;
  addTransaction: (t: Txn) => void;
  topUpGoal: (goalId: string, amount: number) => void;
}

export const useHabitStore = create<HabitState>((set, get) => ({
  balance: 18_420_000,
  goals: [
    { id: "bali", name: "Liburan Bali", emoji: "🏝️", target: 8_000_000, current: 6_400_000 },
    { id: "emergency", name: "Dana Darurat", emoji: "🛟", target: 30_000_000, current: 13_500_000 },
    { id: "marathon", name: "Marathon Jakarta", emoji: "🏃", target: 3_000_000, current: 0 },
  ],
  transactions: [
    { id: "t1", label: "Kopi Janji Jiwa", category: "Kafe", amount: -38000, time: "Hari ini, 09:14" },
    { id: "t2", label: "GoFood — Nasi Padang", category: "Makanan", amount: -65000, time: "Kemarin, 19:32" },
    { id: "t3", label: "Gaji Bulanan", category: "Pemasukan", amount: 12_500_000, time: "25 Mei" },
    { id: "t4", label: "Tiket AirAsia KUL", category: "Travel", amount: -1_850_000, time: "20 Mei" },
    { id: "t5", label: "Marathon Jakarta Reg.", category: "Wellness", amount: -450_000, time: "18 Mei" },
  ],
  triggeredNudges: [],
  dashboardNudge: "salary",
  pendingNudge: null,
  setDashboardNudge: (k) => set({ dashboardNudge: k }),
  showNudge: (k) => set({ pendingNudge: NUDGES[k] }),
  dismissNudge: () => set({ pendingNudge: null }),
  acceptNudge: () => {
    const n = get().pendingNudge;
    if (!n) return;
    set({ triggeredNudges: [...get().triggeredNudges, n.key], pendingNudge: null });
    if (n.key === "cafe_qris" && n.amount) {
      get().topUpGoal("bali", n.amount);
    }
    if (n.key === "bali_goal" && n.amount) {
      get().topUpGoal("bali", n.amount);
    }
    if (n.key === "salary" && n.amount) {
      get().topUpGoal("emergency", n.amount);
    }
  },
  addTransaction: (t) =>
    set({
      transactions: [t, ...get().transactions],
      balance: get().balance + t.amount,
    }),
  topUpGoal: (goalId, amount) =>
    set({
      balance: get().balance - amount,
      goals: get().goals.map((g) =>
        g.id === goalId ? { ...g, current: Math.min(g.target, g.current + amount) } : g
      ),
    }),
}));

export const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
