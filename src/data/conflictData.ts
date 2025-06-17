import { ConflictZone, CaseStudy } from '@/types';

// Mock data for conflict zones
export const conflictZones: ConflictZone[] = [
  {
    id: 'ukraine-russia',
    name: 'Ukraine-Russia Conflict',
    coordinates: [49.8397, 24.0297],
    continent: 'Europe',
    conflictType: 'territorial',
    status: 'active-conflict',
    severity: 'critical',
    description: 'Ongoing territorial dispute and armed conflict between Ukraine and Russia.',
    background: 'The conflict began in 2014 with the annexation of Crimea and escalated into full-scale war in February 2022.',
    peaceEfforts: [
      {
        id: 'minsk-agreements',
        title: 'Minsk Agreements',
        description: 'Ceasefire agreements aimed at ending the conflict in eastern Ukraine.',
        type: 'negotiation',
        status: 'suspended',
        startDate: '2014-09-05',
        participants: ['Ukraine', 'Russia', 'OSCE', 'France', 'Germany'],
      },
    ],
    ngos: [
      {
        id: 'red-cross-ukraine',
        name: 'International Committee of the Red Cross',
        description: 'Providing humanitarian aid and protection to civilians.',
        focus: ['humanitarian aid', 'medical assistance', 'protection'],
        impact: 'Delivered aid to over 3 million people',
      },
    ],
    communityStories: [
      {
        id: 'kyiv-resilience',
        title: 'Community Resilience in Kyiv',
        author: 'Maria Petenko',
        date: '2024-01-15',
        content: 'Despite the ongoing conflict, communities in Kyiv have shown remarkable resilience...',
        category: 'hope',
      },
    ],
    statistics: {
      affectedPopulation: 44000000,
      displacement: 6500000,
      casualties: 500000,
      economicImpact: '$280 billion in damages',
      duration: '2+ years (current phase)',
    },
    lastUpdated: '2024-01-20',
  },
  {
    id: 'syria-civil-war',
    name: 'Syrian Civil War',
    coordinates: [34.8021, 38.9968],
    continent: 'Asia',
    conflictType: 'political',
    status: 'post-conflict',
    severity: 'high',
    description: 'Multi-sided civil war in Syria involving various domestic and international actors.',
    background: 'The conflict began in 2011 as part of the Arab Spring protests and evolved into a complex civil war.',
    peaceEfforts: [
      {
        id: 'geneva-peace-talks',
        title: 'Geneva Peace Talks',
        description: 'UN-mediated peace negotiations between Syrian government and opposition.',
        type: 'mediation',
        status: 'suspended',
        startDate: '2014-01-22',
        participants: ['Syrian Government', 'Opposition', 'UN', 'International Community'],
      },
    ],
    ngos: [
      {
        id: 'msf-syria',
        name: 'Médecins Sans Frontières',
        description: 'Medical humanitarian organization providing healthcare in Syria.',
        focus: ['medical care', 'emergency response', 'mental health'],
        impact: 'Treated over 200,000 patients annually',
      },
    ],
    communityStories: [
      {
        id: 'aleppo-reconstruction',
        title: 'Rebuilding Aleppo',
        author: 'Ahmad Hassan',
        date: '2023-11-10',
        content: 'The ancient city of Aleppo is slowly being rebuilt by its resilient residents...',
        category: 'success',
      },
    ],
    statistics: {
      affectedPopulation: 22000000,
      displacement: 13100000,
      casualties: 610000,
      economicImpact: '$530 billion in damages',
      duration: '13 years',
    },
    lastUpdated: '2024-01-18',
  },
  {
    id: 'south-sudan',
    name: 'South Sudan Crisis',
    coordinates: [6.8770, 31.3070],
    continent: 'Africa',
    conflictType: 'ethnic',
    status: 'ceasefire',
    severity: 'high',
    description: 'Ethnic and political conflict in the world\'s youngest nation.',
    background: 'Civil war erupted in 2013, two years after South Sudan gained independence.',
    peaceEfforts: [
      {
        id: 'revitalized-agreement',
        title: 'Revitalized Agreement on the Resolution of Conflict',
        description: 'Peace agreement signed in 2018 to end the civil war.',
        type: 'negotiation',
        status: 'active',
        startDate: '2018-09-12',
        participants: ['Government of South Sudan', 'Opposition Groups', 'IGAD', 'International Partners'],
        outcomes: ['Formation of unity government', 'Ceasefire implementation'],
      },
    ],
    ngos: [
      {
        id: 'world-vision-ss',
        name: 'World Vision South Sudan',
        description: 'Child-focused humanitarian organization.',
        focus: ['child protection', 'education', 'food security'],
        impact: 'Reached 1.2 million people with humanitarian assistance',
      },
    ],
    communityStories: [
      {
        id: 'unity-through-education',
        title: 'Unity Through Education',
        author: 'Grace Ajok',
        date: '2023-12-05',
        content: 'Schools are becoming places of reconciliation where children from different tribes learn together...',
        category: 'hope',
      },
    ],
    statistics: {
      affectedPopulation: 11000000,
      displacement: 4200000,
      casualties: 400000,
      economicImpact: 'GDP declined by 50%',
      duration: '11 years',
    },
    lastUpdated: '2024-01-15',
  },
  {
    id: 'israel-palestine',
    name: 'Israel-Palestine Conflict',
    coordinates: [31.7683, 35.2137],
    continent: 'Asia',
    conflictType: 'territorial',
    status: 'active-conflict',
    severity: 'critical',
    description: 'Long-standing territorial and political conflict in the Middle East.',
    background: 'Decades-long conflict over land, sovereignty, and recognition.',
    peaceEfforts: [
      {
        id: 'oslo-accords',
        title: 'Oslo Accords',
        description: 'Peace process between Israel and Palestine.',
        type: 'negotiation',
        status: 'suspended',
        startDate: '1993-09-13',
        participants: ['Israel', 'Palestine', 'Norway', 'United States'],
      },
    ],
    ngos: [
      {
        id: 'parents-circle',
        name: 'Parents Circle - Families Forum',
        description: 'Joint Israeli-Palestinian organization of bereaved families.',
        focus: ['reconciliation', 'dialogue', 'peace education'],
        impact: 'Engaged over 600 bereaved families in peace activities',
      },
    ],
    communityStories: [
      {
        id: 'shared-grief',
        title: 'Shared Grief, Shared Hope',
        author: 'Robi Damelin & Bassam Aramin',
        date: '2024-01-01',
        content: 'Two fathers, one Israeli and one Palestinian, who lost children to the conflict, now work together for peace...',
        category: 'testimony',
      },
    ],
    statistics: {
      affectedPopulation: 14000000,
      displacement: 750000,
      casualties: 25000,
      economicImpact: '$50 billion annually',
      duration: '75+ years',
    },
    lastUpdated: '2024-01-22',
  },
  {
    id: 'colombia-farc',
    name: 'Colombian Peace Process',
    coordinates: [4.5709, -74.2973],
    continent: 'South America',
    conflictType: 'political',
    status: 'stable-peace',
    severity: 'medium',
    description: 'Successful peace process ending decades of armed conflict.',
    background: 'FARC guerrilla conflict lasted over 50 years until peace agreement in 2016.',
    peaceEfforts: [
      {
        id: 'havana-peace-talks',
        title: 'Havana Peace Talks',
        description: 'Peace negotiations between Colombian government and FARC.',
        type: 'negotiation',
        status: 'completed',
        startDate: '2010-08-28',
        participants: ['Colombian Government', 'FARC', 'Cuba', 'Norway'],
        outcomes: ['Peace Agreement signed', 'FARC disarmament', 'Political participation'],
      },
    ],
    ngos: [
      {
        id: 'fundacion-paz',
        name: 'Fundación para la Paz y la Reconciliación',
        description: 'Colombian foundation promoting peace and reconciliation.',
        focus: ['reconciliation', 'victim support', 'conflict transformation'],
        impact: 'Supported 15,000 conflict victims in reintegration',
      },
    ],
    communityStories: [
      {
        id: 'former-enemies-friends',
        title: 'From Enemies to Friends',
        author: 'Carlos Medina',
        date: '2023-10-20',
        content: 'Former FARC combatants and military personnel now work together in rural development projects...',
        category: 'success',
      },
    ],
    statistics: {
      affectedPopulation: 50000000,
      displacement: 8000000,
      casualties: 260000,
      economicImpact: '$150 billion over 50 years',
      duration: 'Resolved (monitoring phase)',
    },
    lastUpdated: '2024-01-12',
  },
];

