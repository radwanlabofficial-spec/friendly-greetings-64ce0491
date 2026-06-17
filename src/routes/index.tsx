import { createFileRoute } from "@tanstack/react-router";
import reel01 from "../assets/reel-01.jpg";
import reel02 from "../assets/reel-02.jpg";
import reel03 from "../assets/reel-03.jpg";
import reel04 from "../assets/reel-04.jpg";
import reel05 from "../assets/reel-05.jpg";
import reel06 from "../assets/reel-06.jpg";
import portrait from "../assets/portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kai Mercer — Video Editor & Colorist" },
      {
        name: "description",
        content:
          "Kai Mercer is a freelance film and commercial editor crafting cinematic stories for brands, musicians, and filmmakers.",
      },
      { property: "og:title", content: "Kai Mercer — Video Editor & Colorist" },
      {
        property: "og:description",
        content:
          "Selected works: music videos, brand films, documentaries and fashion. Edited & graded by Kai Mercer.",
      },
      { property: "og:image", content: reel02 },
    ],
  }),
  component: Index,
});

type Project = {
  no: string;
  title: string;
  client: string;
  type: string;
  year: string;
  role: string;
  runtime: string;
  image: string;
  blurb: string;
};

const projects: Project[] = [
  {
    no: "01",
    title: "Neon Cartography",
    client: "Atlas Motors",
    type: "Brand Film",
    year: "2025",
    role: "Editor · Colorist",
    runtime: "2:14",
    image: reel01,
    blurb:
      "A nocturnal city portrait cut to the rhythm of headlights. Anamorphic plates graded for deep teal shadows and warm sodium highlights.",
  },
  {
    no: "02",
    title: "Hollow Chorus",
    client: "Vela — “Embers”",
    type: "Music Video",
    year: "2025",
    role: "Editor",
    runtime: "3:42",
    image: reel02,
    blurb:
      "Performance and narrative interleaved on the downbeat. Cut from 4 hours of stage footage in a single weekend.",
  },
  {
    no: "03",
    title: "Movement 04",
    client: "Hauer & Sohn",
    type: "Commercial",
    year: "2024",
    role: "Editor · Sound Design",
    runtime: "0:45",
    image: reel03,
    blurb:
      "A wordless luxury spot for a Swiss watch house. Built around a single tick, expanded into a kinetic micro-symphony.",
  },
  {
    no: "04",
    title: "Quiet Hands",
    client: "Field Notes Co.",
    type: "Short Documentary",
    year: "2024",
    role: "Editor",
    runtime: "7:20",
    image: reel04,
    blurb:
      "A portrait of a fourth-generation joiner. Long takes, soft cuts, and silence used as punctuation.",
  },
  {
    no: "05",
    title: "Latitudes",
    client: "Noor Travel",
    type: "Travel Film",
    year: "2023",
    role: "Editor · Colorist",
    runtime: "4:08",
    image: reel05,
    blurb:
      "Six countries across the Sahel, condensed into a single breath. Graded for warm earth and cool sky.",
  },
  {
    no: "06",
    title: "House of Mira",
    client: "MIRA Atelier — SS25",
    type: "Fashion Film",
    year: "2025",
    role: "Editor",
    runtime: "1:36",
    image: reel06,
    blurb:
      "A runway film built around stillness. Each cut held one beat longer than feels comfortable, then released.",
  },
];

const services = [
  { title: "Long-form Edit", note: "Documentary, brand films, episodic" },
  { title: "Short-form Edit", note: "Commercials, music videos, social cutdowns" },
  { title: "Color Grading", note: "DaVinci Resolve, ACES pipeline" },
  { title: "Sound Design", note: "Dialogue, foley, music edit, mix" },
];

const tools = [
  "Premiere Pro",
  "DaVinci Resolve",
  "After Effects",
  "Pro Tools",
  "Ableton",
  "Frame.io",
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-gold selection:text-primary-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Selected />
      <About />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/40 border-b border-border/50">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-2xl leading-none">Kai Mercer</span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            / Editor
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <a href="#work" className="hover:text-foreground transition-colors">Work</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
        <a
          href="#contact"
          className="text-xs uppercase tracking-[0.25em] border border-gold/60 text-gold px-4 py-2 hover:bg-gold hover:text-primary-foreground transition-colors"
        >
          Book a project
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-32 lg:pt-56 lg:pb-44 grain overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-gold-soft/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-muted-foreground mb-10 fade-up">
          <span className="h-px w-10 bg-gold/60" />
          <span>Available · Q3 2026</span>
        </div>

        <h1 className="font-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.95] tracking-tight text-balance fade-up">
          Cutting <em className="text-gold not-italic">light</em>,
          <br />
          shaping <em className="italic text-gold-soft">time.</em>
        </h1>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-5 lg:col-start-7 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md fade-up">
            I&rsquo;m Kai — a freelance film and commercial editor based in Lisbon,
            working with directors, musicians and brands to find the story
            hiding in the rushes.
          </p>
        </div>

        <div className="mt-20 flex flex-wrap items-baseline gap-x-16 gap-y-8 border-t border-border pt-8">
          <Stat k="120+" v="Films edited" />
          <Stat k="9 yrs" v="In the suite" />
          <Stat k="14" v="Award nods" />
          <Stat k="ACES" v="Color pipeline" />
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-display text-4xl lg:text-5xl text-foreground">{k}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{v}</div>
    </div>
  );
}

