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
  | "globe"
  | "shield"
  | "palm"
  | "activity";

export type Persona = "beni" | "wanda";

export interface PersonaProfile {
  id: Persona;
  name: string;
  greeting: string;
  salary: number;
  shieldAmount: number;
  shieldGoalName: string;
  shieldHeadline: string;
  shieldBody: string;
  shieldCta: string;
  shieldBreakdown: { label: string; amount: number }[];
}

export const PERSONAS: Record<Persona, PersonaProfile> = {
  beni: {
    id: "beni",
    name: "Beni",
    greeting: "Hi, Beni",
    salary: 5_000_000,
    shieldAmount: 2_000_000,
    shieldGoalName: "Tagihan Rutin",
    shieldHeadline: "Halo Beni, gaji Rp 5.000.000 sudah masuk!",
    shieldBody:
      "Pisahkan Rp 2.000.000 sekarang ke kantong Tagihan Rutin biar nggak terpakai buat jajan.",
    shieldCta: "Pisahkan Sekarang",
    shieldBreakdown: [
      { label: "Kos & Listrik", amount: 1_400_000 },
      { label: "Kuota & Langganan", amount: 350_000 },
      { label: "Transport Bulanan", amount: 250_000 },
    ],
  },
  wanda: {
    id: "wanda",
    name: "Bu Wanda",
    greeting: "Hi, Bu Wanda",
    salary: 12_500_000,
    shieldAmount: 7_500_000,
    shieldGoalName: "Pos Rumah Tangga",
    shieldHeadline: "Bu Wanda, gaji bulanan sudah cair.",
    shieldBody:
      "Bagi otomatis ke 3 pos rumah tangga sekarang biar budget keluarga tetap aman.",
    shieldCta: "Bagi Otomatis",
    shieldBreakdown: [
      { label: "Belanja Dapur", amount: 3_500_000 },
      { label: "Listrik & Air", amount: 1_500_000 },
      { label: "Pendidikan Anak", amount: 2_500_000 },
    ],
  },
};

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
    body: "Aktifkan Payday Auto-Shield agar dana rutin terpisah otomatis.",
    primaryCta: "Aktifkan Shield",
    secondaryCta: "Nanti saja",
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
  iconKey: NudgeIconKey | string;
  target: number;
  current: number;
  autoTransfer: boolean;
  locked?: boolean;
  routedCategory?: string;
  createdFrom?: "payday" | "micro" | "manual";
  accent?: string; // CSS color var for carousel
}

export interface Txn {
  id: string;
  label: string;
  category: string;
  amount: number;
  time: string;
  auto?: boolean;
  goalId?: string;
  routed?: boolean; // paid from a goal pocket
}

export interface NudgeHistoryEntry {
  id: string;
  key: NudgeKey;
  action: "shown" | "accepted" | "dismissed";
  timestamp: number;
  amount?: number;
  goalId?: string;
}

export interface RoutedResult {
  routed: boolean;
  goalId?: string;
  goalName?: string;
  remaining?: number;
}

interface HabitState {
  persona: Persona;
  setPersona: (p: Persona) => void;

  balance: number;
  goals: Goal[];
  transactions: Txn[];
  triggeredNudges: NudgeKey[];
  nudgeHistory: NudgeHistoryEntry[];
  dashboardNudge: NudgeKey | null;
  pendingNudge: NudgeContent | null;

  paydayShieldOpen: boolean;
  triggerPaydayShield: () => void;
  dismissPaydayShield: () => void;
  acceptPaydayShield: () => { goalId: string; amount: number };

  setDashboardNudge: (k: NudgeKey | null) => void;
  showNudge: (k: NudgeKey) => void;
  dismissNudge: () => void;
  acceptNudge: () => void;
  addTransaction: (t: Omit<Txn, "routed">) => RoutedResult;
  topUpGoal: (goalId: string, amount: number) => void;
  toggleAutoTransfer: (goalId: string) => void;
  acceptMicroBudget: (category: string, amount: number, name: string, iconKey: NudgeIconKey) => string;
  getGoalForCategory: (category: string) => Goal | undefined;
}

const now = () => Date.now();

