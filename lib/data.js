// Shared data, sample content, and pure helper functions used across pages.
// No "use client" here — this file has no hooks or browser-only APIs, so it's
// safe to import from both server and client components.

export let uidCounter = 0;
export const uid = () => `id-${Date.now()}-${uidCounter++}`;

export const emptyExperience = () => ({
  id: uid(),
  role: "",
  company: "",
  location: "",
  start: "",
  end: "",
  current: false,
  description: "",
});

export const emptyEducation = () => ({
  id: uid(),
  school: "",
  degree: "",
  field: "",
  start: "",
  end: "",
});

export const initialData = {
  personal: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    link: "",
  },
  summary: "",
  experience: [emptyExperience()],
  education: [emptyEducation()],
  skills: [],
};

// ---------- sample data for template thumbnails & resume examples ----------
export const SAMPLE_DESIGNER = {
  personal: {
    name: "Jane Alvarez",
    title: "Senior Product Designer",
    email: "jane.alvarez@email.com",
    phone: "(555) 010-2938",
    location: "Denver, CO",
    link: "linkedin.com/in/janealvarez",
  },
  summary:
    "Product designer with 6 years building tools for outdoor and field-service teams. Known for turning messy workflows into simple, durable interfaces.",
  experience: [
    {
      id: "s1",
      role: "Senior Product Designer",
      company: "Ridgeline Co.",
      location: "Denver, CO",
      start: "2022",
      end: "",
      current: true,
      description:
        "Led redesign of the field-inspection app, cutting task time 40%\nBuilt and maintained the company's first design system\nMentored 3 junior designers",
    },
    {
      id: "s2",
      role: "Product Designer",
      company: "Basecamp Outfitters",
      location: "Boulder, CO",
      start: "2019",
      end: "2022",
      current: false,
      description:
        "Designed the mobile checkout flow, improving conversion 18%\nRan quarterly usability studies with retail store staff",
    },
  ],
  education: [
    {
      id: "e1",
      school: "University of Colorado",
      degree: "B.A.",
      field: "Graphic Design",
      start: "2015",
      end: "2019",
    },
  ],
  skills: ["Figma", "Design systems", "User research", "Prototyping", "HTML/CSS"],
};

export const SAMPLE_ENGINEER = {
  personal: {
    name: "Marcus Webb",
    title: "Backend Software Engineer",
    email: "marcus.webb@email.com",
    phone: "(555) 044-1187",
    location: "Austin, TX",
    link: "github.com/marcuswebb",
  },
  summary:
    "Backend engineer focused on reliable, well-tested services. Comfortable owning a system end to end, from schema design to on-call.",
  experience: [
    {
      id: "s1",
      role: "Software Engineer II",
      company: "Fieldpost Logistics",
      location: "Austin, TX",
      start: "2021",
      end: "",
      current: true,
      description:
        "Rebuilt the routing service, cutting p99 latency by 60%\nIntroduced contract testing across 8 internal services\nOn-call rotation lead for the platform team",
    },
    {
      id: "s2",
      role: "Software Engineer",
      company: "Northwind Analytics",
      location: "Remote",
      start: "2018",
      end: "2021",
      current: false,
      description: "Built the ingestion pipeline handling 200M events/day\nMigrated legacy jobs from cron to Airflow",
    },
  ],
  education: [
    { id: "e1", school: "Georgia Institute of Technology", degree: "B.S.", field: "Computer Science", start: "2014", end: "2018" },
  ],
  skills: ["Go", "PostgreSQL", "Kafka", "Kubernetes", "System design"],
};

