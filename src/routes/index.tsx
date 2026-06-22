import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
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
  video: string;
};

const SAMPLE_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
];

const projects: Project[] = ([
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
] as Omit<Project, "video">[]).map((p, i) => ({ ...p, video: SAMPLE_VIDEOS[i % SAMPLE_VIDEOS.length] }));

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

/* ---------- hooks ---------- */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function useCountUp(target: number, duration = 1600, start = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setN(Math.round(eased * target));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return n;
}

function useMouseParallax<T extends HTMLElement>(strength = 12) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--mx", `${x * strength}px`);
      el.style.setProperty("--my", `${y * strength}px`);
    };
    const onLeave = () => {
      el.style.setProperty("--mx", `0px`);
      el.style.setProperty("--my", `0px`);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return ref;
}

/* ---------- video preloader ---------- */

const videoCache = new Map<string, HTMLVideoElement>();
const timeCache = new Map<string, number>();

function preloadVideo(src: string) {
  if (videoCache.has(src)) return;
  const v = document.createElement("video");
  v.preload = "auto";
  v.muted = true;
  v.playsInline = true;
  v.crossOrigin = "anonymous";
  v.src = src;
  v.load();
  v.style.display = "none";
  document.body.appendChild(v);
  videoCache.set(src, v);
}

/* ---------- page ---------- */

function Index() {
  const progress = useScrollProgress();
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const onPlay = (e: Event) => {
      const ce = e as CustomEvent<Project>;
      setActive(ce.detail);
    };
    window.addEventListener("reel:play", onPlay as EventListener);
    return () => window.removeEventListener("reel:play", onPlay as EventListener);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-gold selection:text-primary-foreground">
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[60] scroll-progress"
        style={{ ["--p" as never]: progress }}
      />
      <Nav />
      <Hero />
      <Marquee />
      <Selected />
      <About />
      <Services />
      <Contact />
      <Footer />
      <ReelModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}

function ReelModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bufferPct, setBufferPct] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Mount/unmount with animation
  useEffect(() => {
    if (project) {
      setMounted(true);
      setIsLoading(true);
      setBufferPct(0);
      // next frame -> trigger transition
      const id = requestAnimationFrame(() => setShow(true));
      return () => cancelAnimationFrame(id);
    } else if (mounted) {
      setShow(false);
      const t = setTimeout(() => setMounted(false), 450);
      return () => clearTimeout(t);
    }
  }, [project, mounted]);

  // Lock scroll + ESC to close
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mounted, onClose]);

  // Autoplay when opened, pause/reset on close
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (show) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [show]);

  // Track loading state + buffer progress
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !project) return;

    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => setIsLoading(false);
    const onCanPlay = () => setIsLoading(false);
    const onProgress = () => {
      if (v.buffered.length && v.duration) {
        const end = v.buffered.end(v.buffered.length - 1);
        setBufferPct(Math.min(100, Math.round((end / v.duration) * 100)));
      }
    };
    const onLoadStart = () => {
      setIsLoading(true);
      setBufferPct(0);
    };

    v.addEventListener("waiting", onWaiting);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("canplaythrough", onCanPlay);
    v.addEventListener("progress", onProgress);
    v.addEventListener("loadstart", onLoadStart);

    return () => {
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("canplaythrough", onCanPlay);
      v.removeEventListener("progress", onProgress);
      v.removeEventListener("loadstart", onLoadStart);
    };
  }, [project]);

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project ? `${project.title} — reel` : "Reel"}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 transition-opacity duration-500 ease-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Close reel"
        onClick={onClose}
        className={`absolute inset-0 bg-background/85 backdrop-blur-xl transition-opacity duration-500 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative w-full max-w-6xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.96] translate-y-6"
        }`}
      >
        <div className="flex items-end justify-between mb-4 gap-4">
          <div className="min-w-0">
            <div className="flex items-baseline gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
              <span>{project?.no}</span>
              <span className="text-muted-foreground">{project?.year}</span>
              <span className="text-muted-foreground">{project?.runtime}</span>
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl truncate">
              {project?.title}
            </h2>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
              {project?.client}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="group shrink-0 h-11 w-11 grid place-items-center rounded-full border border-gold/60 text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-300 hover:rotate-90"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="relative aspect-video w-full overflow-hidden bg-black border border-border shadow-[0_30px_120px_-20px_rgba(0,0,0,0.8)]">
          {project && (
            <video
              ref={videoRef}
              src={project.video}
              poster={project.image}
              controls
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              className="absolute inset-0 h-full w-full object-contain bg-black"
            />
          )}

          {/* Loading overlay */}
          <div
            className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
              isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Spinner */}
            <div className="relative h-12 w-12">
              <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-muted-foreground/20"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={125.6}
                  strokeDashoffset={125.6 - (125.6 * bufferPct) / 100}
                  strokeLinecap="round"
                  className="text-gold transition-[stroke-dashoffset] duration-300 ease-out"
                />
              </svg>
            </div>

            {/* Progress bar */}
            <div className="w-56 sm:w-72">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Loading reel
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-mono">
                  {bufferPct}%
                </span>
              </div>
              <div className="h-1 w-full bg-muted-foreground/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-[width] duration-300 ease-out"
                  style={{ width: `${bufferPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/40 border-b border-border/50 animate-fade-in">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-2 group">
          <span className="font-display text-2xl leading-none transition-transform duration-500 group-hover:tracking-wide">
            Kai Mercer
          </span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            / Editor
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {[
            ["Work", "#work"],
            ["About", "#about"],
            ["Services", "#services"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="underline-grow hover:text-foreground transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="group text-xs uppercase tracking-[0.25em] border border-gold/60 text-gold px-4 py-2 hover:bg-gold hover:text-primary-foreground transition-all duration-500 hover:tracking-[0.35em]"
        >
          <span className="inline-flex items-center gap-2">
            Book a project
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsIn, setStatsIn] = useState(false);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setStatsIn(true), io.disconnect()),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="top" className="relative pt-40 pb-32 lg:pt-56 lg:pb-44 grain overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[140px] float-slow" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-gold-soft/5 blur-[120px] float-slower" />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-muted-foreground mb-10 fade-up">
          <span className="h-px w-10 bg-gold/60" />
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-dot" />
            Available · Q3 2026
          </span>
        </div>

        <h1 className="font-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.95] tracking-tight text-balance">
          <span className="block fade-up" style={{ animationDelay: "0.05s" }}>
            Cutting <em className="shimmer-text not-italic">light</em>,
          </span>
          <span className="block fade-up" style={{ animationDelay: "0.25s" }}>
            shaping <em className="italic text-gold-soft">time.</em>
          </span>
        </h1>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <p
            className="lg:col-span-5 lg:col-start-7 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            I&rsquo;m Kai — a freelance film and commercial editor based in Lisbon,
            working with directors, musicians and brands to find the story
            hiding in the rushes.
          </p>
        </div>

        <div
          ref={statsRef}
          className="mt-20 flex flex-wrap items-baseline gap-x-16 gap-y-8 border-t border-border pt-8"
        >
          <Stat k={120} suffix="+" v="Films edited" start={statsIn} />
          <Stat k={9} suffix=" yrs" v="In the suite" start={statsIn} />
          <Stat k={14} v="Award nods" start={statsIn} />
          <StatStatic k="ACES" v="Color pipeline" />
        </div>

        <div className="mt-16 flex flex-col items-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          <span>Scroll</span>
          <span className="mt-3 arrow-bounce">↓</span>
        </div>
      </div>
    </section>
  );
}

function Stat({
  k,
  suffix = "",
  v,
  start,
}: {
  k: number;
  suffix?: string;
  v: string;
  start: boolean;
}) {
  const n = useCountUp(k, 1600, start);
  return (
    <div className="group">
      <div className="font-display text-4xl lg:text-5xl text-foreground transition-colors group-hover:text-gold">
        {n}
        {suffix}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{v}</div>
    </div>
  );
}

function StatStatic({ k, v }: { k: string; v: string }) {
  return (
    <div className="group">
      <div className="font-display text-4xl lg:text-5xl text-foreground transition-colors group-hover:text-gold">
        {k}
      </div>
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
          <span key={i} className="flex items-center gap-16 hover:text-gold transition-colors">
            {c}
            <span className="text-gold/60 spin-slow inline-block">✦</span>
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
  const rowRef = useReveal<HTMLElement>();
  const mediaRef = useMouseParallax<HTMLDivElement>(18);
  return (
    <article
      ref={rowRef}
      onMouseEnter={() => preloadVideo(project.video)}
      className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
    >
      <div
        className={`lg:col-span-8 group relative overflow-hidden tilt ${
          flip ? "lg:col-start-5 lg:order-2" : ""
        }`}
      >
        <div ref={mediaRef} className="relative aspect-[16/9] overflow-hidden bg-card">
          <img
            src={project.image}
            alt={`${project.title} — ${project.client}`}
            width={1600}
            height={900}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
            style={{
              transform: "translate3d(var(--mx,0), var(--my,0), 0)",
              transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
          <button
            type="button"
            aria-label={`Play ${project.title}`}
            onClick={() =>
              window.dispatchEvent(new CustomEvent("reel:play", { detail: project }))
            }
            className="absolute inset-0 m-auto grid place-items-center cursor-pointer"
          >
            <span className="relative grid place-items-center h-20 w-20 rounded-full border border-gold/60 bg-background/30 backdrop-blur-md text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-primary-foreground group-hover:scale-110">
              <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-0 group-hover:opacity-100" />
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
        <h3 className="mt-6 font-display text-5xl lg:text-6xl leading-[1] text-balance transition-colors duration-500 hover:text-gold">
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
  const imgRef = useReveal<HTMLDivElement>();
  const txtRef = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="py-32 lg:py-48 border-t border-border bg-card/30">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel n="02" title="About" caption="The editor" />
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div ref={imgRef} className="reveal reveal-left lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-background group tilt">
              <img
                src={portrait}
                alt="Portrait of Kai Mercer"
                width={1000}
                height={1280}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-[1400ms] group-hover:grayscale-0 group-hover:scale-[1.04]"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-foreground/80">
                <span>Lisbon · PT</span>
                <span className="text-gold">EST. 2017</span>
              </div>
            </div>
          </div>
          <div ref={txtRef} className="reveal reveal-right reveal-delay-2 lg:col-span-7 lg:pl-8">
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
                    <li
                      key={t}
                      className="transition-all duration-300 hover:text-gold hover:translate-x-1"
                    >
                      {t}
                    </li>
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
            <ServiceCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, i }: { s: { title: string; note: string }; i: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${(i % 4) + 1} group bg-background p-10 lg:p-14 flex flex-col justify-between min-h-[260px] relative overflow-hidden transition-colors duration-500 hover:bg-card`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gold scale-x-0 origin-left transition-transform duration-700 group-hover:scale-x-100"
        aria-hidden
      />
      <div className="text-[10px] uppercase tracking-[0.3em] text-gold transition-transform duration-500 group-hover:translate-x-2">
        {String(i + 1).padStart(2, "0")}
      </div>
      <div>
        <h3 className="font-display text-4xl lg:text-5xl leading-tight transition-transform duration-500 group-hover:-translate-y-1">
          {s.title}
        </h3>
        <p className="mt-4 text-sm text-muted-foreground">{s.note}</p>
      </div>
      <span className="absolute right-8 bottom-8 text-gold opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
        →
      </span>
    </div>
  );
}

