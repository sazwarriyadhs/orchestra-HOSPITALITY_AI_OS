
import {
  BrainCircuit,
  Sparkles,
  Activity,
  TrendingUp,
  TrendingDown,
  Users,
  BedDouble,
  DollarSign,
  ShieldAlert,
  Zap,
  ArrowUpRight,
  ArrowRight,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Target,
  Gauge,
  Bot,
  Cpu,
  Network,
  CalendarDays,
  MoreHorizontal,
  Lightbulb,
  Send,
  ChevronRight,
  BarChart3,
  CircleDot,
} from "lucide-react";

const metrics = [
  { label: "AI Insights Generated", value: "1,284", detail: "Illustrative monthly volume", icon: BrainCircuit, trend: "+18.6%" },
  { label: "Operational Efficiency", value: "92.4%", detail: "Illustrative indicator", icon: Gauge, trend: "+6.2%" },
  { label: "Revenue Opportunities", value: "28", detail: "Potential opportunities", icon: TrendingUp, trend: "+12.8%" },
  { label: "Active AI Workflows", value: "16", detail: "Configured workflow preview", icon: Zap, trend: "Preview" },
];

const intelligence = [
  {
    category: "OPERATIONS",
    title: "Housekeeping Demand Forecast",
    description: "Projected room turnaround demand may increase during the afternoon arrival window.",
    recommendation: "Review housekeeping allocation for the expected arrival peak.",
    priority: "High",
    icon: BedDouble,
  },
  {
    category: "REVENUE",
    title: "Revenue Optimization Opportunity",
    description: "A potential pricing opportunity has been identified for selected room categories.",
    recommendation: "Review demand, booking pace and current room rates.",
    priority: "Medium",
    icon: DollarSign,
  },
  {
    category: "GUEST EXPERIENCE",
    title: "Guest Service Attention",
    description: "An unresolved guest request may require additional follow-up.",
    recommendation: "Coordinate with the relevant service department.",
    priority: "High",
    icon: Users,
  },
];

const aiModules = [
  { name: "Predictive Operations", description: "Occupancy, staffing and operational demand forecasting", icon: Activity, status: "Designed" },
  { name: "Revenue Intelligence", description: "Demand analysis, pricing and revenue opportunities", icon: DollarSign, status: "Designed" },
  { name: "Guest Intelligence", description: "Guest preferences, sentiment and personalization", icon: Users, status: "Designed" },
  { name: "Risk & Anomaly Detection", description: "Operational exceptions and risk indicators", icon: ShieldAlert, status: "Designed" },
  { name: "AI Workflow Orchestration", description: "Intelligent task routing and workflow assistance", icon: Network, status: "Designed" },
  { name: "Executive AI Copilot", description: "Conversational management intelligence", icon: Bot, status: "Designed" },
];

const activity = [
  { title: "Operational insight generated", detail: "Housekeeping demand analysis", time: "09:42 AM", icon: BrainCircuit },
  { title: "Guest experience signal", detail: "Service follow-up recommendation", time: "09:18 AM", icon: Users },
  { title: "Revenue opportunity identified", detail: "Room category demand analysis", time: "08:55 AM", icon: TrendingUp },
  { title: "Risk monitoring event", detail: "Illustrative anomaly notification", time: "08:30 AM", icon: ShieldAlert },
];

const bars = [
  { day: "Mon", value: 48 },
  { day: "Tue", value: 65 },
  { day: "Wed", value: 57 },
  { day: "Thu", value: 78 },
  { day: "Fri", value: 91 },
  { day: "Sat", value: 72 },
  { day: "Sun", value: 62 },
];

