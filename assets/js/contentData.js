/* ============================================================================
   linux+  ::  contentData.js
   Exam facts, per-domain metadata + objectives, PBQ format definitions,
   curated external resources, the Exam-Mechanics and Career-Guidance readers,
   and the textbook-dense domain reading content (LINUXPLUS.reading[1..5],
   appended below this header).

   This file loads first and establishes the global LINUXPLUS namespace consumed
   by quizEngine.js and app.js. Every exam figure (minutes, item count, passing
   score, scale band, domain count) lives here ONCE; the dashboard, scoring,
   analytics, and mock engine all read from this single source of truth.

   Authored by Professor Rizwan Virani.
   ========================================================================== */
window.LINUXPLUS = window.LINUXPLUS || {};

LINUXPLUS.exam = {
  code: "XK0-006",
  name: "CompTIA Linux+",
  minutes: 90,
  maxQuestions: 90,
  scaleLow: 100, scaleHigh: 900, passing: 720,
  domains: 5,
  launched: "2025",
  retiredPredecessor: "XK0-005"
};

/* Per-domain metadata. `objectives` mirror the official XK0-006 exam outline,
   and `weight` carries the official domain percentages. `sectionCount` is the
   number of dense reading sections in each lazy-loaded domainN.js module. */
LINUXPLUS.domainMeta = [
  { id: 1, weight: 23, color: "d1", icon: "🧩", title: "System Management", sectionCount: 18,
    short: "The core of Linux administration: the boot process and kernel, device and module management, storage and LVM/RAID, network configuration, shell operations, backup and restore, and virtualization.",
    objectives: [
      { id: "1.1", t: "Explain basic Linux concepts" },
      { id: "1.2", t: "Summarize Linux device management concepts and tools" },
      { id: "1.3", t: "Given a scenario, manage storage in a Linux system" },
      { id: "1.4", t: "Given a scenario, manage network services and configurations on a Linux server" },
      { id: "1.5", t: "Given a scenario, manage a Linux system using common shell operations" },
      { id: "1.6", t: "Given a scenario, perform backup and restore operations for a Linux server" },
      { id: "1.7", t: "Summarize virtualization on Linux systems" }
    ] },
  { id: 2, weight: 20, color: "d2", icon: "👥", title: "Services and User Management", sectionCount: 16,
    short: "Operating the running system: files, directories, links and permissions; local user and group accounts; processes, jobs, and scheduling; software and repositories; systemd units; and containers.",
    objectives: [
      { id: "2.1", t: "Given a scenario, manage files and directories on a Linux system" },
      { id: "2.2", t: "Given a scenario, perform local account management in a Linux environment" },
      { id: "2.3", t: "Given a scenario, manage processes and jobs in a Linux environment" },
      { id: "2.4", t: "Given a scenario, configure and manage software in a Linux environment" },
      { id: "2.5", t: "Given a scenario, manage Linux using systemd" },
      { id: "2.6", t: "Given a scenario, manage applications in a container on a Linux server" }
    ] },
  { id: 3, weight: 18, color: "d3", icon: "🔐", title: "Security", sectionCount: 16,
    short: "Hardening and protecting the host: authentication, authorization, and accounting; firewalls; OS hardening and access control (SELinux/AppArmor); account hardening; cryptography; and compliance and audit.",
    objectives: [
      { id: "3.1", t: "Summarize authorization, authentication, and accounting methods" },
      { id: "3.2", t: "Given a scenario, configure and implement firewalls on a Linux system" },
      { id: "3.3", t: "Given a scenario, apply operating system (OS) hardening techniques on a Linux system" },
      { id: "3.4", t: "Explain account hardening techniques and best practices" },
      { id: "3.5", t: "Explain cryptographic concepts and technologies in a Linux environment" },
      { id: "3.6", t: "Explain the importance of compliance and audit procedures" }
    ] },
  { id: 4, weight: 17, color: "d4", icon: "⚙️", title: "Automation, Orchestration, and Scripting", sectionCount: 14,
    short: "Doing it at scale and repeatably: automation and orchestration with IaC tools, Bash shell scripting, Python basics for administration, version control with Git, and responsible use of AI.",
    objectives: [
      { id: "4.1", t: "Summarize the use cases and techniques of automation and orchestration in a Linux environment" },
      { id: "4.2", t: "Given a scenario, perform automated tasks using shell scripting" },
      { id: "4.3", t: "Summarize Python basics used for Linux system administration" },
      { id: "4.4", t: "Given a scenario, implement version control using Git" },
      { id: "4.5", t: "Summarize best practices and responsible uses of AI" }
    ] },
  { id: 5, weight: 22, color: "d5", icon: "🛠️", title: "Troubleshooting", sectionCount: 14,
    short: "Diagnosing and fixing: monitoring concepts and data sources, then a methodical approach to hardware/storage/OS, networking, security, and performance problems on a Linux system.",
    objectives: [
      { id: "5.1", t: "Summarize monitoring concepts and configurations in a Linux system" },
      { id: "5.2", t: "Given a scenario, analyze and troubleshoot hardware, storage, and Linux OS issues" },
      { id: "5.3", t: "Given a scenario, analyze and troubleshoot networking issues on a Linux system" },
      { id: "5.4", t: "Given a scenario, analyze and troubleshoot security issues on a Linux system" },
      { id: "5.5", t: "Given a scenario, analyze and troubleshoot performance issues" }
    ] }
];

