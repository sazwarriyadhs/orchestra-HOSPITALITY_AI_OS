
import type { Metadata } from "next";
import "./globals.css";
import { Bell, Search } from "lucide-react";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "ORCHESTRA | Hospitality AI OS",
  description: "Orchestrating Exceptional Guest Experiences",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <main className="app-shell">
          <Sidebar />

          <section className="main-area">
            <header className="topbar">
              <div className="breadcrumb">
                ORCHESTRA <span>/</span> Hospitality Workspace
              </div>

              <div className="top-actions">
                <button className="icon-button" aria-label="Search">
                  <Search size={19} />
                </button>
                <button className="icon-button" aria-label="Notifications">
                  <Bell size={19} />
                </button>
                <div className="status-badge">DEVELOPMENT</div>
              </div>
            </header>

            {children}

            <footer className="footer">
              <span>ORCHESTRA HOSPITALITY AI OS</span>
              <span>Enterprise hospitality platform · Development preview</span>
            </footer>
          </section>
        </main>
      </body>
    </html>
  );
}
