export const site = {
  name: "ECOSTECH",
  tagline: "ICT capacity training for Nigerian university campuses",
  email: "hello@ecostech.ng",
  phone: "+234 801 234 5678",
  location: "Enugu, Nigeria, cohorts hosted on partner campuses nationwide",
};

export const navLinks = [
  { href: "#programs", label: "Programs" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#impact", label: "Impact" },
  { href: "#about", label: "About" },
];

export const heroCopy = {
  h1Primary: "Train the ICT Team",
  h1Soft: "You Already Have.",
  scrollLabel: "See how it works",
  blurbTitle:
    "ECOSTECH trains university ICT staff in the practical skills campuses actually need:",
  blurb:
    "video and content production for virtual lectures, WordPress site management, and CBT exam scheduling: hands-on, cohort-based, delivered on your own equipment, so the work stays in-house after we leave.",
  ctaPrimary: { label: "How it works", href: "#how-it-works" },
  ctaSecondary: { label: "View our programs", href: "#programs" },
};

export const problemCopy = {
  eyebrow: "The problem",
  heading: [
    { text: "Outsourcing a lecture recording", tone: "ink" as const },
    { text: "does not build a department.", tone: "soft" as const },
  ],
  columnOne:
    "Most university ICT units can keep the network running, but video editing, website updates and exam-day logistics routinely get pushed out to a vendor, a favourite final-year student, or whoever happens to be free. It works, until that person is unavailable, travelling, or the invoice is overdue.",
  columnTwo:
    "Training the unit once removes the bottleneck for good. The same staff who already hold campus access, login credentials and institutional knowledge start handling the requests that used to leave the university, with no new hires and no new vendor contract.",
  legend: [
    { code: "A", label: "ICT & network officers" },
    { code: "B", label: "Media & content staff" },
    { code: "C", label: "Web & exams admins" },
  ],
  odometer: {
    before: 90,
    after: 10,
    unit: "%",
    label: "of ICT content, web and exam-day requests sent outside the university",
  },
  accordion: [
    {
      title: "Before training",
      value: 90,
      body: "90% of requests are outsourced or handled ad hoc. Average turnaround sits around 12 working days, and the unit has one person who can reliably deliver.",
    },
    {
      title: "After a 6-week cohort",
      value: 10,
      body: "Only 10% of requests still need outside help: the edge cases. Average turnaround drops to about 2 working days, and every trained staff member can cover for another.",
    },
    {
      title: "Who sits in a cohort",
      value: null,
      body: "Cohorts mix ICT & network officers, media and content staff, and web or exams admins, 8 to 15 people drawn from across the unit, not one department.",
    },
  ],
  charts: {
    turnaround: {
      label: "Average turnaround per request",
      before: 12,
      after: 2,
      unit: "days",
    },
    inHouse: {
      label: "Requests completed in-house",
      before: 10,
      after: 90,
      unit: "%",
    },
    staffReady: {
      label: "Staff able to deliver independently",
      before: 1,
      after: 9,
      unit: "of 10",
    },
  },
  disclaimer: "Illustrative training outcomes from pilot cohorts, not audited data.",
};

export const stepsCopy = {
  eyebrow: "How a cohort runs",
  heading: "Five steps. One cohort.",
  steps: [
    {
      number: "01",
      verb: "Assess",
      role: "ICT UNIT · WEEK 0",
      caption:
        "We map what your unit already handles, and exactly where requests currently leave the university.",
    },
    {
      number: "02",
      verb: "Group",
      role: "COHORT · WEEK 0",
      caption:
        "Staff are grouped into a cohort of 8–15 by track: content & video, web, or exams.",
    },
    {
      number: "03",
      verb: "Train",
      role: "STUDIO + CLASSROOM · WEEKS 1–5",
      caption:
        "Hands-on sessions in video and content production, WordPress, or CBT setup, on your own campus equipment.",
    },
    {
      number: "04",
      verb: "Certify",
      role: "ASSESSMENT · WEEK 6",
      caption:
        "Every participant ships a real deliverable: a recorded lecture, a live site section, or a mock CBT exam.",
    },
    {
      number: "05",
      verb: "Support",
      role: "ONGOING",
      caption:
        "A support window after the cohort ends, so the first few live requests have a safety net.",
    },
  ],
};

export type ProgramStatus = "live" | "development";

export const programsCopy = {
  eyebrow: "What we teach",
  heading: [
    { text: "Six tracks.", tone: "ink" as const },
    { text: "Four of them running now.", tone: "soft" as const },
  ],
  intro:
    "Every track is built around the systems your university already owns: the smart boards and laptops in the ICT lab, the CBT platform the exams unit already licenses, the WordPress install the website already runs on.",
  filters: [
    { id: "all", label: "All", count: 6 },
    { id: "content", label: "Content & media", count: 3 },
    { id: "systems", label: "Web & systems", count: 3 },
  ],
  programs: [
    {
      id: "video-content",
      title: "Video & content creation",
      status: "live" as ProgramStatus,
      category: "content",
      track: "TRACK · CONTENT-01",
      description:
        "Record, edit and publish virtual-lecture-ready video, from phone and webcam capture to clean cuts, captions and thumbnails.",
    },
    {
      id: "lecture-studio",
      title: "Virtual lecture production",
      status: "live" as ProgramStatus,
      category: "content",
      track: "TRACK · CONTENT-02",
      description:
        "Turn a classroom, office or smart board session into a watchable recorded lecture. Lighting, audio and screen capture included.",
    },
    {
      id: "social-comms",
      title: "Departmental social & comms assets",
      status: "live" as ProgramStatus,
      category: "content",
      track: "TRACK · CONTENT-03",
      description:
        "Design flyers, announcement graphics and short clips for faculty pages and department social accounts, without a design degree.",
    },
    {
      id: "wordpress",
      title: "WordPress for school sites",
      status: "live" as ProgramStatus,
      category: "systems",
      track: "TRACK · SYSTEMS-01",
      description:
        "Manage pages, post updates, handle plugins and basic troubleshooting on the university or faculty website. No developer on call.",
    },
    {
      id: "cbt",
      title: "CBT exam scheduling",
      status: "live" as ProgramStatus,
      category: "systems",
      track: "TRACK · SYSTEMS-02",
      description:
        "Configure question banks, schedule sittings and proctor computer-based tests on the university's existing CBT platform.",
    },
    {
      id: "records",
      title: "Digital record-keeping",
      status: "development" as ProgramStatus,
      category: "systems",
      track: "TRACK · SYSTEMS-03",
      description:
        "Organise and back up ICT unit records (tickets, assets, exam logs) with one consistent, searchable template.",
    },
  ],
};

export const builtForCopy = {
  eyebrow: "Why it fits",
  heading: [
    { text: "Built for the Nigerian university system,", tone: "ink" as const },
    { text: "not a generic IT bootcamp.", tone: "soft" as const },
  ],
  cards: [
    {
      number: "01",
      title: "Works with the ICT unit you already have",
      body: "No new hires. We train the staff who already hold campus access, login credentials and the trust of their departments.",
      node: "ICT Unit",
    },
    {
      number: "02",
      title: "Fits around TETFund and NUC realities",
      body: "Cohorts are scheduled around the academic calendar and the procurement cycles your bursary already works with.",
      node: "Academic Calendar",
    },
    {
      number: "03",
      title: "Low-bandwidth, offline-friendly materials",
      body: "Every module ships as a downloadable guide too, because campus internet is not always dependable.",
      node: "Offline Guides",
    },
    {
      number: "04",
      title: "Facilitators who have done the job",
      body: "Trainers have built virtual-lecture systems, managed WordPress sites and run CBT exam halls themselves.",
      node: "Facilitators",
    },
  ],
};

export const trustCopy = {
  eyebrow: "Plain about scope",
  heading: [
    { text: "Plain about what ECOSTECH is,", tone: "ink" as const },
    { text: "and what it is not.", tone: "soft" as const },
  ],
  cards: [
    {
      title: "Hands-on by design",
      body: "Every session ends with a real deliverable (a recording, a published page, a mock exam), not a slide deck.",
    },
    {
      title: "Cohort-based",
      body: "Staff train in groups of 8–15, so colleagues can cover for each other once the cohort ends.",
    },
    {
      title: "Campus-specific",
      body: "Built around the software and workflows your university already owns, not a generic toolset.",
    },
    {
      title: "Facilitator-led",
      body: "A trainer in the room, or live on the call, for every session. Never a pre-recorded course alone.",
    },
    {
      title: "Honest about scope",
      body: "We tell your ICT director upfront what a cohort can and cannot fix before the first session is booked.",
    },
  ],
  negationsLabel: "ECOSTECH is not",
  negationsColumnOne: [
    "a staffing agency",
    "a software vendor",
    "a replacement for your ICT unit",
    "an accredited degree-awarding institution",
    "a one-off workshop with no follow-up",
  ],
  negationsColumnTwo: [
    "a certificate mill",
    "limited to one university",
    "only for “tech-savvy” staff",
    "a guarantee of specific results",
  ],
};

export const impactCopy = {
  gross: { label: "Outsourced", value: "9 in 10 requests" },
  net: { label: "In-house", value: "9 in 10 requests" },
  heading: "Requests that used to leave the university. Now handled inside it.",
  cta: { label: "See a program", href: "#programs" },
};

export const resourcesCopy = {
  eyebrow: "Go deeper",
  heading: "Everything here, explained further.",
  cards: [
    {
      title: "Book a consultation",
      meta: "15 minutes · with a facilitator",
      summary:
        "Walk through your ICT unit's current bottlenecks and which track would help first.",
      featured: true,
      href: "#contact",
    },
    {
      title: "Curriculum overview",
      meta: "Document · all six tracks",
      summary: "Session-by-session breakdown of what each track covers and ships.",
      href: "#contact",
    },
    {
      title: "Facilitator profiles",
      meta: "Document · trainer backgrounds",
      summary: "Who leads each track, and the campus systems they've built before.",
      href: "#contact",
    },
    {
      title: "Partnership & pricing one-pager",
      meta: "Document · for bursary & procurement",
      summary: "Cohort sizing, scheduling windows and indicative costs for your institution.",
      href: "#contact",
    },
    {
      title: "Sample cohort schedule",
      meta: "Document · 6-week plan",
      summary: "A week-by-week view of a live cohort, from assessment to certification.",
      href: "#contact",
    },
  ],
};

export const closingCopy = {
  heading: "Train the ICT unit you already have, or bring ECOSTECH to your campus.",
  ctaPrimary: { label: "Book a consultation", href: "mailto:hello@ecostech.ng" },
  ctaSecondary: { label: "Request the curriculum overview", href: "mailto:hello@ecostech.ng" },
};

