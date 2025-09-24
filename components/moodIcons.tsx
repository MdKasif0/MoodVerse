import React from 'react';

// Fix: Add 'as const' to the iconProps object to infer literal types for SVG properties
// instead of generic strings. This resolves the type incompatibility with React's SVGProps.
const iconProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const GratefulIcon = () => <svg {...iconProps}><path d="M7 10h12"/><path d="M15.65 6.35A4 4 0 1 0 12 10h8"/><path d="M12 18a6 6 0 0 0 6-6h-6V6a6 6 0 1 0-6 6Z"/></svg>;
export const SadIcon = () => <svg {...iconProps}><circle cx="12" cy="12" r="10" /><path d="M8 15s1.5-2 4-2 4 2 4 2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /></svg>;
export const HopefulIcon = () => <svg {...iconProps}><path d="M12 2a10 10 0 0 0-10 10c0 4.4 3.2 8.1 7.3 9.4L12 22l2.7-1.6c4.1-1.3 7.3-5 7.3-9.4A10 10 0 0 0 12 2z"/><path d="m12 7 1.66 3.34L17 11l-2.5 2.5L15.34 17 12 15.33 8.66 17l.84-3.5L7 11l3.34-.66L12 7z"/></svg>;
export const StressIcon = () => <svg {...iconProps}><line x1="10" y1="8" x2="21" y2="8" /><line x1="21" y1="12" x2="10" y2="12" /><line x1="10" y1="16" x2="21" y2="16" /><path d="M3 8V7a4 4 0 1 1 5.3 3.3" /><path d="M7 16.7A4 4 0 1 1 5.3 13H3v1"/></svg>;
export const PatienceIcon = () => <svg {...iconProps}><path d="M12 12h.01" /><path d="M10 2h4" /><path d="M12 22a8.99 8.99 0 0 0 8.94-10h.06c0-1.29-.53-2.53-1.46-3.46S17.82 7 16.5 7h-.06A8.99 8.99 0 0 0 7 16.5v.06c1.29 0 2.53.53 3.46 1.46S11.23 20 12.5 20h.06A8.99 8.99 0 0 0 22 10v0" /></svg>;
export const CalmIcon = () => <svg {...iconProps}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" /></svg>;
export const ForgivenessIcon = () => <svg {...iconProps}><path d="M12 22a10 10 0 0 0 10-10h-2a8 8 0 0 1-8 8v2z" /><path d="M22 12a10 10 0 0 0-10-10v2a8 8 0 0 1 8 8h2z" /><path d="M12 2a10 10 0 0 0-10 10h2a8 8 0 0 1 8-8v-2z" /><path d="M2 12a10 10 0 0 0 10 10v-2a8 8 0 0 1-8-8H2z" /><path d="m15 12-3-3-3 3" /><path d="M12 15V9" /></svg>;
export const CourageIcon = () => <svg {...iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>;
export const DemotivatedIcon = () => <svg {...iconProps}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="15" x2="15" y2="9" /></svg>;

export const moodIcons: { [key: string]: React.ComponentType } = {
  grateful: GratefulIcon,
  sad: SadIcon,
  hopeful: HopefulIcon,
  stress: StressIcon,
  patience: PatienceIcon,
  calm: CalmIcon,
  forgiveness: ForgivenessIcon,
  courage: CourageIcon,
  demotivated: DemotivatedIcon,
};