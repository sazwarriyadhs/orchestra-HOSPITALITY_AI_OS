
$ErrorActionPreference = "Stop"

$Root = "D:\HOSPITALITY_AI_OS"
$Web = Join-Path $Root "apps\web"
$Stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$BackupRoot = Join-Path $Root "backups\web-$Stamp"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " ORCHESTRA HOSPITALITY AI OS GENERATOR" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if (!(Test-Path $Root)) { throw "Project root not found." }

$Logo = Join-Path $Web "public\branding\orchestra-hospitality-ai-os-logo.png"
if (!(Test-Path $Logo)) { throw "Official transparent ORCHESTRA logo not found." }

# Create backup helper
function Write-ProjectFile {
    param(
        [string]$Path,
        [string]$Content
    )

    $Directory = Split-Path $Path -Parent
    New-Item -ItemType Directory -Force -Path $Directory | Out-Null

    if (Test-Path $Path) {
        $Relative = $Path.Substring($Root.Length).TrimStart("\")
        $Backup = Join-Path $BackupRoot $Relative
        New-Item -ItemType Directory -Force -Path (Split-Path $Backup -Parent) | Out-Null
        Copy-Item $Path $Backup -Force
        Write-Host "[BACKUP] $Relative" -ForegroundColor Yellow
    }

    Set-Content -Path $Path -Value $Content -Encoding UTF8
    Write-Host "[WRITE] $($Path.Substring($Root.Length))" -ForegroundColor Green
}

# Package configuration
Write-ProjectFile "$Web\package.json" @'
{
  "name": "orchestra-hospitality-ai-os",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3015",
    "build": "next build",
    "start": "next start -p 3015",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "lucide-react": "^0.468.0",
    "next": "15.5.29",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.8.0"
  }
}
'@

Write-ProjectFile "$Web\tsconfig.json" @'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", ".next/types/**/*.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
'@

Write-ProjectFile "$Web\next-env.d.ts" @'
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
'@

Write-ProjectFile "$Web\next.config.ts" @'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
};

export default nextConfig;
'@

Write-ProjectFile "$Web\app\layout.tsx" @'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ORCHESTRA | Hospitality AI OS",
  description: "Orchestrating Exceptional Guest Experiences",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
'@

Write-ProjectFile "$Web\app\page.tsx" @'
import Link from "next/link";
import Image from "next/image";
import {
  Activity, ArrowUpRight, BedDouble, Bell, Bot, Building2,
  CalendarDays, ChartNoAxesCombined, CheckCircle2, ChevronDown,
  CircleHelp, ClipboardList, Clock3, ConciergeBell, LayoutDashboard,
  Menu, MessageSquare, Search, Settings, ShieldCheck, Sparkles,
  Users, Wrench
} from "lucide-react";

const navigation = [
  { label: "Executive Overview", icon: LayoutDashboard, href: "/" },
  { label: "Hotel Operations", icon: ClipboardList, href: "/operations" },
  { label: "Front Office", icon: ConciergeBell, href: "/front-office" },
  { label: "Guest Experience", icon: MessageSquare, href: "/guest-portal" },
  { label: "AI Intelligence", icon: Bot, href: "/intelligence" },
];

const modules = [
  { name: "Hotel Operations", detail: "Housekeeping, maintenance and inspections", icon: ClipboardList, href: "/operations" },
  { name: "Front Office", detail: "Reservations and guest services", icon: ConciergeBell, href: "/front-office" },
  { name: "Guest Experience", detail: "Guest journey and AI concierge", icon: MessageSquare, href: "/guest-portal" },
  { name: "AI Intelligence", detail: "Operational insights and recommendations", icon: Sparkles, href: "/intelligence" },
];

