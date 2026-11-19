
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Users,
  KeyRound,
  Plug,
  BrainCircuit,
  ScrollText,
  Settings2,
  ArrowUpRight,
  ArrowRight,
  LockKeyhole,
  Globe2,
  Database,
  Server,
  Workflow,
  AlertTriangle,
  Clock3,
  CheckCircle2,
  CircleDot,
  Activity,
  UserCog,
  FileCheck2,
  Fingerprint,
  Network,
  Gauge,
  Layers3,
  Hotel,
  MonitorCog,
} from "lucide-react";

const adminModules = [
  {
    id: "properties",
    category: "PROPERTY MANAGEMENT",
    title: "Property Management",
    description:
      "Manage hotel properties, locations, property profiles and operational configurations.",
    icon: Building2,
    status: "Configuration required",
    features: ["Property profiles", "Hotel configuration", "Multi-property structure"],
  },
  {
    id: "users",
    category: "IDENTITY MANAGEMENT",
    title: "Users & Teams",
    description:
      "Manage platform users, hotel teams, staff identities and organizational assignments.",
    icon: Users,
    status: "Configuration required",
    features: ["User directory", "Team assignments", "Account lifecycle"],
  },
  {
    id: "access",
    category: "SECURITY & ACCESS",
    title: "Access Control",
    description:
      "Define roles, permissions and controlled access across hotel workspaces.",
    icon: KeyRound,
    status: "Configuration required",
    features: ["Role management", "Permission policies", "Access governance"],
  },
  {
    id: "integrations",
    category: "PLATFORM CONNECTIVITY",
    title: "Integrations",
    description:
      "Manage integration configurations for PMS, booking, payments and external services.",
    icon: Plug,
    status: "Awaiting configuration",
    features: ["PMS connectivity", "Booking integrations", "External services"],
  },
  {
    id: "governance",
    category: "ARTIFICIAL INTELLIGENCE",
    title: "AI Governance",
    description:
      "Establish AI model policies, responsible-use controls and intelligence governance.",
    icon: BrainCircuit,
    status: "Design preview",
    features: ["AI model policies", "Usage governance", "Human oversight"],
  },
  {
    id: "audit",
    category: "SYSTEM GOVERNANCE",
    title: "Audit & Activity Logs",
    description:
      "Provide a foundation for traceability, security monitoring and administrative accountability.",
    icon: ScrollText,
    status: "Backend required",
    features: ["Administrative events", "Security audit trail", "System activity"],
  },
];

const platformLayers = [
  {
    name: "Identity & Authentication",
    description: "Account identity and authentication foundation",
    icon: Fingerprint,
  },
  {
    name: "Authorization & RBAC",
    description: "Role-based access and permission enforcement",
    icon: LockKeyhole,
  },
  {
    name: "Property & Organization",
    description: "Hotel and organizational boundaries",
    icon: Hotel,
  },
  {
    name: "Integration Architecture",
    description: "External platform connectivity",
    icon: Network,
  },
  {
    name: "AI Governance",
    description: "AI policies and responsible operation",
    icon: BrainCircuit,
  },
  {
    name: "System Observability",
    description: "Monitoring, traceability and audit foundation",
    icon: Activity,
  },
];

const configurationAreas = [
  {
    title: "Platform Configuration",
    description: "Global settings, environment and platform preferences.",
    icon: Settings2,
  },
  {
    title: "Infrastructure",
    description: "Application services, database and supporting infrastructure.",
    icon: Server,
  },
  {
    title: "Data Management",
    description: "Data access policies, retention and governance.",
    icon: Database,
  },
  {
    title: "Workflow Management",
    description: "Platform workflow configuration and orchestration.",
    icon: Workflow,
  },
];

