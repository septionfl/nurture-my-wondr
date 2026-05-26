import { create } from "zustand";

export type NudgeKey =
  | "salary"
  | "bali_goal"
  | "diaspora_rate"
  | "cafe_qris"
  | "high_food"
  | "wellness"
  | "travel";

export type NudgeIconKey =
  | "wallet"
  | "plane"
  | "trending-down"
  | "coffee"
  | "utensils"
  | "heart-pulse"
  | "globe";

export interface NudgeContent {
  key: NudgeKey;
  iconKey: NudgeIconKey;
  headline: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  amount?: number;
  goalId?: string;
}

export const NUDGES: Record<NudgeKey, NudgeContent> = {
  salary: {
    key: "salary",
    iconKey: "wallet",
    headline: "Gajian masuk!",
    body: "Kami deteksi pemasukan Rp 12.500.000. Aktifkan Auto-Save 20% agar dana darurat tumbuh konsisten.",
    primaryCta: "Auto-save Rp 2.500.000",
    secondaryCta: "Nanti saja",
    amount: 2_500_000,
    goalId: "emergency",
  },
  bali_goal: {
    key: "bali_goal",
    iconKey: "plane",
    headline: "80% menuju Liburan Bali",
    body: "Sedikit lagi. Tambah Rp 500.000 minggu ini agar trip terealisasi bulan depan.",
    primaryCta: "Top up Rp 500.000",
    secondaryCta: "Atur ulang target",
    amount: 500_000,
    goalId: "bali",
  },
  diaspora_rate: {
    key: "diaspora_rate",
    iconKey: "trending-down",
    headline: "USD sedang turun",
    body: "Rate hari ini Rp 15.420 — terendah 7 hari terakhir. Pasang alert agar tidak terlewat.",
    primaryCta: "Set rate alert",
    secondaryCta: "Tukar sekarang",
  },
  cafe_qris: {
    key: "cafe_qris",
    iconKey: "coffee",
    headline: "Kunjungan kafe ke-8 bulan ini",
    body: "Total Rp 420.000 untuk kopi. Pindahkan Rp 300.000 ke tabungan Bali agar tetap on-track.",
    primaryCta: "Pindahkan Rp 300.000",
    secondaryCta: "Lewati",
    amount: 300_000,
    goalId: "bali",
  },
  high_food: {
    key: "high_food",
    iconKey: "utensils",
    headline: "Rp 2.100.000 untuk makan bulan ini",
    body: "Pengeluaran makanan 18% di atas rata-rata. Top up Tapenas agar komitmen tabungan tetap terjaga.",
    primaryCta: "Top up Tapenas Rp 250.000",
    secondaryCta: "Lihat detail",
    amount: 250_000,
    goalId: "emergency",
  },
  wellness: {
    key: "wellness",
    iconKey: "heart-pulse",
    headline: "Aktivitas wellness meningkat",
    body: "Kami melihat pendaftaran lomba lari. Buat goal Marathon Jakarta + budget bulanan Rp 500.000.",
    primaryCta: "Buat goal Marathon",
    secondaryCta: "Nanti",
    amount: 500_000,
    goalId: "marathon",
  },
  travel: {
    key: "travel",
    iconKey: "globe",
    headline: "Aktifkan Multicurrency Wallet",
    body: "Pola perjalanan lintas-negara terdeteksi. Multicurrency Wallet menghemat biaya konversi sampai 3%.",
    primaryCta: "Aktifkan sekarang",
    secondaryCta: "Pelajari dulu",
  },
};

export interface Goal {
  id: string;
  name: string;
  iconKey: string; // mapped via NudgeIcon/Goal icon helper
  target: number;
  current: number;
  autoTransfer: boolean;
}

export interface Txn {
  id: string;
  label: string;
  category: string;
  amount: number;
  time: string;
  auto?: boolean;
  goalId?: string;
}

export interface NudgeHistoryEntry {
  id: string;
  key: NudgeKey;
  action: "shown" | "accepted" | "dismissed";
  timestamp: number;
  amount?: number;
  goalId?: string;
}

