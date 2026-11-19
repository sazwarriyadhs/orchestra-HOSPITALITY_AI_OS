
"use client";

import { useState } from "react";
import {
  Building2,
  Hotel,
  Globe2,
  Bell,
  ShieldCheck,
  BrainCircuit,
  SlidersHorizontal,
  Save,
  RotateCcw,
  ChevronRight,
  Check,
  Info,
  Languages,
  Clock3,
  Coins,
  Mail,
  Smartphone,
  LockKeyhole,
  Eye,
  Sparkles,
  Database,
  Monitor,
} from "lucide-react";

type SettingSection =
  | "general"
  | "property"
  | "regional"
  | "notifications"
  | "security"
  | "ai"
  | "system";

const sections = [
  { id: "general", label: "Organization", description: "Company identity and workspace", icon: Building2 },
  { id: "property", label: "Property Preferences", description: "Hotel and property defaults", icon: Hotel },
  { id: "regional", label: "Regional Settings", description: "Language, timezone and currency", icon: Globe2 },
  { id: "notifications", label: "Notifications", description: "Alerts and communication", icon: Bell },
  { id: "security", label: "Security & Privacy", description: "Session and privacy preferences", icon: ShieldCheck },
  { id: "ai", label: "AI Preferences", description: "Intelligence and automation", icon: BrainCircuit },
  { id: "system", label: "System Preferences", description: "Workspace appearance and behavior", icon: SlidersHorizontal },
] as const;

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`st-toggle ${checked ? "is-on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span />
    </button>
  );
}

function SettingRow({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="st-setting-row">
      <div className="st-setting-copy">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <div className="st-setting-control">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingSection>("general");

  const [organization, setOrganization] = useState({
    name: "ORCHESTRA Hospitality",
    email: "",
    website: "",
  });

  const [preferences, setPreferences] = useState({
    multiProperty: false,
    autoAssign: true,
    operationalAlerts: true,
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    sessionAlerts: true,
    auditVisibility: true,
    aiRecommendations: true,
    aiSummaries: true,
    predictiveInsights: false,
    compactMode: false,
    animations: true,
  });

  const [regional, setRegional] = useState({
    language: "English",
    timezone: "Asia/Jakarta",
    currency: "IDR",
    dateFormat: "DD MMM YYYY",
  });

  const [saved, setSaved] = useState(false);

  const updatePreference = (key: keyof typeof preferences, value: boolean) => {
    setPreferences((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const active = sections.find((section) => section.id === activeSection)!;
  const ActiveIcon = active.icon;

  const handleSave = () => {
    setSaved(true);
  };

  const handleReset = () => {
    setSaved(false);
    setOrganization({
      name: "ORCHESTRA Hospitality",
      email: "",
      website: "",
    });
    setRegional({
      language: "English",
      timezone: "Asia/Jakarta",
      currency: "IDR",
      dateFormat: "DD MMM YYYY",
    });
    setPreferences({
      multiProperty: false,
      autoAssign: true,
      operationalAlerts: true,
      emailNotifications: true,
      pushNotifications: true,
      weeklyDigest: false,
      sessionAlerts: true,
      auditVisibility: true,
      aiRecommendations: true,
      aiSummaries: true,
      predictiveInsights: false,
      compactMode: false,
      animations: true,
    });
  };

  return (
    <main className="content st-page">
      <div className="welcome-row st-welcome">
        <div>
          <div className="eyebrow">
            <SlidersHorizontal size={13} />
            PLATFORM CONFIGURATION
          </div>
          <h1>Platform Settings</h1>
          <p className="page-description">
            Configure your ORCHESTRA workspace, preferences and platform behavior.
          </p>
        </div>

        <div className="st-preview-badge">
          <span className="status-dot muted" />
          CONFIGURATION PREVIEW
        </div>
      </div>

      <section className="st-hero">
        <div className="st-hero-copy">
          <span className="st-hero-kicker">YOUR HOSPITALITY WORKSPACE</span>
          <h2>One workspace. Your operational preferences.</h2>
          <p>
            Manage organization defaults, property preferences, security,
            notifications and AI behavior from one central configuration area.
          </p>
          <div className="st-hero-meta">
            <span><ShieldCheck size={14} /> Centralized configuration</span>
            <span><Sparkles size={14} /> AI-ready architecture</span>
          </div>
        </div>
        <div className="st-hero-art">
          <div className="st-orbit st-orbit-a" />
          <div className="st-orbit st-orbit-b" />
          <div className="st-hero-core"><SlidersHorizontal size={35} /></div>
          <span className="st-orbit-icon st-orbit-one"><Building2 size={17} /></span>
          <span className="st-orbit-icon st-orbit-two"><ShieldCheck size={17} /></span>
          <span className="st-orbit-icon st-orbit-three"><BrainCircuit size={17} /></span>
        </div>
      </section>

      <div className="st-layout">
        <aside className="st-sidebar">
          <div className="st-sidebar-heading">SETTINGS CATEGORIES</div>
          {sections.map((section) => {
            const Icon = section.icon;
            const selected = activeSection === section.id;

            return (
              <button
                type="button"
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setSaved(false);
                }}
                className={`st-nav-item ${selected ? "active" : ""}`}
              >
                <span className="st-nav-icon"><Icon size={17} /></span>
                <span className="st-nav-copy">
                  <strong>{section.label}</strong>
                  <small>{section.description}</small>
                </span>
                <ChevronRight size={15} className="st-nav-arrow" />
              </button>
            );
          })}

          <div className="st-sidebar-note">
            <Info size={16} />
            <strong>Configuration status</strong>
            <p>Settings are currently managed in local preview mode.</p>
          </div>
        </aside>

        <section className="st-main-panel">
          <div className="st-panel-heading">
            <div className="st-panel-title">
              <span className="st-panel-icon"><ActiveIcon size={20} /></span>
              <div>
                <h2>{active.label}</h2>
                <p>{active.description}</p>
              </div>
            </div>
            <span className="st-section-state">LOCAL PREVIEW</span>
          </div>

          {activeSection === "general" && (
            <>
              <div className="st-group">
                <div className="st-group-heading">
                  <h3>Organization Identity</h3>
                  <p>Basic information for your hospitality workspace.</p>
                </div>
                <SettingRow title="Organization name" description="Name displayed across the workspace.">
                  <input
                    className="st-input"
                    value={organization.name}
                    onChange={(e) => {
                      setOrganization({ ...organization, name: e.target.value });
                      setSaved(false);
                    }}
                  />
                </SettingRow>
                <SettingRow title="Contact email" description="Primary organization contact address.">
                  <input
                    className="st-input"
                    type="email"
                    placeholder="admin@yourorganization.com"
                    value={organization.email}
                    onChange={(e) => {
                      setOrganization({ ...organization, email: e.target.value });
                      setSaved(false);
                    }}
                  />
                </SettingRow>
                <SettingRow title="Organization website" description="Official website address.">
                  <input
                    className="st-input"
                    placeholder="https://example.com"
                    value={organization.website}
                    onChange={(e) => {
                      setOrganization({ ...organization, website: e.target.value });
                      setSaved(false);
                    }}
                  />
                </SettingRow>
              </div>
              <div className="st-group">
                <div className="st-group-heading">
                  <h3>Workspace Structure</h3>
                  <p>Configure how your organization is represented.</p>
                </div>
                <SettingRow title="Multi-property workspace" description="Enable support for multiple hotel properties.">
                  <Toggle checked={preferences.multiProperty} onChange={(v) => updatePreference("multiProperty", v)} />
                </SettingRow>
              </div>
            </>
          )}

          {activeSection === "property" && (
            <>
              <div className="st-group">
                <div className="st-group-heading">
                  <h3>Property Operations</h3>
                  <p>Default behavior for connected hospitality properties.</p>
                </div>
                <SettingRow title="Automatic task assignment" description="Allow configured workflows to assign operational tasks automatically.">
                  <Toggle checked={preferences.autoAssign} onChange={(v) => updatePreference("autoAssign", v)} />
                </SettingRow>
                <SettingRow title="Operational alerts" description="Display alerts for configured operational exceptions.">
                  <Toggle checked={preferences.operationalAlerts} onChange={(v) => updatePreference("operationalAlerts", v)} />
                </SettingRow>
              </div>
              <div className="st-info-card">
                <Hotel size={19} />
                <div>
                  <strong>Property connection required</strong>
                  <p>Property-specific values such as check-in time, check-out time, room types and service standards will be available after a property is connected.</p>
                </div>
              </div>
            </>
          )}

          {activeSection === "regional" && (
            <div className="st-group">
              <div className="st-group-heading">
                <h3>Localization</h3>
                <p>Set regional conventions for your workspace.</p>
              </div>
              <SettingRow title="Display language" description="Language used for the platform interface.">
                <select className="st-input" value={regional.language} onChange={(e) => { setRegional({ ...regional, language: e.target.value }); setSaved(false); }}>
                  <option>English</option>
                  <option>Bahasa Indonesia</option>
                  <option>Arabic</option>
                </select>
              </SettingRow>
              <SettingRow title="Timezone" description="Timezone used for operational timestamps.">
                <select className="st-input" value={regional.timezone} onChange={(e) => { setRegional({ ...regional, timezone: e.target.value }); setSaved(false); }}>
                  <option value="Asia/Jakarta">Asia/Jakarta (UTC+7)</option>
                  <option value="Asia/Singapore">Asia/Singapore (UTC+8)</option>
                  <option value="Asia/Riyadh">Asia/Riyadh (UTC+3)</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Australia/Sydney">Australia/Sydney</option>
                </select>
              </SettingRow>
              <SettingRow title="Currency" description="Default currency for financial displays.">
                <select className="st-input" value={regional.currency} onChange={(e) => { setRegional({ ...regional, currency: e.target.value }); setSaved(false); }}>
                  <option value="IDR">IDR — Indonesian Rupiah</option>
                  <option value="USD">USD — US Dollar</option>
                  <option value="SAR">SAR — Saudi Riyal</option>
                  <option value="SGD">SGD — Singapore Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                </select>
              </SettingRow>
              <SettingRow title="Date format" description="Preferred date representation.">
                <select className="st-input" value={regional.dateFormat} onChange={(e) => { setRegional({ ...regional, dateFormat: e.target.value }); setSaved(false); }}>
                  <option>DD MMM YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </SettingRow>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="st-group">
              <div className="st-group-heading">
                <h3>Notification Channels</h3>
                <p>Choose how workspace notifications should be presented.</p>
              </div>
              <SettingRow title="Email notifications" description="Receive configured platform notifications by email.">
                <Toggle checked={preferences.emailNotifications} onChange={(v) => updatePreference("emailNotifications", v)} />
              </SettingRow>
              <SettingRow title="Push notifications" description="Enable browser or device notification preferences.">
                <Toggle checked={preferences.pushNotifications} onChange={(v) => updatePreference("pushNotifications", v)} />
              </SettingRow>
              <SettingRow title="Weekly digest" description="Enable a weekly summary preference.">
                <Toggle checked={preferences.weeklyDigest} onChange={(v) => updatePreference("weeklyDigest", v)} />
              </SettingRow>
              <SettingRow title="Operational alerts" description="Show configured service and operational alerts.">
                <Toggle checked={preferences.operationalAlerts} onChange={(v) => updatePreference("operationalAlerts", v)} />
              </SettingRow>
              <div className="st-channel-list">
                <span><Mail size={16} /> Email channel</span>
                <span><Smartphone size={16} /> Push channel</span>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <>
              <div className="st-group">
                <div className="st-group-heading">
                  <h3>Security Preferences</h3>
                  <p>Workspace-level security and privacy preferences.</p>
                </div>
                <SettingRow title="Session security alerts" description="Show notifications for relevant session events.">
                  <Toggle checked={preferences.sessionAlerts} onChange={(v) => updatePreference("sessionAlerts", v)} />
                </SettingRow>
                <SettingRow title="Audit activity visibility" description="Show audit activity where the user has permission.">
                  <Toggle checked={preferences.auditVisibility} onChange={(v) => updatePreference("auditVisibility", v)} />
                </SettingRow>
              </div>
              <div className="st-info-card">
                <LockKeyhole size={19} />
                <div>
                  <strong>Security policies are administered separately</strong>
                  <p>Authentication, role permissions, password policies and access enforcement belong to Admin Control Center and backend identity services.</p>
                </div>
              </div>
            </>
          )}

          {activeSection === "ai" && (
            <>
              <div className="st-ai-intro">
                <div className="st-ai-symbol"><BrainCircuit size={24} /></div>
                <div>
                  <strong>Hospitality Intelligence Preferences</strong>
                  <p>Control preferred AI-assisted experiences. These switches do not activate AI inference or change backend services.</p>
                </div>
              </div>
              <div className="st-group">
                <div className="st-group-heading">
                  <h3>AI Experience</h3>
                  <p>Manage optional AI presentation preferences.</p>
                </div>
                <SettingRow title="AI recommendations" description="Show AI recommendation features when available.">
                  <Toggle checked={preferences.aiRecommendations} onChange={(v) => updatePreference("aiRecommendations", v)} />
                </SettingRow>
                <SettingRow title="AI-generated summaries" description="Show summaries when supported by connected AI services.">
                  <Toggle checked={preferences.aiSummaries} onChange={(v) => updatePreference("aiSummaries", v)} />
                </SettingRow>
                <SettingRow title="Predictive insights" description="Enable the preference for predictive insight experiences.">
                  <Toggle checked={preferences.predictiveInsights} onChange={(v) => updatePreference("predictiveInsights", v)} />
                </SettingRow>
              </div>
              <div className="st-info-card">
                <Sparkles size={19} />
                <div>
                  <strong>AI governance remains under Admin</strong>
                  <p>Model access, provider credentials, data governance, inference policies and AI audit controls are managed centrally.</p>
                </div>
              </div>
            </>
          )}

          {activeSection === "system" && (
            <>
              <div className="st-group">
                <div className="st-group-heading">
                  <h3>Interface Preferences</h3>
                  <p>Personalize the workspace presentation.</p>
                </div>
                <SettingRow title="Compact layout" description="Prefer a denser workspace presentation.">
                  <Toggle checked={preferences.compactMode} onChange={(v) => updatePreference("compactMode", v)} />
                </SettingRow>
                <SettingRow title="Interface animations" description="Allow interface transition effects.">
                  <Toggle checked={preferences.animations} onChange={(v) => updatePreference("animations", v)} />
                </SettingRow>
              </div>
              <div className="st-system-cards">
                <div><Monitor size={19} /><strong>Workspace UI</strong><small>Display preferences</small></div>
                <div><Database size={19} /><strong>Data services</strong><small>Backend configuration pending</small></div>
                <div><Eye size={19} /><strong>Accessibility</strong><small>Interface experience</small></div>
              </div>
            </>
          )}

          <div className="st-save-area">
            <div className="st-save-message">
              {saved ? (
                <><Check size={15} /> Local preview updated. Not persisted to server.</>
              ) : (
                <><Info size={15} /> Changes are local to this page session.</>
              )}
            </div>
            <div className="st-save-actions">
              <button type="button" className="st-reset-button" onClick={handleReset}>
                <RotateCcw size={14} /> Reset
              </button>
              <button type="button" className="st-save-button" onClick={handleSave}>
                <Save size={15} /> Apply Preview
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="st-bottom-note">
        <Clock3 size={14} />
        <span>ORCHESTRA Platform Settings · Development Preview · Backend persistence not yet connected</span>
      </div>
    </main>
  );
}
