
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Activity,
  BedDouble,
  Bell,
  Bot,
  Building2,
  ChevronDown,
  Gauge,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShieldCheck,
} from "lucide-react";

const navigation = [
  {
    label: "Executive Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "GM Dashboard",
    href: "/gm-dashboard",
    icon: Gauge,
  },
  {
    label: "Hotel Operations",
    href: "/operations",
    icon: BedDouble,
  },
  {
    label: "Front Office",
    href: "/front-office",
    icon: Bell,
  },
  {
    label: "Guest Experience",
    href: "/guest-portal",
    icon: MessageSquare,
  },
  {
    label: "AI Intelligence",
    href: "/ai-intelligence",
    icon: Bot,
  },
];

const platform = [
  {
    label: "Admin",
    href: "/admin",
    icon: ShieldCheck,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="sidebar">
      {/* BRAND */}
      <div className="brand">
        <Link href="/" aria-label="ORCHESTRA Home">
          <Image
            src="/branding/orchestra-hospitality-ai-os-logo.png"
            alt="ORCHESTRA Hospitality AI OS"
            width={200}
            height={160}
            priority
            className="brand-logo"
          />
        </Link>
      </div>

      {/* WORKSPACE */}
      <div className="nav-section">
        <div className="nav-section-label">WORKSPACE</div>

        <button
          type="button"
          className="nav-item workspace-selector"
          aria-label="Hotel Workspace"
          title="Property context required"
        >
          <Building2 size={19} />

          <span className="workspace-copy">
            <span>Hotel Workspace</span>
            <small className="nav-subtext">
              Property context required
            </small>
          </span>

          <ChevronDown size={16} />
        </button>
      </div>

      {/* MANAGEMENT */}
      <div className="nav-section">
        <div className="nav-section-label">MANAGEMENT</div>

        <nav
          className="navigation"
          aria-label="Management navigation"
        >
          {navigation.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                className={`nav-item ${active ? "active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* PLATFORM */}
      <div className="nav-section">
        <div className="nav-section-label">PLATFORM</div>

        <nav
          className="navigation"
          aria-label="Platform navigation"
        >
          {platform.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                className={`nav-item ${active ? "active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* SIDEBAR FOOTER */}
      <div className="sidebar-bottom">
        <div className="ai-status">
          <span className="status-dot muted" />
          <span>AI services integration status</span>
        </div>

        <div className="profile">
          <div className="avatar">O</div>

          <div>
            <strong>ORCHESTRA Admin</strong>
            <small>Development workspace</small>
          </div>
        </div>
      </div>
    </aside>
  );
}
