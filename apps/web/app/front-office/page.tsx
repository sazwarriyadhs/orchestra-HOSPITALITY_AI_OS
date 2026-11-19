
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ConciergeBell,
  DoorOpen,
  LogIn,
  LogOut,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const frontOfficeDomains = [
  {
    title: "Reservations Management",
    subtitle: "Booking & Guest Planning",
    description:
      "Manage reservation workflows, booking changes, guest preferences and arrival preparation.",
    icon: CalendarDays,
    status: "Property connection required",
  },
  {
    title: "Guest Arrivals",
    subtitle: "Check-in & Welcome",
    description:
      "Coordinate arrival schedules, check-in procedures, room allocation and guest welcome experiences.",
    icon: LogIn,
    status: "Awaiting configuration",
  },
  {
    title: "Guest Departures",
    subtitle: "Check-out & Settlement",
    description:
      "Coordinate guest departures, billing handover, room release and post-stay workflows.",
    icon: LogOut,
    status: "Awaiting configuration",
  },
  {
    title: "Room Coordination",
    subtitle: "Availability & Readiness",
    description:
      "Align front desk activities with room availability, housekeeping updates and maintenance status.",
    icon: BedDouble,
    status: "Awaiting configuration",
  },
  {
    title: "Guest Services",
    subtitle: "Requests & Communication",
    description:
      "Coordinate guest requests, service communication and cross-department follow-up.",
    icon: MessageSquare,
    status: "Awaiting configuration",
  },
  {
    title: "Front Desk Team",
    subtitle: "Staff & Shift Coordination",
    description:
      "Support front desk assignments, shift handovers and service responsibilities.",
    icon: Users,
    status: "Awaiting configuration",
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Reservation",
    description: "Booking information and guest preferences",
    icon: CalendarDays,
  },
  {
    number: "02",
    title: "Arrival",
    description: "Check-in and welcome coordination",
    icon: DoorOpen,
  },
  {
    number: "03",
    title: "Guest Stay",
    description: "Requests and service coordination",
    icon: ConciergeBell,
  },
  {
    number: "04",
    title: "Departure",
    description: "Check-out and service closure",
    icon: LogOut,
  },
];

export default function FrontOfficePage() {
  return (
    <main className="content fo-command-page">
      {/* PAGE HEADER */}
      <section className="fo-command-header">
        <div className="fo-command-heading">
          <div className="fo-command-eyebrow">
            <ConciergeBell size={14} />
            GUEST JOURNEY MANAGEMENT
          </div>

          <h1>Front Office Command Center</h1>

          <p>
            Coordinate reservations, guest arrivals, departures and front desk
            service workflows through one hospitality workspace.
          </p>
        </div>

        <div className="fo-command-environment">
          <span className="status-dot muted" />
          DEVELOPMENT
        </div>
      </section>

      {/* PROPERTY CONTEXT */}
      <section className="fo-command-property">
        <div className="fo-command-property-icon">
          <BedDouble size={23} />
        </div>

        <div className="fo-command-property-copy">
          <span className="fo-command-label">ACTIVE PROPERTY CONTEXT</span>
          <strong>Hotel Workspace</strong>
          <p>
            Front Office is waiting for an authorized property connection.
          </p>
        </div>

        <div className="fo-command-property-state">
          <AlertCircle size={15} />
          Property not connected
        </div>
      </section>

      {/* DATA INTEGRITY NOTICE */}
      <section className="fo-command-notice">
        <ShieldCheck size={21} />

        <div>
          <strong>Live front desk data is not connected</strong>
          <p>
            Guest records, reservation schedules, room status and operational
            metrics are intentionally not displayed until an authorized hotel
            property and its relevant systems are connected.
          </p>
        </div>
      </section>

      {/* OPERATIONAL DOMAINS */}
      <section className="fo-command-section">
        <div className="fo-command-section-heading">
          <div>
            <span className="fo-command-label">FRONT OFFICE CAPABILITIES</span>
            <h2>Guest Journey Operations</h2>
            <p>
              Core workflows designed to support the complete guest journey.
            </p>
          </div>

          <div className="fo-command-section-icon">
            <Sparkles size={20} />
          </div>
        </div>

        <div className="fo-command-domain-grid">
          {frontOfficeDomains.map((domain) => {
            const Icon = domain.icon;

            return (
              <article className="fo-command-domain-card" key={domain.title}>
                <div className="fo-command-card-top">
                  <div className="fo-command-domain-icon">
                    <Icon size={22} />
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="fo-command-card-arrow"
                  />
                </div>

                <span className="fo-command-label">
                  {domain.subtitle}
                </span>

                <h3>{domain.title}</h3>

                <p className="fo-command-domain-description">
                  {domain.description}
                </p>

                <div className="fo-command-card-footer">
                  <Clock3 size={13} />
                  <span>{domain.status}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* GUEST JOURNEY */}
      <section className="fo-command-journey">
        <div className="fo-command-section-heading">
          <div>
            <span className="fo-command-label">SERVICE LIFECYCLE</span>
            <h2>The Guest Journey</h2>
            <p>
              A connected service model from booking through departure.
            </p>
          </div>

          <div className="fo-command-section-icon">
            <Users size={20} />
          </div>
        </div>

        <div className="fo-command-journey-grid">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div className="fo-command-journey-step" key={step.number}>
                <div className="fo-command-step-top">
                  <span className="fo-command-step-number">
                    {step.number}
                  </span>
                  <Icon size={21} />
                </div>

                <strong>{step.title}</strong>

                <p>{step.description}</p>

                {index < workflowSteps.length - 1 && (
                  <ArrowRight
                    size={17}
                    className="fo-command-step-arrow"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="fo-command-journey-note">
          <CheckCircle2 size={16} />
          <span>
            Workflow architecture preview — no live guest transactions are
            being processed.
          </span>
        </div>
      </section>

      {/* AI INTELLIGENCE */}
      <section className="fo-command-ai">
        <div className="fo-command-ai-icon">
          <Sparkles size={25} />
        </div>

        <div className="fo-command-ai-copy">
          <span>ORCHESTRA AI INTELLIGENCE</span>
          <h2>Elevate Every Guest Interaction</h2>
          <p>
            AI-assisted guest service, arrival preparation, personalized
            recommendations and hospitality workflow intelligence.
          </p>
        </div>

        <div className="fo-command-ai-action">
          <span className="fo-command-ai-status">
            <AlertCircle size={13} />
            Integration pending
          </span>

          <Link href="/ai-intelligence">
            Explore AI Intelligence
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      {/* PLATFORM INTEGRITY */}
      <section className="fo-command-integrity">
        <div className="fo-command-integrity-icon">
          <ShieldCheck size={21} />
        </div>

        <div>
          <strong>Guest experience with operational integrity</strong>
          <p>
            ORCHESTRA is designed to coordinate front desk workflows while
            keeping property data, guest information and service status
            transparent and dependent on authorized integrations.
          </p>
        </div>
      </section>
    </main>
  );
}
