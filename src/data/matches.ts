import { slugify } from '../lib/utils';

export interface Match {
  id: string;
  matchNumber: number;
  slug: string;
  team1: string;
  team2: string;
  date: string;
  timeET: string;
  isoDateTimeET: string;
  group: string;
  stadium: string;
  isLocalMatch: boolean;
}

interface RawMatch {
  n: number;
  group: string;
  team1: string;
  team2: string;
  localDate: string;
  localTime: string;
  stadium: string;
}

const STADIUM = {
  AZT: 'Estadio Azteca, Mexico City',
  AKR: 'Estadio Akron, Guadalajara',
  BMO: 'BMO Field, Toronto',
  SOFI: 'SoFi Stadium, Los Angeles',
  GIL: 'Gillette Stadium, Foxborough, MA',
  BC: 'BC Place, Vancouver',
  MET: 'MetLife Stadium, East Rutherford, NJ',
  LEVI: "Levi's Stadium, Santa Clara, CA",
  LINC: 'Lincoln Financial Field, Philadelphia',
  NRG: 'NRG Stadium, Houston',
  ATT: 'AT&T Stadium, Arlington, TX',
  BBVA: 'Estadio BBVA, Monterrey',
  HARD: 'Hard Rock Stadium, Miami',
  MERC: 'Mercedes-Benz Stadium, Atlanta',
  ARROW: 'Arrowhead Stadium, Kansas City',
  LUMEN: 'Lumen Field, Seattle',
} as const;

const LOCAL_TO_ET_HOURS: Record<string, number> = {
  [STADIUM.AZT]: 2,
  [STADIUM.AKR]: 2,
  [STADIUM.BBVA]: 2,
  [STADIUM.SOFI]: 3,
  [STADIUM.LEVI]: 3,
  [STADIUM.LUMEN]: 3,
  [STADIUM.BC]: 3,
  [STADIUM.NRG]: 1,
  [STADIUM.ATT]: 1,
  [STADIUM.ARROW]: 1,
};

const MONTH_SLUGS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

const raw = (
  n: number,
  group: string,
  team1: string,
  team2: string,
  localDate: string,
  localTime: string,
  stadium: string
): RawMatch => ({ n, group, team1, team2, localDate, localTime, stadium });

