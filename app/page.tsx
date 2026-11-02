"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AOS from "aos";

/* ------------------------------------------------------------------ */
/* Shared class strings                                                */
/* ------------------------------------------------------------------ */

const GRADIENT_TEXT =
  "animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-brand-900),var(--color-brand-600),var(--color-sky-600),var(--color-brand-700),var(--color-brand-900))] bg-[length:200%_auto] bg-clip-text font-nacelle font-semibold text-transparent";

const GRADIENT_BORDER = "gradient-border";

const BTN_PRIMARY =
  "bg-linear-to-t from-brand-600 to-brand-500 bg-[length:100%_100%] bg-[bottom] text-brand-950 shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.4)] hover:bg-[length:100%_150%]";

const BTN_SECONDARY = `relative bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 hover:bg-[length:100%_150%] ${GRADIENT_BORDER}`;

const SECTION_BORDER =
  "border-t [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1]";

const MUTED = "text-brand-900/75";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const workflows = [
  {
    img: "/workflow-01.png",
    tag: "01 · Understand",
    text: "We listen first. A confidential consultation helps us understand your situation, your goals and the risks involved before we advise on anything.",
  },
  {
    img: "/workflow-02.png",
    tag: "02 · Advise",
    text: "You receive clear, practical guidance and, where needed, carefully drafted or reviewed documents, so every decision you make is an informed one.",
  },
  {
    img: "/workflow-03.png",
    tag: "03 · Act & Represent",
    text: "Through negotiation, dispute resolution or legal representation, our qualified legal professionals act to protect your rights and interests.",
  },
];

const features = [
  {
    title: "Integrity",
    text: "We hold ourselves to the highest professional and ethical standards in every matter we take on.",
    icon: (
      <>
        <path d="M0 0h14v17H0V0Zm2 2v13h10V2H2Z" />
        <path fillOpacity=".48" d="m16.295 5.393 7.528 2.034-4.436 16.412L5.87 20.185l.522-1.93 11.585 3.132 3.392-12.55-5.597-1.514.522-1.93Z" />
      </>
    ),
  },
  {
    title: "Confidentiality",
    text: "Your information and circumstances stay protected. Privacy is built into the way we work.",
    icon: (
      <>
        <path fillOpacity=".48" d="M7 8V0H5v8h2Zm12 16v-4h-2v4h2Z" />
        <path d="M19 6H0v2h17v8H7v-6H5v8h19v-2h-5V6Z" />
      </>
    ),
  },
  {
    title: "Transparency",
    text: "Clear scope, honest assessments and no surprises, so you always know where you stand.",
    icon: (
      <>
        <path d="M23.414 6 18 .586 16.586 2l3 3H7a6 6 0 0 0-6 6h2a4 4 0 0 1 4-4h12.586l-3 3L18 11.414 23.414 6Z" />
        <path fillOpacity=".48" d="M13.01 12.508a2.5 2.5 0 0 0-3.502.482L1.797 23.16.203 21.952l7.71-10.17a4.5 4.5 0 1 1 7.172 5.437l-4.84 6.386-1.594-1.209 4.841-6.385a2.5 2.5 0 0 0-.482-3.503Z" />
      </>
    ),
  },
  {
    title: "Strategic Guidance",
    text: "Advice that looks beyond the immediate issue to protect your long-term rights and interests.",
    icon: (
      <>
        <path fillOpacity=".48" d="m3.031 9.05-.593-.805 1.609-1.187.594.804a6.966 6.966 0 0 1 0 8.276l-.594.805-1.61-1.188.594-.805a4.966 4.966 0 0 0 0-5.9Z" />
        <path d="m7.456 6.676-.535-.845 1.69-1.07.534.844a11.944 11.944 0 0 1 0 12.789l-.535.845-1.69-1.071.536-.845a9.944 9.944 0 0 0 0-10.647Z" />
        <path opacity=".48" d="m11.888 4.35-.514-.858 1.717-1.027.513.858a16.9 16.9 0 0 1 2.4 8.677 16.9 16.9 0 0 1-2.4 8.676l-.513.859-1.717-1.028.514-.858A14.9 14.9 0 0 0 14.003 12a14.9 14.9 0 0 0-2.115-7.65Z" />
        <path d="m16.321 2-.5-.866 1.733-1 .5.866A22 22 0 0 1 21 12c0 3.852-1.017 7.636-2.948 10.97l-.502.865-1.73-1.003.501-.865A19.878 19.878 0 0 0 19 12a20 20 0 0 0-2.679-10Z" />
      </>
    ),
  },
  {
    title: "Client-Centric Approach",
    text: "Solutions shaped around your goals, whether you are an individual, a business or an organisation.",
    icon: (
      <>
        <path fillOpacity=".48" d="M12 8.8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" />
        <path d="m7.454 2.891.891-.454L7.437.655l-.891.454a12 12 0 0 0 0 21.382l.89.454.91-1.781-.892-.455a10 10 0 0 1 0-17.818ZM17.456 1.11l-.891-.454-.909 1.782.891.454a10 10 0 0 1 0 17.819l-.89.454.908 1.781.89-.454a12 12 0 0 0 0-21.382Z" />
      </>
    ),
  },
  {
    title: "Qualified Professionals",
    text: "Every matter is handled by qualified legal professionals who know how to move complex issues forward.",
    icon: (
      <>
        <path fillOpacity=".48" d="M19 8h5v2h-5V8Zm-4 5h9v2h-9v-2Zm9 5H11v2h13v-2Z" />
        <path d="M19.406 3.844 6.083 20.497.586 15 2 13.586l3.917 3.917L17.844 2.595l1.562 1.25Z" />
      </>
    ),
  },
];

