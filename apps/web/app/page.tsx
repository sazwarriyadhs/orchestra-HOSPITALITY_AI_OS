import Link from "next/link";
import { Activity, ArrowUpRight, BedDouble, Calendar, ChevronDown, Clock, Star, Users } from "lucide-react";

export default function ExecutiveOverview() {
  return (
    <div className="content-area">
      <section className="welcome-banner">
        <div className="banner-copy">
          <div className="banner-kicker">ORCHESTRATING EXCEPTIONAL GUEST EXPERIENCES</div>
          <h2>Every operation.<br/>One intelligent platform.</h2>
          <p>Connect your hotel teams, operational workflows and guest experience in one place.</p>
          <Link href="/operations" className="explore-btn">
            Explore hotel operations <ArrowUpRight size={16}/>
          </Link>
        </div>
      </section>

      <section className="performance-section">
        <div className="section-header">
          <div>
            <h3>Performance overview</h3>
            <p>Live metrics will appear when a hotel property and PMS integration are configured.</p>
          </div>
          <div className="status-indicator">
            <span className="dot"></span> Awaiting property data
          </div>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header"><span>Occupancy Rate</span> <BedDouble size={18}/></div>
            <div className="metric-value">—</div>
            <div className="metric-footer">No property data connected</div>
          </div>
          <div className="metric-card">
            <div className="metric-header"><span>Average Daily Rate</span> <Activity size={18}/></div>
            <div className="metric-value">—</div>
            <div className="metric-footer">Awaiting PMS integration</div>
          </div>
          <div className="metric-card">
            <div className="metric-header"><span>RevPAR</span> <Activity size={18}/></div>
            <div className="metric-value">—</div>
            <div className="metric-footer">Awaiting revenue data</div>
          </div>
          <div className="metric-card">
            <div className="metric-header"><span>Guest Satisfaction</span> <Star size={18}/></div>
            <div className="metric-value">—</div>
            <div className="metric-footer">Awaiting guest feedback</div>
          </div>
        </div>
      </section>
    </div>
  );
}

