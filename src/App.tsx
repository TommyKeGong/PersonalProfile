import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Check, ChevronDown, Code2, Mail, Menu, Moon, Sun, X } from 'lucide-react'
import { AIChatTeaser } from './features/ai-assistant/AIChatTeaser'
import { experience, projects, research, skillGroups } from './data/portfolio'

const navItems = [
  ['About', 'about'],
  ['Experience', 'experience'],
  ['Projects', 'projects'],
  ['Research', 'research'],
  ['Skills', 'skills'],
  ['Contact', 'contact'],
] as const

function App() {
  const [isDark, setIsDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark)
  }, [isDark])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="page-shell min-h-screen overflow-hidden">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a className="brand-mark" href="#top" aria-label="Ke Gong home">K<span>G</span></a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, href]) => <a className="nav-link" href={`#${href}`} key={href}>{label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <button className="icon-button" onClick={() => setIsDark((value) => !value)} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a className="header-cta hidden sm:inline-flex" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
            <button className="icon-button lg:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && <nav className="mobile-nav lg:hidden" aria-label="Mobile navigation">{navItems.map(([label, href]) => <a href={`#${href}`} key={href} onClick={closeMenu}>{label}</a>)}</nav>}
      </header>

      <main id="top">
        <section className="hero mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-12 lg:pb-36">
          <div className="relative z-10">
            <div className="eyebrow mb-7"><span className="status-dot" /> Scarborough, Ontario · open to opportunities</div>
            <h1 className="display-font max-w-4xl text-[clamp(3.6rem,9vw,8.4rem)] font-semibold leading-[0.9] tracking-[-0.07em]">Building useful<br /><span className="accent-text">systems</span> with care.</h1>
            <p className="muted mt-8 max-w-2xl text-lg leading-8 sm:text-xl">I’m Ke Gong, a software engineer working across backend systems, AI/ML, data engineering, and computational research.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a className="primary-button" href="#projects">Explore my work <ArrowDown size={16} /></a>
              <a className="text-link" href="mailto:gongketommy@gmail.com">gongketommy@gmail.com <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="hero-note relative z-10 ml-auto max-w-sm lg:mb-4">
            <div className="line-decoration" />
            <p className="text-sm font-medium uppercase tracking-[0.18em] muted">A practical approach</p>
            <p className="mt-4 text-xl leading-8">Turning ambiguous problems into dependable software, measurable workflows, and research that can be explained.</p>
            <div className="mt-7 grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.14em] muted"><span>01 / build</span><span>02 / validate</span></div>
          </div>
        </section>

        <div className="section-rule" />

        <section id="about" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-32">
          <div><p className="eyebrow">01 / About</p><h2 className="section-title mt-5">Engineering with a research mindset.</h2></div>
          <div className="max-w-3xl"><p className="lead">My work sits between software engineering and computational research. I enjoy the part where a complex question becomes a clear model, a testable system, and a result people can use.</p><p className="muted mt-6 text-base leading-8">I hold a B.Sc. from the University of Toronto, with studies in Computer Science and Human Geography, and an M.Sc. in Mathematics &amp; Computational Sciences from Nipissing University. I’m currently involved in software engineering and computational research at Nipissing University.</p><div className="mt-10 flex flex-wrap gap-3"><span className="chip">Backend systems</span><span className="chip">AI applications</span><span className="chip">Data pipelines</span><span className="chip">Optimization</span></div></div>
        </section>

        <section id="experience" className="section-tint"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32"><div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">02 / Experience</p><h2 className="section-title mt-5">Shipping systems that<br className="hidden sm:block" /> do real work.</h2></div><p className="muted max-w-sm text-sm leading-6">Selected experience across backend engineering, applied AI, and data infrastructure.</p></div><div className="space-y-4">{experience.map((item, index) => <article className="experience-card" key={item.company}><div className="experience-index">0{index + 1}</div><div className="min-w-0 flex-1"><div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start"><div><p className="text-xl font-semibold">{item.role}</p><p className="accent-text mt-1 font-medium">{item.company}</p></div><p className="muted text-sm">{item.period}</p></div><p className="muted mt-5 max-w-2xl leading-7">{item.summary}</p><details className="mt-5"><summary className="details-summary">View selected contributions <ChevronDown size={15} /></summary><ul className="mt-4 grid gap-3 text-sm leading-6 muted lg:grid-cols-2">{item.highlights.map((highlight) => <li className="flex gap-2" key={highlight}><Check size={16} className="accent-text mt-1 shrink-0" />{highlight}</li>)}</ul></details><div className="mt-6 flex flex-wrap gap-2">{item.technologies.map((technology) => <span className="mini-chip" key={technology}>{technology}</span>)}</div></div><p className="muted text-sm lg:w-48 lg:text-right">{item.location}</p></article>)}</div></div></section>

        <section id="projects" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32"><div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">03 / Projects</p><h2 className="section-title mt-5">Selected systems,<br className="hidden sm:block" /> grounded in evidence.</h2></div><a className="text-link" href="https://github.com/Tommy-Gong" target="_blank" rel="noreferrer">View GitHub profile <ArrowUpRight size={15} /></a></div><div className="grid gap-5 lg:grid-cols-2">{projects.map((project, index) => <article className="project-card" key={project.title}><div className="project-art"><span>0{index + 1}</span><div className="project-grid" /></div><div className="p-6 sm:p-8"><p className="eyebrow">{project.label}</p><h3 className="mt-4 text-2xl font-semibold tracking-tight">{project.title}</h3><p className="muted mt-4 leading-7">{project.description}</p><details className="mt-6"><summary className="details-summary">Technical notes <ChevronDown size={15} /></summary><p className="muted mt-4 text-sm leading-6">{project.details}</p></details><div className="mt-7 flex flex-wrap gap-2">{project.technologies.map((technology) => <span className="mini-chip" key={technology}>{technology}</span>)}</div></div></article>)}</div></section>

        <section id="research" className="section-tint"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32"><div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="eyebrow">04 / Research</p><h2 className="section-title mt-5">Questions worth<br className="hidden sm:block" /> modeling.</h2><p className="muted mt-6 max-w-sm leading-7">Research is where I slow down, make assumptions explicit, and look for useful structure in complex systems.</p></div><div className="space-y-3">{research.map((item, index) => <article className="research-row" key={item.title}><span className="research-number">0{index + 1}</span><div className="flex-1"><p className="text-lg font-semibold leading-7">{item.title}</p><p className="accent-text mt-2 text-xs font-semibold uppercase tracking-[0.13em]">{item.status}</p><p className="muted mt-3 text-sm leading-6">{item.description}</p>{item.link && <a className="text-link mt-4 inline-flex text-sm" href={item.link} target="_blank" rel="noreferrer">{item.linkLabel} <ArrowUpRight size={14} /></a>}</div></article>)}</div></div></div></section>

        <section id="skills" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32"><div className="mb-14"><p className="eyebrow">05 / Skills</p><h2 className="section-title mt-5">A toolkit for the<br className="hidden sm:block" /> full problem.</h2></div><div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{skillGroups.map((group) => <div key={group.name}><h3 className="text-sm font-semibold uppercase tracking-[0.14em] accent-text">{group.name}</h3><ul className="mt-4 space-y-2 text-lg">{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}</div></section>

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32"><AIChatTeaser /></section>

        <section id="contact" className="section-tint"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12 lg:py-32"><div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-end"><div><p className="eyebrow">06 / Contact</p><h2 className="display-font mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">Let’s build something <span className="accent-text">useful.</span></h2><p className="muted mt-7 max-w-xl text-lg leading-8">I’m open to conversations about software engineering, backend systems, AI/ML, data engineering, and research opportunities.</p></div><div className="flex flex-col gap-4 lg:items-end"><a className="contact-link" href="mailto:gongketommy@gmail.com"><Mail size={18} /> gongketommy@gmail.com <ArrowUpRight size={15} /></a><a className="contact-link" href="https://github.com/Tommy-Gong" target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub <ArrowUpRight size={15} /></a><a className="contact-link" href="https://www.linkedin.com/in/ke-gong-33454828/" target="_blank" rel="noreferrer"><BriefcaseBusiness size={18} /> LinkedIn <ArrowUpRight size={15} /></a></div></div></div></section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-8 text-xs uppercase tracking-[0.14em] muted sm:flex-row sm:px-8 lg:px-12"><span>© {new Date().getFullYear()} Ke Gong</span><span>Designed &amp; built with intention</span><a className="footer-link" href="#top">Back to top ↑</a></footer>
    </div>
  )
}

export default App
