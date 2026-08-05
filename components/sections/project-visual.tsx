"use client";

import { FiBarChart2, FiCalendar, FiMapPin, FiSearch, FiUsers } from "react-icons/fi";
import { SiAngular, SiNextdotjs } from "react-icons/si";

import type { ProjectItem } from "@/types";

const accentClass: Record<ProjectItem["accent"], string> = {
  cyan: "project-visual--cyan",
  green: "project-visual--green",
  orange: "project-visual--orange",
  violet: "project-visual--violet",
};

function KickArenaVisual() {
  return (
    <div className="visual-stage visual-stage--stadium">
      <div className="visual-nav"><b>KA</b><span>GAME</span><span>MODES</span><i>PLAY NOW</i></div>
      <div className="stadium-lights stadium-lights--left" />
      <div className="stadium-lights stadium-lights--right" />
      <div className="stadium-score"><small>LIVE MATCH</small><strong>02 <em>:</em> 01</strong><span>ARENA DIVISION</span></div>
      <div className="football"><span /><i /><b /></div>
      <div className="stadium-field"><span /><span /><span /></div>
      <div className="visual-caption"><span>IMMERSIVE FOOTBALL</span><strong>OWN THE PITCH.</strong></div>
    </div>
  );
}

function TravelVisual() {
  return (
    <div className="visual-stage visual-stage--travel">
      <div className="travel-topbar"><b>نور الحرمين</b><span>Packages</span><span>Visas</span><i>Book now</i></div>
      <div className="travel-copy"><small>SPIRITUAL JOURNEYS</small><strong>Travel with<br />confidence.</strong><p>Curated Umrah, Hajj and international packages.</p></div>
      <div className="travel-orbit"><span /><span /><span /><b /></div>
      <div className="booking-panel">
        <div><FiMapPin aria-hidden="true" /><span><small>Destination</small>Makkah & Madinah</span></div>
        <div><FiCalendar aria-hidden="true" /><span><small>Departure</small>Select a date</span></div>
        <span className="booking-search"><FiSearch /></span>
      </div>
      <div className="travel-card travel-card--one"><span>UMRAH</span><strong>14 Nights</strong><i /></div>
      <div className="travel-card travel-card--two"><span>VISA</span><strong>Managed</strong><i /></div>
    </div>
  );
}

function GamingDashboardVisual() {
  return (
    <div className="visual-stage visual-stage--dashboard">
      <aside className="dash-side"><b>KG</b>{Array.from({ length: 5 }, (_, index) => <span key={index} className={index === 1 ? "active" : ""} />)}</aside>
      <div className="dash-main">
        <div className="dash-head"><span><small>OVERVIEW</small><strong>Game performance</strong></span><i>LAST 30 DAYS</i></div>
        <div className="dash-kpis">
          <div><FiUsers /><small>ACTIVE PLAYERS</small><strong>24.8K</strong><em>+12.4%</em></div>
          <div><FiBarChart2 /><small>ENGAGEMENT</small><strong>78.2%</strong><em>+8.1%</em></div>
          <div><small>REVENUE</small><strong>$42.6K</strong><em>+18.7%</em></div>
        </div>
        <div className="dash-chart"><span /><span /><span /><span /><span /><span /><i /></div>
        <div className="dash-bottom"><div /><div /></div>
      </div>
    </div>
  );
}

function AngularVisual() {
  return (
    <div className="visual-stage visual-stage--enterprise">
      <aside className="enterprise-side"><SiAngular /><b>Enterprise</b>{["Overview", "Teams", "Reports", "Settings"].map((item, index) => <span key={item} className={index === 0 ? "active" : ""}>{item}</span>)}</aside>
      <div className="enterprise-main">
        <div className="enterprise-head"><span><small>WORKSPACE</small><strong>Operations overview</strong></span><i>SS</i></div>
        <div className="enterprise-cards"><div><small>OPEN TASKS</small><strong>128</strong></div><div><small>COMPLETED</small><strong>84%</strong></div><div><small>TEAMS</small><strong>12</strong></div></div>
        <div className="enterprise-table">
          <div className="table-row table-row--head"><span>PROJECT</span><span>OWNER</span><span>STATUS</span></div>
          {["Platform migration", "Design system", "API rollout", "Performance review"].map((item, index) => <div className="table-row" key={item}><span><i />{item}</span><span>Team {index + 1}</span><span><b className={index === 2 ? "amber" : "green"}>{index === 2 ? "Review" : "Active"}</b></span></div>)}
        </div>
      </div>
      <SiNextdotjs className="enterprise-orbit" aria-hidden="true" />
    </div>
  );
}

export function ProjectVisual({ project }: { project: ProjectItem }) {
  return (
    <div className={`project-visual ${accentClass[project.accent]}`} aria-hidden="true">
      <div className="project-visual__grid" />
      {project.slug === "kickarena" ? <KickArenaVisual /> : null}
      {project.slug === "noor-travel" ? <TravelVisual /> : null}
      {project.slug === "gaming-dashboard" ? <GamingDashboardVisual /> : null}
      {project.slug === "angular-enterprise" ? <AngularVisual /> : null}
      <div className="project-visual__shine" />
    </div>
  );
}
