"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AOS from "aos";

/* ------------------------------------------------------------------ */
/* Shared class strings                                                */
/* ------------------------------------------------------------------ */

const GRADIENT_TEXT =
  "animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text font-nacelle font-semibold text-transparent";

const GRADIENT_BORDER = "gradient-border";

const BTN_PRIMARY =
  "bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]";

const BTN_SECONDARY = `relative bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 hover:bg-[length:100%_150%] ${GRADIENT_BORDER}`;

const SECTION_BORDER =
  "border-t [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1]";

const MUTED = "text-indigo-200/65";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const WORKFLOW_TEXT =
  "Streamline the product development flow with a content platform that's aligned across specs and insights.";
const FEATURE_TEXT =
  "Track progress across custom flows for your team. Find the right balance for the user, privacy and security.";

const workflows = [
  { img: "/workflow-01.png", tag: "Built-in Tools" },
  { img: "/workflow-02.png", tag: "Scale Instantly" },
  { img: "/workflow-03.png", tag: "Tailored Flows" },
];

const features = [
  {
    title: "Project Milestones",
    icon: (
      <>
        <path d="M0 0h14v17H0V0Zm2 2v13h10V2H2Z" />
        <path fillOpacity=".48" d="m16.295 5.393 7.528 2.034-4.436 16.412L5.87 20.185l.522-1.93 11.585 3.132 3.392-12.55-5.597-1.514.522-1.93Z" />
      </>
    ),
  },
  {
    title: "Team Views",
    icon: (
      <>
        <path fillOpacity=".48" d="M7 8V0H5v8h2Zm12 16v-4h-2v4h2Z" />
        <path d="M19 6H0v2h17v8H7v-6H5v8h19v-2h-5V6Z" />
      </>
    ),
  },
  {
    title: "Advanced Search",
    icon: (
      <>
        <path d="M23.414 6 18 .586 16.586 2l3 3H7a6 6 0 0 0-6 6h2a4 4 0 0 1 4-4h12.586l-3 3L18 11.414 23.414 6Z" />
        <path fillOpacity=".48" d="M13.01 12.508a2.5 2.5 0 0 0-3.502.482L1.797 23.16.203 21.952l7.71-10.17a4.5 4.5 0 1 1 7.172 5.437l-4.84 6.386-1.594-1.209 4.841-6.385a2.5 2.5 0 0 0-.482-3.503Z" />
      </>
    ),
  },
  {
    title: "Strategic Initiatives",
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
    title: "Flexible Workflows",
    icon: (
      <>
        <path fillOpacity=".48" d="M12 8.8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" />
        <path d="m7.454 2.891.891-.454L7.437.655l-.891.454a12 12 0 0 0 0 21.382l.89.454.91-1.781-.892-.455a10 10 0 0 1 0-17.818ZM17.456 1.11l-.891-.454-.909 1.782.891.454a10 10 0 0 1 0 17.819l-.89.454.908 1.781.89-.454a12 12 0 0 0 0-21.382Z" />
      </>
    ),
  },
  {
    title: "Unified Timeline",
    icon: (
      <>
        <path fillOpacity=".48" d="M19 8h5v2h-5V8Zm-4 5h9v2h-9v-2Zm9 5H11v2h13v-2Z" />
        <path d="M19.406 3.844 6.083 20.497.586 15 2 13.586l3.917 3.917L17.844 2.595l1.562 1.25Z" />
      </>
    ),
  },
];

