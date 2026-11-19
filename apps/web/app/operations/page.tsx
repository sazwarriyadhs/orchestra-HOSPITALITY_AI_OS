
import {
  Activity,
  BedDouble,
  ClipboardCheck,
  Clock3,
  ShieldCheck,
  Users,
  Wrench,
  ArrowUpRight,
  Building2,
  Hotel,
} from "lucide-react";

const operationalAreas = [
  {
    title: "Room Status",
    subtitle: "Rooms & Inventory",
    description:
      "Monitor room availability, occupancy status, room readiness and out-of-service inventory.",
    icon: BedDouble,
    status: "Awaiting property connection",
  },
  {
    title: "Housekeeping",
    subtitle: "Cleaning & Room Readiness",
    description:
      "Coordinate cleaning assignments, inspection workflows and room preparation.",
    icon: ClipboardCheck,
    status: "Awaiting configuration",
  },
  {
    title: "Maintenance",
    subtitle: "Facilities & Engineering",
    description:
      "Manage maintenance requests, equipment issues and engineering work orders.",
    icon: Wrench,
    status: "Awaiting configuration",
  },
  {
    title: "Staff Coordination",
    subtitle: "Teams & Workforce",
    description:
      "Organize departmental assignments, shift coordination and operational responsibilities.",
    icon: Users,
    status: "Awaiting configuration",
  },
];

export default function OperationsPage() {
  return (
    <main className="content operations-page">
      {/* PAGE HEADER */}
      <section className="welcome-row">
        <div>
          <div className="eyebrow">HOSPITALITY MANAGEMENT / OPERATIONS</div>

          <h1>Operations Command Center</h1>

          <p className="page-description">
            Orchestrate hotel operations, room readiness, workforce
            coordination and service execution from one operational workspace.
          </p>
        </div>

        <div className="operations-environment">
          <span className="status-dot muted" />
          DEVELOPMENT
        </div>
      </section>

      {/* PROPERTY CONTEXT */}
      <section className="operations-property">
        <div className="operations-property-icon">
          <Hotel size={23} />
        </div>

        <div className="operations-property-copy">
          <span className="operations-label">ACTIVE PROPERTY CONTEXT</span>
          <strong>Hotel Workspace</strong>
          <p>
            No property has been connected to this workspace yet.
          </p>
        </div>

        <div className="operations-property-status">
          <Building2 size={15} />
          Property not connected
        </div>
      </section>

      {/* OPERATIONAL STATUS */}
      <section className="operations-notice">
        <ShieldCheck size={21} />

        <div>
          <strong>Operational data is not yet available</strong>
          <p>
            Connect an authorized hotel property and configure the relevant
            integrations to activate operational monitoring. No live hotel
            records or performance figures are being presented in this preview.
          </p>
        </div>
      </section>

      {/* OPERATIONAL DOMAINS */}
      <section className="operations-section">
        <div className="operations-section-heading">
          <div>
            <div className="eyebrow">CORE OPERATIONAL DOMAINS</div>
            <h2>Hotel Operations</h2>
            <p>
              Four operational domains designed to work together across the
              hospitality lifecycle.
            </p>
          </div>

          <div className="operations-section-icon">
            <Activity size={19} />
          </div>
        </div>

        <div className="operations-grid">
          {operationalAreas.map((area) => {
            const Icon = area.icon;

            return (
              <article className="operation-card" key={area.title}>
                <div className="operation-card-top">
                  <span className="module-icon">
                    <Icon size={23} />
                  </span>

                  <span className="operation-card-arrow">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                <div className="operation-card-content">
                  <span className="operations-label">
                    {area.subtitle}
                  </span>

                  <h3>{area.title}</h3>

                  <p>{area.description}</p>
                </div>

                <div className="operation-card-footer">
                  <span className="coming-label">
                    <Clock3 size={13} />
                    {area.status}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* PLATFORM PRINCIPLES */}
      <section className="operations-footer-panel">
        <div className="operations-footer-icon">
          <ShieldCheck size={21} />
        </div>

        <div>
          <strong>Operational integrity by design</strong>
          <p>
            ORCHESTRA separates configured capabilities from connected
            operational services. Data becomes available only when an
            authorized property and its relevant systems are connected.
          </p>
        </div>
      </section>
    </main>
  );
}