export const SAMPLE_MANAGER = {
  personal: {
    name: "Priya Nair",
    title: "Retail Store Manager",
    email: "priya.nair@email.com",
    phone: "(555) 072-3340",
    location: "Portland, OR",
    link: "",
  },
  summary:
    "Store manager with 8 years in outdoor retail. Builds teams that stay, and floors that sell without feeling pushy.",
  experience: [
    {
      id: "s1",
      role: "Store Manager",
      company: "Summit Trail Co-op",
      location: "Portland, OR",
      start: "2020",
      end: "",
      current: true,
      description:
        "Grew store revenue 22% year over year\nCut seasonal staff turnover from 45% to 18%\nRolled out a new visual merchandising standard adopted chain-wide",
    },
    {
      id: "s2",
      role: "Assistant Manager",
      company: "Cascade Outfitters",
      location: "Eugene, OR",
      start: "2016",
      end: "2020",
      current: false,
      description: "Managed scheduling for a 25-person floor team\nLed weekly product knowledge trainings",
    },
  ],
  education: [{ id: "e1", school: "University of Oregon", degree: "B.S.", field: "Business Administration", start: "2012", end: "2016" }],
  skills: ["Team leadership", "Inventory management", "Visual merchandising", "P&L ownership", "Scheduling"],
};

export const SAMPLE_NURSE = {
  personal: {
    name: "Dana Kowalski",
    title: "Registered Nurse, Emergency Department",
    email: "dana.kowalski@email.com",
    phone: "(555) 099-2214",
    location: "St. Paul, MN",
    link: "",
  },
  summary:
    "ED nurse with 5 years of experience in high-acuity, high-volume settings. Calm under pressure, precise with documentation.",
  experience: [
    {
      id: "s1",
      role: "Registered Nurse, ED",
      company: "Lakeside Regional Medical Center",
      location: "St. Paul, MN",
      start: "2021",
      end: "",
      current: true,
      description:
        "Triage nurse for a 40-bed emergency department averaging 180 patients/day\nPrecepted 6 new-graduate nurses\nCharge nurse two shifts per week",
    },
  ],
  education: [
    { id: "e1", school: "University of Minnesota", degree: "B.S.N.", field: "Nursing", start: "2016", end: "2020" },
  ],
  skills: ["Triage", "Trauma care", "EPIC EMR", "ACLS certified", "Patient de-escalation"],
};

export function computeStrength(data) {
  let score = 0;
  const p = data.personal;
  if (p.name.trim()) score += 15;
  if (p.title.trim()) score += 10;
  if (p.email.trim() || p.phone.trim()) score += 10;
  if (data.summary.trim().length > 30) score += 15;

  const goodExp = data.experience.filter((e) => e.role.trim() && e.company.trim());
  score += Math.min(goodExp.length, 2) * 12.5;

  const goodEdu = data.education.filter((e) => e.school.trim());
  if (goodEdu.length > 0) score += 10;

  if (data.skills.length >= 3) score += 15;

  return Math.round(Math.min(score, 100));
}

export function formatRange(start, end, current) {
  if (!start && !end && !current) return "";
  return `${start || "—"} – ${current ? "Present" : end || "—"}`;
}
export const TEMPLATES = [
  { id: "modern", label: "Modern", ats: true },
  { id: "classic", label: "Classic", ats: true },
  { id: "minimal", label: "Minimal", ats: true },
  { id: "timeline", label: "Timeline", ats: true },
  { id: "bold", label: "Bold", ats: true },
  { id: "sidebar", label: "Sidebar", ats: false },
  { id: "compact", label: "Compact", ats: true },
  { id: "executive", label: "Executive", ats: true },
  { id: "accent-bar", label: "Accent Bar", ats: true },
  { id: "skills-first", label: "Skills First", ats: true },
  { id: "corporate-grid", label: "Corporate Grid", ats: true },
  { id: "elegant-serif", label: "Elegant Serif", ats: true },
  { id: "developer-mono", label: "Developer Mono", ats: true },
  { id: "newspaper", label: "Newspaper", ats: true },
  { id: "skill-bars", label: "Skill Bars", ats: false },
  { id: "initials-badge", label: "Initials Badge", ats: true },
];

