export const fallbackNews = [
  {
    title: 'AI agents move from demos to daily engineering workflows',
    source: 'Global Tech Brief',
    category: 'AI',
    summary: 'Teams are adopting agentic coding, testing, and support assistants with stronger review loops.',
    url: 'https://news.google.com/search?q=technology%20AI',
    publishedAt: new Date(),
  },
  {
    title: 'Chip makers race to lower power use for edge AI devices',
    source: 'Semiconductor Watch',
    category: 'Hardware',
    summary: 'New neural processing units are targeting robotics, campus labs, and smart devices.',
    url: 'https://news.google.com/search?q=edge%20AI%20chips',
    publishedAt: new Date(),
  },
];

export const fallbackVideos = [
  {
    title: 'This Week in Tech: AI, chips, cyber and developer tools',
    channel: 'TechLinked',
    topic: 'Weekly Brief',
    embedUrl: 'https://www.youtube.com/embed/6x0E9Zv5L2c',
    url: 'https://www.youtube.com/results?search_query=latest+technology+updates',
  },
  {
    title: 'AI tools every engineering student should track',
    channel: 'freeCodeCamp.org',
    topic: 'Student Skills',
    embedUrl: 'https://www.youtube.com/embed/aircAruvnKk',
    url: 'https://www.youtube.com/results?search_query=AI+tools+for+students',
  },
];

export const fallbackOpportunities = [
  {
    role: 'Graduate Engineer Trainee',
    company: 'Tata Elxsi',
    location: 'Bengaluru',
    type: 'placement',
    skills: ['C++', 'Embedded', 'Linux'],
    applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=graduate%20engineer%20trainee',
    postedAt: new Date(),
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Startup India Network',
    location: 'Remote',
    type: 'internship',
    duration: '3 months',
    stipend: 'Paid',
    skills: ['React', 'CSS', 'Git'],
    applyUrl: 'https://www.linkedin.com/jobs/search/?keywords=react%20internship',
    postedAt: new Date(),
  },
];

export const fallbackAchievements = [
  { text: 'Students published 18 research papers across AI, IoT, and sustainable computing.' },
  { text: 'Sahrdaya teams reached national-level hackathon finals with health-tech prototypes.' },
  { text: 'The innovation cell mentored 40+ student projects from idea to working demo.' },
];

export const fallbackDepartments = [
  {
    name: 'Computer Science',
    focus: 'AI, full-stack systems, cloud platforms, and secure software engineering.',
    stats: '120+ projects',
    projects: [
      {
        title: 'Campus helpdesk chatbot',
        description: 'A student support bot for frequently asked academic and placement questions.',
        year: '2026',
      },
    ],
  },
  {
    name: 'Electronics',
    focus: 'Embedded intelligence, robotics, VLSI foundations, and IoT prototypes.',
    stats: '35+ lab demos',
    projects: [
      {
        title: 'IoT energy meter',
        description: 'A low-cost device prototype for tracking lab power usage.',
        year: '2026',
      },
    ],
  },
];

export const fallbackProjects = [
  {
    title: 'Campus helpdesk chatbot',
    department: 'Computer Science',
    description: 'A student support bot for frequently asked academic and placement questions.',
    year: '2026',
    students: ['Student team'],
    mentor: 'Faculty mentor',
  },
  {
    title: 'IoT energy meter',
    department: 'Electronics',
    description: 'A low-cost device prototype for tracking lab power usage.',
    year: '2026',
    students: ['Lab project team'],
    mentor: 'Electronics Lab',
  },
];

export const fallbackSubmissions = [
  {
    title: 'How I prepared for my first hackathon',
    authorName: 'Student Contributor',
    authorEmail: 'student@sahrdaya.ac.in',
    category: 'Student Article',
    summary: 'A short student note on teamwork, quick prototyping, and presenting an idea clearly.',
    content: 'Student submissions appear here after admin approval.',
    status: 'approved',
  },
];

export const fallbackEvents = [
  {
    title: 'Student Tech Briefing Circle',
    date: 'Every Friday',
    venue: 'Innovation Lab',
    description: 'Students explain one global tech update in five minutes.',
  },
];

export const fallbackResearch = [
  {
    title: 'Low-cost edge AI for campus safety alerts',
    area: 'AI + IoT',
    mentor: 'Faculty Research Cluster',
  },
];