/* The five PBQ formats. `domainColor` just drives the badge tint. */
LINUXPLUS.pbqFormats = [
  { id: 1, icon: "💽", domainColor: 1, obj: "1.3", badge: "STORAGE & LVM", title: "Storage, LVM & Filesystem Provisioning",
    desc: "Provision storage end to end — partition a disk, build physical volumes, volume groups and logical volumes, lay down a filesystem, and make the mount persistent in /etc/fstab.",
    long: "Each scenario gives you a disk layout and a capacity requirement. Work the stack field by field: choose the right <b>partitioning</b> tool and type, create the <b>PV/VG/LV</b>, select the correct <b>filesystem</b> and <b>mkfs</b> command, and write a correct <b>/etc/fstab</b> entry (device/UUID, mount point, options, dump/pass) so the volume survives a reboot." },
  { id: 2, icon: "🌐", domainColor: 1, obj: "1.4 / 5.3", badge: "NETWORK CONFIG", title: "Network Configuration & Connectivity Triage",
    desc: "Configure addressing, routing, and name resolution with nmcli/ip, then read the symptoms and pick the right diagnostic tool to isolate a connectivity, DNS, or firewall fault.",
    long: "You are bringing a server online and then keeping it online. Set the <b>interface</b> address, gateway, and DNS; verify with the correct <b>ip</b>/<b>ss</b>/<b>dig</b> command; and when traffic fails, choose the diagnostic that proves whether the fault is <b>layer 1/2</b>, <b>routing</b>, <b>DNS</b>, or a <b>firewall</b> rule." },
  { id: 3, icon: "🔑", domainColor: 3, obj: "2.1 / 3.3", badge: "PERMISSIONS", title: "Permissions, Ownership & Access Control",
    desc: "Set octal and symbolic modes, ownership, special bits (SUID/SGID/sticky), umask, and ACLs to satisfy a least-privilege requirement — and diagnose an SELinux denial.",
    long: "A shared-directory and access-control workspace. For each requirement choose the correct <b>chmod</b> (octal or symbolic), <b>chown</b>, special permission (<b>SUID/SGID/sticky</b>), <b>umask</b>, or <b>setfacl</b> entry, and when access still fails, decide whether the cause is a standard permission, an ACL, a file <b>attribute</b>, or an <b>SELinux</b> context." },
  { id: 4, icon: "🧰", domainColor: 2, obj: "2.5", badge: "SYSTEMD & SERVICES", title: "systemd Units, Services & Timers",
    desc: "Author and manage systemd units: enable and start a service, fix a failed unit, write a service and a timer, and choose the right systemctl/journalctl command for the task.",
    long: "Operate the init system. For each task select the correct <b>systemctl</b> verb (enable, start, mask, daemon-reload), write the right directive in a <b>[Unit]/[Service]/[Install]</b> stanza, schedule work with a <b>.timer</b>, and read <b>journalctl</b> to confirm why a unit failed and how to recover it." },
  { id: 5, icon: "📜", domainColor: 4, obj: "4.2", badge: "SHELL SCRIPTING", title: "Bash Scripting & Automation Logic",
    desc: "Complete a Bash script field by field: the shebang, variables and quoting, conditionals and loops, exit codes, and the redirection that makes the automation robust.",
    long: "Build and harden an automation script. For each blank choose the correct <b>shebang</b>, <b>variable</b> or parameter expansion, <b>test</b>/conditional, <b>loop</b> construct, <b>exit code</b> check, and stream <b>redirection</b> so the script behaves correctly under cron and fails safely when something is missing." }
];

