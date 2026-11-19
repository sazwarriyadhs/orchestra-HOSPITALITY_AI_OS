
import {
  MessageSquare,
  Users,
  Star,
  Headphones,
  Sparkles,
  Clock3,
  ArrowUpRight,
  ArrowRight,
  ConciergeBell,
  Coffee,
  Utensils,
  Car,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Send,
  Globe,
  Heart,
  MessageCircle,
} from "lucide-react";

const metrics = [
  { label: "Active Guest Conversations", value: "36", detail: "Across all channels", icon: MessageSquare },
  { label: "Open Guest Requests", value: "12", detail: "Awaiting fulfillment", icon: ConciergeBell },
  { label: "Guest Satisfaction", value: "94.8%", detail: "Illustrative score", icon: Star },
  { label: "Response Time", value: "2.4 min", detail: "Average response", icon: Clock3 },
];

const requests = [
  { guest: "Alexander Morgan", room: "1208", request: "Airport Transfer", category: "Transportation", time: "09:42 AM", status: "In Progress", icon: Car },
  { guest: "Sarah Williams", room: "0815", request: "Extra Towels", category: "Housekeeping", time: "09:35 AM", status: "Pending", icon: ConciergeBell },
  { guest: "James Anderson", room: "1402", request: "Restaurant Reservation", category: "Dining", time: "09:18 AM", status: "Confirmed", icon: Utensils },
  { guest: "Emily Johnson", room: "0609", request: "Breakfast in Room", category: "Room Service", time: "08:55 AM", status: "In Progress", icon: Coffee },
];

const conversations = [
  { initials: "AM", name: "Alexander Morgan", room: "Room 1208", message: "Could you arrange an airport transfer for tomorrow?", time: "2 min ago", unread: 2 },
  { initials: "SW", name: "Sarah Williams", room: "Room 0815", message: "Thank you for the excellent service!", time: "8 min ago", unread: 0 },
  { initials: "JA", name: "James Anderson", room: "Room 1402", message: "I would like to reserve a table for two.", time: "15 min ago", unread: 1 },
];

const journey = [
  { title: "Pre-arrival", description: "Personalized welcome and trip preparation", number: "01", icon: CalendarDays },
  { title: "Arrival & Check-in", description: "Seamless arrival and digital assistance", number: "02", icon: Users },
  { title: "In-house Experience", description: "Concierge, requests and guest messaging", number: "03", icon: Heart },
  { title: "Departure & Feedback", description: "Checkout assistance and guest feedback", number: "04", icon: Star },
];