const categories = [
  { id: 1, label: "View All", icon: "M.062 10.003a1 1 0 0 1 1.947.455c-.019.08.01.152.078.19l5.83 3.333c.052.03.115.03.168 0l5.83-3.333a.163.163 0 0 0 .078-.188 1 1 0 0 1 1.947-.459 2.161 2.161 0 0 1-1.032 2.384l-5.83 3.331a2.168 2.168 0 0 1-2.154 0l-5.83-3.331a2.162 2.162 0 0 1-1.032-2.382Zm7.854-7.981-5.83 3.332a.17.17 0 0 0 0 .295l5.828 3.33c.054.031.118.031.17.002l5.83-3.333a.17.17 0 0 0 0-.294L8.085 2.023a.172.172 0 0 0-.17-.001ZM9.076.285l5.83 3.332c1.458.833 1.458 2.935 0 3.768l-5.83 3.333c-.667.38-1.485.38-2.153-.001l-5.83-3.332c-1.457-.833-1.457-2.935 0-3.767L6.925.285a2.173 2.173 0 0 1 2.15 0Z" },
  { id: 2, label: "Web Apps", icon: "M6.5 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM9 6.855A3.502 3.502 0 0 0 8 0a3.5 3.5 0 0 0-1 6.855v1.656L5.534 9.65a3.5 3.5 0 1 0 1.229 1.578L8 10.267l1.238.962a3.5 3.5 0 1 0 1.229-1.578L9 8.511V6.855Zm2.303 4.74c.005-.005.01-.01.013-.016l.012-.016a1.5 1.5 0 1 1-.025.032ZM3.5 11A1.497 1.497 0 0 1 5 12.5 1.5 1.5 0 1 1 3.5 11Z" },
  { id: 3, label: "eCommerce", icon: "M2.428 10c.665-1.815 1.98-3.604 3.44-4.802-.6-1.807-1.443-3.079-2.29-3.18-1.91-.227-2.246 2.04-.174 2.962a1 1 0 1 1-.813 1.827C-1.407 5.028-.589-.491 3.815.032c1.605.191 2.925 1.811 3.79 4.07.979-.427 1.937-.51 2.735-.092.818.429 1.143 1.123 1.294 2.148.015.1.022.149.043.32.542-.537 1.003-.797 1.693-.622.64.162.894.493 1.195 1.147l.018.04a1 1 0 0 1 1.133 1.61c-.46.47-1.12.574-1.744.398a1.661 1.661 0 0 1-.87-.592 2.127 2.127 0 0 1-.224-.349 3.225 3.225 0 0 1-.55.477c-.377.253-.8.368-1.259.267-.993-.218-1.21-.779-1.367-2.05-.027-.22-.033-.262-.046-.353-.067-.452-.144-.617-.244-.67-.225-.118-.665-.013-1.206.278.297 1.243.475 2.587.516 3.941H15a1 1 0 0 1 0 2H8.68l-.025.285c-.173 1.918-.906 3.381-2.654 3.668-1.5.246-3.013-.47-3.677-1.858-.29-.637-.39-1.35-.342-2.095H1a1 1 0 0 1 0-2h1.428Zm2.11 0h2.175a18.602 18.602 0 0 0-.284-2.577c-.205.202-.408.42-.606.654A9.596 9.596 0 0 0 4.537 10Zm2.135 2H3.942c-.032.465.03.888.194 1.25.258.538.89.836 1.54.73.546-.09.888-.772.988-1.875L6.673 12Z" },
  { id: 4, label: "Enterprise", icon: "M3.757 3.758a6 6 0 0 1 8.485 8.485 5.992 5.992 0 0 1-5.301 1.664 1 1 0 1 0-.351 1.969 8 8 0 1 0-4.247-2.218 1 1 0 0 0 1.415-.001L9.12 8.294v1.827a1 1 0 1 0 2 0v-4.2a.997.997 0 0 0-1-1.042H5.879a1 1 0 1 0 0 2h1.829l-4.599 4.598a6 6 0 0 1 .648-7.719Z" },
  { id: 5, label: "Creative", icon: "M13.95.879a3 3 0 0 0-4.243 0L1.293 9.293a1 1 0 0 0-.274.51l-1 5a1 1 0 0 0 1.177 1.177l5-1a1 1 0 0 0 .511-.273l1.16-1.16a1 1 0 0 0-1.414-1.414l-.946.946-3.232.646.646-3.232 8.2-8.2a1 1 0 0 1 1.414 0l1.172 1.172a1 1 0 0 1 0 1.414l-.55.549a1 1 0 0 0 1.415 1.414l.55-.55a3 3 0 0 0 0-4.241L13.948.879ZM3.25 4.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm11.474 6.029-1.521-.752-.752-1.521c-.168-.341-.73-.341-.896 0l-.752 1.52-1.521.753a.498.498 0 0 0 0 .896l1.52.752.753 1.52a.5.5 0 0 0 .896 0l.752-1.52 1.52-.752a.498.498 0 0 0 0-.896Z" },
];

