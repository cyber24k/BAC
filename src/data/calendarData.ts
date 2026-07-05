// BAC Church Calendar 2026 – Annual Events
// Source: Official BAC Church Calendar 2026
// Color key from calendar:
//   National Program (all wings) → category: 'National'
//   Ruwadzano Event              → category: 'Ruwadzano'
//   BMCU & Ruwadzano Event       → category: 'BMCU & Ruwadzano'
//   BMCU Event                   → category: 'BMCU'
//   Sunday School Event          → category: 'Sunday School'
//   General / Unmarked           → category: 'General'

export type EventCategory =
  | 'National'
  | 'Ruwadzano'
  | 'BMCU & Ruwadzano'
  | 'BMCU'
  | 'Sunday School'
  | 'General';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: EventCategory;
  description?: string;
  multiDay?: boolean;   // true when the event spans multiple days
  endDate?: string;     // YYYY-MM-DD for multi-day events
}

export const annualEvents: CalendarEvent[] = [
  // ── JANUARY ──────────────────────────────────────────────────────────────
  { id: 'jan-01', title: "New Year's Day", date: '2026-01-01', category: 'General' },
  { id: 'jan-04', title: 'Start of 21 Days of Prayer', date: '2026-01-04', category: 'National', description: 'Beginning of the 21 Days of Prayer and Fasting for the whole church.' },
  { id: 'jan-24', title: 'End of 21 Days of Prayer', date: '2026-01-24', category: 'National', description: 'Conclusion of the 21 Days of Prayer and Fasting.' },
  { id: 'jan-30', title: 'GCU Masowe / Pungwe', date: '2026-01-30', category: 'General' },

  // ── FEBRUARY ─────────────────────────────────────────────────────────────
  { id: 'feb-14', title: 'Fellowship Day 1', date: '2026-02-14', category: 'General' },
  { id: 'feb-21', title: 'Masowe kwaMudzeze', date: '2026-02-21', category: 'General' },
  { id: 'feb-22', title: 'Neniwo Youth Day 1', date: '2026-02-22', category: 'National', description: 'First Neniwo Youth Day gathering.' },
  { id: 'feb-28', title: 'Arst & Jnrs Workshop', date: '2026-02-28', category: 'Sunday School' },

  // ── MARCH ────────────────────────────────────────────────────────────────
  { id: 'mar-07', title: 'TRS Workshop', date: '2026-03-07', category: 'General' },
  { id: 'mar-28', title: 'Music Workshop', date: '2026-03-28', category: 'General' },

  // ── APRIL ────────────────────────────────────────────────────────────────
  { id: 'apr-03', title: 'Start of BCU Week', date: '2026-04-03', category: 'BMCU', description: 'Beginning of the BCU (Brethren Christian Union) Week.' },
  { id: 'apr-09', title: 'End of BCU Week', date: '2026-04-09', category: 'BMCU', description: 'Conclusion of BCU Week.' },
  { id: 'apr-14', title: 'Paseka Yevakasara', date: '2026-04-14', category: 'National', description: 'Passover celebration service for the whole church.' },
  { id: 'apr-16', title: 'ADIDI', date: '2026-04-16', category: 'National', multiDay: true, endDate: '2026-04-18', description: 'Multi-day ADIDI national program.' },
  { id: 'apr-17', title: 'ADIDI', date: '2026-04-17', category: 'National' },
  { id: 'apr-18', title: 'ADIDI', date: '2026-04-18', category: 'National' },
  { id: 'apr-21', title: "Jnrs Arts Festival", date: '2026-04-21', category: 'Sunday School' },
  { id: 'apr-24', title: 'Neniwo Youth Day 2', date: '2026-04-24', category: 'National', description: 'Second Neniwo Youth Day.' },
  { id: 'apr-25', title: 'BCU Sports Tournament', date: '2026-04-25', category: 'BMCU' },

  // ── MAY ──────────────────────────────────────────────────────────────────
  { id: 'may-03', title: 'Start of BCU Week', date: '2026-05-03', category: 'BMCU' },
  { id: 'may-16', title: 'MAVHIKI', date: '2026-05-16', category: 'Ruwadzano', description: 'Ruwadzano Mavhiki weekly gathering.' },
  { id: 'may-17', title: 'MAVHIKI', date: '2026-05-17', category: 'Ruwadzano' },
  { id: 'may-18', title: 'MAVHIKI', date: '2026-05-18', category: 'Ruwadzano' },

  // ── JUNE ─────────────────────────────────────────────────────────────────
  { id: 'jun-02', title: 'GCU MUB 2', date: '2026-06-02', category: 'General' },
  { id: 'jun-05', title: 'MAVHIKI', date: '2026-06-05', category: 'Ruwadzano' },
  { id: 'jun-06', title: 'MAVHIKI', date: '2026-06-06', category: 'Ruwadzano' },
  { id: 'jun-07', title: 'MAVHIKI', date: '2026-06-07', category: 'Ruwadzano' },
  { id: 'jun-19', title: 'Fellowship Day 2', date: '2026-06-19', category: 'General' },
  { id: 'jun-24', title: 'Neniwo Youth Day 2', date: '2026-06-24', category: 'National' },
  { id: 'jun-27', title: 'RWD Big Day 2 / Youth Musical Festival', date: '2026-06-27', category: 'Ruwadzano', description: 'Ruwadzano Big Day 2 combined with Youth Musical Festival.' },

  // ── JULY ─────────────────────────────────────────────────────────────────
  { id: 'jul-05', title: 'Youth Conf', date: '2026-07-05', category: 'National', description: 'Youth Conference begins.' },
  { id: 'jul-06', title: 'Youth Conf', date: '2026-07-06', category: 'National' },
  { id: 'jul-07', title: 'Youth Conf', date: '2026-07-07', category: 'National' },
  { id: 'jul-08', title: 'Youth Conf / Neniwo Youth Day 3', date: '2026-07-08', category: 'National', description: 'Youth Conference closing / Third Neniwo Youth Day.' },
  { id: 'jul-09', title: 'Youth Conf', date: '2026-07-09', category: 'National' },

  // ── AUGUST ───────────────────────────────────────────────────────────────
  { id: 'aug-01', title: 'RWD Big Day 1', date: '2026-08-01', category: 'Ruwadzano', description: 'Ruwadzano Big Day 1.' },
  { id: 'aug-05', title: 'Exam Prayer Day', date: '2026-08-05', category: 'National', description: 'National Exam Prayer Day for students.' },
  { id: 'aug-20', title: 'BAC Day', date: '2026-08-20', category: 'National', description: 'BAC (Bethesda Apostolic Church) Day – major national celebration.' },
  { id: 'aug-26', title: 'RSA', date: '2026-08-26', category: 'General' },
  { id: 'aug-27', title: 'RSA', date: '2026-08-27', category: 'General' },
  { id: 'aug-27b', title: 'DMCU RWD CONF', date: '2026-08-27', category: 'BMCU & Ruwadzano', description: 'DMCU Ruwadzano Conference Day 1.' },
  { id: 'aug-28', title: 'DMCU RWD CONF', date: '2026-08-28', category: 'BMCU & Ruwadzano', description: 'DMCU Ruwadzano Conference Day 2.' },
  { id: 'aug-29', title: 'DMCU RWD CONF', date: '2026-08-29', category: 'BMCU & Ruwadzano', description: 'DMCU Ruwadzano Conference Day 3.' },
  { id: 'aug-30', title: 'DMCU RWD CONF', date: '2026-08-30', category: 'BMCU & Ruwadzano', description: 'DMCU Ruwadzano Conference Day 4.' },

  // ── SEPTEMBER ────────────────────────────────────────────────────────────
  { id: 'sep-25', title: 'RSA', date: '2026-09-25', category: 'General' },
  { id: 'sep-26', title: 'RSA', date: '2026-09-26', category: 'General' },
  { id: 'sep-27', title: 'RSA', date: '2026-09-27', category: 'General' },
  { id: 'sep-24', title: 'Start of BACOC Exchange', date: '2026-09-24', category: 'National', description: 'Beginning of the BACOC Exchange program.' },

  // ── OCTOBER ──────────────────────────────────────────────────────────────
  { id: 'oct-10', title: 'Back to School', date: '2026-10-10', category: 'General' },
  { id: 'oct-15', title: 'MATUMBA', date: '2026-10-15', category: 'National', description: 'Matumba national program Day 1.' },
  { id: 'oct-16', title: 'MATUMBA', date: '2026-10-16', category: 'National', description: 'Matumba Day 2.' },
  { id: 'oct-17', title: 'MATUMBA', date: '2026-10-17', category: 'National', description: 'Matumba Day 3.' },
  { id: 'oct-18', title: 'MATUMBA', date: '2026-10-18', category: 'National', description: 'Matumba Day 4.' },
  { id: 'oct-31', title: 'FIN Year End Fellowship Day 1', date: '2026-10-31', category: 'General', description: 'First day of the year-end Finance department fellowship.' },

  // ── NOVEMBER ─────────────────────────────────────────────────────────────
  { id: 'nov-01', title: 'End of BACOC Exchange', date: '2026-11-01', category: 'National', description: 'Conclusion of the BACOC Exchange program.' },
  { id: 'nov-07', title: 'BLESSING DAY', date: '2026-11-07', category: 'National', description: 'Annual Blessing Day for the whole church.' },
  { id: 'nov-27', title: 'SYNOD', date: '2026-11-27', category: 'National', description: 'Annual Synod Day 1.' },
  { id: 'nov-28', title: 'SYNOD', date: '2026-11-28', category: 'National', description: 'Annual Synod Day 2.' },
  { id: 'nov-29', title: 'SYNOD', date: '2026-11-29', category: 'National', description: 'Annual Synod Day 3.' },
  { id: 'nov-05', title: 'Youth International Day', date: '2026-11-05', category: 'National', description: 'Youth International Day celebration.' },
  { id: 'nov-13', title: 'GCU Mub 4', date: '2026-11-13', category: 'General' },

  // ── DECEMBER ─────────────────────────────────────────────────────────────
  { id: 'dec-05', title: 'RWD Big Day 4 / Youth Year End', date: '2026-12-05', category: 'Ruwadzano', description: 'Ruwadzano Big Day 4 combined with the Youth Year-End celebration.' },
];