export const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "but", "of", "to", "in", "on", "for", "with", "is", "are", "as", "at",
  "by", "be", "this", "that", "from", "your", "you", "we", "our", "will", "have", "has", "it", "its",
  "their", "they", "them", "who", "which", "also", "into", "across", "within", "using", "use", "who",
  "such", "these", "those", "than", "can", "may", "all", "any", "each", "other", "some", "more", "most",
]);

export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+/#\s-]/g, " ")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

export function analyzeMatch(resumeText, jobText) {
  const jobWords = tokenize(jobText);
  const resumeWords = new Set(tokenize(resumeText));
  const freq = {};
  jobWords.forEach((w) => {
    freq[w] = (freq[w] || 0) + 1;
  });
  const uniqueJobWords = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 30);
  const matched = uniqueJobWords.filter((w) => resumeWords.has(w));
  const missing = uniqueJobWords.filter((w) => !resumeWords.has(w));
  const score = uniqueJobWords.length ? Math.round((matched.length / uniqueJobWords.length) * 100) : 0;
  return { score, matched, missing };
}

export const EXAMPLES = [
  {
    id: "designer",
    label: "Product Designer",
    data: SAMPLE_DESIGNER,
    template: "modern",
    tips: [
      "Leads with a specific, quantified summary line instead of a generic objective",
      "Groups bullets around outcomes, not just duties",
      "Keeps to two roles with real depth instead of five with almost none",
    ],
  },
  {
    id: "engineer",
    label: "Software Engineer",
    data: SAMPLE_ENGINEER,
    template: "minimal",
    tips: [
      "Uses the Minimal template, since many engineering applicant trackers are strict parsers",
      "Every bullet includes a number",
      "Skills list matches the tools named in the postings they're applying to",
    ],
  },
  {
    id: "manager",
    label: "Retail Store Manager",
    data: SAMPLE_MANAGER,
    template: "bold",
    tips: [
      "Leads with team and revenue outcomes — the two things retail hiring managers scan for first",
      "Uses the Bold template to stand out in a stack of similar-looking applications",
      "Keeps education brief since 8 years of experience carries the resume",
    ],
  },
  {
    id: "nurse",
    label: "Registered Nurse",
    data: SAMPLE_NURSE,
    template: "timeline",
    tips: [
      "Leads with certifications relevant to the unit",
      "Timeline template makes a single long tenure easy to scan",
      "Calls out charge-nurse and precepting duties, which read as leadership signals",
    ],
  },
];

