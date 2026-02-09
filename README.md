# QuickInvoice

QuickInvoice is a professional, full-stack React application designed to streamline the invoicing process for freelancers and small businesses. It allows users to effortlessly generate, preview, and manage invoices using a variety of professionally designed templates.

## 🚀 Features

* **Live Invoice Generation**: Dynamic form to input company details, billing/shipping information, and line items with real-time total calculations.
* **Multiple Professional Templates**: Choose from 5 distinct invoice designs to match your brand.
* **Automatic Data Formatting**: Sophisticated data mapping ensuring consistent display across different template structures.
* **Logo Support**: Custom company logo upload with instant preview.
* **Smart Automation**: Automatic generation of unique invoice numbers (e.g., `INV-123456`).
* **Visual Previews**: High-fidelity live previews of the final invoice before saving.
* **Cloud Integration**: Saves invoice thumbnails to Cloudinary for easy reference in the dashboard.

## 🛠️ Tech Stack

* **Frontend**: React 19, Vite.
* **Styling**: Bootstrap 5, Custom CSS, Lucide React (Icons).
* **State Management**: React Context API.
* **Routing**: React Router 7.
* **Utilities**: Axios (API calls), Html2canvas (Thumbnails), React Hot Toast (Notifications).
* **Backend Support**: Ready for Spring Boot integration (Default: `http://localhost:8080/api`).

## 📁 Project Structure

```text
src/
├── assets/             # Images and static asset configuration
├── components/         # Reusable UI components (Form, Menubar, Logo, etc.)
├── context/            # Global state management via AppContext
├── pages/              # Main route components (Landing, MainPage, Preview)
├── service/            # API services for Invoice and Cloudinary
├── templates/          # Distinct invoice template components (1-5)
└── utils/              # Formatting and template mapping logic

```

## 🚥 Getting Started

### Prerequisites

* Node.js installed on your machine.
* A backend server running at `http://localhost:8080` (optional for frontend-only testing).

### Installation

1. Clone the repository.
2. Install dependencies:
```bash
npm install

```


3. Start the development server:
```bash
npm run dev

```



## 📝 Available Scripts

* `npm run dev`: Starts the Vite development server.
* `npm run build`: Compiles the application for production.
* `npm run lint`: Checks for code quality issues using ESLint.
* `npm run preview`: Locally previews the production build.

## 🗺️ Roadmap

* [ ] Full Dashboard integration to view saved invoices.
* [ ] PDF download functionality using `jspdf`.
* [ ] Direct "Send via Email" action.
* [ ] Authentication implementation via Clerk.