export default function AdminPage() {
  return (
    <main className="content adm-content">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">
            <ShieldCheck size={14} />
            PLATFORM ADMINISTRATION & GOVERNANCE
          </div>
          <h1>Admin Control Center</h1>
          <p className="page-description">
            Govern properties, identities, security, integrations and
            intelligence across the ORCHESTRA Hospitality AI OS platform.
          </p>
        </div>

        <div className="adm-header-actions">
          <span className="adm-environment">
            <CircleDot size={12} />
            DEVELOPMENT ENVIRONMENT
          </span>
        </div>
      </div>

      <div className="adm-notice">
        <AlertTriangle size={18} />
        <div>
          <strong>Platform administration preview</strong>
          <p>
            This workspace currently presents the administration architecture
            and configuration areas. No live property, user, integration,
            permission or audit records are being represented.
          </p>
        </div>
      </div>

      <section className="adm-hero">
        <div className="adm-hero-copy">
          <span className="adm-hero-kicker">
            <Layers3 size={14} />
            ORCHESTRA PLATFORM CONTROL PLANE
          </span>
          <h2>One Platform. Unified Governance. Total Operational Visibility.</h2>
          <p>
            A centralized administration layer designed to manage hospitality
            organizations, control access, govern integrations and establish
            secure platform operations.
          </p>

          <div className="adm-hero-features">
            <span><Building2 size={13} /> Property Governance</span>
            <span><ShieldCheck size={13} /> Enterprise Security</span>
            <span><BrainCircuit size={13} /> AI Governance</span>
          </div>
        </div>

        <div className="adm-hero-art">
          <div className="adm-orbit adm-orbit-one" />
          <div className="adm-orbit adm-orbit-two" />
          <div className="adm-orbit adm-orbit-three" />

          <div className="adm-hero-core">
            <MonitorCog size={43} />
          </div>

          <div className="adm-floating adm-float-one">
            <Building2 size={17} />
          </div>
          <div className="adm-floating adm-float-two">
            <ShieldCheck size={17} />
          </div>
          <div className="adm-floating adm-float-three">
            <Users size={17} />
          </div>
          <div className="adm-floating adm-float-four">
            <BrainCircuit size={17} />
          </div>
        </div>

        <div className="adm-hero-status">
          <span className="status-dot muted" />
          Administration interface · Development
        </div>
      </section>

      <div className="fo-section-heading adm-section-heading">
        <div>
          <h2>Administration Domains</h2>
          <p>Core management capabilities of the ORCHESTRA platform</p>
        </div>
        <span className="data-state">6 management domains</span>
      </div>

      <section className="adm-module-grid">
        {adminModules.map((module) => {
          const Icon = module.icon;

          return (
            <article className="panel adm-module-card" key={module.id}>
              <div className="adm-module-top">
                <div className="adm-module-icon">
                  <Icon size={22} />
                </div>
                <span className="adm-module-indicator">
                  <CircleDot size={10} />
                  Preview
                </span>
              </div>

              <span className="adm-module-category">{module.category}</span>
              <h3>{module.title}</h3>
              <p>{module.description}</p>

              <div className="adm-feature-list">
                {module.features.map((feature) => (
                  <div key={feature}>
                    <CheckCircle2 size={13} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="adm-module-footer">
                <span>{module.status}</span>
                <ArrowUpRight size={16} />
              </div>
            </article>
          );
        })}
      </section>

      <div className="fo-section-heading adm-section-heading">
        <div>
          <h2>Platform Governance Architecture</h2>
          <p>Foundational capabilities supporting enterprise administration</p>
        </div>
      </div>

      <section className="adm-governance-grid">
        <article className="panel adm-governance-panel">
          <div className="panel-heading">
            <div>
              <h2>Governance Layers</h2>
              <p>Logical architecture overview</p>
            </div>
            <ShieldCheck size={20} />
          </div>

          <div className="adm-layer-list">
            {platformLayers.map((layer, index) => {
              const Icon = layer.icon;

              return (
                <div className="adm-layer-row" key={layer.name}>
                  <div className="adm-layer-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="adm-layer-icon">
                    <Icon size={18} />
                  </div>
                  <div className="adm-layer-copy">
                    <strong>{layer.name}</strong>
                    <small>{layer.description}</small>
                  </div>
                  <ArrowRight size={15} className="adm-layer-arrow" />
                </div>
              );
            })}
          </div>
        </article>

        <article className="panel adm-security-panel">
          <div className="panel-heading">
            <div>
              <h2>Security Principles</h2>
              <p>Target administration standards</p>
            </div>
            <LockKeyhole size={20} />
          </div>

          <div className="adm-security-intro">
            <div className="adm-security-emblem">
              <ShieldCheck size={33} />
            </div>
            <div>
              <strong>Security by Design</strong>
              <p>
                Security and governance should be embedded into every
                administrative operation.
              </p>
            </div>
          </div>

          <div className="adm-security-item">
            <Fingerprint size={17} />
            <div>
              <strong>Identity Verification</strong>
              <small>Authenticated access and account controls</small>
            </div>
          </div>

          <div className="adm-security-item">
            <KeyRound size={17} />
            <div>
              <strong>Least Privilege</strong>
              <small>Permission boundaries and role governance</small>
            </div>
          </div>

          <div className="adm-security-item">
            <FileCheck2 size={17} />
            <div>
              <strong>Accountability</strong>
              <small>Auditable administrative actions</small>
            </div>
          </div>

          <div className="adm-security-item">
            <Globe2 size={17} />
            <div>
              <strong>Tenant Isolation</strong>
              <small>Controlled property and organization boundaries</small>
            </div>
          </div>
        </article>
      </section>

      <div className="fo-section-heading adm-section-heading">
        <div>
          <h2>System Configuration</h2>
          <p>Administration foundations and platform services</p>
        </div>
      </div>

      <section className="adm-config-grid">
        {configurationAreas.map((item) => {
          const Icon = item.icon;

          return (
            <article className="panel adm-config-card" key={item.title}>
              <div className="adm-config-icon">
                <Icon size={21} />
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span>
                  <Clock3 size={12} /> Configuration pending
                </span>
              </div>
              <ArrowUpRight size={16} className="adm-config-arrow" />
            </article>
          );
        })}
      </section>

      <section className="adm-bottom-banner">
        <div className="adm-bottom-icon">
          <Gauge size={25} />
        </div>
        <div className="adm-bottom-copy">
          <span>ORCHESTRA ENTERPRISE GOVERNANCE</span>
          <h2>Built for Controlled, Connected Hospitality Operations.</h2>
          <p>
            A centralized control plane for the people, properties,
            technologies and intelligence powering modern hospitality.
          </p>
        </div>
        <div className="adm-bottom-action">
          <span>
            <AlertTriangle size={13} />
            Backend integration pending
          </span>
          <Link href="/ai-intelligence">
            AI Intelligence <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