// Mock data for case studies
export const caseStudies: CaseStudy[] = [
  {
    id: 'colombia-peace-model',
    title: 'Colombia\'s Peace Agreement',
    subtitle: 'A Model for Negotiated Settlement',
    region: 'South America',
    conflictZoneId: 'colombia-farc',
    summary: 'Colombia\'s successful peace process with FARC demonstrates how decades-long conflicts can be resolved through patient negotiation, comprehensive agreements, and sustained commitment to implementation.',
    fullStory: 'After more than 50 years of armed conflict between the Colombian government and the Revolutionary Armed Forces of Colombia (FARC), a comprehensive peace agreement was signed in 2016. The process, which took four years of negotiations in Havana, Cuba, addressed the root causes of conflict including land reform, political participation, drug trafficking, and victims\' rights. The agreement has largely held, with FARC transforming into a political party and thousands of combatants successfully reintegrating into civilian life.',
    timeline: [
      {
        date: '2010-08-28',
        event: 'Secret talks begin',
        type: 'intervention',
        description: 'Colombian government and FARC begin preliminary discussions in Cuba.',
      },
      {
        date: '2012-10-18',
        event: 'Formal negotiations start',
        type: 'intervention',
        description: 'Official peace talks begin in Havana with international facilitation.',
      },
      {
        date: '2016-11-24',
        event: 'Peace Agreement signed',
        type: 'breakthrough',
        description: 'Final peace agreement signed after referendum and revisions.',
      },
      {
        date: '2017-08-15',
        event: 'FARC disarmament complete',
        type: 'breakthrough',
        description: 'All FARC weapons handed over to UN verification mission.',
      },
    ],
    keyPlayers: [
      {
        name: 'Juan Manuel Santos',
        role: 'President of Colombia',
        contribution: 'Led the peace process and received Nobel Peace Prize for efforts.',
      },
      {
        name: 'Timoleón Jiménez',
        role: 'FARC Commander',
        contribution: 'Led FARC delegation and transformation to political movement.',
      },
      {
        name: 'Humberto de la Calle',
        role: 'Chief Government Negotiator',
        contribution: 'Headed government delegation throughout negotiations.',
      },
    ],
    outcomes: [
      {
        category: 'Security',
        description: 'Significant reduction in violence and casualties',
        impact: 'positive',
        metrics: '80% reduction in conflict-related deaths',
      },
      {
        category: 'Political Participation',
        description: 'FARC transformation into legitimate political party',
        impact: 'positive',
        metrics: 'FARC received guaranteed congressional seats',
      },
      {
        category: 'Rural Development',
        description: 'Comprehensive rural reform program launched',
        impact: 'mixed',
        metrics: 'Implementation slower than expected',
      },
    ],
    lessons: [
      'Inclusive dialogue involving all stakeholders is essential',
      'Addressing root causes, not just symptoms, is crucial',
      'International support and verification builds confidence',
      'Flexibility and adaptation during implementation is necessary',
      'Victim participation enhances legitimacy and sustainability',
    ],
    images: [
      'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg',
      'https://images.pexels.com/photos/8828409/pexels-photo-8828409.jpeg',
    ],
    status: 'resolved',
    lastUpdated: '2024-01-15',
  },
  {
    id: 'northern-ireland-good-friday',
    title: 'Northern Ireland Peace Process',
    subtitle: 'The Good Friday Agreement Success',
    region: 'Europe',
    conflictZoneId: 'northern-ireland',
    summary: 'The Good Friday Agreement of 1998 ended decades of sectarian conflict in Northern Ireland through a carefully crafted power-sharing arrangement that balanced competing national aspirations.',
    fullStory: 'The Northern Ireland conflict, known as "The Troubles," lasted for approximately 30 years, from the late 1960s until the Good Friday Agreement in 1998. The conflict was primarily between unionists/loyalists who wanted Northern Ireland to remain part of the United Kingdom, and nationalists/republicans who wanted it to become part of Ireland. The peace process involved multiple parties, international mediation, and a carefully structured agreement that established power-sharing institutions.',
    timeline: [
      {
        date: '1994-08-31',
        event: 'IRA Ceasefire',
        type: 'breakthrough',
        description: 'Provisional IRA announces complete cessation of military operations.',
      },
      {
        date: '1996-06-10',
        event: 'Multi-party talks begin',
        type: 'intervention',
        description: 'All-party negotiations begin under international chairmanship.',
      },
      {
        date: '1998-04-10',
        event: 'Good Friday Agreement signed',
        type: 'breakthrough',
        description: 'Historic peace agreement signed by all parties.',
      },
      {
        date: '1998-05-22',
        event: 'Referendums approve agreement',
        type: 'breakthrough',
        description: '71% in Northern Ireland and 94% in Ireland vote yes.',
      },
    ],
    keyPlayers: [
      {
        name: 'George Mitchell',
        role: 'International Chair',
        contribution: 'Led multi-party negotiations as independent mediator.',
      },
      {
        name: 'Tony Blair',
        role: 'UK Prime Minister',
        contribution: 'Provided crucial political leadership and support.',
      },
      {
        name: 'Bertie Ahern',
        role: 'Irish Taoiseach',
        contribution: 'Represented Irish government interests in negotiations.',
      },
    ],
    outcomes: [
      {
        category: 'Violence Reduction',
        description: 'Dramatic decrease in conflict-related deaths',
        impact: 'positive',
        metrics: '95% reduction in casualties',
      },
      {
        category: 'Political Accommodation',
        description: 'Power-sharing government established',
        impact: 'positive',
        metrics: 'Functioning devolved institutions',
      },
      {
        category: 'Economic Development',
        description: 'Peace dividend through increased investment',
        impact: 'positive',
        metrics: 'GDP growth above UK average',
      },
    ],
    lessons: [
      'Creative constitutional arrangements can accommodate competing aspirations',
      'International mediation can provide crucial neutral space',
      'Referendum approval enhances democratic legitimacy',
      'Prisoner releases, though controversial, can be necessary for peace',
      'Economic incentives support peace consolidation',
    ],
    images: [
      'https://images.pexels.com/photos/9816024/pexels-photo-9816024.jpeg',
      'https://images.pexels.com/photos/6077320/pexels-photo-6077320.jpeg',
    ],
    status: 'resolved',
    lastUpdated: '2024-01-10',
  },
];

export const continents = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
];

export const conflictTypes = [
  'ethnic',
  'religious',
  'territorial',
  'resource',
  'political',
  'separatist',
  'international',
];

export const peacebuildingStatuses = [
  'active-conflict',
  'ceasefire',
  'negotiation',
  'post-conflict',
  'stable-peace',
  'at-risk',
];