const categories = [
  { id: 1, label: "All Services", icon: "M.062 10.003a1 1 0 0 1 1.947.455c-.019.08.01.152.078.19l5.83 3.333c.052.03.115.03.168 0l5.83-3.333a.163.163 0 0 0 .078-.188 1 1 0 0 1 1.947-.459 2.161 2.161 0 0 1-1.032 2.384l-5.83 3.331a2.168 2.168 0 0 1-2.154 0l-5.83-3.331a2.162 2.162 0 0 1-1.032-2.382Zm7.854-7.981-5.83 3.332a.17.17 0 0 0 0 .295l5.828 3.33c.054.031.118.031.17.002l5.83-3.333a.17.17 0 0 0 0-.294L8.085 2.023a.172.172 0 0 0-.17-.001ZM9.076.285l5.83 3.332c1.458.833 1.458 2.935 0 3.768l-5.83 3.333c-.667.38-1.485.38-2.153-.001l-5.83-3.332c-1.457-.833-1.457-2.935 0-3.767L6.925.285a2.173 2.173 0 0 1 2.15 0Z" },
  { id: 2, label: "Individuals", icon: "M6.5 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM9 6.855A3.502 3.502 0 0 0 8 0a3.5 3.5 0 0 0-1 6.855v1.656L5.534 9.65a3.5 3.5 0 1 0 1.229 1.578L8 10.267l1.238.962a3.5 3.5 0 1 0 1.229-1.578L9 8.511V6.855Zm2.303 4.74c.005-.005.01-.01.013-.016l.012-.016a1.5 1.5 0 1 1-.025.032ZM3.5 11A1.497 1.497 0 0 1 5 12.5 1.5 1.5 0 1 1 3.5 11Z" },
  { id: 3, label: "Businesses", icon: "M2.428 10c.665-1.815 1.98-3.604 3.44-4.802-.6-1.807-1.443-3.079-2.29-3.18-1.91-.227-2.246 2.04-.174 2.962a1 1 0 1 1-.813 1.827C-1.407 5.028-.589-.491 3.815.032c1.605.191 2.925 1.811 3.79 4.07.979-.427 1.937-.51 2.735-.092.818.429 1.143 1.123 1.294 2.148.015.1.022.149.043.32.542-.537 1.003-.797 1.693-.622.64.162.894.493 1.195 1.147l.018.04a1 1 0 0 1 1.133 1.61c-.46.47-1.12.574-1.744.398a1.661 1.661 0 0 1-.87-.592 2.127 2.127 0 0 1-.224-.349 3.225 3.225 0 0 1-.55.477c-.377.253-.8.368-1.259.267-.993-.218-1.21-.779-1.367-2.05-.027-.22-.033-.262-.046-.353-.067-.452-.144-.617-.244-.67-.225-.118-.665-.013-1.206.278.297 1.243.475 2.587.516 3.941H15a1 1 0 0 1 0 2H8.68l-.025.285c-.173 1.918-.906 3.381-2.654 3.668-1.5.246-3.013-.47-3.677-1.858-.29-.637-.39-1.35-.342-2.095H1a1 1 0 0 1 0-2h1.428Zm2.11 0h2.175a18.602 18.602 0 0 0-.284-2.577c-.205.202-.408.42-.606.654A9.596 9.596 0 0 0 4.537 10Zm2.135 2H3.942c-.032.465.03.888.194 1.25.258.538.89.836 1.54.73.546-.09.888-.772.988-1.875L6.673 12Z" },
  { id: 4, label: "Organisations", icon: "M3.757 3.758a6 6 0 0 1 8.485 8.485 5.992 5.992 0 0 1-5.301 1.664 1 1 0 1 0-.351 1.969 8 8 0 1 0-4.247-2.218 1 1 0 0 0 1.415-.001L9.12 8.294v1.827a1 1 0 1 0 2 0v-4.2a.997.997 0 0 0-1-1.042H5.879a1 1 0 1 0 0 2h1.829l-4.599 4.598a6 6 0 0 1 .648-7.719Z" },
];