const RAW_MATCHES: RawMatch[] = [
  raw(1, 'Group A', 'Mexico', 'South Africa', '2026-06-11', '13:00', STADIUM.AZT),
  raw(2, 'Group A', 'South Korea', 'Czech Republic', '2026-06-11', '20:00', STADIUM.AKR),
  raw(3, 'Group B', 'Canada', 'Bosnia and Herzegovina', '2026-06-12', '15:00', STADIUM.BMO),
  raw(4, 'Group D', 'United States', 'Paraguay', '2026-06-12', '18:00', STADIUM.SOFI),
  raw(5, 'Group C', 'Haiti', 'Scotland', '2026-06-13', '21:00', STADIUM.GIL),
  raw(6, 'Group D', 'Australia', 'Turkey', '2026-06-13', '21:00', STADIUM.BC),
  raw(7, 'Group C', 'Brazil', 'Morocco', '2026-06-13', '18:00', STADIUM.MET),
  raw(8, 'Group B', 'Qatar', 'Switzerland', '2026-06-13', '12:00', STADIUM.LEVI),
  raw(9, 'Group E', 'Ivory Coast', 'Ecuador', '2026-06-14', '19:00', STADIUM.LINC),
  raw(10, 'Group E', 'Germany', 'Curacao', '2026-06-14', '12:00', STADIUM.NRG),
  raw(11, 'Group F', 'Netherlands', 'Japan', '2026-06-14', '15:00', STADIUM.ATT),
  raw(12, 'Group F', 'Sweden', 'Tunisia', '2026-06-14', '20:00', STADIUM.BBVA),
  raw(13, 'Group H', 'Saudi Arabia', 'Uruguay', '2026-06-15', '18:00', STADIUM.HARD),
  raw(14, 'Group H', 'Spain', 'Cape Verde', '2026-06-15', '12:00', STADIUM.MERC),
  raw(15, 'Group G', 'Iran', 'New Zealand', '2026-06-15', '18:00', STADIUM.SOFI),
  raw(16, 'Group G', 'Belgium', 'Egypt', '2026-06-15', '12:00', STADIUM.LUMEN),
  raw(17, 'Group I', 'France', 'Senegal', '2026-06-16', '15:00', STADIUM.MET),
  raw(18, 'Group I', 'Iraq', 'Norway', '2026-06-16', '18:00', STADIUM.GIL),
  raw(19, 'Group J', 'Argentina', 'Algeria', '2026-06-16', '20:00', STADIUM.ARROW),
  raw(20, 'Group J', 'Austria', 'Jordan', '2026-06-16', '21:00', STADIUM.LEVI),
  raw(21, 'Group L', 'Ghana', 'Panama', '2026-06-17', '19:00', STADIUM.BMO),
  raw(22, 'Group L', 'England', 'Croatia', '2026-06-17', '15:00', STADIUM.ATT),
  raw(23, 'Group K', 'Portugal', 'DR Congo', '2026-06-17', '12:00', STADIUM.NRG),
  raw(24, 'Group K', 'Uzbekistan', 'Colombia', '2026-06-17', '20:00', STADIUM.AZT),
  raw(25, 'Group A', 'Czech Republic', 'South Africa', '2026-06-18', '12:00', STADIUM.MERC),
  raw(26, 'Group B', 'Switzerland', 'Bosnia and Herzegovina', '2026-06-18', '12:00', STADIUM.SOFI),
  raw(27, 'Group B', 'Canada', 'Qatar', '2026-06-18', '15:00', STADIUM.BC),
  raw(28, 'Group A', 'Mexico', 'South Korea', '2026-06-18', '19:00', STADIUM.AKR),
  raw(29, 'Group C', 'Brazil', 'Haiti', '2026-06-19', '21:00', STADIUM.LINC),
  raw(30, 'Group C', 'Scotland', 'Morocco', '2026-06-19', '18:00', STADIUM.GIL),
  raw(31, 'Group D', 'Turkey', 'Paraguay', '2026-06-19', '20:00', STADIUM.LEVI),
  raw(32, 'Group D', 'United States', 'Australia', '2026-06-19', '12:00', STADIUM.LUMEN),
  raw(33, 'Group E', 'Germany', 'Ivory Coast', '2026-06-20', '16:00', STADIUM.BMO),
  raw(34, 'Group E', 'Ecuador', 'Curacao', '2026-06-20', '19:00', STADIUM.ARROW),
  raw(35, 'Group F', 'Netherlands', 'Sweden', '2026-06-20', '12:00', STADIUM.NRG),
  raw(36, 'Group F', 'Tunisia', 'Japan', '2026-06-20', '22:00', STADIUM.BBVA),
  raw(37, 'Group H', 'Uruguay', 'Cape Verde', '2026-06-21', '18:00', STADIUM.HARD),
  raw(38, 'Group H', 'Spain', 'Saudi Arabia', '2026-06-21', '12:00', STADIUM.MERC),
  raw(39, 'Group G', 'Belgium', 'Iran', '2026-06-21', '12:00', STADIUM.SOFI),
  raw(40, 'Group G', 'New Zealand', 'Egypt', '2026-06-21', '18:00', STADIUM.BC),
  raw(41, 'Group I', 'Norway', 'Senegal', '2026-06-22', '20:00', STADIUM.MET),
  raw(42, 'Group I', 'France', 'Iraq', '2026-06-22', '17:00', STADIUM.LINC),
  raw(43, 'Group J', 'Argentina', 'Austria', '2026-06-22', '12:00', STADIUM.ATT),
  raw(44, 'Group J', 'Jordan', 'Algeria', '2026-06-22', '20:00', STADIUM.LEVI),
  raw(45, 'Group L', 'England', 'Ghana', '2026-06-23', '16:00', STADIUM.GIL),
  raw(46, 'Group L', 'Panama', 'Croatia', '2026-06-23', '19:00', STADIUM.BMO),
  raw(47, 'Group K', 'Portugal', 'Uzbekistan', '2026-06-23', '12:00', STADIUM.NRG),
  raw(48, 'Group K', 'Colombia', 'DR Congo', '2026-06-23', '20:00', STADIUM.AKR),
  raw(49, 'Group C', 'Scotland', 'Brazil', '2026-06-24', '18:00', STADIUM.HARD),
  raw(50, 'Group C', 'Morocco', 'Haiti', '2026-06-24', '18:00', STADIUM.MERC),
  raw(51, 'Group B', 'Switzerland', 'Canada', '2026-06-24', '12:00', STADIUM.BC),
  raw(52, 'Group B', 'Bosnia and Herzegovina', 'Qatar', '2026-06-24', '12:00', STADIUM.LUMEN),
  raw(53, 'Group A', 'Czech Republic', 'Mexico', '2026-06-24', '19:00', STADIUM.AZT),
  raw(54, 'Group A', 'South Africa', 'South Korea', '2026-06-24', '19:00', STADIUM.BBVA),
  raw(55, 'Group E', 'Curacao', 'Ivory Coast', '2026-06-25', '16:00', STADIUM.LINC),
  raw(56, 'Group E', 'Ecuador', 'Germany', '2026-06-25', '16:00', STADIUM.MET),
  raw(57, 'Group F', 'Japan', 'Sweden', '2026-06-25', '18:00', STADIUM.ATT),
  raw(58, 'Group F', 'Tunisia', 'Netherlands', '2026-06-25', '18:00', STADIUM.ARROW),
  raw(59, 'Group D', 'Turkey', 'United States', '2026-06-25', '19:00', STADIUM.SOFI),
  raw(60, 'Group D', 'Paraguay', 'Australia', '2026-06-25', '19:00', STADIUM.LEVI),
  raw(61, 'Group I', 'Norway', 'France', '2026-06-26', '15:00', STADIUM.GIL),
  raw(62, 'Group I', 'Senegal', 'Iraq', '2026-06-26', '15:00', STADIUM.BMO),
  raw(63, 'Group G', 'Egypt', 'Iran', '2026-06-26', '20:00', STADIUM.LUMEN),
  raw(64, 'Group G', 'New Zealand', 'Belgium', '2026-06-26', '20:00', STADIUM.BC),
  raw(65, 'Group H', 'Cape Verde', 'Saudi Arabia', '2026-06-26', '19:00', STADIUM.NRG),
  raw(66, 'Group H', 'Uruguay', 'Spain', '2026-06-26', '18:00', STADIUM.AKR),
  raw(67, 'Group L', 'Panama', 'England', '2026-06-27', '17:00', STADIUM.MET),
  raw(68, 'Group L', 'Croatia', 'Ghana', '2026-06-27', '17:00', STADIUM.LINC),
  raw(69, 'Group J', 'Algeria', 'Austria', '2026-06-27', '21:00', STADIUM.ARROW),
  raw(70, 'Group J', 'Jordan', 'Argentina', '2026-06-27', '21:00', STADIUM.ATT),
  raw(71, 'Group K', 'Colombia', 'Portugal', '2026-06-27', '19:30', STADIUM.HARD),
  raw(72, 'Group K', 'DR Congo', 'Uzbekistan', '2026-06-27', '19:30', STADIUM.MERC),
  raw(73, 'Round of 32', 'Group A runners-up', 'Group B runners-up', '2026-06-28', '12:00', STADIUM.SOFI),
  raw(74, 'Round of 32', 'Group E winners', 'Group A/B/C/D/F third place', '2026-06-29', '16:30', STADIUM.GIL),
  raw(75, 'Round of 32', 'Group F winners', 'Group C runners-up', '2026-06-29', '19:00', STADIUM.BBVA),
  raw(76, 'Round of 32', 'Group C winners', 'Group F runners-up', '2026-06-29', '12:00', STADIUM.NRG),
  raw(77, 'Round of 32', 'Group I winners', 'Group C/D/F/G/H third place', '2026-06-30', '17:00', STADIUM.MET),
  raw(78, 'Round of 32', 'Group E runners-up', 'Group I runners-up', '2026-06-30', '12:00', STADIUM.ATT),
  raw(79, 'Round of 32', 'Group A winners', 'Group C/E/F/H/I third place', '2026-06-30', '19:00', STADIUM.AZT),
  raw(80, 'Round of 32', 'Group L winners', 'Group E/H/I/J/K third place', '2026-07-01', '12:00', STADIUM.MERC),
  raw(81, 'Round of 32', 'Group D winners', 'Group B/E/F/I/J third place', '2026-07-01', '17:00', STADIUM.LEVI),
  raw(82, 'Round of 32', 'Group G winners', 'Group A/E/H/I/J third place', '2026-07-01', '13:00', STADIUM.LUMEN),
  raw(83, 'Round of 32', 'Group K runners-up', 'Group L runners-up', '2026-07-02', '19:00', STADIUM.BMO),
  raw(84, 'Round of 32', 'Group H winners', 'Group J runners-up', '2026-07-02', '12:00', STADIUM.SOFI),
  raw(85, 'Round of 32', 'Group B winners', 'Group E/F/G/I/J third place', '2026-07-02', '20:00', STADIUM.BC),
  raw(86, 'Round of 32', 'Group J winners', 'Group H runners-up', '2026-07-03', '18:00', STADIUM.HARD),
  raw(87, 'Round of 32', 'Group K winners', 'Group D/E/I/J/L third place', '2026-07-03', '20:30', STADIUM.ARROW),
  raw(88, 'Round of 32', 'Group D runners-up', 'Group G runners-up', '2026-07-03', '13:00', STADIUM.ATT),
  raw(89, 'Round of 16', 'Winner Match 74', 'Winner Match 77', '2026-07-04', '17:00', STADIUM.LINC),
  raw(90, 'Round of 16', 'Winner Match 73', 'Winner Match 75', '2026-07-04', '12:00', STADIUM.NRG),
  raw(91, 'Round of 16', 'Winner Match 76', 'Winner Match 78', '2026-07-05', '16:00', STADIUM.MET),
  raw(92, 'Round of 16', 'Winner Match 79', 'Winner Match 80', '2026-07-05', '18:00', STADIUM.AZT),
  raw(93, 'Round of 16', 'Winner Match 83', 'Winner Match 84', '2026-07-06', '14:00', STADIUM.ATT),
  raw(94, 'Round of 16', 'Winner Match 81', 'Winner Match 82', '2026-07-06', '17:00', STADIUM.LUMEN),
  raw(95, 'Round of 16', 'Winner Match 86', 'Winner Match 88', '2026-07-07', '12:00', STADIUM.MERC),
  raw(96, 'Round of 16', 'Winner Match 85', 'Winner Match 87', '2026-07-07', '13:00', STADIUM.BC),
  raw(97, 'Quarterfinal', 'Winner Match 89', 'Winner Match 90', '2026-07-09', '16:00', STADIUM.GIL),
  raw(98, 'Quarterfinal', 'Winner Match 93', 'Winner Match 94', '2026-07-10', '12:00', STADIUM.SOFI),
  raw(99, 'Quarterfinal', 'Winner Match 91', 'Winner Match 92', '2026-07-11', '17:00', STADIUM.HARD),
  raw(100, 'Quarterfinal', 'Winner Match 95', 'Winner Match 96', '2026-07-11', '20:00', STADIUM.ARROW),
  raw(101, 'Semifinal', 'Winner Match 97', 'Winner Match 98', '2026-07-14', '14:00', STADIUM.ATT),
  raw(102, 'Semifinal', 'Winner Match 99', 'Winner Match 100', '2026-07-15', '15:00', STADIUM.MERC),
  raw(103, 'Third place', 'Loser Match 101', 'Loser Match 102', '2026-07-18', '17:00', STADIUM.HARD),
  raw(104, 'Final', 'Winner Match 101', 'Winner Match 102', '2026-07-19', '15:00', STADIUM.MET),
];

