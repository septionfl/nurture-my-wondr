## Konteks

Solusi Nurture di-reposisi: Growth bukan lagi "fitur baru" tetapi repositori pasif. Inovasi sepenuhnya berada di **Trigger & Reminder Mechanism** dengan **1-click frictionless action** dan persona-aware copy (Beni Gen-Z vs Wanda Working Mother). Empat fitur prototipe baru yang harus diutamakan:

1. Payday Auto-Shield (full-screen takeover saat gaji masuk)
2. Micro-Budgeting Nudge (kartu cyan di layar Transaksi Berhasil)
3. Habit Tracker Carousel (di Beranda, tepat di bawah saldo)
4. Goal Re-routing (auto-debit QRIS dari kantong goal, bukan saldo utama)

---

## 1. Store: persona, auto-goal creation, locked pockets

File: `src/stores/useHabitStore.ts`

- Tambah `persona: 'beni' | 'wanda'` (default `'beni'`) + setter `setPersona`. Persona menentukan copy & default amount untuk Payday Shield.
- Goal model: tambah `locked: boolean` (untuk goal hasil 1-click), `routedCategory?: string` (mis. `"Kafe"` → setiap QRIS kategori Kafe auto-debit dari kantong ini), `createdFrom?: 'payday' | 'micro' | 'manual'`.
- `addTransaction(t)`: jika ada goal dengan `routedCategory === t.category` & `g.current >= |t.amount|`, dana ditarik dari goal (kurangi `g.current`, tidak kurangi `balance`); catat txn dengan `auto: true, goalId`. Jika dana goal tidak cukup → fallback ke saldo utama + tampilkan nudge "Top up Budget Kopi".
- `createGoalFromTemplate({ source, name, target, current?, routedCategory?, iconKey })`: 1-click factory. Otomatis push goal baru + transaksi auto-transfer (jika `current > 0`).
- `acceptPaydayShield(amount)`: pisahkan `amount` dari saldo → buat/append goal "Tagihan Rutin" (`createdFrom: 'payday'`, `locked: true`).
- `acceptMicroBudget(category, amount)`: buat goal "Budget {Category}" dengan `routedCategory: category`, `current: amount` (dipindah dari saldo), `iconKey: 'coffee'/'utensils'`.
- State baru: `paydayShieldShown: boolean` (one-shot per "bulan"); helper `triggerPaydayShield()` & `dismissPaydayShield()`.
- Tipe `Txn` tambah field `auto?: boolean`, `goalId?: string` (sudah ada) — pastikan `category: "Pemasukan"` dengan amount > 3jt jadi trigger Payday.

## 2. Komponen baru: PaydayShieldModal (Fitur 1)

File baru: `src/components/PaydayShieldModal.tsx`

- Full-screen takeover (bukan bottom-sheet). Latar putih dengan blob orange/teal di sudut (konsisten brand wondr).
- Ilustrasi: ikon `ShieldCheck` besar dalam lingkaran gradient orange→teal (bukan emoji), aksen Sparkles.
- Konten:
  - Eyebrow: "PAYDAY DETECTED" + tanggal.
  - Headline (persona-aware):
    - Beni: "Halo Beni, Gaji Rp 5.000.000 sudah masuk!"
    - Wanda: "Bu Wanda, gaji bulanan sudah cair."
  - Body persona-aware:
    - Beni: "Pisahkan **Rp 2.000.000** sekarang ke kantong **Tagihan Rutin** biar nggak kepakai jajan."
    - Wanda: "Bagi otomatis ke 3 pos: Belanja Dapur, Listrik & Air, Pendidikan Anak."
  - Breakdown card: list pos + nominal (computed dari `transactions` historis rata-rata, untuk demo pakai konstanta).
- Primary CTA orange: "Pisahkan Sekarang" → panggil `acceptPaydayShield()` → confetti/check animation → toast "Goal otomatis dibuat. Lihat di Beranda." dengan link ke `/`.
- Secondary: "Nanti saja" → `dismissPaydayShield()`.
- Auto-trigger: di `_app.tsx` (atau root dashboard) — `useEffect` cek balance increase signal; untuk demo: tombol "Demo: Gajian masuk" di dashboard sudah ada (`SCENARIOS salary`) — re-route untuk membuka modal ini alih-alih `SmartNudgeModal` ketika key `salary`.

Render di `src/routes/_app.tsx` bersama `SmartNudgeModal`.

## 3. Micro-Budgeting Nudge Card (Fitur 2)

File: `src/routes/_app/transaction.tsx` (edit stage `success`)

- Di bawah check hijau, tambah **interactive card** dengan accent Bright Cyan (`bg-[var(--wondr-teal)]/15`, border teal):
  - Eyebrow: "SMART INSIGHT" + ikon Sparkles teal.
  - Headline dinamis (mis. kafe ke-5):
    - "Kamu sudah habis **Rp 400.000** di Kafe bulan ini."
  - Body: "Kunci sisa budget jajanmu di kantong **Budget Kopi** biar nggak overbudget."
  - CTA pill teal "Buat Limit Jajan" → `acceptMicroBudget('Kafe', 300_000)` → animate card jadi "Goal Budget Kopi aktif ✓ — QRIS kafe berikutnya otomatis dari kantong ini" dengan tombol "Lihat" → `/growth`.
  - CTA secondary text "Lewati".