export default function GuestPortalPage() {
  return (
    <div className="content guest-content">

      <div className="welcome-row">
        <div>
          <div className="eyebrow">
            <Heart size={14} />
            GUEST EXPERIENCE MANAGEMENT
          </div>
          <h1>Guest Experience</h1>
          <p className="page-description">
            Orchestrate meaningful guest interactions across the entire hospitality journey.
          </p>
        </div>

        <div className="guest-header-actions">
          <div className="date-button">
            <Globe size={15} />
            Omnichannel Overview
          </div>
          <a href="/front-office" className="guest-secondary-button">
            Front Office <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <div className="guest-demo-notice">
        <AlertCircle size={17} />
        <span>
          <strong>Development Preview</strong> — Guest profiles, requests,
          conversations and performance metrics below are illustrative data,
          not connected to live hotel systems.
        </span>
      </div>

      <section className="metrics-grid guest-metrics">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <article className="metric-card" key={item.label}>
              <div className="metric-top">
                <span>{item.label}</span>
                <Icon size={19} />
              </div>
              <div className="metric-value">{item.value}</div>
              <div className="metric-description">{item.detail}</div>
            </article>
          );
        })}
      </section>

      <section className="guest-welcome-banner">
        <div className="guest-banner-copy">
          <span className="guest-kicker">
            <Sparkles size={13} /> ORCHESTRA DIGITAL CONCIERGE
          </span>
          <h2>Every Guest Deserves an Exceptional Experience.</h2>
          <p>
            Connect guests with hotel services, personalized recommendations
            and seamless assistance throughout their stay.
          </p>
          <div className="guest-banner-tags">
            <span><MessageCircle size={13} /> Guest Messaging</span>
            <span><ConciergeBell size={13} /> Digital Concierge</span>
            <span><Heart size={13} /> Personalization</span>
          </div>
        </div>

        <div className="guest-banner-art">
          <div className="guest-orbit guest-orbit-one" />
          <div className="guest-orbit guest-orbit-two" />
          <div className="guest-orbit-core">
            <Headphones size={37} />
          </div>
          <div className="guest-orbit-node guest-node-one"><MessageSquare size={17} /></div>
          <div className="guest-orbit-node guest-node-two"><Heart size={17} /></div>
          <div className="guest-orbit-node guest-node-three"><Sparkles size={17} /></div>
        </div>
      </section>

      <div className="fo-section-heading guest-section-heading">
        <div>
          <h2>Guest Journey Management</h2>
          <p>Four stages of an orchestrated hospitality experience</p>
        </div>
        <span className="data-state">Guest lifecycle</span>
      </div>

      <section className="guest-journey-grid">
        {journey.map((stage) => {
          const Icon = stage.icon;
          return (
            <article className="guest-journey-card" key={stage.number}>
              <div className="guest-journey-top">
                <span>{stage.number}</span>
                <Icon size={21} />
              </div>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
              <div className="guest-journey-footer">
                Guest lifecycle <ArrowRight size={13} />
              </div>
            </article>
          );
        })}
      </section>

      <div className="fo-section-heading guest-section-heading">
        <div>
          <h2>Guest Service Operations</h2>
          <p>Monitor requests and communication activity</p>
        </div>
        <span className="data-state">
          <span className="status-dot muted" /> Preview data
        </span>
      </div>

      <section className="guest-main-grid">

        <article className="panel">
          <div className="panel-heading">
            <div>
              <h2>Guest Requests</h2>
              <p>Service fulfillment overview</p>
            </div>
            <MoreHorizontal size={19} />
          </div>

          <div className="guest-request-list">
            {requests.map((request) => {
              const Icon = request.icon;
              return (
                <div className="guest-request-row" key={request.guest + request.request}>
                  <div className="guest-request-icon">
                    <Icon size={18} />
                  </div>
                  <div className="guest-request-copy">
                    <strong>{request.request}</strong>
                    <small>{request.guest} · Room {request.room}</small>
                    <span>{request.category} · {request.time}</span>
                  </div>
                  <span className={`fo-status ${request.status.toLowerCase().replace(" ", "-")}`}>
                    {request.status}
                  </span>
                </div>
              );
            })}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <h2>Guest Conversations</h2>
              <p>Recent guest communication</p>
            </div>
            <MessageSquare size={19} />
          </div>

          <div className="guest-conversation-list">
            {conversations.map((conversation) => (
              <div className="guest-conversation" key={conversation.name}>
                <div className="fo-avatar">{conversation.initials}</div>
                <div className="guest-conversation-copy">
                  <div className="guest-conversation-name">
                    <strong>{conversation.name}</strong>
                    <span>{conversation.time}</span>
                  </div>
                  <small>{conversation.room}</small>
                  <p>{conversation.message}</p>
                </div>
                {conversation.unread > 0 && (
                  <span className="guest-unread">{conversation.unread}</span>
                )}
              </div>
            ))}
          </div>
        </article>

      </section>

      <section className="guest-bottom-grid">
        <article className="panel guest-channel-panel">
          <div className="panel-heading">
            <div>
              <h2>Guest Engagement Channels</h2>
              <p>Communication touchpoints</p>
            </div>
            <Globe size={19} />
          </div>
          <div className="guest-channel-list">
            <div><MessageSquare size={17} /><span>In-app Messaging</span><strong>Active</strong></div>
            <div><Globe size={17} /><span>Guest Web Portal</span><strong>Designed</strong></div>
            <div><Send size={17} /><span>Digital Notifications</span><strong>Designed</strong></div>
            <div><Headphones size={17} /><span>Concierge Assistance</span><strong>Designed</strong></div>
          </div>
        </article>

        <article className="panel guest-feedback-panel">
          <div className="panel-heading">
            <div>
              <h2>Guest Satisfaction</h2>
              <p>Illustrative experience indicators</p>
            </div>
            <Star size={19} />
          </div>
          <div className="guest-satisfaction">
            <div className="guest-rating">
              <strong>4.8</strong>
              <span>★★★★★</span>
              <small>Illustrative rating</small>
            </div>
            <div className="guest-feedback-copy">
              <strong>Exceptional Hospitality</strong>
              <p>
                Guest feedback and satisfaction monitoring can help identify
                service improvements and experience opportunities.
              </p>
              <span><CheckCircle2 size={13} /> Sample feedback indicator</span>
            </div>
          </div>
        </article>
      </section>

      <section className="fo-ai-banner guest-ai-banner">
        <div className="fo-ai-icon"><Sparkles size={24} /></div>
        <div className="fo-ai-copy">
          <span>ORCHESTRA INTELLIGENT HOSPITALITY</span>
          <h2>Personalized Service. Connected Intelligence.</h2>
          <p>
            Bring guest context, service workflows and AI-assisted recommendations
            together in one hospitality experience.
          </p>
        </div>
        <div className="fo-ai-action">
          <span><AlertCircle size={13} /> AI integration pending</span>
          <a href="/ai-intelligence">Explore AI Intelligence <ArrowUpRight size={15} /></a>
        </div>
      </section>

    </div>
  );
}