function Marquee() {
  const items = [
    "Nike",
    "A24",
    "Aesop",
    "Bottega",
    "Pitchfork",
    "Mubi",
    "Loewe",
    "Hermès",
    "Resident Advisor",
    "Patagonia",
  ];
  return (
    <section
      aria-label="Selected clients"
      className="border-y border-border py-6 overflow-hidden bg-card/40"
    >
      <div className="flex w-max marquee gap-16 px-6 font-display text-2xl text-muted-foreground/70">
        {[...items, ...items, ...items].map((c, i) => (
          <span key={i} className="flex items-center gap-16">
            {c}
            <span className="text-gold/60">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function Selected() {
  return (
    <section id="work" className="py-32 lg:py-48">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel n="01" title="Selected Work" caption="2023 — 2025" />
        <div className="mt-20 space-y-32 lg:space-y-48">
          {projects.map((p, i) => (
            <ProjectRow key={p.no} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <div
        className={`lg:col-span-8 group relative overflow-hidden ${
          flip ? "lg:col-start-5 lg:order-2" : ""
        }`}
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-card">
          <img
            src={project.image}
            alt={`${project.title} — ${project.client}`}
            width={1600}
            height={900}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
          <button
            type="button"
            aria-label={`Play ${project.title}`}
            className="absolute inset-0 m-auto grid place-items-center"
          >
            <span className="grid place-items-center h-20 w-20 rounded-full border border-gold/60 bg-background/30 backdrop-blur-md text-gold transition-all group-hover:bg-gold group-hover:text-primary-foreground group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current ml-1" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
          <div className="absolute left-4 top-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground/80">
            <span className="px-2 py-1 bg-background/50 backdrop-blur-md border border-border">
              {project.type}
            </span>
            <span className="px-2 py-1 bg-background/50 backdrop-blur-md border border-border">
              {project.runtime}
            </span>
          </div>
        </div>
      </div>

      <div className={`lg:col-span-4 ${flip ? "lg:col-start-1 lg:order-1" : ""}`}>
        <div className="flex items-baseline gap-4 text-[11px] uppercase tracking-[0.3em] text-gold">
          <span>{project.no}</span>
          <span className="h-px flex-1 bg-border" />
          <span className="text-muted-foreground">{project.year}</span>
        </div>
        <h3 className="mt-6 font-display text-5xl lg:text-6xl leading-[1] text-balance">
          {project.title}
        </h3>
        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {project.client}
        </p>
        <p className="mt-6 text-muted-foreground leading-relaxed">{project.blurb}</p>
        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-foreground/70">
          {project.role}
        </p>
      </div>
    </article>
  );
}

function About() {
  return (
    <section id="about" className="py-32 lg:py-48 border-t border-border bg-card/30">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel n="02" title="About" caption="The editor" />
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-background">
              <img
                src={portrait}
                alt="Portrait of Kai Mercer"
                width={1000}
                height={1280}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-foreground/80">
                <span>Lisbon · PT</span>
                <span className="text-gold">EST. 2017</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-8">
            <p className="font-display text-3xl lg:text-4xl leading-[1.2] text-balance">
              I cut for directors who care about the gap between two frames as
              much as the frames themselves.
            </p>
            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed max-w-xl">
              <p>
                After nine years editing in Berlin and Lisbon — for agencies,
                record labels, and a handful of stubborn auteurs — I now work
                freelance from a small color suite overlooking the Tagus.
              </p>
              <p>
                My favourite projects are the ones with too much footage and
                not enough time. I&rsquo;ll find the spine, hold the rhythm, and
                send you a cut you didn&rsquo;t know you were waiting for.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3">Toolkit</div>
                <ul className="space-y-1 text-sm">
                  {tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3">Recognition</div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Vimeo Staff Pick · ×4</li>
                  <li>1.4 Awards · Bronze 2024</li>
                  <li>Ciclope Festival · Shortlist 2023</li>
                  <li>D&amp;AD · Wood Pencil 2022</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-32 lg:py-48">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel n="03" title="Services" caption="What I do" />
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group bg-background p-10 lg:p-14 flex flex-col justify-between min-h-[260px] hover:bg-card transition-colors"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-display text-4xl lg:text-5xl leading-tight">{s.title}</h3>
                <p className="mt-4 text-sm text-muted-foreground">{s.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-32 lg:py-48 border-t border-border grain relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gold/10 blur-[160px]" />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center relative">
        <div className="text-[11px] uppercase tracking-[0.4em] text-gold">04 — Contact</div>
        <h2 className="mt-8 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] text-balance">
          Got footage that
          <br />
          needs a <em className="text-gold not-italic">cut?</em>
        </h2>
        <p className="mt-8 text-muted-foreground max-w-md mx-auto">
          Currently booking projects from August 2026. Send a brief, a deadline,
          and a rough length — I&rsquo;ll reply within two working days.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:kai@mercer.film"
            className="group inline-flex items-center gap-3 bg-gold text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gold-soft transition-colors"
          >
            kai@mercer.film
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-3 border border-border px-8 py-4 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          >
            View the reel
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <div className="font-display text-3xl">Kai Mercer</div>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Editor · Colorist · Lisbon
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <a className="hover:text-gold transition-colors" href="#">Vimeo</a>
          <a className="hover:text-gold transition-colors" href="#">Instagram</a>
          <a className="hover:text-gold transition-colors" href="#">LinkedIn</a>
          <a className="hover:text-gold transition-colors" href="#">IMDb</a>
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
          © 2026 — All frames reserved
        </div>
      </div>
    </footer>
  );
}

function SectionLabel({ n, title, caption }: { n: string; title: string; caption: string }) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-border pb-6">
      <div className="flex items-baseline gap-6">
        <span className="text-[11px] uppercase tracking-[0.4em] text-gold">{n}</span>
        <h2 className="font-display text-4xl lg:text-5xl">{title}</h2>
      </div>
      <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{caption}</div>
    </div>
  );
}