// Avatar and logo images are testimonial-0N.jpg / client-0N.svg, matched by position.
const testimonials = [
  { name: "MaKayla P.", company: "Disney", categories: [1, 3, 5], content: "As a content creator, I was always on the lookout for a tool that could help me keep up with the demand. The AI-driven content tool has been a game-changer. It generates high-quality content in a fraction of the time it used to take me." },
  { name: "Andrew K.", company: "Samsung", categories: [1, 2, 4], content: "I've tried several content generation tools, but this AI-driven tool is by far the best. It understands my brand's voice and consistently produces content that resonates with my audience!" },
  { name: "Lucy D.", company: "Rio", categories: [1, 2, 5], content: "Content creation used to be a bottleneck in our workflow, but not anymore. This AI tool is intuitive and produces top-notch content every time. It's like having an extra team member who never sleeps! Definitely recommend." },
  { name: "Pavel M.", company: "Canon", categories: [1, 4], content: "The quality of the content generated by this AI tool is outstanding. It has taken our content marketing to new heights, allowing us to publish more frequently without compromising on quality. Highly recommended for anyone." },
  { name: "Miriam E.", company: "Cadbury", categories: [1, 3, 5], content: "The AI-driven content tool has been a lifesaver for my marketing agency. We can now produce high-quality content for multiple clients quickly and efficiently. It's an invaluable asset to our team." },
  { name: "Eloise V.", company: "Maffell", categories: [1, 3], content: "I'm amazed at how well this AI-driven content tool performs. It's incredibly versatile and can generate content for blogs, social media, and even product descriptions effortlessly. It's fantastic!" },
  { name: "Pierre-Gilles L.", company: "Binance", categories: [1, 2, 5], content: "I was blown away by how easy it was to create my content using this tool! Within a few hours, I had a professional-looking platform up and running, and my client could not believe it." },
  { name: "Danielle K.", company: "Forbes Inc.", categories: [1, 4], content: "I've never been a fan of complicated website AI tools, which is why Open PRO is perfect for me. Its minimalist design and simple functionality make staying organized feel like second nature." },
  { name: "Mary P.", company: "Ray Ban", categories: [1, 2], content: "I've never been one for coding, so finding an AI tool that doesn't require any technical skills was a dream come true. This tool exceeded my expectations, and I'm proud to show off my new stuff to friends." },
];

const footerColumns = [
  { title: "Product", links: ["Features", "Integrations", "Pricing & Plans", "Changelog", "Our method", "User policy"] },
  { title: "Company", links: ["About us", "Diversity & Inclusion", "Blog", "Careers", "Financial statements"] },
  { title: "Resources", links: ["Community", "Terms of service", "Report a vulnerability"] },
  { title: "Content Library", links: ["Templates", "Tutorials", "Knowledge base", "Learn", "Cookie manager"] },
];

const socials = [
  { label: "Twitter", d: "m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" },
  { label: "Medium", d: "M23 8H9a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Zm-1.708 3.791-.858.823a.251.251 0 0 0-.1.241V18.9a.251.251 0 0 0 .1.241l.838.823v.181h-4.215v-.181l.868-.843c.085-.085.085-.11.085-.241v-4.887l-2.41 6.131h-.329l-2.81-6.13V18.1a.567.567 0 0 0 .156.472l1.129 1.37v.181h-3.2v-.181l1.129-1.37a.547.547 0 0 0 .146-.472v-4.749a.416.416 0 0 0-.138-.351l-1-1.209v-.181H13.8l2.4 5.283 2.122-5.283h2.971l-.001.181Z" },
  { label: "Github", d: "M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" },
];

/* Sign in / sign up / reset password: one form component, three configs. */
type View = "home" | "signin" | "signup" | "reset";
type Field = { id: string; label: string; type: string; placeholder: string; required?: boolean };

const authViews: Record<
  Exclude<View, "home">,
  {
    title: string;
    fields: Field[];
    submit: string;
    google?: boolean;
    forgot?: boolean;
    footer?: { text: string; link: string; to: View };
  }