- Logic trigger: hitung `transactions.filter(t => t.category === merchant.category).length` ≥ 5 (untuk demo, force-show pada skenario `cafe` & `food`).
- Kartu ini menggantikan delay 900ms `showNudge` lama untuk skenario kafe/food. Bottom-sheet `SmartNudgeModal` lama tetap dipakai untuk skenario lain.

## 4. Habit Tracker Carousel (Fitur 3)

File: `src/routes/_app/dashboard.tsx`

- Sisipkan **carousel** persis di bawah balance card (sebelum Quick Actions). Gunakan komponen `Carousel` (Embla) yang sudah ada di `src/components/ui/carousel.tsx`.
- Slide per goal aktif:
  - Slide "Tagihan Rutin" (warna aksen Bright Cyan `var(--wondr-teal)`): ikon `ShieldCheck`, nama, nominal terpisah, badge "Auto-shield aktif".
  - Slide "Liburan Bali" (purple): ikon `Plane`, progress bar persen, micro-copy dinamis di atas judul: "80% to your Bali goal — save Rp 500K minggu ini?". CTA pill putih "Top up" → buka `GoalDetailSheet`.
  - Slide "Budget Kopi" (orange muda) muncul jika sudah dibuat lewat Micro-Budget.
  - Slide terakhir: "+ Buat goal baru" → buka `NewGoalModal` di Growth (pakai navigate + state).
- Dots indicator di bawah carousel.
- Hapus duplikasi: section "Saving Goals" lama digantikan oleh carousel ini (rapikan layout — tidak menampilkan goal dua kali).

## 5. Goal Re-routing (Fitur 4)

- Sudah tercover oleh `addTransaction` logic di store (lihat #1). Implementasi visual:
  - Di `transaction.tsx` stage `success`: jika txn baru ter-route ke goal, kartu micro-budget berubah jadi konfirmasi: "Dana **Rp 38.000** diambil dari kantong **Budget Kopi**. Sisa kantong: **Rp 262.000**." (bukan dari saldo utama).
  - Di balance card dashboard: tambah micro-indicator "Saldo bebas" vs total termasuk goal locked (opsional, kalau ringkas: tampilkan tooltip `Sparkles` "Rp X terkunci di goal").

## 6. Persona Switcher (demo prop)

- Di dashboard, samping eyebrow "Selamat pagi", tambah toggle kecil 2-pill: `Beni` / `Wanda`. State dari `useHabitStore.persona`.
- Switch mengganti nama sapaan, copy Payday Shield, dan template default goal Payday (Beni: 1 pos tagihan; Wanda: 3 pos rumah tangga).

## 7. Copywriting (final, dipakai di kode)

- Payday Beni primary CTA: **"Pisahkan Sekarang"**, headline "Halo Beni, gaji Rp 5.000.000 sudah masuk!", body "Pisahkan Rp 2.000.000 sekarang ke kantong **Tagihan Rutin** biar nggak terpakai buat jajan."
- Payday Wanda: "Bu Wanda, gaji bulanan cair. Bagi ke 3 pos rumah tangga sekarang?" CTA "Bagi Otomatis".
- Micro-Budget Kafe: "Kamu habis Rp 400.000 di Kafe bulan ini. Kunci sisa budget jajanmu di **Budget Kopi**?" CTA "Buat Limit Jajan".
- Habit Carousel nudge text: "80% to your Bali goal — save Rp 500K this week?".
- Goal re-route success toast: "Bayar dari kantong **Budget Kopi**. Sisa kantong Rp 262.000."

## 8. File touch list

Create:
- `src/components/PaydayShieldModal.tsx`
- `src/components/MicroBudgetCard.tsx` (dipakai oleh transaction success)
- `src/components/HabitCarousel.tsx`
- `src/components/PersonaToggle.tsx`

Edit:
- `src/stores/useHabitStore.ts` (persona, goal locking, re-routing, template factories, payday state)
- `src/routes/_app.tsx` (mount `PaydayShieldModal`)
- `src/routes/_app/dashboard.tsx` (carousel, persona toggle, hapus duplikasi goal list, ubah skenario `salary` → trigger Payday Shield bukan SmartNudgeModal)
- `src/routes/_app/transaction.tsx` (success state pakai `MicroBudgetCard`, tampilkan re-route confirmation)
- `src/routes/_app/growth.tsx` (badge "Auto-shield" / "Routed" + label "Locked pocket")

## Catatan teknis (untuk reviewer)

- Tidak ada dependency baru. Embla carousel & framer-motion sudah ada.
- Semua state tetap mock di Zustand; tidak ada perubahan backend.
- Modal fullscreen Payday harus override z-index di atas BottomNav (`z-[60]`).
- Re-routing dilakukan di reducer-level → testable tanpa UI.
- A11y: tombol pakai `<button>`, focus ring dari token `--ring`.