// Category metadata for display
export const categoryMeta: Record<EventCategory, { label: string; color: string; bg: string; border: string; dot: string }> = {
  National: {
    label: 'National Program',
    color: 'text-red-800',
    bg: 'bg-red-100',
    border: 'border-red-300',
    dot: 'bg-red-500',
  },
  Ruwadzano: {
    label: 'Ruwadzano',
    color: 'text-blue-800',
    bg: 'bg-blue-100',
    border: 'border-blue-300',
    dot: 'bg-blue-500',
  },
  'BMCU & Ruwadzano': {
    label: 'BMCU & Ruwadzano',
    color: 'text-purple-800',
    bg: 'bg-purple-100',
    border: 'border-purple-300',
    dot: 'bg-purple-500',
  },
  BMCU: {
    label: 'BMCU',
    color: 'text-orange-800',
    bg: 'bg-orange-100',
    border: 'border-orange-300',
    dot: 'bg-orange-500',
  },
  'Sunday School': {
    label: 'Sunday School',
    color: 'text-yellow-800',
    bg: 'bg-yellow-100',
    border: 'border-yellow-400',
    dot: 'bg-yellow-500',
  },
  General: {
    label: 'General',
    color: 'text-stone-700',
    bg: 'bg-stone-100',
    border: 'border-stone-300',
    dot: 'bg-stone-400',
  },
};