function easternDateTime(localDate: string, localTime: string, stadium: string) {
  const [year, month, day] = localDate.split('-').map(Number);
  const [hour, minute] = localTime.split(':').map(Number);
  const offset = LOCAL_TO_ET_HOURS[stadium] ?? 0;
  const dt = new Date(Date.UTC(year, month - 1, day, hour + offset, minute));

  const date = dt.toISOString().slice(0, 10);
  const hour24 = dt.getUTCHours();
  const displayHour = hour24 % 12 || 12;
  const displayMinute = String(dt.getUTCMinutes()).padStart(2, '0');
  const suffix = hour24 >= 12 ? 'PM' : 'AM';
  const isoHour = String(hour24).padStart(2, '0');
  const isoMinute = String(dt.getUTCMinutes()).padStart(2, '0');

  return {
    date,
    timeET: `${displayHour}:${displayMinute} ${suffix} ET`,
    isoDateTimeET: `${date}T${isoHour}:${isoMinute}:00-04:00`,
  };
}

function matchSlug(match: RawMatch, date: string): string {
  const [, month, day] = date.split('-').map(Number);
  return slugify(
    `${match.team1}-vs-${match.team2}-${MONTH_SLUGS[month - 1]}-${day}`
  );
}

const usedSlugs = new Set<string>();

export const MATCHES: Match[] = RAW_MATCHES.map((match) => {
  const time = easternDateTime(match.localDate, match.localTime, match.stadium);
  const baseSlug = matchSlug(match, time.date);
  const slug = usedSlugs.has(baseSlug) ? `${baseSlug}-match-${match.n}` : baseSlug;
  usedSlugs.add(slug);

  return {
    id: `match-${match.n}`,
    matchNumber: match.n,
    slug,
    team1: match.team1,
    team2: match.team2,
    date: time.date,
    timeET: time.timeET,
    isoDateTimeET: time.isoDateTimeET,
    group: match.group,
    stadium: match.stadium,
    isLocalMatch: match.stadium === STADIUM.MET,
  };
});

export function getMatchBySlug(slug: string): Match | undefined {
  return MATCHES.find((match) => match.slug === slug);
}

export function matchDisplayName(match: Match): string {
  return `${match.team1} vs ${match.team2}`;
}

export function formatMatchDate(match: Match): string {
  return new Date(`${match.date}T12:00:00-04:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