const services = [
  { title: "Legal Consultation", audience: "Individuals · Businesses · Organisations", categories: [1, 2, 3, 4], content: "Speak with a qualified legal professional, understand where you stand and get clear, practical advice on your next step." },
  { title: "Corporate Law", audience: "Businesses · Organisations", categories: [1, 3, 4], content: "Guidance on structuring, running and protecting your company, so your business decisions rest on a sound legal footing." },
  { title: "Commercial Law", audience: "Businesses · Organisations", categories: [1, 3, 4], content: "Support with the legal side of everyday trade and partnerships, from commercial arrangements to day-to-day business matters." },
  { title: "Contract Drafting & Review", audience: "Individuals · Businesses · Organisations", categories: [1, 2, 3, 4], content: "Contracts drafted with precision and reviewed with care, so the terms you sign protect you and say exactly what you mean." },
  { title: "Legal Documentation", audience: "Individuals · Businesses", categories: [1, 2, 3], content: "Accurate, properly prepared legal documents that keep your paperwork complete, consistent and ready when you need it." },
  { title: "Dispute Resolution", audience: "Individuals · Businesses · Organisations", categories: [1, 2, 3, 4], content: "Practical, strategic approaches to resolving disagreements, aimed at protecting your position and reaching the right outcome." },
  { title: "Regulatory Compliance", audience: "Businesses · Organisations", categories: [1, 3, 4], content: "Help understanding and meeting the rules that apply to you, reducing risk and keeping your operations on the right side of the law." },
  { title: "Legal Representation", audience: "Individuals · Businesses · Organisations", categories: [1, 2, 3, 4], content: "Qualified legal professionals who stand with you and speak for you, so your rights and interests are protected." },
  { title: "Strategic Legal Guidance", audience: "Individuals · Businesses · Organisations", categories: [1, 2, 3, 4], content: "Complex legal matters made simple, with advice that helps you make informed decisions with confidence." },
];