/* Curated free study resources. */
LINUXPLUS.resources = [
  { icon: "📄", title: "Official CompTIA Linux+ XK0-006 Exam Objectives (PDF)", host: "comptia.org",
    url: "https://www.comptia.org/en-us/certifications/linux/",
    desc: "The authoritative exam outline — every objective and sub-bullet CompTIA can test. Download the objectives PDF from the certification page and use it as your master checklist." },
  { icon: "📖", title: "The Linux man pages & info documents", host: "man7.org",
    url: "https://man7.org/linux/man-pages/",
    desc: "The canonical, on-system reference for every command and configuration file. On the exam and the job, `man 5 fstab` or `man systemd.service` is the source of truth — learn to read the SYNOPSIS and OPTIONS sections quickly." },
  { icon: "📘", title: "The Linux Documentation Project & Bash Guide", host: "tldp.org",
    url: "https://tldp.org/",
    desc: "Long-form guides including the Advanced Bash-Scripting Guide and the Filesystem Hierarchy Standard — excellent for the shell-scripting and FHS material in Domains 1 and 4." },
  { icon: "🐧", title: "Red Hat & Ubuntu Server Documentation", host: "docs.redhat.com",
    url: "https://docs.redhat.com/",
    desc: "Vendor docs for the two distribution families the exam draws from (RPM/dnf and Debian/apt). Authoritative for systemd, SELinux, firewalld, LVM, and networking with NetworkManager and Netplan." },
  { icon: "👥", title: "r/CompTIA — Community Wiki & Study Guides", host: "reddit.com/r/CompTIA",
    url: "https://www.reddit.com/r/CompTIA/wiki/index/",
    desc: "Crowd-sourced study plans, exam-day experiences, and the well-known community guides. Read recent “passed” posts for current question-style intel on the Linux+." },
  { icon: "🧪", title: "Linux Journey & OverTheWire (hands-on practice)", host: "linuxjourney.com",
    url: "https://linuxjourney.com/",
    desc: "Free, interactive practice for the command line and core concepts; pair it with OverTheWire's Bandit wargame to build real terminal fluency, which the PBQs and labs reward." }
];