function Metric({ title, value, description, icon: Icon }: {
  title: string; value: string; description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <span>{title}</span>
        <Icon size={19} strokeWidth={1.7}/>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-description">{description}</div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <Image
            src="/branding/orchestra-hospitality-ai-os-logo.png"
            alt="ORCHESTRA"
            width={52}
            height={52}
            priority
            className="brand-logo"
          />
          <div>
            <div className="brand-name">ORCHESTRA</div>
            <div className="brand-subtitle">HOSPITALITY AI OS</div>
          </div>
        </div>

        <div className="workspace-label">WORKSPACE</div>
        <div className="property-switch">
          <Building2 size={18}/>
          <div><strong>Hotel Workspace</strong><small>Property context required</small></div>
          <ChevronDown size={16}/>
        </div>

        <div className="nav-label">MANAGEMENT</div>
        <nav className="navigation">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link href={item.href} key={item.label}
                className={`nav-item ${index === 0 ? "active" : ""}`}>
                <Icon size={19}/><span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="nav-label">PLATFORM</div>
        <nav className="navigation">
          <Link href="/admin" className="nav-item"><ShieldCheck size={19}/>Admin</Link>
          <Link href="/settings" className="nav-item"><Settings size={19}/>Settings</Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="ai-status"><span className="status-dot"/> Platform interface preview</div>
          <div className="profile">
            <div className="avatar">O</div>
            <div><strong>Workspace User</strong><small>Role not assigned</small></div>
            <ChevronDown size={16}/>
          </div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumb">ORCHESTRA <span>/</span> Executive Overview</div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Search"><Search size={19}/></button>
            <button className="icon-button" aria-label="Notifications"><Bell size={19}/></button>
            <div className="top-divider"/>
            <span className="environment">DEVELOPMENT</span>
          </div>
        </header>

        <div className="content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><Sparkles size={14}/> HOSPITALITY INTELLIGENCE PLATFORM</div>
              <h1>Executive Overview</h1>
              <p className="page-description">
                Your unified command center for hotel performance and operations.
              </p>
            </div>
            <button className="date-button"><CalendarDays size={17}/> Reporting period <ChevronDown size={15}/></button>
          </section>

          <section className="welcome-banner">
            <div className="banner-copy">
              <div className="banner-kicker">ORCHESTRATING EXCEPTIONAL GUEST EXPERIENCES</div>
              <h2>Every operation.<br/>One intelligent platform.</h2>
              <p>Connect your hotel teams, operational workflows and guest experience in one place.</p>
              <Link href="/operations" className="banner-link">Explore hotel operations <ArrowUpRight size={16}/></Link>
            </div>
            <div className="banner-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit-core"><Bot size={43}/></div><span className="orbit-node node-one"><BedDouble/></span><span className="orbit-node node-two"><Users/></span><span className="orbit-node node-three"><Activity/></span></div>
          </section>

          <section className="section-heading">
            <div><h2>Performance overview</h2><p>Live metrics will appear when a hotel property and PMS integration are configured.</p></div>
            <span className="data-state"><span className="status-dot muted"/> Awaiting property data</span>
          </section>

          <section className="metrics-grid">
            <Metric title="Occupancy Rate" value="—" description="No property data connected" icon={BedDouble}/>
            <Metric title="Average Daily Rate" value="—" description="Awaiting PMS integration" icon={ChartNoAxesCombined}/>
            <Metric title="RevPAR" value="—" description="Awaiting revenue data" icon={Activity}/>
            <Metric title="Guest Satisfaction" value="—" description="Awaiting guest feedback" icon={Users}/>
          </section>

          <section className="lower-grid">
            <div className="panel">
              <div className="panel-heading"><div><h2>Platform modules</h2><p>Navigate your hospitality workspace</p></div><span className="panel-icon"><LayoutDashboard size={18}/></span></div>
              <div className="module-list">
                {modules.map((module) => {
                  const Icon = module.icon;
                  return <Link href={module.href} className="module-row" key={module.name}>
                    <span className="module-icon"><Icon size={20}/></span>
                    <span className="module-copy"><strong>{module.name}</strong><small>{module.detail}</small></span>
                    <ArrowUpRight size={17} className="module-arrow"/>
                  </Link>;
                })}
              </div>
            </div>

            <div className="panel">
              <div className="panel-heading"><div><h2>Operations pulse</h2><p>Operational readiness</p></div><span className="panel-icon"><Activity size={18}/></span></div>
              <div className="empty-state">
                <div className="empty-icon"><Clock3 size={25}/></div>
                <strong>Waiting for hotel connection</strong>
                <p>Connect a property and configure operational workflows to see room status, housekeeping and maintenance activity.</p>
                <Link href="/operations" className="text-link">Open operations <ArrowUpRight size={15}/></Link>
              </div>
            </div>
          </section>

          <footer className="footer">
            <span>ORCHESTRA HOSPITALITY AI OS</span>
            <span>Enterprise hospitality platform · Development preview</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
'@

Write-ProjectFile "$Web\app\operations\page.tsx" @'
import Link from "next/link";
import { ArrowLeft, BedDouble, ClipboardCheck, Wrench, Users, Clock3, ShieldCheck } from "lucide-react";

const areas = [
  { title: "Room Status", detail: "Room availability and operational status", icon: BedDouble },
  { title: "Housekeeping", detail: "Cleaning assignments and room readiness", icon: ClipboardCheck },
  { title: "Maintenance", detail: "Maintenance requests and work orders", icon: Wrench },
  { title: "Staff Coordination", detail: "Team assignments and shift coordination", icon: Users },
];

export default function OperationsPage() {
  return (
    <main className="module-page">
      <header className="module-topbar"><Link href="/" className="back-link"><ArrowLeft size={17}/> Executive Overview</Link><span className="environment">DEVELOPMENT</span></header>
      <div className="module-content">
        <div className="eyebrow">HOTEL OPERATIONS</div>
        <h1>Operations Command Center</h1>
        <p className="page-description">Coordinate hotel operations, room readiness and service workflows.</p>
        <div className="operations-notice"><ShieldCheck size={20}/><div><strong>Property connection required</strong><p>No hotel operational records are being displayed or fabricated. Connect an authorized property to activate this workspace.</p></div></div>
        <div className="operations-grid">
          {areas.map(({title, detail, icon: Icon}) => <div className="operation-card" key={title}><span className="module-icon"><Icon size={23}/></span><h2>{title}</h2><p>{detail}</p><span className="coming-label"><Clock3 size={13}/> Awaiting configuration</span></div>)}
        </div>
      </div>
    </main>
  );
}
'@

Write-ProjectFile "$Web\app\globals.css" @'
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap");

:root{--navy:#142b43;--navy2:#1c3d5b;--blue:#426b8c;--ink:#1c2c3b;--muted:#7d8b98;--line:#e7ecf0;--bg:#f5f7f9;--white:#fff;--gold:#c5a56a}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:"DM Sans",sans-serif}
a{color:inherit;text-decoration:none}
button{font:inherit}
.app-shell{min-height:100vh;display:flex}
.sidebar{width:265px;background:var(--navy);color:#dce6ee;display:flex;flex-direction:column;padding:25px 17px;flex-shrink:0}
.brand{display:flex;align-items:center;gap:12px;padding:0 8px 28px;border-bottom:1px solid #ffffff18}
.brand-logo{object-fit:contain;width:49px;height:49px}
.brand-name{font-family:Manrope,sans-serif;font-weight:800;letter-spacing:2px;font-size:17px;color:white}
.brand-subtitle{font-size:9px;letter-spacing:1.6px;color:#a9bdce;margin-top:3px}
.workspace-label,.nav-label{font-size:10px;font-weight:700;letter-spacing:1.5px;color:#91a8ba;margin:25px 9px 10px}
.property-switch{display:flex;align-items:center;gap:10px;background:#ffffff12;border:1px solid #ffffff18;border-radius:9px;padding:12px 10px;font-size:12px}
.property-switch strong,.property-switch small{display:block}.property-switch small{color:#9eb2c2;font-size:10px;margin-top:4px}.property-switch>svg:last-child{margin-left:auto}
.navigation{display:grid;gap:5px}
.nav-item{display:flex;align-items:center;gap:12px;padding:11px 12px;border-radius:8px;font-size:12px;color:#b7c7d4;transition:.2s}
.nav-item:hover,.nav-item.active{background:#ffffff17;color:#fff}
.nav-item.active{box-shadow:inset 3px 0 var(--gold)}
.sidebar-bottom{margin-top:auto}
.ai-status{font-size:10px;color:#a9bdce;padding:13px 8px;border-top:1px solid #ffffff18;display:flex;align-items:center;gap:8px}
.status-dot{width:7px;height:7px;border-radius:50%;background:#4ebc91;display:inline-block;flex-shrink:0}.status-dot.muted{background:#c2ccd4}
.profile{display:flex;align-items:center;gap:10px;padding:13px 5px 0;border-top:1px solid #ffffff18}.profile strong,.profile small{display:block;font-size:11px}.profile small{color:#9eb2c2;font-size:10px;margin-top:3px}.profile>svg:last-child{margin-left:auto}
.avatar{width:32px;height:32px;border-radius:50%;background:#345b78;display:grid;place-items:center;color:#fff;font-weight:700}
.main-area{min-width:0;flex:1}
.topbar{height:69px;background:white;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 38px}
.breadcrumb{font-size:11px;color:#687887;letter-spacing:.3px}.breadcrumb span{padding:0 10px;color:#bdc6ce}
.top-actions{display:flex;align-items:center;gap:17px}.icon-button{border:0;background:transparent;color:#617283;cursor:pointer}.top-divider{height:23px;border-left:1px solid var(--line)}
.environment{font-size:9px;letter-spacing:1px;color:#54718a;background:#edf3f7;padding:7px 10px;border-radius:5px;font-weight:700}
.content{max-width:1500px;margin:auto;padding:36px 40px}
.welcome-row{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:25px}
.eyebrow{font-size:10px;font-weight:700;letter-spacing:1.5px;color:#69849a;display:flex;align-items:center;gap:7px}
h1,h2,p{margin-top:0}
h1{font:800 29px Manrope,sans-serif;letter-spacing:-.8px;margin:10px 0 7px;color:#172d42}
.page-description{font-size:12px;color:var(--muted);margin:0}
.date-button{display:flex;align-items:center;gap:9px;background:white;border:1px solid var(--line);border-radius:7px;padding:10px 13px;color:#516477;font-size:11px}
.welcome-banner{min-height:230px;border-radius:13px;background:linear-gradient(110deg,#17334d,#274e6b 72%,#345e7a);color:white;display:flex;justify-content:space-between;align-items:center;padding:30px 42px;overflow:hidden;position:relative}
.banner-copy{max-width:490px;position:relative;z-index:2}.banner-kicker{font-size:9px;letter-spacing:2px;color:#c9b17f;font-weight:700}
.banner-copy h2{font:800 27px Manrope,sans-serif;line-height:1.25;margin:13px 0 9px}.banner-copy p{font-size:11px;color:#c1d0dc;max-width:420px;line-height:1.7;margin-bottom:15px}
.banner-link{font-size:11px;font-weight:700;color:#e5cf9f;display:inline-flex;gap:8px;align-items:center}
.banner-art{width:240px;height:190px;position:relative;margin-right:35px;display:grid;place-items:center;color:#e2c68f}
.orbit{position:absolute;border:1px solid #ffffff28;border-radius:50%;width:160px;height:160px}.orbit-two{width:215px;height:105px;transform:rotate(-30deg)}
.orbit-core{width:77px;height:77px;border-radius:50%;display:grid;place-items:center;background:#ffffff13;border:1px solid #ffffff44;box-shadow:0 0 45px #a7c7df25}
.orbit-node{position:absolute;width:35px;height:35px;border-radius:10px;background:#315a77;border:1px solid #ffffff38;display:grid;place-items:center;color:#f1d9a6}.orbit-node svg{width:17px}.node-one{top:5px;left:105px}.node-two{bottom:12px;left:20px}.node-three{right:0;bottom:55px}
.section-heading{display:flex;align-items:flex-end;justify-content:space-between;margin:29px 0 14px}.section-heading h2,.panel-heading h2{font:700 15px Manrope,sans-serif;margin:0 0 5px}.section-heading p,.panel-heading p{font-size:10px;color:var(--muted);margin:0}.data-state{font-size:10px;color:#84929d;display:flex;gap:7px;align-items:center}
.metrics-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.metric-card,.panel{background:white;border:1px solid var(--line);border-radius:10px}
.metric-card{padding:17px 18px}.metric-top{display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#778795}.metric-top svg{color:#67849b}.metric-value{font:800 27px Manrope,sans-serif;margin:13px 0 5px;color:#203d56}.metric-description{font-size:9px;color:#9aa6af}
.lower-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:15px;margin-top:17px}.panel{padding:19px}.panel-heading{display:flex;justify-content:space-between;align-items:center}.panel-icon{width:32px;height:32px;background:#edf3f7;border-radius:8px;display:grid;place-items:center;color:#426b8c}
.module-list{margin-top:14px}.module-row{display:flex;align-items:center;gap:12px;padding:12px 0;border-top:1px solid #eff2f4}.module-icon{width:38px;height:38px;display:grid;place-items:center;border-radius:9px;background:#edf3f7;color:#416985;flex-shrink:0}
.module-copy{flex:1}.module-copy strong,.module-copy small{display:block}.module-copy strong{font-size:11px}.module-copy small{font-size:9px;color:#8a98a3;margin-top:4px}.module-arrow{color:#8a9aa6}
.empty-state{min-height:210px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px}.empty-icon{width:47px;height:47px;border-radius:50%;display:grid;place-items:center;background:#edf3f7;color:#567b96;margin-bottom:12px}.empty-state strong{font-size:11px}.empty-state p{font-size:10px;line-height:1.7;color:#8795a0;max-width:290px;margin:8px 0 12px}.text-link{font-size:10px;color:#426b8c;font-weight:700;display:flex;gap:6px;align-items:center}
.footer{display:flex;justify-content:space-between;border-top:1px solid var(--line);padding-top:17px;margin-top:28px;font-size:9px;letter-spacing:.4px;color:#9aa6af}
.module-page{min-height:100vh;background:var(--bg)}.module-topbar{height:69px;background:white;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;padding:0 38px}.back-link{display:flex;align-items:center;gap:9px;font-size:11px;color:#526a7d}.module-content{max-width:1200px;margin:auto;padding:48px 40px}.module-content h1{margin-top:12px}.operations-notice{display:flex;gap:14px;padding:17px;background:#edf3f7;border:1px solid #dce7ee;border-radius:9px;color:#426b8c;margin:28px 0}.operations-notice strong{font-size:12px}.operations-notice p{font-size:10px;line-height:1.6;color:#748695;margin:5px 0 0}.operations-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px}.operation-card{background:white;border:1px solid var(--line);border-radius:10px;padding:22px}.operation-card h2{font:700 14px Manrope,sans-serif;margin:14px 0 6px}.operation-card p{font-size:10px;color:#84929d}.coming-label{display:inline-flex;align-items:center;gap:6px;font-size:9px;color:#8b99a4;background:#f3f6f8;padding:7px 9px;border-radius:5px}
@media(max-width:1000px){.sidebar{width:220px}.content{padding:28px 24px}.metrics-grid{grid-template-columns:repeat(2,1fr)}.banner-art{margin-right:0}}
@media(max-width:700px){.sidebar{width:65px;padding:18px 9px}.brand{padding:0 0 20px;justify-content:center}.brand>div,.workspace-label,.property-switch,.nav-label,.nav-item span,.sidebar-bottom{display:none}.nav-item{justify-content:center;padding:12px 8px}.navigation{margin-top:17px}.topbar{padding:0 17px}.content{padding:25px 16px}.welcome-row{align-items:flex-start;flex-direction:column}.welcome-banner{padding:25px 23px}.banner-art{display:none}.metrics-grid{gap:9px}.metric-card{padding:13px}.metric-value{font-size:23px}.lower-grid{grid-template-columns:1fr}.footer{gap:10px;flex-direction:column}.module-content{padding:30px 17px}.operations-grid{grid-template-columns:1fr}}
'@

Write-Host "`n=== INSTALL DEPENDENCIES ===" -ForegroundColor Cyan
Push-Location $Web
try {
    npm install
    if ($LASTEXITCODE -ne 0) { throw "npm install failed." }

    Write-Host "`n=== TYPE CHECK ===" -ForegroundColor Cyan
    npm run typecheck
    if ($LASTEXITCODE -ne 0) { throw "TypeScript check failed." }

    Write-Host "`n=== PRODUCTION BUILD ===" -ForegroundColor Cyan
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "Next.js build failed." }
}
finally {
    Pop-Location
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host " ORCHESTRA WEB GENERATION COMPLETED" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Web root : $Web"
Write-Host "Logo     : $Logo"
Write-Host "Backup   : $BackupRoot"
Write-Host "Port     : 3015"
Write-Host "`nStart with: cd $Web; npm run dev" -ForegroundColor Cyan