> = {
  signin: {
    title: "Welcome back",
    fields: [
      { id: "email", label: "Email", type: "email", placeholder: "Your email" },
      { id: "password", label: "Password", type: "password", placeholder: "Your password" },
    ],
    submit: "Sign in",
    google: true,
    forgot: true,
    footer: { text: "Don't you have an account?", link: "Sign Up", to: "signup" },
  },
  signup: {
    title: "Create an account",
    fields: [
      { id: "name", label: "Name", type: "text", placeholder: "Your full name", required: true },
      { id: "company", label: "Company Name", type: "text", placeholder: "Your company name", required: true },
      { id: "email", label: "Work Email", type: "email", placeholder: "Your work email", required: true },
      { id: "password", label: "Password", type: "password", placeholder: "Password (at least 10 characters)", required: true },
    ],
    submit: "Register",
    google: true,
    footer: { text: "Already have an account?", link: "Sign in", to: "signin" },
  },
  reset: {
    title: "Reset your password",
    fields: [{ id: "email", label: "Email", type: "email", placeholder: "Your email" }],
    submit: "Reset Password",
  },
};

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="inline-flex shrink-0" aria-label="Cruip">
      <Image src="/logo.svg" alt="Cruip Logo" width={32} height={32} />
    </button>
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
    <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
      <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
        {children}
      </span>
    </div>
  );
}

