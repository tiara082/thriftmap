# ThriftMap

ThriftMap is a front-end prototype for a circular-fashion marketplace that helps shoppers discover second-hand items, track orders, and stay engaged through light gamification. The project is built with vanilla HTML, CSS, and JavaScript so it can run on any static web server, while optional integrations (Supabase, Leaflet, SweetAlert2) unlock richer experiences.

## Features
- **Marketing landing page** with product highlights, category callouts, animations, and scroll-triggered reveals.
- **Customer dashboard suite** (`dashboard-*.html`) covering products, orders, tracking, wishlist, cart, profile, and settings.
- **Order tracking experience** featuring a map powered by Leaflet, delivery timeline, and driver contact details.
- **Wishlist & cart interactions** backed by local storage helpers plus optional Supabase persistence.
- **Gamification hooks** (experience levels, streaks, missions) described in `README-gamification.md` and exposed through dedicated dashboard modules.
- **Notification layer** via `assets/js/notify.js` that wraps SweetAlert2-style toasts for consistent feedback.
- **Responsive design system** shared through `assets/css/style-prefix.css`, Tailwind-like utilities, and reusable dashboard header patterns.

## Project Structure
```
assets/
  css/
    style.css              # Landing page styling & component overrides
    style-prefix.css       # Shared utility classes + dashboard styling
  images/                  # Logos, icons, and product imagery
  js/
    cart.js                # Local cart state helpers + checkout flow glue
    gamification.js        # XP, missions, and streak widgets
    notify.js              # Lightweight toast/notification helper
    products-data.js       # Sample product catalog seed data
    script.js              # Landing page interactions & animations
    supabase-client.js     # Thin wrapper around @supabase/supabase-js
    supabase-init.js       # Bootstraps Supabase client (replace keys!)
    wishlist.js            # Wishlist panel logic + local persistence
    wishlist-panel.js      # Slide-over wishlist UI controls

dashboard-*.html           # Individual dashboard screens (orders, products, tracking, etc.)
index.html                 # Public landing page
login.html / register.html # Auth mockups
README-gamification.md     # Extended documentation for XP & missions
```

## Getting Started
1. **Clone or download** this repository.
2. **Serve the files** with any static server:
   - Using XAMPP: move the folder under `htdocs` (already configured in this workspace) and browse to `http://localhost/thrift-store1/index.html`.
   - Using Node.js: run `npx serve` (or any static server) from the project root and open the provided URL.
3. **Explore the dashboards** by navigating directly to the HTML pages (e.g., `dashboard-products.html`, `dashboard-tracking.html`).

> ℹ️ The site works without any backend. Supabase-powered features fall back gracefully when credentials are missing.

## Supabase Configuration (Optional)
Real data persistence is wired through Supabase. To connect your project:
1. Create a Supabase project and enable the required tables (`profiles`, `products`, `wishlists`, `orders`, `order_items`, etc.).
2. Update `assets/js/supabase-init.js` with your own `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
3. Ensure `@supabase/supabase-js` is loaded via CDN before `supabase-client.js` and `supabase-init.js` on any page that needs it.
4. Review `supabase-client.js` for helper functions you can extend (authentication, XP tracking, wishlist, checkout).

## External Dependencies
- **Ionicons** and **Font Awesome** for iconography.
- **Leaflet** (`dashboard-tracking.html`) for map rendering.
- **SweetAlert2** (used by `notify.js`) for toast notifications.
- **Supabase JS SDK** (optional) for data persistence and authentication.

Most dependencies are referenced via CDN links in the HTML files, so no build tooling is required.

## Development Tips
- Keep shared UI components consistent by reusing classes from `style-prefix.css`.
- When adding new dashboard pages, copy the header block from an existing `dashboard-*.html` file to maintain layout parity.
- Store any reusable JavaScript helpers in `assets/js/` and load them where needed to avoid duplicated inline scripts.
- For custom gamification mechanics, extend `assets/js/gamification.js` and document the behavior in `README-gamification.md`.

## Roadmap Ideas
- Replace static product data with live Supabase queries (see `listProducts` in `supabase-client.js`).
- Wire the login/register pages to real authentication flows.
- Add automated tests or linting for JavaScript modules.
- Containerize the project for deployment or integrate with a CI/CD pipeline.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests with improvements. If you add new gamification flows or dashboards, include screenshots and updates to the documentation so others can follow along.

## License
Specify your preferred license here (e.g., MIT, Apache-2.0). If unsure, start with [MIT](https://opensource.org/licenses/MIT) for a permissive option.
