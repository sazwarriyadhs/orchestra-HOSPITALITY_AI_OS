
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDownRight,
  BedDouble,
  CircleDollarSign,
  ChartNoAxesCombined,
  Users,
  Star,
  Sparkles,
  BrainCircuit,
  ShieldCheck,
  ClipboardList,
  Clock3,
  ChevronRight,
  Building2,
  CalendarDays,
  Activity,
  Target,
  Wallet,
  ConciergeBell,
} from "lucide-react";

const metrics = [
  {
    label: "Occupancy Rate",
    value: "78.4%",
    change: "+4.8%",
    positive: true,
    detail: "Illustrative comparison",
    icon: BedDouble,
  },
  {
    label: "Average Daily Rate",
    value: "$186",
    change: "+2.3%",
    positive: true,
    detail: "Illustrative comparison",
    icon: CircleDollarSign,
  },
  {
    label: "RevPAR",
    value: "$145.82",
    change: "+6.2%",
    positive: true,
    detail: "Illustrative comparison",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Guest Satisfaction",
    value: "92.6%",
    change: "-0.8%",
    positive: false,
    detail: "Illustrative comparison",
    icon: Star,
  },
];

const departments = [
  { name: "Front Office", score: 94, detail: "Guest arrival and service", color: "blue" },
  { name: "Housekeeping", score: 88, detail: "Room readiness and quality", color: "gold" },
  { name: "Food & Beverage", score: 91, detail: "Dining and service operations", color: "green" },
  { name: "Engineering", score: 86, detail: "Facilities and maintenance", color: "purple" },
];

const priorities = [
  {
    title: "Guest experience consistency",
    detail: "Review service quality indicators across departments.",
    level: "Strategic",
    icon: Star,
  },
  {
    title: "Operational readiness",
    detail: "Monitor room readiness and pending service workflows.",
    level: "Operational",
    icon: ClipboardList,
  },
  {
    title: "Revenue performance",
    detail: "Review pricing, demand and occupancy patterns.",
    level: "Commercial",
    icon: Wallet,
  },
];

const intelligence = [
  {
    title: "Revenue opportunity",
    detail: "Review room-rate positioning against demand patterns when revenue data is connected.",
    category: "REVENUE INTELLIGENCE",
    icon: CircleDollarSign,
  },
  {
    title: "Guest experience",
    detail: "Identify recurring service themes from connected guest feedback.",
    category: "GUEST INTELLIGENCE",
    icon: Users,
  },
  {
    title: "Operational efficiency",
    detail: "Evaluate department workflows and service bottlenecks.",
    category: "OPERATIONS INTELLIGENCE",
    icon: Activity,
  },
];

