# GadgetLy

GadgetLy is a tech gadget store built with **Next.js (App Router)** and **Firebase Authentication**. Visitors browse a catalogue of headphones, phones, laptops, wearables, cameras and gaming gear, filter it, and read full spec sheets. Signed-in users can add new products and manage the catalogue.

**Live demo:** _add your Vercel URL here_

## Key features

- **Landing page** with a sticky, responsive navbar, a hero with a featured product "datasheet", four content sections (categories, new arrivals, why GadgetLy, customer reviews) and a footer.
- **Product catalogue** (`/items`) with live search, filters for **category, price range and rating**, sorting, a results count and an empty state. Category, price, rating and sort are kept in the URL, so filtered views can be shared.
- **Product details** (`/items/[id]`) on a dynamic App Router route: image, full description, key info (category, brand, release date, stock), specifications table, price, related products and a back button.
- **Firebase Authentication**: email/password register and login, plus Google sign-in. User state lives in a React Context (`AuthProvider`). Users go to `/` after logging in, or back to the protected page they tried to open.
- **Protected pages**: `/items/add` and `/items/manage` redirect logged-out visitors to `/login`.
- **Add product** form with inline validation (react-hook-form + Zod), a character counter, dynamic specification rows, a live card preview, a loading state and a success toast.
- **Manage products** in a responsive table (cards on phones) with View and Delete actions, a delete confirmation dialog, filtering and a "Restore catalogue" option.
- **Navbar account menu** after login: user info, Add Product, Manage Products and Log out.
- **Light/dark mode** toggle with no flash on load, skeleton loading states, subtle micro-interactions, and `prefers-reduced-motion` support.
- Responsive on mobile, tablet and desktop, with visible keyboard focus and accessible labels throughout.

## Tech stack

- Next.js 16 (App Router, TypeScript)
- Firebase Authentication (email/password + Google)
- Tailwind CSS v4 with shadcn-style components built on Radix UI
- react-hook-form + Zod for forms, Sonner for toasts, Lucide icons

## Data

The app ships with 12 catalogue products as static data (`src/lib/products.ts`). Products you add are saved in the browser's **localStorage**, and deleting a catalogue product hides it in that browser. Use **Restore catalogue** on the Manage page to bring deleted catalogue products back.

## Setup & installation

**Requirements:** Node.js 20.9 or newer, and a Firebase project.

**Install dependencies**

   ```bash
   npm install
   ```
 **Add environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in the six `NEXT_PUBLIC_FIREBASE_*` values from the web app config.

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

5. **Production build** (optional)

   ```bash
   npm run build
   npm start
   ```

## Route summary

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Landing page: navbar, hero, categories, new arrivals, why GadgetLy, reviews, footer |
| `/items` | Public | Product catalogue with search, filters (category, price, rating) and sorting |
| `/items/[id]` | Public | Product details, specifications and related products |
| `/about` | Public | About GadgetLy and how products are tested |
| `/support` | Public | Shipping, returns and warranty information |
| `/login` | Public | Log in with email/password or Google |
| `/register` | Public | Create an account with email/password or Google |
| `/items/add` | **Protected** | Form to add a new product |
| `/items/manage` | **Protected** | Table of all products with View and Delete actions |