interface HabitState {
  balance: number;
  goals: Goal[];
  transactions: Txn[];
  triggeredNudges: NudgeKey[];
  nudgeHistory: NudgeHistoryEntry[];
  dashboardNudge: NudgeKey | null;
  pendingNudge: NudgeContent | null;
  setDashboardNudge: (k: NudgeKey | null) => void;
  showNudge: (k: NudgeKey) => void;
  dismissNudge: () => void;
  acceptNudge: () => void;
  addTransaction: (t: Txn) => void;
  topUpGoal: (goalId: string, amount: number) => void;
  toggleAutoTransfer: (goalId: string) => void;
}

const now = () => Date.now();

export const useHabitStore = create<HabitState>((set, get) => ({
  balance: 18_420_000,
  goals: [
    { id: "bali", name: "Liburan Bali", iconKey: "palm", target: 8_000_000, current: 6_400_000, autoTransfer: true },
    { id: "emergency", name: "Dana Darurat", iconKey: "shield", target: 30_000_000, current: 13_500_000, autoTransfer: true },
    { id: "marathon", name: "Marathon Jakarta", iconKey: "activity", target: 3_000_000, current: 0, autoTransfer: false },
  ],
  transactions: [
    { id: "t1", label: "Kopi Janji Jiwa", category: "Kafe", amount: -38_000, time: "Hari ini, 09:14" },
    { id: "t2", label: "GoFood — Nasi Padang", category: "Makanan", amount: -65_000, time: "Kemarin, 19:32" },
    { id: "t3", label: "Gaji Bulanan", category: "Pemasukan", amount: 12_500_000, time: "25 Mei" },
    { id: "t4", label: "Tiket AirAsia KUL", category: "Travel", amount: -1_850_000, time: "20 Mei" },
    { id: "t5", label: "Marathon Jakarta Reg.", category: "Wellness", amount: -450_000, time: "18 Mei" },
  ],
  triggeredNudges: [],
  nudgeHistory: [],
  dashboardNudge: "salary",
  pendingNudge: null,
  setDashboardNudge: (k) => set({ dashboardNudge: k }),
  showNudge: (k) => {
    set({
      pendingNudge: NUDGES[k],
      nudgeHistory: [
        { id: `n${now()}`, key: k, action: "shown", timestamp: now() },
        ...get().nudgeHistory,
      ],
    });
  },
  dismissNudge: () => {
    const n = get().pendingNudge;
    if (n) {
      set({
        pendingNudge: null,
        nudgeHistory: [
          { id: `n${now()}`, key: n.key, action: "dismissed", timestamp: now() },
          ...get().nudgeHistory,
        ],
      });
    } else {
      set({ pendingNudge: null });
    }
  },
  acceptNudge: () => {
    const n = get().pendingNudge;
    if (!n) return;
    set({
      triggeredNudges: [...get().triggeredNudges, n.key],
      pendingNudge: null,
      nudgeHistory: [
        { id: `n${now()}`, key: n.key, action: "accepted", timestamp: now(), amount: n.amount, goalId: n.goalId },
        ...get().nudgeHistory,
      ],
    });
    if (n.amount && n.goalId) {
      const goal = get().goals.find((g) => g.id === n.goalId);
      if (goal) {
        get().topUpGoal(n.goalId, n.amount);
        // log auto-transfer transaction
        set({
          transactions: [
            {
              id: `auto${now()}`,
              label: `Auto-transfer → ${goal.name}`,
              category: "Auto-Save",
              amount: -n.amount,
              time: "Baru saja",
              auto: true,
              goalId: n.goalId,
            },
            ...get().transactions,
          ],
        });
      }
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
  toggleAutoTransfer: (goalId) =>
    set({
      goals: get().goals.map((g) =>
        g.id === goalId ? { ...g, autoTransfer: !g.autoTransfer } : g
      ),
    }),
}));

export const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export const formatRelative = (ts: number) => {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Baru saja";
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  return `${d} hari lalu`;
};