export default function Page() {
  return (
    <main className="content gm-page">
      <div className="welcome-row gm-welcome">
        <div>
          <div className="eyebrow">
            <Building2 size={13} />
            GENERAL MANAGEMENT
          </div>
          <h1>Executive Command Center</h1>
          <p className="page-description">
            A strategic overview of hotel performance, guest experience and operational priorities.
          </p>
        </div>

        <div className="gm-period">
          <CalendarDays size={15} />
          Executive overview
        </div>
      </div>

      <section className="gm-hero">
        <div className="gm-hero-copy">
          <span className="gm-hero-kicker">GENERAL MANAGER WORKSPACE</span>
          <h2>Lead with clarity.<br />Manage with intelligence.</h2>
          <p>
            Bring commercial performance, operational execution and guest
            experience into one executive perspective.
          </p>
          <div className="gm-hero-actions">
            <Link href="/ai-intelligence" className="gm-primary-link">
              Explore AI Intelligence <ArrowUpRight size={15} />
            </Link>
            <Link href="/operations" className="gm-secondary-link">
              Operations Workspace <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        <div className="gm-hero-visual">
          <div className="gm-visual-ring gm-ring-one" />
          <div className="gm-visual-ring gm-ring-two" />
          <div className="gm-visual-core">
            <Building2 size={34} />
            <span>GM</span>
          </div>
          <div className="gm-visual-node gm-node-one"><ChartNoAxesCombined size={18} /></div>
          <div className="gm-visual-node gm-node-two"><Users size={18} /></div>
          <div className="gm-visual-node gm-node-three"><BrainCircuit size={18} /></div>
        </div>
      </section>

      <div className="gm-preview-notice">
        <ShieldCheck size={17} />
        <div>
          <strong>Executive preview — property data not connected</strong>
          <p>
            All displayed performance figures are illustrative placeholders.
            No actual hotel revenue, occupancy or guest records are being represented.
          </p>
        </div>
        <span>PREVIEW</span>
      </div>

      <section className="gm-section">
        <div className="gm-section-heading">
          <div>
            <h2>Executive Performance</h2>
            <p>Key hospitality performance indicators</p>
          </div>
          <span className="gm-data-label"><Activity size={13} /> Illustrative data</span>
        </div>

        <div className="gm-metrics">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const ChangeIcon = metric.positive ? ArrowUpRight : ArrowDownRight;

            return (
              <article className="gm-metric-card" key={metric.label}>
                <div className="gm-metric-top">
                  <span>{metric.label}</span>
                  <div className="gm-metric-icon"><Icon size={18} /></div>
                </div>
                <div className="gm-metric-value">{metric.value}</div>
                <div className="gm-metric-bottom">
                  <span className={metric.positive ? "gm-positive" : "gm-negative"}>
                    <ChangeIcon size={13} /> {metric.change}
                  </span>
                  <small>{metric.detail}</small>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="gm-main-grid">
        <section className="gm-panel">
          <div className="gm-panel-heading">
            <div>
              <h2>Department Performance</h2>
              <p>Illustrative operational assessment</p>
            </div>
            <span className="gm-heading-icon"><Target size={17} /></span>
          </div>

          <div className="gm-department-list">
            {departments.map((department) => (
              <div className="gm-department" key={department.name}>
                <div className="gm-department-top">
                  <div>
                    <strong>{department.name}</strong>
                    <small>{department.detail}</small>
                  </div>
                  <b>{department.score}%</b>
                </div>
                <div className="gm-progress">
                  <span
                    className={`gm-progress-fill ${department.color}`}
                    style={{ width: `${department.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="gm-panel-footnote">
            <InfoIcon />
            Department scores are illustrative, not measured results.
          </div>
        </section>

        <section className="gm-panel">
          <div className="gm-panel-heading">
            <div>
              <h2>Strategic Priorities</h2>
              <p>Areas for executive attention</p>
            </div>
            <span className="gm-heading-icon"><Target size={17} /></span>
          </div>

          <div className="gm-priority-list">
            {priorities.map((priority) => {
              const Icon = priority.icon;

              return (
                <div className="gm-priority" key={priority.title}>
                  <span className="gm-priority-icon"><Icon size={17} /></span>
                  <div className="gm-priority-copy">
                    <strong>{priority.title}</strong>
                    <p>{priority.detail}</p>
                    <small>{priority.level}</small>
                  </div>
                  <ChevronRight size={16} className="gm-priority-arrow" />
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="gm-section">
        <div className="gm-section-heading">
          <div>
            <h2>Management Intelligence</h2>
            <p>AI-assisted perspectives for executive decision-making</p>
          </div>
          <Link href="/ai-intelligence" className="gm-view-link">
            AI Intelligence Center <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="gm-intelligence-grid">
          {intelligence.map((item) => {
            const Icon = item.icon;

            return (
              <article className="gm-intelligence-card" key={item.title}>
                <span className="gm-intelligence-icon"><Icon size={19} /></span>
                <small>{item.category}</small>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <span className="gm-intelligence-status">
                  <Clock3 size={12} /> Awaiting data connection
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="gm-bottom-banner">
        <div className="gm-bottom-symbol"><Sparkles size={22} /></div>
        <div>
          <strong>Executive intelligence, connected to hotel operations.</strong>
          <p>
            Connect authorized property systems to enable real performance monitoring,
            management reporting and AI-assisted insights.
          </p>
        </div>
        <Link href="/settings">
          Workspace Settings <ArrowUpRight size={14} />
        </Link>
      </section>

      <div className="gm-footnote">
        <ShieldCheck size={13} />
        ORCHESTRA Executive Workspace · Development preview · No live property data connected
      </div>
    </main>
  );
}

function InfoIcon() {
  return <ShieldCheck size={13} />;
}