/* ---- Reader: Exam Mechanics card ---- */
LINUXPLUS.examMechanics = [
  { heading: "Format, length, and delivery", body:
    "<p>The <strong>CompTIA Linux+ XK0-006</strong> is a single exam of <strong>up to 90 questions</strong> to be completed in <strong>90 minutes</strong>. It is delivered either at a Pearson VUE testing center or via OnVUE online proctoring. Because the count is a <em>maximum</em>, your particular form may contain fewer scored items; CompTIA also seeds unscored “beta” questions it is evaluating for future exams, and you cannot tell which is which — so treat every question as if it counts.</p>" +
    "<p>The exam mixes <strong>multiple-choice</strong> items (single- and multiple-response) with a handful of <strong>performance-based questions (PBQs)</strong>. PBQs are interactive tasks — provisioning storage with LVM, completing a systemd unit, writing firewall rules, fixing a Bash script — and they typically appear first. They are worth more and consume more time, which leads directly to the single most important time-management rule below.</p>" +
    "<div class='callout exam'><div class='lbl'>Exam tip</div>PBQs front-load the exam and can eat your clock. If a PBQ stalls you, <strong>flag it and move on</strong>. Bank the fast multiple-choice points first, then return with whatever time remains.</div>" },
  { heading: "Scoring: the 100–900 scale", body:
    "<p>Linux+ is scored on a <strong>scaled range of 100 to 900</strong>, and the passing score is <strong>720</strong>. Scaled scoring is not a simple percentage: CompTIA weights items by difficulty and equates across exam forms so that no candidate is advantaged or disadvantaged by drawing a harder set. As a result you cannot reverse-engineer an exact “number correct” from 720, and CompTIA does not publish the raw-to-scaled mapping.</p>" +
    "<p>Practically, strong candidates aim to answer roughly <strong>80% or more</strong> of questions correctly to give themselves comfortable margin. There is <strong>no penalty for guessing</strong> — an unanswered question is simply wrong — so you should never leave an item blank. Eliminate obviously wrong options, make your best choice, flag it if unsure, and move on.</p>" +
    "<blockquote>This platform’s mock exam reports a scaled score using a transparent linear approximation of the 100–900 band. Use it as a <em>relative</em> readiness signal — “am I trending toward 720?” — not as a literal prediction of your official score.</blockquote>" },
  { heading: "Question styles and how to read them", body:
    "<p>CompTIA writes “best answer” questions. Often two or three options are <em>plausible</em> and only one is <em>best</em> for the scenario described. Read the <strong>last sentence first</strong> — it usually contains the actual ask (“which command <em>best</em> accomplishes…”, “what should the administrator do <em>first</em>…”). Words like <strong>first</strong>, <strong>best</strong>, <strong>most likely</strong>, and <strong>least</strong> are decisive; circle them mentally.</p>" +
    "<ul><li><strong>Multiple-response</strong> items tell you how many to pick (“choose two”). You must get all of them right for credit.</li><li><strong>Scenario</strong> items bury the relevant detail in a paragraph — identify the host, the symptom, and the constraint before looking at options.</li><li><strong>PBQs</strong> reward methodical work; partial credit is generally available, so complete every field you can even if unsure of one.</li></ul>" +
    "<div class='callout'><div class='lbl'>Strategy</div>Use the <strong>flag-and-review</strong> workflow. First pass: answer everything you know cold and flag the rest. Second pass: spend remaining minutes only on flagged items. This guarantees you never run out of time with easy points unanswered.</div>" },
  { heading: "Eligibility, cost, and renewal", body:
    "<p>There are <strong>no formal prerequisites</strong>, but CompTIA recommends <strong>12 months of hands-on Linux administration experience</strong> and a foundation comparable to A+ and Network+. The exam voucher cost varies by region (commonly in the US$370+ range). Academic and bundle discounts exist — ask your institution. There may also be funding available for a free voucher. Connect with the Program Director or your professor for more information about funding opportunities.</p>" +
    "<p>Linux+ is valid for <strong>three years</strong> and participates in CompTIA’s <strong>Continuing Education (CE)</strong> program: you renew by earning continuing-education units, completing higher-level certifications, or related activities, rather than re-sitting the exam. Keep your certification active so it continues to satisfy employer and contract requirements.</p>" },
  { heading: "Exam-day logistics", body:
    "<p>Bring two forms of ID; for online proctoring you must show a clear workspace, a working webcam, and a stable connection. You cannot use notes, phones, or smartwatches. A simple on-screen whiteboard or provided scratch material may be available — use it to jot the syntax you’ll otherwise lose under pressure (think the order of LVM commands, or the fields of an /etc/fstab line).</p>" +
    "<div class='callout scenario'><div class='lbl'>Mindset</div>Arrive early, breathe, and remember: the exam tests <strong>applied skill</strong>, not trivia recall. Most questions are answerable by applying core principles — the FHS, least privilege, “read the logs first” — to the scenario in front of you.</div>" }
];

