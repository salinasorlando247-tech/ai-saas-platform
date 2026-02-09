import React from 'react';
import './CompetitorComparison.css';

const competitors = [
  { name: 'ForgeAI', aiEditing: true, proEditing: true, faceless: true, multiPlatform: true, bulk: true, analytics: true, marketplace: true, dashboard3D: true, userPrefs: true },
  { name: 'Pictory', aiEditing: false, proEditing: false, faceless: false, multiPlatform: false, bulk: false, analytics: false, marketplace: false, dashboard3D: false, userPrefs: false },
  { name: 'Synthesia', aiEditing: true, proEditing: false, faceless: true, multiPlatform: false, bulk: false, analytics: false, marketplace: false, dashboard3D: false, userPrefs: false },
  { name: 'Descript', aiEditing: true, proEditing: false, faceless: false, multiPlatform: false, bulk: false, analytics: false, marketplace: false, dashboard3D: false, userPrefs: false },
  { name: 'Canva/CapCut', aiEditing: false, proEditing: false, faceless: false, multiPlatform: false, bulk: false, analytics: false, marketplace: false, dashboard3D: false, userPrefs: false },
];

const features = [
  { key: 'aiEditing', label: 'Full AI Video Editing', tooltip: 'Automatically edits video clips including scene detection, object tracking, and facial recognition.' },
  { key: 'proEditing', label: 'Pro-Level Editing (Adobe-like)', tooltip: 'Includes transitions, color correction, speed ramp, and other advanced editing tools.' },
  { key: 'faceless', label: 'Faceless Avatars / AI Avatars', tooltip: 'Generate fully AI avatars or faceless videos with customizable style libraries.' },
  { key: 'multiPlatform', label: 'Multi-Platform Posting (20+)', tooltip: 'Automatically post videos to over 20 social media platforms at once with platform-specific settings.' },
  { key: 'bulk', label: 'Bulk Scheduling / Retry Logic', tooltip: 'Schedule hundreds or thousands of posts at once with automatic retry for failed uploads.' },
  { key: 'analytics', label: '150+ Analytics Metrics', tooltip: 'Track engagement, virality, demographic predictions, and AI content performance across platforms.' },
  { key: 'marketplace', label: 'Marketplace / Data Monetization', tooltip: 'Aggregate analytics into reports for businesses, ready for monetization.' },
  { key: 'dashboard3D', label: '3D / VR Analytics Dashboard', tooltip: 'Visualize performance metrics in interactive 3D dashboards using React Three Fiber.' },
  { key: 'userPrefs', label: 'User Preference Overrides', tooltip: 'Allow users to customize auto-posting, platform preferences, and scheduling options.' },
];

const CompetitorComparison = () => {
  return (
    <div className="comparison-page">
      <h1>ForgeAI vs Competitors</h1>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            {competitors.map(c => <th key={c.name}>{c.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {features.map(f => (
            <tr key={f.key}>
              <td className="feature-cell" title={f.tooltip}>{f.label}</td>
              {competitors.map(c => (
                <td key={c.name} className={c[f.key] ? 'yes' : 'no'}>
                  {c[f.key] ? '✅' : '❌'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitorComparison;
