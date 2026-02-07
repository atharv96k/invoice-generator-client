# QuickInvoice (invoice-generator-client)

A React + Vite front-end for creating invoices with live preview and multiple templates.

**Current Status (as of Feb 7, 2026)**  
Landing page, invoice form, template gallery, and preview page are built. Core invoice data is managed via React Context and can be previewed across templates. Several buttons and backend actions are placeholders.

**Tech Stack**
- React 19 + Vite
- React Router
- Bootstrap 5
- Context API for shared state
- Lucide icons, React Hot Toast

**Pages & Routes**
- `/` Landing page with marketing sections and CTA buttons.
- `/dashboard` Placeholder dashboard view.
- `/generate` Main invoice creation page.
- `/preview` Invoice preview with template switcher and action buttons.

**What Works Now**
- Invoice form for company, billing, shipping, items, tax, notes, and bank details.
- Dynamic item rows with quantity/amount totals and overall tax/grand total.
- Random invoice number generation on first load.
- Logo upload and preview.
- Template gallery and template selection.
- Live invoice preview for selected template.

**Templates**
- 5 template thumbnails are available in the gallery.
- Template rendering is wired through `templateComponents` in `src/utils/invoiceTemplates.js`.
- `Template1` and `Template2` are implemented; the others exist as folders and are wired for future work.

**State & Data Flow**
- Global state lives in `src/context/AppContext.jsx`.
- `invoiceData`, `invoiceTitle`, and `selectedTemplate` are shared across pages.
- Data is formatted for templates by `src/utils/formatInvoiceData.js`.

**Not Wired Yet (Placeholders)**
- Save, Delete, Send Email, Download PDF actions on `/preview`.
- Dashboard features.
- Authentication via Clerk is referenced but currently commented out.
- Backend API calls (base URL is set to `http://localhost:8080/api`).

**Scripts**
- `npm run dev` Start dev server
- `npm run build` Build for production
- `npm run preview` Preview production build
- `npm run lint` Run ESLint

**Local Setup**
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open the app at the Vite local URL.

 
 