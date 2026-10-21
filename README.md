# DevGear 🖥️

> Developer hardware, picked by people who code.

DevGear is a full-featured e-commerce storefront built with **Next.js App Router** and **Firebase Authentication**. It lets visitors browse keyboards, displays, audio gear and desk accessories, and lets logged-in users add and manage products. Designed as a clean, accessible demo with polished UI, responsive layouts and real filtering.

---

#### Live Link: https://devgear-phi.vercel.app/

## Key Features

- **Sticky responsive navbar** — logo, 4 routes, Log in / Register buttons. After login those buttons become a dropdown showing the user's avatar, name and email, with links to Add Product and Manage Products, and a Log out button.
- **Hero section** — headline, subtitle, primary CTA and a code-themed visual panel.
- **Category tiles** — six illustrated category cards that link directly into the filtered items list.
- **Featured products** — a responsive 4-column grid populated from the product catalogue.
- **Why DevGear** — four feature highlights (testing policy, free shipping, 30-day returns, warranty).
- **Testimonials** — three reviewer quotes with star ratings.
- **Footer** — four link columns, social icons and copyright.
- **Items page (`/items`)** — full-text search plus three simultaneous filters (category, price range, minimum rating) and four sort modes. All 12+ products display in a responsive grid; each card has an image/icon, title, short description and a View Details button.
- **Item details page (`/items/[id]`)** — dynamic App Router route with full description, specification table, key info (category, brand, stock, date), related items and a back button.
- **About page** — project description, values and tech stack.
- **Contact page** — validated contact form with toast confirmation.
- **Firebase Authentication** — email/password register and login, Google sign-in (one-tap popup), auth state in React Context, redirect to `/` after login.
- **Protected pages** — `/items/add` and `/items/manage` redirect unauthenticated users to `/login?protected=1`.
- **Add product form** — full inline validation, loading state, success toast and sidebar preview tips.
- **Manage products** — responsive table (cards on mobile) with View and Delete (with a confirmation dialog) and a Reset Demo Data button.
- **localStorage persistence** — added/deleted products survive a page refresh. Seed data can always be restored.
- **Accessible** — visible focus rings, skip link, ARIA roles, keyboard-navigable dropdown, reduced-motion support.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI library | React 19 |
| Styling | Tailwind CSS 3 |
| Auth | Firebase Authentication |
| State | React Context API |
| Icons | lucide-react |
| Toasts | react-hot-toast |
| Fonts | Bricolage Grotesque, Hanken Grotesk (self-hosted via Fontsource) |

---

## Setup & Installation

### 1 — Clone and install

```bash
git clone https://github.com/your-username/devgear.git
cd devgear
npm install
```

### 2 — Create a Firebase project

1. Open the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Go to **Build → Authentication → Get started**.
3. Under **Sign-in method**, enable **Email/Password** and **Google**.
4. Go to **Project settings → Your apps**, click **Add app → Web**, register the app and copy the config object.

### 3 — Add environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your Firebase config values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> **Note:** The app still works without these keys — public pages load normally and the login/register pages show a setup notice instead of crashing.

### 4 — Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5 — Production build

```bash
npm run build
npm start
```

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. Go to [vercel.com](https://vercel.com), click **Add New → Project** and import the repo. Vercel detects Next.js automatically — no build settings needed.
3. Under **Environment Variables**, add all six `NEXT_PUBLIC_FIREBASE_*` keys.
4. Click **Deploy**.
5. After deployment, go to the Firebase Console → **Authentication → Settings → Authorised domains** and add your Vercel domain (e.g. `devgear-xyz.vercel.app`). **This step is required for Google sign-in to work on the live site.**

Every `git push` to `main` triggers an automatic redeploy.

---

## Route Summary

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page — navbar, hero, categories, featured products, features, testimonials, footer |
| `/items` | Public | Product catalogue with search, category / price / rating filters and sorting |
| `/items/[id]` | Public | Product detail — image, description, specs, key info, related items |
| `/about` | Public | About DevGear — mission, values and tech stack |
| `/contact` | Public | Contact form with inline validation |
| `/login` | Public | Email/password and Google login |
| `/register` | Public | Create a new account |
| `/items/add` | **Protected** | Add a product — validated form, toast on success |
| `/items/manage` | **Protected** | Manage products — table with View, Delete and Reset demo data |

Unauthenticated requests to protected routes are redirected to `/login?protected=1`.

---

## Project Structure

```
devgear/
├── app/                   # Next.js App Router pages and global CSS
│   ├── about/
│   ├── contact/
│   ├── items/
│   │   ├── [id]/          # Dynamic product detail route
│   │   ├── add/           # Protected — add product
│   │   └── manage/        # Protected — manage products
│   ├── login/
│   ├── register/
│   ├── globals.css
│   ├── layout.js          # Root layout (Navbar, Footer, Providers)
│   ├── not-found.js
│   └── page.js            # Home page
├── components/
│   ├── home/              # Hero, Categories, FeaturedProducts, WhyDevGear, Testimonials
│   ├── AddProductForm.jsx
│   ├── AuthForms.jsx      # LoginForm, RegisterForm
│   ├── Footer.jsx
│   ├── ManageProducts.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductDetails.jsx
│   ├── ProductArt.jsx     # Category illustration fallback
│   ├── ProtectedRoute.jsx
│   ├── Providers.jsx
│   └── ...
├── context/
│   ├── AuthContext.jsx    # Firebase auth state + helpers
│   └── ProductsContext.jsx # Products + localStorage persistence
├── lib/
│   ├── firebase.js        # Firebase app + auth initialisation
│   ├── products.js        # Seed products + filter constants
│   └── utils.js           # formatPrice, formatDate, cn
├── public/
│   └── favicon.svg
├── .env.example
├── .gitignore
├── next.config.mjs
├── tailwind.config.js
└── README.md
```

---

## License

MIT
