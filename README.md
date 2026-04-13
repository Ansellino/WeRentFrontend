Folder structure of the project:
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
