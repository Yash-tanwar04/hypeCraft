import { Project, Insight, TeamMember, ServiceDetail } from '../types';

export const INITIAL_SERVICES: ServiceDetail[] = [
  {
    slug: 'political-pr',
    number: '01',
    title: 'Political PR',
    subtitle: 'Political communication built around strategy.',
    description: 'Political communication requires more than visibility. It requires clarity, positioning, narrative discipline and an understanding of how people receive information.',
    capabilities: [
      'Public positioning',
      'Reputation management',
      'Political communication strategy',
      'Campaign messaging',
      'Narrative development',
      'Media relations',
      'Public perception strategy',
      'Digital political communication',
      'Crisis communication',
      'Stakeholder communication'
    ],
    heroImage: '/images/political_pr_hero_1786300910145.jpg',
    ecosystem: [
      { step: 'Research', label: '01', desc: 'Analyzing public sentiment, political environment, and key stakeholders.' },
      { step: 'Position', label: '02', desc: 'Defining clear narrative stance and core policy communication goals.' },
      { step: 'Narrative', label: '03', desc: 'Crafting compelling, ethical campaign messaging and media briefs.' },
      { step: 'Communication', label: '04', desc: 'Multi-channel deployment across print, broadcast, and digital platforms.' },
      { step: 'Response', label: '05', desc: 'Monitoring feedback and adapting messaging to real-time events.' }
    ],
    principles: [
      'Strict commitment to truth and message accuracy',
      'Respect for audience intelligence and democratic discourse',
      'Clear separation between strategy and opportunistic noise',
      'Proactive reputation stewardship over reactive crisis management'
    ]
  },
  {
    slug: 'digital-marketing',
    number: '02',
    title: 'Digital Marketing',
    subtitle: 'Digital presence with a purpose.',
    description: 'Digital marketing is most effective when content, strategy and audience understanding work together.',
    capabilities: [
      'Digital strategy',
      'Social media strategy',
      'Content planning',
      'Campaign development',
      'Audience engagement',
      'Paid campaign strategy',
      'Content calendars',
      'Performance analysis',
      'Digital brand positioning'
    ],
    heroImage: '/images/digital_marketing_hero_1786300927065.jpg',
    ecosystem: [
      { step: 'Strategy', label: '01', desc: 'Audience persona mapping and platform objective definition.' },
      { step: 'Content', label: '02', desc: 'Creating high-production short and long-form digital assets.' },
      { step: 'Distribution', label: '03', desc: 'Synchronized organic and performance media scheduling.' },
      { step: 'Engagement', label: '04', desc: 'Fostering active community interactions and conversion paths.' },
      { step: 'Optimization', label: '05', desc: 'Refining content based on interaction metrics and retention data.' }
    ]
  },
  {
    slug: 'branding',
    number: '03',
    title: 'Branding',
    subtitle: 'Brands people recognize. Identities people remember.',
    description: 'We construct timeless visual identity systems, bespoke typography, and positioning frameworks that command market authority.',
    capabilities: [
      'Brand strategy',
      'Brand positioning',
      'Naming',
      'Visual identity',
      'Logo systems',
      'Typography',
      'Color systems',
      'Brand guidelines',
      'Brand communication'
    ],
    heroImage: '/images/hypecraft_brand_showcase_1786274760877.jpg',
    ecosystem: [
      { step: 'Audit', label: '01', desc: 'Analyzing competitive landscape and internal core values.' },
      { step: 'Positioning', label: '02', desc: 'Articulating unique value proposition and brand voice.' },
      { step: 'Visual System', label: '03', desc: 'Designing logos, typography, color palettes, and grid layouts.' },
      { step: 'Guidelines', label: '04', desc: 'Codifying rules into comprehensive brand design bibles.' },
      { step: 'Rollout', label: '05', desc: 'Overseeing physical and digital brand application across touchpoints.' }
    ]
  },
  {
    slug: 'video-content',
    number: '04',
    title: 'Video Content',
    subtitle: 'Stories deserve to be seen.',
    description: 'From campaign films to short-form social content, we use moving images to turn ideas into experiences.',
    capabilities: [
      'Brand films',
      'Campaign videos',
      'Interviews',
      'Social media videos',
      'Reels',
      'Event films',
      'Documentary-style content',
      'Motion graphics',
      'Video strategy'
    ],
    heroImage: '/images/video_production_hero_1786300944412.jpg',
    ecosystem: [
      { step: 'Concept', label: '01', desc: 'Scriptwriting, storyboarding, and aesthetic direction.' },
      { step: 'Production', label: '02', desc: 'Cinematic filming with high-end camera packages and lighting.' },
      { step: 'Post', label: '03', desc: 'Precision editing, color grading, and sound architecture.' },
      { step: 'Motion', label: '04', desc: 'Integrated typography and editorial motion design.' },
      { step: 'Export', label: '05', desc: 'Optimizing formats for theatrical, web, and mobile viewing.' }
    ]
  },
  {
    slug: 'graphic-design',
    number: '05',
    title: 'Graphic Design',
    subtitle: 'Design that communicates before words do.',
    description: 'Clean, powerful communication collateral designed to cut through visual noise.',
    capabilities: [
      'Campaign creatives',
      'Social media design',
      'Presentation design',
      'Editorial design',
      'Reports',
      'Infographics',
      'Posters',
      'Digital advertisements',
      'Communication collateral'
    ],
    heroImage: '/images/graphic_design_hero_1786300960111.jpg',
    ecosystem: [
      { step: 'Brief', label: '01', desc: 'Deconstructing message goals and key visual priorities.' },
      { step: 'Grid & Type', label: '02', desc: 'Setting up mathematical editorial grid and font hierarchy.' },
      { step: 'Layout', label: '03', desc: 'Synthesizing visual assets, iconography, and text.' },
      { step: 'Refinement', label: '04', desc: 'Iterative proofing for physical printing or screen display.' },
      { step: 'Delivery', label: '05', desc: 'Production-ready vector files and print prepress specs.' }
    ]
  },
  {
    slug: 'business-consultancy',
    number: '06',
    title: 'Business Management Consultancy',
    subtitle: 'Better decisions begin with better clarity.',
    description: 'Hypecraft helps organizations identify communication, positioning and strategic challenges and turn them into practical directions for action.',
    capabilities: [
      'Business strategy',
      'Brand strategy',
      'Communication strategy',
      'Organizational positioning',
      'Market positioning',
      'Strategic planning',
      'Process improvement',
      'Growth advisory',
      'Reputation advisory'
    ],
    heroImage: '/images/case_study_warroom_1786301027509.jpg',
    ecosystem: [
      { step: 'Diagnosis', label: '01', desc: 'In-depth organizational interviews and market positioning audits.' },
      { step: 'Strategy', label: '02', desc: 'Formulating strategic roadmaps and communication playbooks.' },
      { step: 'Alignment', label: '03', desc: 'Facilitating executive workshops and stakeholder consensus.' },
      { step: 'Execution', label: '04', desc: 'Guiding implementation across leadership and operational teams.' },
      { step: 'Review', label: '05', desc: 'Evaluating progress against strategic benchmarks.' }
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Building a Public Narrative',
    slug: 'building-a-public-narrative',
    category: 'Political PR',
    year: '2025',
    shortDescription: 'Strategic communication and visual storytelling for a public-facing campaign.',
    challenge: 'Translating complex policy initiatives into clear, accessible messages for diverse constituencies during a critical reform window.',
    objective: 'Establish trust, build cross-sector stakeholder alignment, and foster constructive public discourse.',
    strategy: 'Developed an authoritative narrative framework centered on transparency, human impact, and forward-looking economic stability.',
    creativeDirection: 'Documentary-style photography, high-contrast typography, and restrained editorial motion graphics.',
    execution: 'Multi-channel distribution across digital publications, op-ed placements, key stakeholder briefs, and social video series.',
    outcome: 'Achieved sustained public engagement, elevated campaign sentiment, and secured broad editorial coverage.',
    heroImage: '/images/political_pr_hero_1786300910145.jpg',
    galleryImages: [
      '/images/case_study_warroom_1786301027509.jpg',
      '/images/political_pr_hero_1786300910145.jpg'
    ],
    tags: ['Political PR', 'Strategy', 'Narrative'],
    featured: true,
    published: true,
    isConcept: true,
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z'
  },
  {
    id: 'proj-2',
    title: 'From Identity to Recognition',
    slug: 'from-identity-to-recognition',
    category: 'Branding',
    year: '2025',
    shortDescription: 'Creating a cohesive visual identity and communication system.',
    challenge: 'Rebranding a high-profile international advisory group without losing accumulated legacy authority or market recognition.',
    objective: 'Modernize visual language to appeal to contemporary leaders while maintaining institutional gravitas.',
    strategy: 'Constructed a flexible design system combining bespoke serif typography, warm off-white tones, and brushed gold accents.',
    creativeDirection: 'Editorial minimalism, high-end print collateral, and responsive digital brand guidelines.',
    execution: 'Full rebrand deployment including web presence, executive presentation decks, physical office collateral, and brand book.',
    outcome: 'Unanimous stakeholder approval and immediate increase in international inbound partnership enquiries.',
    heroImage: '/images/case_study_branding_1786301009860.jpg',
    galleryImages: [
      '/images/hypecraft_brand_showcase_1786274760877.jpg',
      '/images/graphic_design_hero_1786300960111.jpg'
    ],
    tags: ['Branding', 'Identity', 'Design System'],
    featured: true,
    published: true,
    isConcept: true,
    createdAt: '2025-02-10T00:00:00Z',
    updatedAt: '2025-02-10T00:00:00Z'
  },
  {
    id: 'proj-3',
    title: 'Turning Attention Into Engagement',
    slug: 'turning-attention-into-engagement',
    category: 'Digital Marketing',
    year: '2026',
    shortDescription: 'A digital communication campaign designed around audience behavior and content strategy.',
    challenge: 'Breaking through digital noise for a multi-regional sustainable development initiative.',
    objective: 'Drive meaningful digital interactions and newsletter signups rather than passive scroll impressions.',
    strategy: 'Segmented message delivery using tailored long-form video interviews and serialized micro-insights.',
    creativeDirection: 'Cinematic lighting, high-impact quotes, and minimalist motion graphic overlays.',
    execution: 'Targeted digital distribution, synchronized social media calendars, and performance-optimized interactive pages.',
    outcome: '400% increase in deep-page engagements and 3x community subscriber growth.',
    heroImage: '/images/digital_marketing_hero_1786300927065.jpg',
    galleryImages: [
      '/images/digital_marketing_hero_1786300927065.jpg',
      '/images/case_study_warroom_1786301027509.jpg'
    ],
    tags: ['Digital Marketing', 'Campaign', 'Content'],
    featured: true,
    published: true,
    isConcept: true,
    createdAt: '2026-01-05T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z'
  },
  {
    id: 'proj-4',
    title: 'Stories Designed to Move',
    slug: 'stories-designed-to-move',
    category: 'Video Content',
    year: '2025',
    shortDescription: 'A visual content system built for digital audiences.',
    challenge: 'Capturing authentic executive perspectives without appearing overly rehearsed or scripted.',
    objective: 'Humanize leadership and highlight corporate commitment to ethical governance.',
    strategy: 'Utilized cinematic documentary interview techniques combined with ambient soundscapes.',
    creativeDirection: 'Warm neutral color palettes, organic film grain, and uncluttered frame compositions.',
    execution: '5-part mini-documentary series launched across global digital channels and internal town halls.',
    outcome: 'Broad positive feedback from industry peers and elevated brand sentiment.',
    heroImage: '/images/video_production_hero_1786300944412.jpg',
    galleryImages: [
      '/images/video_production_hero_1786300944412.jpg',
      '/images/case_study_warroom_1786301027509.jpg'
    ],
    tags: ['Video Content', 'Documentary', 'Storytelling'],
    featured: true,
    published: true,
    isConcept: true,
    createdAt: '2025-03-20T00:00:00Z',
    updatedAt: '2025-03-20T00:00:00Z'
  },
  {
    id: 'proj-5',
    title: 'Strategic Positioning & Advisory',
    slug: 'strategic-positioning-and-advisory',
    category: 'Business Consultancy',
    year: '2026',
    shortDescription: 'Organizational realignment and strategic communication strategy.',
    challenge: 'Aligning leadership, internal teams, and external investors during a corporate pivot.',
    objective: 'Maintain market confidence and articulate clear strategic milestones.',
    strategy: 'Framed the pivot as a deliberate, value-driven evolution focused on long-term sustainability.',
    creativeDirection: 'Clean executive briefings, structured decision matrices, and polished investor decks.',
    execution: 'Executive messaging workshops, investor deck redesigns, and internal town hall playbooks.',
    outcome: 'Smooth transition phase with zero executive turnover and strong investor endorsement.',
    heroImage: '/images/case_study_warroom_1786301027509.jpg',
    galleryImages: [
      '/images/case_study_warroom_1786301027509.jpg',
      '/images/team_member_male_1786300978436.jpg'
    ],
    tags: ['Business Consultancy', 'Strategy', 'Positioning'],
    featured: false,
    published: true,
    isConcept: true,
    createdAt: '2026-02-01T00:00:00Z',
    updatedAt: '2026-02-01T00:00:00Z'
  },
  {
    id: 'proj-6',
    title: 'Editorial Campaign Systems',
    slug: 'editorial-campaign-systems',
    category: 'Graphic Design',
    year: '2025',
    shortDescription: 'Communication materials, reports and visual graphics for an international summit.',
    challenge: 'Presenting dense policy and economic data in an intuitive, engaging physical and digital format.',
    objective: 'Create conference publications and digital infographics that delegates reference long after the event.',
    strategy: 'Applied grid-based editorial layouts with deliberate whitespace, custom charts, and clear hierarchy.',
    creativeDirection: 'High-contrast serif typography, navy and gold accents, and textured linen covers.',
    execution: 'Printed summit reports, interactive tablet dashboards, and social media infographic slides.',
    outcome: 'High demand for extra report printings and widespread social media sharing by delegates.',
    heroImage: '/images/graphic_design_hero_1786300960111.jpg',
    galleryImages: [
      '/images/case_study_branding_1786301009860.jpg'
    ],
    tags: ['Graphic Design', 'Editorial', 'Infographics'],
    featured: false,
    published: true,
    isConcept: true,
    createdAt: '2025-04-12T00:00:00Z',
    updatedAt: '2025-04-12T00:00:00Z'
  }
];

export const INITIAL_INSIGHTS: Insight[] = [
  {
    id: 'ins-1',
    title: 'Why Reputation Is Built Before It Is Needed',
    slug: 'why-reputation-is-built-before-it-is-needed',
    category: 'PR',
    author: 'Hypecraft Strategy Team',
    publishedAt: '2026-02-10',
    readingTime: '5 min read',
    excerpt: 'In high-stakes environments, organizations that invest in brand narrative before a crisis occurs maintain control of the conversation.',
    content: `In times of uncertainty, public opinion rarely forms on raw facts alone. It crystallizes around established perception. When organizations treat public relations as an emergency response mechanism rather than a continuous strategic investment, they surrender the narrative before the conversation even begins.

Building a resilient reputation requires three core commitments:

1. Narrative Discipline
Knowing exactly what your organization stands for, what it delivers, and why it matters—before external pressures test those claims.

2. Consistent Stakeholder Dialogue
Establishing authentic lines of communication with media, partners, and public constituencies during quiet periods.

3. Rapid-Response Readiness
Creating clear decision-making frameworks so internal teams speak with one authoritative voice when events accelerate.

Reputation is not a shield created in a storm; it is the reservoir of trust built when the weather is clear. Organizations that recognize this treat communications as a board-level strategic driver rather than a tactical postscript.`,
    coverImage: '/images/political_pr_hero_1786300910145.jpg',
    tags: ['PR', 'Crisis Communication', 'Reputation'],
    published: true,
    createdAt: '2026-02-10T00:00:00Z',
    updatedAt: '2026-02-10T00:00:00Z'
  },
  {
    id: 'ins-2',
    title: 'The Difference Between Visibility and Influence',
    slug: 'the-difference-between-visibility-and-influence',
    category: 'Communication',
    author: 'Hypecraft Editorial',
    publishedAt: '2026-01-24',
    readingTime: '4 min read',
    excerpt: 'High impression counts do not equal public agreement. True influence shapes behavior, builds trust, and drives action.',
    content: `In contemporary digital marketing, vanity metrics often mask a strategic void. Millions of impressions can pass without leaving a single meaningful trace in the audience's mind.

To move from mere visibility to lasting influence, communicators must understand the fundamental difference between attention and alignment:

- Attention is transient; it demands novelty and constant volume.
- Influence is durable; it requires clarity, relevance, and repetition of a core truth.

When designing a communication campaign, measure impact by decisions made, perspectives shifted, and actions taken—not just clicks on a screen. Influence is achieved when your audience adopts your narrative as their own guide to judgment.`,
    coverImage: '/images/digital_marketing_hero_1786300927065.jpg',
    tags: ['Communication', 'Influence', 'Digital Strategy'],
    published: true,
    createdAt: '2026-01-24T00:00:00Z',
    updatedAt: '2026-01-24T00:00:00Z'
  },
  {
    id: 'ins-3',
    title: 'Why Every Brand Needs a Clear Narrative',
    slug: 'why-every-brand-needs-a-clear-narrative',
    category: 'Branding',
    author: 'Hypecraft Brand Studio',
    publishedAt: '2025-12-15',
    readingTime: '6 min read',
    excerpt: 'Without a unifying story, logos and color palettes are merely visual decor. Narrative gives brand identity its purpose.',
    content: `A brand identity is more than an aesthetic exercise. It is a promise made to the market and an organizing principle for internal culture.

When a brand lacks a clear narrative:
- Marketing messages feel fragmented and inconsistent across channels.
- Sales teams struggle to articulate value propositions succinctly.
- Customers treat products as interchangeable commodities rather than destination choices.

A strong narrative acts as an anchor. It aligns visual design, verbal tone, product development, and customer experience around a single compelling vision that inspires trust and loyalty over years.`,
    coverImage: '/images/case_study_branding_1786301009860.jpg',
    tags: ['Branding', 'Narrative', 'Brand Strategy'],
    published: true,
    createdAt: '2025-12-15T00:00:00Z',
    updatedAt: '2025-12-15T00:00:00Z'
  },
  {
    id: 'ins-4',
    title: 'Design Is Communication, Not Decoration',
    slug: 'design-is-communication-not-decoration',
    category: 'Design',
    author: 'Hypecraft Design Team',
    publishedAt: '2025-11-28',
    readingTime: '4 min read',
    excerpt: 'Great design clarifies intent, guides eye movement, and builds confidence. It solves communication problems.',
    content: `When design is treated as mere ornamentation, it adds noise rather than clarity. True graphic and editorial design serves as an invisible guide for the reader's attention.

By combining mathematical grid systems, intentional typography contrast, and generous negative space, design can make complex ideas feel effortless to understand. Every line, color, and margin must earn its place by serving the primary message. Design is not how a page looks; it is how the message moves from author to audience.`,
    coverImage: '/images/graphic_design_hero_1786300960111.jpg',
    tags: ['Design', 'Typography', 'Visual Language'],
    published: true,
    createdAt: '2025-11-28T00:00:00Z',
    updatedAt: '2025-11-28T00:00:00Z'
  },
  {
    id: 'ins-5',
    title: 'What Makes a Digital Campaign Memorable?',
    slug: 'what-makes-a-digital-campaign-memorable',
    category: 'Digital Marketing',
    author: 'Hypecraft Digital Team',
    publishedAt: '2025-11-02',
    readingTime: '5 min read',
    excerpt: 'The best digital campaigns do not feel like advertising—they feel like relevant cultural commentary.',
    content: `In an era of relentless content saturation, digital campaigns succeed when they respect the user's intelligence and time.

Key principles for high-impact digital campaigns:
1. Respect the Platform Context: Short-form video demands immediate narrative hooks, while long-form editorial requires depth and structure.
2. Focus on Human Value: Offer genuine insights, commentary, or practical perspective rather than pure self-promotion.
3. Optimize for Strategic Action: Guide the engaged viewer seamlessly toward the next logical touchpoint without intrusive friction.`,
    coverImage: '/images/video_production_hero_1786300944412.jpg',
    tags: ['Digital Marketing', 'Content Strategy', 'Campaigns'],
    published: true,
    createdAt: '2025-11-02T00:00:00Z',
    updatedAt: '2025-11-02T00:00:00Z'
  },
  {
    id: 'ins-6',
    title: 'Strategy Before Content: Building a Better Communication System',
    slug: 'strategy-before-content-building-a-better-communication-system',
    category: 'Business Strategy',
    author: 'Hypecraft Advisory',
    publishedAt: '2025-10-18',
    readingTime: '6 min read',
    excerpt: 'Publishing content without a strategic foundation is like building a house without blueprints.',
    content: `Many organizations jump straight into daily posting schedules without answering fundamental strategic questions: Who are we speaking to? What shift in perception do we seek? How will this build enterprise value?

By establishing a robust strategic framework first, content production becomes intentional, efficient, and compounding over time. Every piece of communication reinforces the same core position, building cumulative brand equity with every impression.`,
    coverImage: '/images/case_study_warroom_1786301027509.jpg',
    tags: ['Business Strategy', 'Content System', 'Positioning'],
    published: true,
    createdAt: '2025-10-18T00:00:00Z',
    updatedAt: '2025-10-18T00:00:00Z'
  }
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Alexander Vance',
    role: 'Managing Partner & Senior Political Strategist',
    bio: 'Former chief campaign advisor specializing in public narrative architecture, crisis management, and presidential communications strategy.',
    image: '/images/team_member_male_1786300978436.jpg',
    displayOrder: 1,
    published: true
  },
  {
    id: 'tm-2',
    name: 'Eleanor Sterling',
    role: 'Executive Creative Director & Brand Architect',
    bio: 'Oversees visual identity, editorial typography, and high-production creative direction for global enterprises.',
    image: '/images/team_member_female_1786300993607.jpg',
    displayOrder: 2,
    published: true
  },
  {
    id: 'tm-3',
    name: 'Hypecraft Senior Council',
    role: 'Strategic Advisory & Research Board',
    bio: 'A multidisciplinary collective of data analysts, media directors, political strategists, and business advisors.',
    image: '/images/case_study_warroom_1786301027509.jpg',
    displayOrder: 3,
    published: true
  }
];