export const useHabitStore = create<HabitState>((set, get) => ({
  persona: "beni",
  setPersona: (p) => set({ persona: p }),

  balance: 18_420_000,
  goals: [
    { id: "bali", name: "Liburan Bali", iconKey: "plane", target: 8_000_000, current: 6_400_000, autoTransfer: true, accent: "var(--wondr-purple)" },
    { id: "emergency", name: "Dana Darurat", iconKey: "shield", target: 30_000_000, current: 13_500_000, autoTransfer: true, accent: "var(--wondr-teal)" },
    { id: "marathon", name: "Marathon Jakarta", iconKey: "activity", target: 3_000_000, current: 0, autoTransfer: false, accent: "var(--wondr-pink)" },
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
  dashboardNudge: null,
  pendingNudge: null,

  paydayShieldOpen: false,
  triggerPaydayShield: () => set({ paydayShieldOpen: true }),
  dismissPaydayShield: () => set({ paydayShieldOpen: false }),
  acceptPaydayShield: () => {
    const profile = PERSONAS[get().persona];
    const existing = get().goals.find((g) => g.name === profile.shieldGoalName);
    let goalId: string;
    if (existing) {
      goalId = existing.id;
      set({
        goals: get().goals.map((g) =>
          g.id === existing.id
            ? { ...g, current: g.current + profile.shieldAmount, target: Math.max(g.target, g.current + profile.shieldAmount) }
            : g,
        ),
      });
    } else {
      goalId = `g_pay_${now()}`;
      set({
        goals: [
          ...get().goals,
          {
            id: goalId,
            name: profile.shieldGoalName,
            iconKey: "shield",
            target: profile.shieldAmount,
            current: profile.shieldAmount,
            autoTransfer: true,
            locked: true,
            createdFrom: "payday",
            accent: "var(--wondr-teal)",
          },
        ],
      });
    }
    set({
      balance: get().balance - profile.shieldAmount,
      paydayShieldOpen: false,
      transactions: [
        {
          id: `auto${now()}`,
          label: `Payday Shield → ${profile.shieldGoalName}`,
          category: "Auto-Save",
          amount: -profile.shieldAmount,
          time: "Baru saja",
          auto: true,
          goalId,
        },
        ...get().transactions,
      ],
    });
    return { goalId, amount: profile.shieldAmount };
  },

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
  addTransaction: (t) => {
    const abs = Math.abs(t.amount);
    // Try route through a budget pocket (only for expenses)
    if (t.amount < 0) {
      const pocket = get().goals.find((g) => g.routedCategory === t.category);
      if (pocket && pocket.current >= abs) {
        set({
          goals: get().goals.map((g) =>
            g.id === pocket.id ? { ...g, current: g.current - abs } : g,
          ),
          transactions: [
            { ...t, routed: true, goalId: pocket.id },
            ...get().transactions,
          ],
        });
        return { routed: true, goalId: pocket.id, goalName: pocket.name, remaining: pocket.current - abs };
      }
    }
    set({
      transactions: [t, ...get().transactions],
      balance: get().balance + t.amount,
    });
    return { routed: false };
  },
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
  acceptMicroBudget: (category, amount, name, iconKey) => {
    const existing = get().goals.find((g) => g.routedCategory === category);
    if (existing) {
      set({
        balance: get().balance - amount,
        goals: get().goals.map((g) =>
          g.id === existing.id
            ? { ...g, current: g.current + amount, target: Math.max(g.target, g.current + amount) }
            : g,
        ),
        transactions: [
          {
            id: `auto${now()}`,
            label: `Top up → ${existing.name}`,
            category: "Auto-Save",
            amount: -amount,
            time: "Baru saja",
            auto: true,
            goalId: existing.id,
          },
          ...get().transactions,
        ],
      });
      return existing.id;
    }
    const id = `g_mb_${now()}`;
    set({
      balance: get().balance - amount,
      goals: [
        ...get().goals,
        {
          id,
          name,
          iconKey,
          target: amount,
          current: amount,
          autoTransfer: true,
          routedCategory: category,
          createdFrom: "micro",
          locked: true,
          accent: "var(--wondr-orange)",
        },
      ],
      transactions: [
        {
          id: `auto${now()}`,
          label: `Buat kantong ${name}`,
          category: "Auto-Save",
          amount: -amount,
          time: "Baru saja",
          auto: true,
          goalId: id,
        },
        ...get().transactions,
      ],
    });
    return id;
  },
  getGoalForCategory: (category) => get().goals.find((g) => g.routedCategory === category),
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