/** Phone number used by every "Book a Consultation" button. Change it here, in one place. */
const PHONE_DISPLAY = "+91 00000 00000";
const PHONE_HREF = "tel:+910000000000";

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function Logo() {
  return (
    <a href="#" className="inline-flex shrink-0" aria-label="ANMIS Legal Consultancy">
      <Image src="/logo.svg" alt="ANMIS Legal Consultancy logo" width={32} height={32} />
    </a>
  );
}


function Decor({ src, w, h, className }: { src: string; w: number; h: number; className: string }) {
  return (
    <div className={`pointer-events-none absolute -z-10 ${className}`} aria-hidden="true">
      <Image className="max-w-none" src={src} width={w} height={h} alt="" />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-brand-500/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-brand-500/50">
      <span className="inline-flex bg-linear-to-r from-brand-700 to-sky-600 bg-clip-text text-transparent">
        {children}
      </span>
    </div>
  );
}

function CtaButtons() {
  return (
    <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
      <div data-aos="fade-up" data-aos-delay={400}>
        <a className={`btn group w-full sm:w-auto ${BTN_PRIMARY}`} href={PHONE_HREF} aria-label={`Book a consultation: call ${PHONE_DISPLAY}`}>
          <span className="relative inline-flex items-center">
            Book a Consultation
            <span className="ml-1 tracking-normal text-brand-950/60 transition-transform group-hover:translate-x-0.5">
              -&gt;
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}

/** Cards get a glow that follows the cursor (--mouse-x / --mouse-y on each child). */
function Spotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const c = ref.current;
      if (!c) return;
      const r = c.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
      for (const box of Array.from(c.children) as HTMLElement[]) {
        const b = box.getBoundingClientRect();
        box.style.setProperty("--mouse-x", `${e.clientX - b.left}px`);
        box.style.setProperty("--mouse-y", `${e.clientY - b.top}px`);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Layout pieces                                                       */
/* ------------------------------------------------------------------ */

function Header() {
  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 after:absolute after:inset-0 after:-z-10 after:backdrop-blur-xs ${GRADIENT_BORDER}`}
        >
          <div className="flex flex-1 items-center">
            <Logo />
          </div>
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <a href={PHONE_HREF} className={`btn-sm py-[5px] ${BTN_PRIMARY}`}>
                Book a Consultation
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Decor src="/footer-illustration.svg" w={1076} h={378} className="bottom-0 left-1/2 -translate-x-1/2" />
        <div className={`${SECTION_BORDER} flex flex-col items-center gap-5 py-10 text-center md:flex-row md:justify-between md:py-12 md:text-left`}>
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
            <Logo />
            <p className={`text-sm ${MUTED}`}>© {new Date().getFullYear()} ANMIS Legal Consultancy. All rights reserved.</p>
          </div>
          <a className="text-sm font-medium text-brand-700 transition hover:text-brand-900" href={PHONE_HREF}>
            Call us: {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Landing page sections                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const inlineVideoRef = useRef<HTMLVideoElement>(null);

  // Autoplay the hero video (muted, so browsers allow it); pause it while off-screen to save CPU.
  useEffect(() => {
    const v = inlineVideoRef.current;
    if (!v) return;
    v.muted = true;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const openModal = () => {
    inlineVideoRef.current?.pause();
    dialogRef.current?.showModal();
    const m = modalVideoRef.current;
    if (m) {
      m.currentTime = 0;
      m.play().catch(() => {});
    }
  };

  const onModalClose = () => {
    modalVideoRef.current?.pause();
    inlineVideoRef.current?.play().catch(() => {});
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center md:pb-20">
            <div data-aos="fade-up"><Eyebrow>AML</Eyebrow></div>
            <h1 className={`${GRADIENT_TEXT} pb-5 text-4xl md:text-5xl`} data-aos="fade-up">
              ANMIS Legal Consultancy
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className={`mb-8 text-xl ${MUTED}`} data-aos="fade-up" data-aos-delay={200}>
                A professional legal advisory firm supporting individuals, businesses and organisations with
                consultation, contracts, compliance, dispute resolution and representation, guided by integrity,
                confidentiality and transparency.
              </p>
              <CtaButtons />
            </div>
          </div>

          {/* Autoplaying video; click to open a larger player */}
          <div className="relative">
            <Decor
              src="/secondary-illustration.svg"
              w={1165}
              h={1012}
              className="bottom-8 left-1/2 -ml-28 -translate-x-1/2 translate-y-1/2"
            />
            <button
              className="group relative flex w-full items-center justify-center rounded-2xl focus:outline-hidden focus-visible:ring-3 focus-visible:ring-brand-200"
              onClick={openModal}
              aria-label="Open the video in a larger player"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <figure className="relative aspect-[23/12] w-full overflow-hidden rounded-2xl bg-gray-900">
                <video
                  ref={inlineVideoRef}
                  className="h-full w-full object-cover"
                  src="/video.mp4"
                  poster="/hero-image-01.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
                {/* turquoise tint so the footage matches the page */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-900/20 via-brand-500/10 to-sky-600/20" />
              </figure>
              <span className="pointer-events-none absolute bottom-5 right-5 p-2.5 before:absolute before:inset-0 before:rounded-full before:bg-white/85 before:backdrop-blur-xs before:duration-300 group-hover:before:scale-105">
                <span className="relative flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
                    <path
                      fill="url(#play)"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Zm3.5-10-5-3.5v7l5-3.5Z"
                    />
                    <defs>
                      <linearGradient id="play" x1={10} x2={10} y1={0} y2={20} gradientUnits="userSpaceOnUse">
                        <stop stopColor="#1A9A8F" />
                        <stop offset={1} stopColor="#20BFB0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-sm font-medium leading-tight text-gray-300">Watch full screen</span>
                </span>
              </span>
            </button>

            <dialog
              ref={dialogRef}
              onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
              onClose={onModalClose}
              className="m-auto w-full max-w-6xl overflow-hidden rounded-2xl bg-black p-0 shadow-2xl backdrop:bg-black/70"
            >
              <video ref={modalVideoRef} className="aspect-video w-full" loop controls playsInline preload="none">
                <source src="/video.mp4" type="video/mp4" />
              </video>
            </dialog>
          </div>
        </div>
      </div>
    </section>
  );
}

function Workflows() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <Eyebrow>Our Approach</Eyebrow>
            <h2 className={`${GRADIENT_TEXT} pb-4 text-3xl md:text-4xl`}>Clear legal guidance in three steps</h2>
            <p className={`text-lg ${MUTED}`}>
              From the first conversation to the final outcome, we keep things simple, transparent and focused on what matters to you.
            </p>
          </div>
          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            {workflows.map((w, i) => (
              <div
                key={w.tag}
                className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-brand-400/60 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-sky-400 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
              >
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  <div
                    className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100"
                    aria-hidden="true"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
                      <path fill="#0B3D3A" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z" />
                    </svg>
                  </div>
                  <Image className="inline-flex" src={w.img} width={350} height={288} alt={`Step ${i + 1}: ${w.tag}`} />
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal gradient-border gradient-border-pill hover:bg-gray-800/60">
                        <span className="bg-linear-to-r from-brand-700 to-sky-600 bg-clip-text text-transparent">
                          {w.tag}
                        </span>
                      </span>
                    </div>
                    <p className={MUTED}>{w.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </Spotlight>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="relative">
      <Decor src="/blurred-shape-gray.svg" w={760} h={668} className="left-1/2 top-0 -mt-20 -translate-x-1/2" />
      <Decor src="/blurred-shape.svg" w={760} h={668} className="bottom-0 left-1/2 -mb-80 -translate-x-[120%] opacity-50" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className={`${SECTION_BORDER} py-12 md:py-20`}>
          <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
            <Eyebrow>Why ANMIS</Eyebrow>
            <h2 className={`${GRADIENT_TEXT} pb-4 text-3xl md:text-4xl`}>Legal advice you can rely on</h2>
            <p className={`text-lg ${MUTED}`}>
              We simplify complex legal matters and empower you to make informed decisions, while protecting your rights and interests at every step.
            </p>
          </div>
          <div className="flex justify-center pb-4 md:pb-12" data-aos="fade-up">
            <Image className="max-w-none" src="/features.png" width={1104} height={384} alt="ANMIS Legal Consultancy" />
          </div>
          <div className="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
            {features.map((f) => (
              <article key={f.title}>
                <svg className="mb-3 fill-brand-600" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                  {f.icon}
                </svg>
                <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">{f.title}</h3>
                <p className={MUTED}>{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [category, setCategory] = useState(1);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className={`${SECTION_BORDER} py-12 md:py-20`}>
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <Eyebrow>Our Services</Eyebrow>
          <h2 className={`${GRADIENT_TEXT} pb-4 text-3xl md:text-4xl`}>Comprehensive legal solutions</h2>
          <p className={`text-lg ${MUTED}`}>
            From everyday legal consultation to complex corporate matters, ANMIS supports individuals, businesses and organisations at every stage.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center pb-12 max-md:hidden md:pb-16">
          <div className="relative inline-flex flex-wrap justify-center rounded-[1.25rem] bg-gray-800/40 p-1">
            {categories.map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  aria-pressed={active}
                  onClick={() => setCategory(c.id)}
                  className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-brand-200 ${
                    active
                      ? "relative bg-linear-to-b from-gray-900 via-gray-800/60 to-gray-900 gradient-border gradient-border-brand"
                      : "opacity-65 transition-opacity hover:opacity-90"
                  }`}
                >
                  <svg
                    className={`fill-current ${active ? "text-brand-600" : "text-gray-600"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                  >
                    <path d={c.icon} />
                  </svg>
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards (CSS columns instead of the JS masonry hook) */}
        <div className="mx-auto max-w-sm columns-1 gap-6 sm:max-w-none sm:columns-2 lg:columns-3">
          {services.map((s, i) => (
            <article
              key={s.title}
              className={`relative mb-6 break-inside-avoid rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 shadow-sm shadow-brand-900/5 backdrop-blur-xs transition-opacity ${GRADIENT_BORDER} ${
                s.categories.includes(category) ? "" : "opacity-30"
              }`}
            >
              <div className="flex flex-col gap-3">
                <span className="font-nacelle text-sm font-semibold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-nacelle text-lg font-semibold text-gray-200">{s.title}</h3>
                <p className={MUTED}>{s.content}</p>
                <p className="text-xs font-medium text-brand-700">{s.audience}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function Cta() {
  return (
    <section className="relative overflow-hidden">
      <Decor src="/blurred-shape.svg" w={760} h={668} className="bottom-0 left-1/2 -mb-24 ml-20 -translate-x-1/2" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bg-linear-to-r from-transparent via-gray-800/50 py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={`${GRADIENT_TEXT} pb-6 text-3xl md:text-4xl`} data-aos="fade-up">
              Need legal guidance you can trust?
            </h2>
            <p className={`mx-auto -mt-3 mb-8 max-w-xl text-lg ${MUTED}`} data-aos="fade-up" data-aos-delay={200}>
              Speak with ANMIS Legal Consultancy and take the first step toward clarity and confidence.
            </p>
            <CtaButtons />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  useEffect(() => {
    AOS.init({ once: true, disable: "phone", duration: 600, easing: "ease-out-sine" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
      <Header />
      <main className="relative flex grow flex-col">
        <Decor src="/page-illustration.svg" w={846} h={594} className="left-1/2 top-0 -translate-x-1/4" />
        <Hero />
        <Workflows />
        <Features />
        <Services />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