export const BLOG_POSTS = [
{
  id: "resume-mistakes-2026",
  title: "12 Resume Mistakes That Get You Rejected Before a Human Reads It",
  date: "July 22, 2026",
  readTime: "6 min read",
  excerpt: "Most resumes aren't rejected for lacking experience. They're rejected for small, fixable mistakes that never even reach a hiring manager.",
  body: [
    "Most job seekers assume a rejection means they weren't qualified. Often, that's not what happened at all. A resume can get filtered out — by software, by a 30-second human skim, or by a recruiter pattern-matching against a stack of 200 near-identical applications — for reasons that have nothing to do with whether someone could actually do the job.",
    "The good news is that almost all of these mistakes are mechanical, not personal. They're fixable in an afternoon, and none of them require inventing new experience or lying about your background. Below are the twelve that show up most often, roughly in order of how early they tend to end an application.",
    {
      type: "heading",
      text: "1. An objective statement instead of a summary",
    },
    {
      type: "paragraph",
      text: "\"Seeking a challenging position where I can grow and contribute to a dynamic team\" tells a reader nothing. It was standard advice twenty years ago and it hasn't aged well — it takes up prime space at the top of the page without giving anyone a reason to keep reading.",
    },
    {
      type: "tip",
      text: "Replace it with a two-line summary: who you are professionally, and one concrete number that proves it. \"Backend engineer with 5 years building high-throughput services, most recently cutting API latency 40% on a system handling 10M requests/day.\"",
    },
    {
      type: "heading",
      text: "2. Duties instead of outcomes",
    },
    {
      type: "paragraph",
      text: "This is the single most common issue across every resume we see, regardless of industry. A bullet that describes what you were responsible for tells a reader less than a bullet that describes what happened as a result.",
    },
    {
      type: "list",
      items: [
        "Before: \"Responsible for managing social media accounts\"",
        "After: \"Grew Instagram following from 2,000 to 18,000 in 8 months through a consistent short-form video schedule\"",
        "Before: \"Handled customer complaints\"",
        "After: \"Resolved an average of 30 escalated customer complaints per week, maintaining a 95% satisfaction rating\"",
      ],
    },
    {
      type: "paragraph",
      text: "Notice neither rewrite invents anything — it just answers the question a hiring manager is actually asking, which is \"what happened because you were there?\"",
    },
    {
      type: "heading",
      text: "3. No numbers anywhere",
    },
    {
      type: "paragraph",
      text: "Related to the point above, but worth calling out on its own: a resume with zero quantified results, even in a job like teaching, retail, or customer support where the work feels hard to measure, is a resume that reads as vague by default. Team size, dollar amounts, percentages, time saved, volume handled — almost every job has at least one available number if you look for it.",
    },
    {
      type: "heading",
      text: "4. Formatting that breaks on a parser",
    },
    {
      type: "paragraph",
      text: "Many companies run applications through a screening tool before anyone reads them by hand. These tools read text, not layout, which means certain design choices can scramble a resume before a human ever sees it: text placed inside an image, a multi-column layout where the reading order jumps between columns, tables used for the whole layout instead of just data, and section titles styled as decorative graphics instead of real headings.",
    },
    {
      type: "tip",
      text: "None of this means your resume has to look plain. A single-column layout with real headings, one accent color, and clean spacing parses fine and still looks intentional. The danger is specifically in sidebars, text-in-images, and multi-column body text.",
    },
    {
      type: "heading",
      text: "5. A generic resume sent to every job",
    },
    {
      type: "paragraph",
      text: "Sending the identical resume to fifty different postings is efficient, but it shows. Job postings usually repeat three or four specific terms — tools, methods, or responsibilities — that matter to that particular role. If your resume never uses those words anywhere, a keyword-based screen has nothing to match on, and a human reader has to do extra work to connect your background to their opening.",
    },
    {
      type: "paragraph",
      text: "This doesn't require ten different resumes. It requires one strong base and about ten minutes per application checking whether the posting's key terms are genuinely true of your experience, and if so, whether they already appear in your bullets.",
    },
    {
      type: "heading",
      text: "6. An unprofessional email address",
    },
    {
      type: "paragraph",
      text: "It sounds small, but recruiters mention it constantly. An email address from high school still doing the job in a professional context is an easy, avoidable first impression to get wrong. A free address using some version of your real name takes two minutes to set up.",
    },
    {
      type: "heading",
      text: "7. Inconsistent dates or unexplained overlaps",
    },
    {
      type: "paragraph",
      text: "Mixing date formats (\"Jan 2021\" next to \"03/2022\"), listing roles out of chronological order, or having two jobs overlap without explanation all create small moments of friction for a reader who's trying to build a timeline of your career in their head. None of these are disqualifying on their own, but they add up, and they read as carelessness even when the underlying story is fine.",
    },
    {
      type: "heading",
      text: "8. A skills section that's really just a wish list",
    },
    {
      type: "paragraph",
      text: "Listing a skill that never shows up anywhere else on the resume is a common way to get caught out in an interview. If \"project management\" is on your skills list, there should be a bullet somewhere describing a project you actually managed. If a programming language is listed, there should be a role or project bullet that used it for something specific.",
    },
    {
      type: "heading",
      text: "9. Burying the most relevant experience",
    },
    {
      type: "paragraph",
      text: "Resumes are skimmed, not read, especially on a first pass. If your most relevant experience for this particular job is your second or third role down the page, a reader moving quickly may never get to it. Reordering — or in some templates, adding a short \"Relevant Experience\" grouping above older or less relevant roles — puts your strongest case where it will actually be seen.",
    },
    {
      type: "heading",
      text: "10. Typos and small grammar errors",
    },
    {
      type: "paragraph",
      text: "Obvious, but still one of the fastest ways to lose credibility, particularly for roles where writing or attention to detail is part of the job. Spellcheck catches misspellings; it doesn't catch a wrong word used correctly (\"lead\" a team last year vs. \"led\" a team last year). Reading the resume out loud, or having someone else read it, catches far more than a second silent read-through.",
    },
    {
      type: "heading",
      text: "11. No way to verify anything",
    },
    {
      type: "paragraph",
      text: "More hiring now involves a quick check that a candidate's claims hold up — a portfolio, a GitHub profile, published writing, a LinkedIn that matches the resume's timeline. If you have something like that, a resume without a link to it is missing an easy piece of evidence. If you don't have anything to link, that's fine, but it's one more reason every bullet on the page should be something you could immediately back up if asked about it directly.",
    },
    {
      type: "heading",
      text: "12. Padding to fill the page",
    },
    {
      type: "paragraph",
      text: "Listing every course taken, every minor task performed, or restating the same accomplishment three different ways to stretch a thin resume to a full page almost always backfires. A tight half-page of real, well-described experience reads as more credible than a full page padded with filler — readers can tell the difference quickly, and padding makes the genuine accomplishments harder to spot.",
    },
    {
      type: "heading",
      text: "The pattern underneath all twelve",
    },
    {
      type: "paragraph",
      text: "Almost every mistake on this list comes down to the same root cause: writing a resume from the inside of your own experience, without checking how it reads from the outside, to someone who has thirty seconds and no context. The fix for nearly all twelve is the same two-part check — read every bullet and ask \"does this show an outcome, not just a task?\", then read the whole page and ask \"could a stranger skim this in thirty seconds and understand what I actually did?\" If the answer to both is yes, you've already fixed most of what typically goes wrong.",
    },
  ],
},
  {
    id: "ats-friendly",
    title: "Why “ATS-friendly” doesn't mean boring",
    date: "June 2, 2026",
    readTime: "4 min read",
    excerpt: "Keyword-safe and visually flat aren't the same thing. Here's what actually threatens a clean parse.",
    body: [
      "Applicant tracking systems read text, not design. That means the parts that actually threaten a clean parse are structural: text inside images, content split across multiple columns in a way that scrambles reading order, and headers that aren't real headings.",
      "None of that requires a resume to look plain. A single-column layout with a clear hierarchy, real section headings, and one accent color can be both easy for software to read and pleasant for a human to look at.",
      "Where people get into trouble is decorative sidebars and multi-column layouts, since some parsers read left-to-right across the whole page rather than down one column at a time, which can interleave job titles with a skills list. If you're applying somewhere you know uses an ATS, that's the pattern worth avoiding — not color, not a distinct font, not a section divider.",
    ],
  },
  {
    id: "summary-line",
    title: "What actually belongs in a resume summary",
    date: "May 18, 2026",
    readTime: "3 min read",
    excerpt: "Not a mission statement. Not a list of adjectives. Here's the version that earns its place at the top.",
    body: [
      "A resume summary is prime real estate, read before anything else, and most people waste it on things a hiring manager already assumes: that they're hardworking, a team player, detail-oriented.",
      "The version that works is closer to a thesis statement: who you are professionally, the scope of what you've done, and one concrete marker of impact. Something like: 'Backend engineer with 6 years building high-throughput data services, most recently cutting p99 latency 60% on a routing platform serving 40M requests a day.'",
      "If you can't fit a real number into your summary, it's usually a sign the sentence is still too generic — go find the number first, then write the sentence around it.",
    ],
  },
  {
    id: "tailoring",
    title: "Tailoring your resume without rewriting it every time",
    date: "April 30, 2026",
    readTime: "3 min read",
    excerpt: "You don't need ten versions of your resume. You need one strong base and 10 minutes per application.",
    body: [
      "Full rewrites don't scale, and most people give up on tailoring entirely because of it. A faster approach: keep one strong base resume, then before each application, read the posting and note the three or four terms it repeats — not buzzwords, but the actual nouns for tools, methods, or responsibilities.",
      "Check whether those same words already appear somewhere in your bullets. If a term is genuinely true of your experience but phrased differently, adjust the wording to match. If it's just missing, see if there's a real accomplishment you left out that would cover it.",
      "This takes ten minutes, not two hours, and it directly addresses both the human reader and any keyword-based filtering the resume goes through first.",
    ],
  },
  {
    id: "one-page",
    title: "One page or two? A straight answer",
    date: "April 9, 2026",
    readTime: "2 min read",
    excerpt: "The honest rule of thumb, without the usual hedging.",
    body: [
      "Under about 8–10 years of experience: one page. The discipline of fitting everything onto one page usually improves the resume anyway, since it forces you to cut the duties and keep the outcomes.",
      "Past that much experience, or in academic and research fields where a longer list of publications or grants is expected, two pages is normal and won't hurt you.",
      "What actually hurts is a page and a half — it reads as an editing miss rather than a decision. If you're close to the edge, either cut to one clean page or commit to filling two well.",
    ],
  },
  {
    id: "how-to-write-2026",
    title: "How to Write a Resume in 2026",
    date: "July 1, 2026",
    readTime: "5 min read",
    excerpt: "The fundamentals haven't changed much. Two things about who's reading it have.",
    body: [
      "Most resume advice is still the same advice it was ten years ago, because the core job hasn't changed: prove you can do the work, in language a busy stranger can skim in thirty seconds. What's shifted is who — or what — reads it first.",
      "A lot of hiring now runs through screening tools that go beyond simple keyword matching to check whether a bullet actually reads as a coherent accomplishment. That cuts both ways: obvious keyword-stuffing is easier to flag as filler than it used to be, but a resume that's just a clean, honest account of what you did and what happened as a result reads well to both software and a human.",
      "The other shift is that more hiring managers expect a resume to point somewhere — a portfolio, a GitHub profile, published writing, anything that lets them verify a claim instead of taking it on faith. If you have something like that, link it. If you don't, that's fine too, but it's one more reason every bullet should be something you could immediately back up in an interview.",
      "So the practical version of '2026 resume advice' is close to the practical version from any other year: lead with outcomes, keep the structure simple enough that any parser can read it, link to real evidence where you have it, and don't write a single sentence you couldn't defend on the spot.",
    ],
  },
  {
    id: "best-resume-skills",
    title: "Best Resume Skills (and How to Prove Them)",
    date: "June 24, 2026",
    readTime: "4 min read",
    excerpt: "A skills section is a list of claims. The resume around it is the evidence.",
    body: [
      "A skills list by itself is one of the weakest sections on a resume, because anyone can type any word into it. 'Leadership,' 'Python,' 'stakeholder management' — none of it means anything to a reader until something else on the page backs it up.",
      "The fix isn't a better list of words, it's making sure every skill you name shows up in action somewhere in your experience section. If you list 'cross-functional collaboration,' there should be a bullet describing a project where you actually worked across teams and what came of it. If you list a programming language, there should be a role or project bullet that used it for something specific.",
      "Two categories are worth naming separately. Role-specific technical skills — the tools, languages, and methods particular to your field — are what most applicant tracking searches are actually looking for, so it's worth matching the exact terms a posting uses when they're genuinely true of your experience. Broader working skills — communication, ownership, judgment under ambiguity — matter just as much to a human reader but are harder to search for, so they need to come through in how your bullets are written, not in a separate line.",
      "A useful gut check before publishing a skills list: if an interviewer picked any single word from it at random and asked you to walk through a time you used it, could you? If not, it's probably better left off.",
    ],
  },
  {
    id: "resume-for-freshers",
    title: "Resume for Freshers: What to Put When You Don't Have a Job Yet",
    date: "June 17, 2026",
    readTime: "4 min read",
    excerpt: "You have more to put on a resume than it feels like. It's just not labeled 'work experience.'",
    body: [
      "The hardest part of a first resume is usually the blank space where 'experience' is supposed to go. The good news is that hiring managers reading a fresher's resume already know not to expect five years of a career — they're reading for signals of how you think and work, and those show up in more places than a job history.",
      "Lead with education, but don't just list a degree — pull out coursework, projects, or research that's actually relevant to the role, and describe them the way you'd describe a job: what the project was, what you did specifically, and what the result was. A class project that shipped something real is worth more space than a long list of course titles.",
      "Any part-time work, internship, or volunteer role counts, even if it has nothing to do with the field you're applying to. Retail, food service, and campus jobs all demonstrate reliability, working with people, and handling responsibility — name the specific responsibility, not just the job title.",
      "Keep the whole thing to one page. A fresher's resume padded to look fuller usually reads as padded, not experienced. A tight, well-described page of real coursework, projects, and part-time work reads as someone who knows how to communicate — which is exactly the signal you want to send before you've had a chance to prove anything else.",
    ],
  },
  {
    id: "resume-software-engineers",
    title: "Resume for Software Engineers: What Actually Gets Read",
    date: "June 10, 2026",
    readTime: "4 min read",
    excerpt: "Not every line. Here's what a fast skim actually lands on.",
    body: [
      "Engineering resumes get skimmed fast, often by someone who is themselves technical and has seen hundreds of nearly identical ones. What actually gets read closely is narrow: the metrics in your bullets, and the tech stack next to your most recent role.",
      "That means the highest-leverage edit most engineering resumes need is turning duty descriptions into outcome descriptions. 'Worked on the payments service' tells a reader nothing they can act on. 'Rebuilt the payments retry logic, cutting failed-transaction support tickets by 35%' tells them exactly what to ask about in an interview.",
      "Resist the urge to list every technology you've ever touched. A long, undifferentiated tech list reads as unfocused and makes it harder to spot the tools that actually matter for the role you're applying to. Two or three solid, well-described projects or roles beat five thin ones.",
      "If you have a GitHub profile, portfolio, or published technical writing worth a hiring manager's five minutes, link it prominently — for engineering roles especially, that link often gets more attention than the resume text around it. And keep the layout itself boring on purpose: single column, real headings, no tables — many engineering-heavy companies run resumes through strict parsers before a human ever sees them.",
    ],
  },
  {
    id: "resume-without-experience",
    title: "Resume Without Experience: A Realistic Guide",
    date: "June 3, 2026",
    readTime: "4 min read",
    excerpt: "For career changers, people returning to work, and anyone with a gap — not just new grads.",
    body: [
      "'No experience' means different things for different people — a recent grad, someone changing careers entirely, someone returning to work after time away — but the resume approach has a lot in common across all three: find the transferable evidence you do have, and don't over-explain what you don't.",
      "Transferable skills are real skills, and a resume should name them in the language of the job you want, not the job you had. Managing a household budget, running community or volunteer projects, coaching a team, or teaching yourself a new tool all demonstrate planning, responsibility, and follow-through — describe them the way you'd describe any other accomplishment, with what you did and what came of it.",
      "Self-directed learning counts too. A completed course, a certification, or a personal project built to learn a new skill is legitimate resume content, especially when there's little else to fill a career-change resume with. Frame it as what it demonstrates — initiative and the specific capability gained — rather than apologizing for it being unofficial.",
      "On gaps: a resume doesn't need to justify itself. It's fine to simply not draw attention to a gap in the resume itself; a cover letter or interview is a better place for context if it's asked for. Trying to over-explain a gap directly on the resume usually draws more attention to it, not less.",
    ],
  },
];


export const SITE_URL = "https://resumeforge-tawny-alpha.vercel.app"; // TODO: replace with your real production domain
export const SITE_NAME = "ResumeForge";