function Contact() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="contact"
      className="py-32 lg:py-48 border-t border-border grain relative overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gold/10 blur-[160px] float-slow" />
      <div ref={ref} className="reveal mx-auto max-w-[1400px] px-6 lg:px-10 text-center relative">
        <div className="text-[11px] uppercase tracking-[0.4em] text-gold">04 — Contact</div>
        <h2 className="mt-8 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] text-balance">
          Got footage that
          <br />
          needs a <em className="shimmer-text not-italic">cut?</em>
        </h2>
        <p className="mt-8 text-muted-foreground max-w-md mx-auto">
          Currently booking projects from August 2026. Send a brief, a deadline,
          and a rough length — I&rsquo;ll reply within two working days.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:kai@mercer.film"
            className="group relative inline-flex items-center gap-3 bg-gold text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:tracking-[0.4em]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gold-soft transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">kai@mercer.film</span>
            <span className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
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
          {["Vimeo", "Instagram", "LinkedIn", "IMDb"].map((s) => (
            <a key={s} className="underline-grow hover:text-gold transition-colors" href="#">
              {s}
            </a>
          ))}
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
          © 2026 — All frames reserved
        </div>
      </div>
    </footer>
  );
}

function SectionLabel({ n, title, caption }: { n: string; title: string; caption: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal flex items-end justify-between gap-6 border-b border-border pb-6"
    >
      <div className="flex items-baseline gap-6">
        <span className="text-[11px] uppercase tracking-[0.4em] text-gold">{n}</span>
        <h2 className="font-display text-4xl lg:text-5xl">{title}</h2>
      </div>
      <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{caption}</div>
    </div>
  );
}