export default function AIIntelligencePage() {
  return (
    <div className="content ai-content">

      <div className="welcome-row">
        <div>
          <div className="eyebrow">
            <Sparkles size={14} />
            ARTIFICIAL INTELLIGENCE & BUSINESS INTELLIGENCE
          </div>
          <h1>AI Intelligence Center</h1>
          <p className="page-description">
            Transform hospitality data into predictive insights, intelligent decisions and operational actions.
          </p>
        </div>

        <div className="ai-header-actions">
          <div className="date-button">
            <CalendarDays size={15} />
            Intelligence Overview
          </div>
          <span className="ai-system-badge">
            <span className="status-dot muted" /> PREVIEW MODE
          </span>
        </div>
      </div>

      <div className="ai-demo-notice">
        <AlertTriangle size={17} />
        <span>
          <strong>Development Preview</strong> — AI metrics, forecasts,
          insights and activity below are illustrative. No live AI inference
          or connected hotel data is being represented.
        </span>
      </div>

      <section className="ai-hero">
        <div className="ai-hero-copy">
          <span className="ai-hero-kicker">
            <BrainCircuit size={14} /> ORCHESTRA INTELLIGENCE ENGINE
          </span>
          <h2>From Hotel Data to Intelligent Decisions.</h2>
          <p>
            A unified intelligence layer designed to help hotel management
            anticipate demand, understand guest needs, optimize resources
            and make better operational decisions.
          </p>
          <div className="ai-hero-features">
            <span><Activity size={13} /> Predictive Analytics</span>
            <span><Sparkles size={13} /> AI Recommendations</span>
            <span><Network size={13} /> Connected Intelligence</span>
          </div>
        </div>

        <div className="ai-brain-visual">
          <div className="ai-ring ai-ring-one" />
          <div className="ai-ring ai-ring-two" />
          <div className="ai-ring ai-ring-three" />
          <div className="ai-brain-core">
            <BrainCircuit size={47} />
          </div>
          <div className="ai-floating-node ai-node-one"><Activity size={17} /></div>
          <div className="ai-floating-node ai-node-two"><Users size={17} /></div>
          <div className="ai-floating-node ai-node-three"><TrendingUp size={17} /></div>
          <div className="ai-floating-node ai-node-four"><ShieldAlert size={17} /></div>
        </div>

        <div className="ai-hero-status">
          <span className="status-dot muted" />
          Intelligence engine interface · Development
        </div>
      </section>

      <section className="metrics-grid ai-metrics">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <article className="metric-card" key={item.label}>
              <div className="metric-top">
                <span>{item.label}</span>
                <Icon size={19} />
              </div>
              <div className="metric-value">{item.value}</div>
              <div className="ai-metric-bottom">
                <span className="metric-description">{item.detail}</span>
                <span className="ai-metric-trend">{item.trend}</span>
              </div>
            </article>
          );
        })}
      </section>

      <div className="fo-section-heading ai-section-heading">
        <div>
          <h2>AI-Generated Intelligence</h2>
          <p>Illustrative recommendations for hotel management</p>
        </div>
        <span className="data-state">
          <span className="status-dot muted" /> Sample insights
        </span>
      </div>

      <section className="ai-insight-grid">
        {intelligence.map((item) => {
          const Icon = item.icon;
          return (
            <article className="panel ai-insight-card" key={item.title}>
              <div className="ai-insight-top">
                <div className="ai-insight-icon"><Icon size={19} /></div>
                <span className={`ai-priority ${item.priority.toLowerCase()}`}>
                  <CircleDot size={10} /> {item.priority} Priority
                </span>
              </div>
              <span className="ai-insight-category">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="ai-recommendation">
                <Lightbulb size={15} />
                <span><strong>Recommendation</strong>{item.recommendation}</span>
              </div>
              <div className="ai-insight-footer">
                <span>Illustrative AI insight</span>
                <ArrowRight size={15} />
              </div>
            </article>
          );
        })}
      </section>

      <div className="fo-section-heading ai-section-heading">
        <div>
          <h2>Intelligence Analytics</h2>
          <p>Operational signals and business intelligence overview</p>
        </div>
        <span className="data-state">Illustrative dataset</span>
      </div>

      <section className="ai-analytics-grid">
        <article className="panel ai-chart-panel">
          <div className="panel-heading">
            <div>
              <h2>Operational Intelligence Activity</h2>
              <p>Illustrative weekly insight volume</p>
            </div>
            <BarChart3 size={20} />
          </div>

          <div className="ai-chart-summary">
            <strong>481</strong>
            <span>Sample intelligence events</span>
          </div>

          <div className="ai-bar-chart">
            {bars.map((bar) => (
              <div className="ai-bar-column" key={bar.day}>
                <span>{bar.value}</span>
                <div className="ai-bar-track">
                  <div className="ai-bar-fill" style={{ height: `${bar.value}%` }} />
                </div>
                <small>{bar.day}</small>
              </div>
            ))}
          </div>
          <div className="ai-chart-legend">
            <span><i /> Illustrative insight activity</span>
            <span>7-day sample</span>
          </div>
        </article>

        <article className="panel ai-performance-panel">
          <div className="panel-heading">
            <div>
              <h2>Intelligence Domains</h2>
              <p>Platform capability overview</p>
            </div>
            <Target size={20} />
          </div>

          {[
            { name: "Operations Intelligence", value: "Designed" },
            { name: "Revenue Intelligence", value: "Designed" },
            { name: "Guest Intelligence", value: "Designed" },
            { name: "Risk Intelligence", value: "Designed" },
            { name: "Executive Intelligence", value: "Designed" },
          ].map((item) => (
            <div className="ai-domain-row" key={item.name}>
              <span>{item.name}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </article>
      </section>

      <div className="fo-section-heading ai-section-heading">
        <div>
          <h2>AI Intelligence Modules</h2>
          <p>Modular intelligence architecture across hospitality operations</p>
        </div>
        <span className="data-state">6 capability areas</span>
      </div>

      <section className="ai-module-grid">
        {aiModules.map((module) => {
          const Icon = module.icon;
          return (
            <article className="panel ai-module-card" key={module.name}>
              <div className="ai-module-icon"><Icon size={21} /></div>
              <div className="ai-module-copy">
                <h3>{module.name}</h3>
                <p>{module.description}</p>
              </div>
              <span className="ai-module-status">{module.status}</span>
              <ArrowUpRight className="ai-module-arrow" size={16} />
            </article>
          );
        })}
      </section>

      <section className="ai-bottom-grid">

        <article className="panel">
          <div className="panel-heading">
            <div>
              <h2>Intelligence Activity</h2>
              <p>Illustrative system event timeline</p>
            </div>
            <Clock3 size={19} />
          </div>

          <div className="ai-activity-list">
            {activity.map((item) => {
              const Icon = item.icon;
              return (
                <div className="ai-activity-row" key={item.title}>
                  <div className="ai-activity-icon"><Icon size={17} /></div>
                  <div className="ai-activity-copy">
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </div>
                  <span>{item.time}</span>
                </div>
              );
            })}
          </div>
        </article>

        <article className="ai-copilot-panel">
          <div className="ai-copilot-icon"><Bot size={27} /></div>
          <span className="ai-copilot-kicker">ORCHESTRA AI COPILOT</span>
          <h2>Your Intelligent Hospitality Advisor.</h2>
          <p>
            Designed to help management explore operational questions,
            understand business signals and evaluate AI-generated recommendations.
          </p>

          <div className="ai-suggestions">
            <span><Sparkles size={13} /> Suggested questions</span>
            <div>How can we improve room occupancy?</div>
            <div>What are today's operational risks?</div>
            <div>How can we improve guest satisfaction?</div>
          </div>

          <div className="ai-copilot-input">
            <span>AI Copilot integration pending</span>
            <Send size={16} />
          </div>
        </article>

      </section>

      <section className="fo-ai-banner ai-final-banner">
        <div className="fo-ai-icon"><Cpu size={24} /></div>
        <div className="fo-ai-copy">
          <span>ORCHESTRA HOSPITALITY AI OS</span>
          <h2>One Intelligence Layer. Every Hotel Decision.</h2>
          <p>
            Connect front office, hotel operations, guest experience and
            business intelligence through a unified platform.
          </p>
        </div>
        <div className="fo-ai-action">
          <span><AlertTriangle size={13} /> Backend integration pending</span>
          <a href="/operations">Explore Operations <ArrowUpRight size={15} /></a>
        </div>
      </section>

    </div>
  );
}
