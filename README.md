# WeRent Frontend

Frontend project untuk platform rental fashion WeRent, dibangun dengan Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Axios, dan Zustand.

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query
- Axios
- Zustand

## Menjalankan Project

1. Install dependency:

```bash
npm install
```

2. Jalankan development server:

```bash
npm run dev
```

3. Buka aplikasi di browser:

```text
http://localhost:3000
```

## Scripts

- `npm run dev` - menjalankan mode development
- `npm run build` - build untuk production
- `npm run start` - menjalankan hasil build production
- `npm run lint` - menjalankan lint

## Kontribusi

Terima kasih sudah berkontribusi. Ikuti alur berikut supaya kolaborasi tim tetap rapi.

1. Sync branch terbaru:

```bash
git checkout main
git pull origin main
```

2. Buat branch baru dari `main`:

```bash
git checkout -b feat/nama-fitur
```

3. Kerjakan perubahan, lalu pastikan lolos pengecekan lokal:

```bash
npm run lint
npx tsc --noEmit
```

4. Commit dengan pesan yang jelas:

```bash
git add .
git commit -m "feat: tambah fitur x"
```

5. Push branch dan buka Pull Request ke `main`:

```bash
git push origin feat/nama-fitur
```

6. Di Pull Request, jelaskan:
- tujuan perubahan
- area/file yang diubah
- langkah test manual
- screenshot/video jika ada perubahan UI

### Catatan Kontribusi

- Jangan mengubah struktur folder utama tanpa diskusi tim.
- Pisahkan PR besar menjadi beberapa PR kecil jika memungkinkan.
- Gunakan tipe data di `src/lib/types` agar konsisten.
- Gunakan query key terpusat di `src/lib/utils.ts` untuk cache React Query.

## Project Structure

```text
src/
├── app/                         # Next.js App Router pages
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (main)/
│   │   ├── layout.tsx           # Main layout with navbar
│   │   ├── page.tsx             # Home / product list
│   │   ├── products/
│   │   │   └── [id]/
│   │   │       ├── page.tsx     # Product detail
│   │   │       └── reviews/
│   │   │           └── page.tsx # Full review page
│   │   ├── cart/page.tsx
│   │   ├── checkout/
│   │   │   ├── shipment/page.tsx
│   │   │   └── payment/page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx         # Order list
│   │   │   └── [id]/page.tsx    # Order detail
│   │   └── wishlist/page.tsx
│   ├── layout.tsx               # Root layout
│   └── providers.tsx            # TanStack Query + Zustand providers
│
├── lib/
│   ├── api/                     # Axios instance + all API functions
│   │   ├── client.ts            # Axios config + interceptors
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   ├── cart.ts
│   │   ├── orders.ts
│   │   ├── reviews.ts
│   │   ├── shipment.ts
│   │   ├── upload.ts
│   │   └── wishlist.ts
│   ├── hooks/                   # TanStack Query hooks
│   │   ├── useAuth.ts
│   │   ├── useProducts.ts
│   │   ├── useCart.ts
│   │   ├── useOrders.ts
│   │   ├── useReviews.ts
│   │   ├── useShipment.ts
│   │   ├── useUpload.ts
│   │   └── useWishlist.ts
│   ├── stores/                  # Zustand stores
│   │   ├── authStore.ts
│   │   └── uiStore.ts
│   ├── types/                   # TypeScript interfaces
│   │   └── index.ts
│   └── utils.ts                 # Shared utilities
│
└── components/
    ├── ui/                      # shadcn auto-generated
    ├── layout/
    │   ├── Navbar.tsx
    │   └── Footer.tsx
    ├── product/
    │   ├── ProductCard.tsx
    │   └── ProductGrid.tsx
    ├── review/
    │   ├── ReviewCard.tsx
    │   ├── ReviewList.tsx
    │   ├── ReviewSummary.tsx
    │   ├── FitScaleChart.tsx
    │   ├── RatingFilter.tsx
    │   └── MediaViewer.tsx
    ├── cart/
    │   └── CartItem.tsx
    └── shared/
        ├── StarRating.tsx
        ├── LoadingSkeleton.tsx
        └── EmptyState.tsx
```