function CtaButtons() {
  return (
    <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
      <div data-aos="fade-up" data-aos-delay={400}>
        <a className={`btn group mb-4 w-full sm:mb-0 sm:w-auto ${BTN_PRIMARY}`} href="#0">
          <span className="relative inline-flex items-center">
            Start Building
            <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
              -&gt;
            </span>
          </span>
        </a>
      </div>
      <div data-aos="fade-up" data-aos-delay={600}>
        <a className={`btn w-full sm:ml-4 sm:w-auto ${BTN_SECONDARY}`} href="#0">
          Schedule Demo
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

function Header({ go }: { go: (v: View) => void }) {
  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 after:absolute after:inset-0 after:-z-10 after:backdrop-blur-xs ${GRADIENT_BORDER}`}
        >
          <div className="flex flex-1 items-center">
            <Logo onClick={() => go("home")} />
          </div>
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <button onClick={() => go("signin")} className={`btn-sm py-[5px] ${BTN_SECONDARY}`}>
                Sign In
              </button>
            </li>
            <li>
              <button onClick={() => go("signup")} className={`btn-sm py-[5px] ${BTN_PRIMARY}`}>
                Register
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

function Footer({ go }: { go: (v: View) => void }) {
  const link = `${MUTED} transition hover:text-indigo-500`;
  return (
    <footer>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Decor src="/footer-illustration.svg" w={1076} h={378} className="bottom-0 left-1/2 -translate-x-1/2" />
        <div className="grid grid-cols-2 justify-between gap-12 py-8 sm:grid-rows-[auto_auto] md:grid-cols-4 md:grid-rows-[auto_auto] md:py-12 lg:grid-cols-[repeat(4,minmax(0,140px))_1fr] lg:grid-rows-1 xl:gap-20">
          {footerColumns.map((col) => (
            <div key={col.title} className="space-y-2">
              <h3 className="text-sm font-medium text-gray-200">{col.title}</h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <a className={link} href="#0">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:text-right">
            <div className="mb-3">
              <Logo onClick={() => go("home")} />
            </div>
            <div className="text-sm">
              <p className={`mb-3 ${MUTED}`}>
                © Cruip.com
                <span className="text-gray-700"> · </span>
                <a className={link} href="#0">Terms</a>
              </p>
              <ul className="inline-flex gap-1">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      className="flex items-center justify-center text-indigo-500 transition hover:text-indigo-400"
                      href="#0"
                      aria-label={s.label}
                    >
                      <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d={s.d} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center md:pb-20">
            <h1 className={`${GRADIENT_TEXT} pb-5 text-4xl md:text-5xl`} data-aos="fade-up">
              AI-driven tools for product teams
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className={`mb-8 text-xl ${MUTED}`} data-aos="fade-up" data-aos-delay={200}>
                Our landing page template works on all devices, so you only have to set it up once, and get
                beautiful results forever.
              </p>
              <CtaButtons />
            </div>
          </div>

          {/* Video thumbnail + modal */}
          <div className="relative">
            <Decor
              src="/secondary-illustration.svg"
              w={1165}
              h={1012}
              className="bottom-8 left-1/2 -ml-28 -translate-x-1/2 translate-y-1/2"
            />
            <button
              className="group relative flex items-center justify-center rounded-2xl focus:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200"
              onClick={() => dialogRef.current?.showModal()}
              aria-label="Watch the video"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <figure className="relative overflow-hidden rounded-2xl before:absolute before:inset-0 before:-z-10 before:bg-linear-to-br before:from-gray-900 before:via-indigo-500/20 before:to-gray-900">
                <Image className="opacity-50 grayscale" src="/hero-image-01.jpg" width={1104} height={576} priority alt="Video thumbnail" />
              </figure>
              <span className="pointer-events-none absolute p-2.5 before:absolute before:inset-0 before:rounded-full before:bg-gray-950 before:duration-300 group-hover:before:scale-110">
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
                        <stop stopColor="#6366F1" />
                        <stop offset={1} stopColor="#6366F1" stopOpacity=".72" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-sm font-medium leading-tight text-gray-300">
                    Watch Demo<span className="text-gray-600"> - </span>3:47
                  </span>
                </span>
              </span>
            </button>

            <dialog
              ref={dialogRef}
              onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
              onClose={() => videoRef.current?.pause()}
              className="m-auto w-full max-w-6xl overflow-hidden rounded-2xl bg-black p-0 shadow-2xl backdrop:bg-black/70"
            >
              <video ref={videoRef} className="aspect-video w-full" loop controls>
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
            <Eyebrow>Tailored Workflows</Eyebrow>
            <h2 className={`${GRADIENT_TEXT} pb-4 text-3xl md:text-4xl`}>Map your product journey</h2>
            <p className={`text-lg ${MUTED}`}>
              Simple and elegant interface to start collaborating with your team in minutes. It seamlessly
              integrates with your code and your favorite programming languages.
            </p>
          </div>
          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            {workflows.map((w, i) => (
              <a
                key={w.tag}
                href="#0"
                className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
              >
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  <div
                    className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100"
                    aria-hidden="true"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
                      <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z" />
                    </svg>
                  </div>
                  <Image className="inline-flex" src={w.img} width={350} height={288} alt={`Workflow 0${i + 1}`} />
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal gradient-border gradient-border-pill hover:bg-gray-800/60">
                        <span className="bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                          {w.tag}
                        </span>
                      </span>
                    </div>
                    <p className={MUTED}>{WORKFLOW_TEXT}</p>
                  </div>
                </div>
              </a>
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
            <Eyebrow>Advanced Controls</Eyebrow>
            <h2 className={`${GRADIENT_TEXT} pb-4 text-3xl md:text-4xl`}>Built for modern product teams</h2>
            <p className={`text-lg ${MUTED}`}>
              Open AI reads and understands your files, and with nothing more than a single line of feedback, so
              you can go further than the speed of thought.
            </p>
          </div>
          <div className="flex justify-center pb-4 md:pb-12" data-aos="fade-up">
            <Image className="max-w-none" src="/features.png" width={1104} height={384} alt="Features" />
          </div>
          <div className="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
            {features.map((f) => (
              <article key={f.title}>
                <svg className="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                  {f.icon}
                </svg>
                <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">{f.title}</h3>
                <p className={MUTED}>{FEATURE_TEXT}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [category, setCategory] = useState(1);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className={`${SECTION_BORDER} py-12 md:py-20`}>
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <h2 className={`${GRADIENT_TEXT} pb-4 text-3xl md:text-4xl`}>Don't take our word for it</h2>
          <p className={`text-lg ${MUTED}`}>
            We provide tech-first solutions that empower decision-makers to build healthier and happier
            workspaces from anywhere in the world.
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
                  className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-indigo-200 ${
                    active
                      ? "relative bg-linear-to-b from-gray-900 via-gray-800/60 to-gray-900 gradient-border gradient-border-indigo"
                      : "opacity-65 transition-opacity hover:opacity-90"
                  }`}
                >
                  <svg
                    className={`fill-current ${active ? "text-indigo-500" : "text-gray-600"}`}
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
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className={`relative mb-6 break-inside-avoid rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-xs transition-opacity ${GRADIENT_BORDER} ${
                t.categories.includes(category) ? "" : "opacity-30"
              }`}
            >
              <div className="flex flex-col gap-4">
                <img src={`/client-0${i + 1}.svg`} className="h-9 w-fit" alt="Client logo" />
                <p className={`${MUTED} before:content-['“'] after:content-['”']`}>{t.content}</p>
                <div className="flex items-center gap-3">
                  <Image
                    className="inline-flex shrink-0 rounded-full"
                    src={`/testimonial-0${i + 1}.jpg`}
                    width={36}
                    height={36}
                    alt={t.name}
                  />
                  <div className="text-sm font-medium text-gray-200">
                    <span>{t.name}</span>
                    <span className="text-gray-700"> - </span>
                    <a className={`${MUTED} transition-colors hover:text-indigo-500`} href="#0">
                      {t.company}
                    </a>
                  </div>
                </div>
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
            <h2 className={`${GRADIENT_TEXT} pb-8 text-3xl md:text-4xl`} data-aos="fade-up">
              Join the content-first platform
            </h2>
            <CtaButtons />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Sign in / sign up / reset password                                  */
/* ------------------------------------------------------------------ */

function AuthForm({ view, go }: { view: Exclude<View, "home">; go: (v: View) => void }) {
  const cfg = authViews[view];
  const label = `block text-sm font-medium ${MUTED}`;

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className={`${GRADIENT_TEXT} text-3xl md:text-4xl`}>{cfg.title}</h1>
          </div>
          <form className="mx-auto max-w-[400px]" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-5">
              {cfg.fields.map((f) => (
                <div key={f.id}>
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <label className={label} htmlFor={f.id}>
                      {f.label} {f.required && <span className="text-red-500">*</span>}
                    </label>
                    {cfg.forgot && f.type === "password" && (
                      <button type="button" className="text-sm text-gray-600 hover:underline" onClick={() => go("reset")}>
                        Forgot?
                      </button>
                    )}
                  </div>
                  <input id={f.id} type={f.type} className="form-input" placeholder={f.placeholder} required={f.required} />
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-5">
              <button className={`btn w-full ${BTN_PRIMARY}`}>{cfg.submit}</button>
              {cfg.google && (
                <>
                  <div className="flex items-center gap-3 text-center text-sm italic text-gray-600 before:h-px before:flex-1 before:bg-linear-to-r before:from-transparent before:via-gray-400/25 after:h-px after:flex-1 after:bg-linear-to-r after:from-transparent after:via-gray-400/25">
                    or
                  </div>
                  <button type="button" className={`btn w-full ${BTN_SECONDARY}`}>
                    Sign In with Google
                  </button>
                </>
              )}
            </div>
          </form>
          {cfg.footer && (
            <div className={`mt-6 text-center text-sm ${MUTED}`}>
              {cfg.footer.text}{" "}
              <button className="font-medium text-indigo-500" onClick={() => go(cfg.footer!.to)}>
                {cfg.footer.link}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [view, setView] = useState<View>("home");

  useEffect(() => {
    AOS.init({ once: true, disable: "phone", duration: 600, easing: "ease-out-sine" });
  }, []);

  // Re-scan for [data-aos] elements whenever the visible "page" changes.
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refreshHard();
  }, [view]);

  return (
    <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
      <Header go={setView} />
      <main className="relative flex grow flex-col">
        <Decor src="/page-illustration.svg" w={846} h={594} className="left-1/2 top-0 -translate-x-1/4" />
        {view === "home" ? (
          <>
            <Hero />
            <Workflows />
            <Features />
            <Testimonials />
            <Cta />
          </>
        ) : (
          <>
            <Decor src="/blurred-shape-gray.svg" w={760} h={668} className="left-1/2 top-[400px] -mt-20 -translate-x-full opacity-50" />
            <Decor src="/blurred-shape.svg" w={760} h={668} className="left-1/2 top-[440px] -translate-x-1/3" />
            <AuthForm view={view} go={setView} />
          </>
        )}
      </main>
      {view === "home" && <Footer go={setView} />}
    </div>
  );
}