/* ---- Reader: Career Guidance card ---- */
LINUXPLUS.careerGuidance = [
  { heading: "Where Linux+ sits on the ladder", body:
    "<p><strong>Linux+ is a vendor-neutral, mid-level credential that proves you can administer a Linux system end to end.</strong> It typically sits above foundational IT certifications (A+, Network+) and alongside or just below distribution-specific and cloud certifications (RHCSA, LFCS, AWS/Azure associate tracks). Its value is breadth and portability: rather than binding you to one distribution, it proves competence across the RPM and Debian families, systemd, storage, networking, security, and automation.</p>" +
    "<p>For hiring managers, Linux+ on a résumé is shorthand for “this person can be handed a server and trusted to install, secure, troubleshoot, and automate it.” It is frequently listed as a <em>preferred</em> qualification for junior Linux administrator, NOC/SOC, and DevOps-adjacent roles.</p>" },
  { heading: "Why Linux skills are in demand", body:
    "<p>Linux runs the modern back end: the majority of web servers, virtually all of the top supercomputers, most cloud workloads, and the container and Kubernetes ecosystem all run on Linux. Every cloud provider's compute is, underneath, a Linux host. That means the skills this exam certifies — the shell, package management, systemd, storage, networking, and hardening — are the daily currency of infrastructure work.</p>" +
    "<div class='callout exam'><div class='lbl'>Why it matters</div>Because Linux is the substrate of cloud and DevOps, Linux+ is a <strong>force multiplier</strong>: it makes you more effective in cloud, container, security, and automation roles even when the job title doesn't say “Linux administrator.”</div>" },
  { heading: "Roles Linux+ opens", body:
    "<p>Linux+ aligns with a cluster of infrastructure and operations roles. It will not, by itself, make you a senior SRE — but it credibly qualifies you for:</p>" +
    "<ul>" +
    "<li><strong>Linux / Systems Administrator (junior)</strong> — installing, configuring, patching, and securing servers. Domains 1, 2, and 3 map almost directly to this job.</li>" +
    "<li><strong>NOC / SOC Analyst</strong> — monitoring health and logs, triaging incidents, reading journalctl and SIEM data. Domain 5 underpins this work.</li>" +
    "<li><strong>DevOps / Platform Engineer (entry)</strong> — building automation with Bash, Ansible, and Git, and operating containers. Domain 4 is the on-ramp.</li>" +
    "<li><strong>Cloud Engineer (associate)</strong> — almost all cloud instances are Linux; these skills transfer directly to AWS, Azure, and GCP.</li>" +
    "<li><strong>Site Reliability / Support Engineer</strong> — diagnosing performance and storage problems under pressure, which Domain 5 trains.</li>" +
    "</ul>" },
  { heading: "Building the path beyond Linux+", body:
    "<p>Treat Linux+ as a launch point, not a destination. A common trajectory: <em>Linux+ → hands-on administration experience → a specialization</em>. From here, administrators often pursue <strong>Red Hat RHCSA/RHCE</strong> or the Linux Foundation <strong>LFCS/CKA</strong>; cloud-bound learners add <strong>AWS, Azure, or GCP</strong> associate certifications; security-minded learners pursue <strong>CompTIA Security+</strong> and then CySA+ or PenTest+; and automation-focused engineers deepen into <strong>Ansible, Terraform/OpenTofu, and Kubernetes</strong>.</p>" +
    "<div class='callout scenario'><div class='lbl'>Practical advice</div>Pair the cert with <strong>demonstrable hands-on skill</strong> — a home lab with a couple of VMs, a few systemd services and timers you wrote, a dotfiles repo on GitHub, or a small Ansible playbook. Certifications get you past résumé filters; a real lab gets you through interviews.</div>" }
];

/* Reading content is NO LONGER bundled here. To keep this file lean and to
   load only what a student opens, each domain's dense reading sections live in
   their own module under assets/js/content/domainN.js and are fetched on demand
   by app.js the first time a Domain Study card is opened. This object is the
   shared target those modules populate: LINUXPLUS.reading[N] = [ ...sections ]. */
LINUXPLUS.reading = LINUXPLUS.reading || {};

/* Flashcard decks are likewise lazy-loaded from assets/js/content/flashN.js
   (100 cards per domain) and populate this object: LINUXPLUS.flash[N] = [ ...cards ]. */
LINUXPLUS.flash = LINUXPLUS.flash || {};
