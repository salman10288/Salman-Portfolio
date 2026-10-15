"use client";

import { FiBarChart2, FiCalendar, FiCompass, FiMapPin, FiSearch, FiShield, FiUsers } from "react-icons/fi";

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

function TamrVisual() {
  return (
    <div className="visual-stage visual-stage--travel">
      <div className="travel-topbar"><b>TAMR</b><span>THE FARM</span><span>HARVEST</span><i>PLAY NOW</i></div>
      <div className="travel-copy"><small>THE DATE FARM</small><strong>Grow your<br />own legacy.</strong><p>Plant, nurture and build a thriving date farm.</p></div>
      <div className="travel-orbit"><span /><span /><span /><b /></div>
      <div className="booking-panel">
        <div><FiMapPin aria-hidden="true" /><span><small>Farm</small>Oasis Valley</span></div>
        <div><FiCalendar aria-hidden="true" /><span><small>Season</small>Harvest time</span></div>
        <span className="booking-search"><FiSearch /></span>
      </div>
      <div className="travel-card travel-card--one"><span>GROVE</span><strong>12 Palms</strong><i /></div>
      <div className="travel-card travel-card--two"><span>HARVEST</span><strong>Ready</strong><i /></div>
    </div>
  );
}

function DabbVisual() {
  return (
    <div className="visual-stage visual-stage--dashboard">
      <aside className="dash-side"><b>DB</b>{Array.from({ length: 5 }, (_, index) => <span key={index} className={index === 1 ? "active" : ""} />)}</aside>
      <div className="dash-main">
        <div className="dash-head"><span><small>PRODUCT ENGINEERING</small><strong>Built to scale</strong></span><i>EST. 2021</i></div>
        <div className="dash-kpis">
          <div><FiUsers /><small>PRODUCTS</small><strong>5+</strong><em>LAUNCHED</em></div>
          <div><FiBarChart2 /><small>CLIENTS</small><strong>40+</strong><em>WORLDWIDE</em></div>
          <div><small>DISCIPLINES</small><strong>04</strong><em>ONE TEAM</em></div>
        </div>
        <div className="dash-chart"><span /><span /><span /><span /><span /><span /><i /></div>
        <div className="dash-bottom"><div /><div /></div>
      </div>
    </div>
  );
}

function KingdomLandVisual() {
  return (
    <div className="visual-stage visual-stage--enterprise">
      <aside className="enterprise-side"><FiCompass /><b>Kingdom</b>{["Realm", "Heroes", "Quests", "Rewards"].map((item, index) => <span key={item} className={index === 0 ? "active" : ""}>{item}</span>)}</aside>
      <div className="enterprise-main">
        <div className="enterprise-head"><span><small>ENTER THE REALM</small><strong>Kingdom Land</strong></span><i>KL</i></div>
        <div className="enterprise-cards"><div><small>REALMS</small><strong>04</strong></div><div><small>QUESTS</small><strong>24</strong></div><div><small>HEROES</small><strong>12</strong></div></div>
        <div className="enterprise-table">
          <div className="table-row table-row--head"><span>QUEST</span><span>REGION</span><span>STATUS</span></div>
          {["The First Crown", "Forest of Echoes", "Citadel Rising", "The Lost Relic"].map((item, index) => <div className="table-row" key={item}><span><i />{item}</span><span>Realm {index + 1}</span><span><b className={index === 2 ? "amber" : "green"}>{index === 2 ? "Locked" : "Open"}</b></span></div>)}
        </div>
      </div>
      <FiShield className="enterprise-orbit" aria-hidden="true" />
    </div>
  );
}

export function ProjectVisual({ project }: { project: ProjectItem }) {
  return (
    <div className={`project-visual ${accentClass[project.accent]}`} aria-hidden="true">
      <div className="project-visual__grid" />
      {project.slug === "dabb-tech" ? <DabbVisual /> : null}
      {project.slug === "kickarena" ? <KickArenaVisual /> : null}
      {project.slug === "tamr" ? <TamrVisual /> : null}
      {project.slug === "kingdom-land" ? <KingdomLandVisual /> : null}
      <div className="project-visual__shine" />
    </div>
  );
}
