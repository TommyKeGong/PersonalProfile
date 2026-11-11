import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Check, ChevronDown, Code2, Mail, Menu, Moon, Sun, X } from 'lucide-react'
import { AIChatTeaser } from './features/ai-assistant/AIChatTeaser'
import { ECargoExplorer } from './features/projects/ECargoExplorer'
import { KnowledgeArchitecture, OptimizationDiagram } from './features/projects/ProjectVisuals'
import { experience, projects, research, selectedProjects, skillGroups } from './data/portfolio'

const navItems = [
  ['About', 'about'],
  ['Experience', 'experience'],
  ['Projects', 'projects'],
  ['Research', 'research'],
  ['Contact', 'contact'],
] as const

function getInitialDarkMode() {
  if (typeof window === 'undefined') return false
  const savedTheme = window.localStorage.getItem('theme')
  return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
}

function ProjectLink({ href, label }: { href?: string; label?: string }) {
  if (!href) return null
  return <a className="blue-link mt-8 inline-flex" href={href} target="_blank" rel="noreferrer">{label ?? 'View project'} <ArrowUpRight size={14} /></a>
}

function App() {
  const [isDark, setIsDark] = useState(getInitialDarkMode)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
    window.localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))
    return () => revealObserver.disconnect()
  }, [])

  useEffect(() => {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 })

    navItems.forEach(([, id]) => {
      const section = document.getElementById(id)
      if (section) sectionObserver.observe(section)
    })
    return () => sectionObserver.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="page-shell min-h-screen">
      <a className="skip-link" href="#top">Skip to content</a>
      <header className={`site-header fixed inset-x-0 top-0 z-50 ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-wrap mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
          <a className="brand-mark" href="#top" aria-label="Ke Gong home"><img src="/logo.png" alt="" /></a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, href]) => <a className={`nav-link ${activeSection === href ? 'active' : ''}`} href={`#${href}`} key={href} aria-current={activeSection === href ? 'location' : undefined}>{label}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <button className="theme-button" type="button" onClick={() => setIsDark((value) => !value)} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a className="nav-contact hidden sm:inline-flex" href="#contact">Let's talk <ArrowUpRight size={14} /></a>
            <button className="theme-button lg:hidden" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation">
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
        {menuOpen && <nav id="mobile-navigation" className="mobile-nav lg:hidden" aria-label="Mobile navigation">{navItems.map(([label, href]) => <a href={`#${href}`} key={href} onClick={closeMenu} aria-current={activeSection === href ? 'location' : undefined}>{label}</a>)}</nav>}
      </header>

      <main id="top">
        <section className="hero-section mx-auto flex max-w-[1440px] flex-col justify-between px-6 pb-14 pt-36 sm:px-10 sm:pt-44 lg:min-h-[850px] lg:px-16 lg:pb-16">
          <div className="hero-copy reveal">
            <p className="eyebrow">Software engineer <span>·</span> AI/ML <span>·</span> data</p>
            <p className="hero-identity mt-5">Ke Gong <span>|</span> Software Engineer | AI/ML &amp; Data Engineering</p>
            <h1 className="hero-title mt-8">Building intelligent<br /><span>digital experiences.</span></h1>
            <div className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="hero-intro">Hi, I'm Ke Gong.</p>
                <p className="body-copy mt-3 max-w-xl">I build dependable backend systems, practical AI applications, and computational tools for complex problems.</p>
                <div className="hero-actions mt-7 flex flex-wrap gap-5">
                  <a className="blue-link" href="#projects">Explore my work <ArrowUpRight size={14} /></a>
                  <a className="text-link" href="#contact">Get in touch <ArrowUpRight size={14} /></a>
                </div>
              </div>
              <a className="round-arrow" href="#projects" aria-label="Explore projects"><ArrowDown size={20} /></a>
            </div>
          </div>
          <div className="hero-foot reveal reveal-delay-1 mt-20 flex flex-col gap-5 border-t border-[var(--line)] pt-5 text-xs uppercase tracking-[0.16em] sm:flex-row sm:items-center sm:justify-between lg:mt-24">
            <span className="muted">Based in Scarborough, Ontario</span>
            <span className="muted">Currently at Nipissing University</span>
            <a className="blue-link" href="#contact">Available for thoughtful work <ArrowUpRight size={14} /></a>
          </div>
        </section>

        <section id="about" className="editorial-band">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 sm:px-10 lg:grid-cols-[0.65fr_1.35fr] lg:px-16 lg:py-36">
            <p className="eyebrow reveal">01 / About</p>
            <div className="reveal reveal-delay-1">
              <h2 className="statement-title">Engineering with a research mindset.</h2>
              <p className="body-copy mt-9 max-w-2xl text-lg sm:text-xl">My work sits between software engineering and computational research. I enjoy the part where a complex question becomes a clear model, a testable system, and a result people can use.</p>
              <div className="about-facts mt-16 grid gap-8 border-t border-[var(--line)] pt-6 sm:grid-cols-3">
                <div><span className="fact-label">Education</span><p className="mt-3">B.Sc. · University of Toronto<br />M.Sc. · Nipissing University</p></div>
                <div><span className="fact-label">Focus</span><p className="mt-3">Backend systems<br />AI applications<br />Optimization</p></div>
                <div><span className="fact-label">Approach</span><p className="mt-3">Practical engineering<br />Explainable results<br />Careful iteration</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section">
          <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
            <div className="section-heading reveal"><p className="eyebrow">02 / Experience</p><h2 className="section-title mt-6">Systems that do<br className="hidden sm:block" /> real work.</h2></div>
            <div className="experience-list mt-20">
              {experience.map((item, index) => <article className="experience-row reveal" key={item.company}>
                <div className="experience-number">02.{String(index + 1).padStart(2, '0')}</div>
                <div className="experience-main">
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-baseline"><h3 className="experience-role">{item.role}</h3><span className="experience-period">{item.period}</span></div>
                  <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row"><p className="experience-company">{item.company}</p><span className="experience-location">{item.location}</span></div>
                  <p className="experience-achievement mt-7">{item.achievement}</p>
                  <p className="body-copy mt-3 max-w-2xl">{item.summary}</p>
                  <details className="mt-7"><summary className="details-summary">View selected contributions <ChevronDown size={15} /></summary><ul className="contribution-list mt-5 grid gap-3 sm:grid-cols-2">{item.highlights.map((highlight) => <li key={highlight}><Check size={15} />{highlight}</li>)}</ul></details>
                  <p className="experience-tech mt-7">{item.technologies.join('  ·  ')}</p>
                </div>
              </article>)}
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
            <div className="section-heading reveal"><p className="eyebrow">03 / Selected work</p><h2 className="section-title mt-6">Ideas made<br className="hidden sm:block" /> tangible.</h2><div className="project-profile-links mt-8"><span>Public repositories</span><a className="blue-link" href="https://github.com/Tommy-Gong" target="_blank" rel="noreferrer">Tommy-Gong <ArrowUpRight size={14} /></a><a className="blue-link" href="https://github.com/TommyKeGong" target="_blank" rel="noreferrer">TommyKeGong <ArrowUpRight size={14} /></a></div></div>
            <div className="project-stack mt-20">
              <article className="project-feature project-feature-dark reveal">
                <div className="project-feature-copy">
                  <p className="project-kicker">03.01 / AI · knowledge systems</p>
                  <h3 className="project-title">{projects[0].title}</h3>
                  <p className="project-description">{projects[0].description}</p>
                  <details className="mt-8"><summary className="details-summary">Read technical notes <ChevronDown size={15} /></summary><p className="project-details mt-5">{projects[0].details}</p></details>
                  <p className="project-tech mt-9">{projects[0].technologies.join('  ·  ')}</p>
                </div>
                <div className="project-visual architecture-visual"><KnowledgeArchitecture /></div>
              </article>

              <article className="project-feature project-feature-light reveal">
                <div className="project-feature-copy">
                  <p className="project-kicker">03.02 / computational research</p>
                  <h3 className="project-title">{projects[1].title}</h3>
                  <p className="project-description">{projects[1].description}</p>
                  <details className="mt-8"><summary className="details-summary">Read research context <ChevronDown size={15} /></summary><p className="project-details mt-5">{projects[1].details}</p></details>
                  <p className="project-tech mt-9">{projects[1].technologies.join('  ·  ')}</p>
                  <ProjectLink href={projects[1].link} label={projects[1].linkLabel} />
                </div>
                <div className="project-visual optimization-visual"><OptimizationDiagram /></div>
              </article>
            </div>

            <div className="mt-24 reveal"><ECargoExplorer /></div>

            <div className="selected-projects mt-24 reveal">
              <div className="selected-projects-heading"><p className="eyebrow">Selected projects</p><p className="body-copy max-w-md">A smaller set of public repositories that add breadth across ML, data engineering, and full-stack development.</p></div>
              <div className="selected-project-list mt-10">{selectedProjects.map((project, index) => <article className="selected-project-row" key={project.title}>
                <span className="selected-project-number">03.{String(index + 4).padStart(2, '0')}</span>
                <div className="selected-project-copy"><p className="project-kicker">{project.label}</p><h3>{project.title}</h3><p className="body-copy mt-3 max-w-2xl">{project.description}</p><p className="selected-project-tech mt-5">{project.technologies.join('  ·  ')}</p><details className="mt-5"><summary className="details-summary">Curation note <ChevronDown size={15} /></summary><p className="project-details mt-4 max-w-2xl">{project.details}</p></details></div>
                <div className="selected-project-meta"><span>{project.note}</span><a className="blue-link" href={project.link} target="_blank" rel="noreferrer">{project.linkLabel} <ArrowUpRight size={14} /></a></div>
              </article>)}</div>
            </div>
          </div>
        </section>

        <section id="research" className="research-section editorial-band">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-24 sm:px-10 lg:grid-cols-[0.65fr_1.35fr] lg:px-16 lg:py-36">
            <div className="reveal"><p className="eyebrow">04 / Research</p><h2 className="section-title mt-6">Questions worth<br className="hidden sm:block" /> modeling.</h2><p className="body-copy mt-8 max-w-sm">Research is where I make assumptions explicit and look for useful structure in complex systems.</p></div>
            <div className="research-list reveal reveal-delay-1">{research.map((item, index) => <article className="research-row" key={item.title}><span className="research-number">04.{String(index + 1).padStart(2, '0')}</span><div><h3 className="research-title">{item.title}</h3><p className="research-status mt-3">{item.status}</p><p className="body-copy mt-4 max-w-2xl text-base">{item.description}</p>{item.link && <a className="blue-link mt-5 inline-flex" href={item.link} target="_blank" rel="noreferrer">{item.linkLabel} <ArrowUpRight size={14} /></a>}</div></article>)}</div>
          </div>
        </section>

        <section id="skills" className="skills-section">
          <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
            <div className="section-heading reveal"><p className="eyebrow">05 / Skills</p><h2 className="section-title mt-6">The tools behind<br className="hidden sm:block" /> the work.</h2></div>
            <div className="skills-list mt-20">{skillGroups.map((group) => <div className="skill-row reveal" key={group.name}><h3>{group.name}</h3><p>{group.skills.join('  ·  ')}</p></div>)}</div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 lg:px-16 lg:pb-36"><AIChatTeaser /></section>

        <section id="contact" className="contact-section">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-16 px-6 py-24 sm:px-10 lg:min-h-[680px] lg:px-16 lg:py-36">
            <div className="reveal"><p className="eyebrow">06 / Contact</p><h2 className="contact-title mt-8">Let's make something<br /><span>useful.</span></h2></div>
            <div className="flex flex-col justify-between gap-12 sm:flex-row sm:items-end reveal reveal-delay-1"><p className="max-w-md text-lg leading-8 text-white/65">Open to conversations about software engineering, backend systems, AI/ML, data engineering, and research opportunities.</p><div className="contact-links"><a href="mailto:gongketommy@gmail.com"><Mail size={17} /> gongketommy@gmail.com <ArrowUpRight size={14} /></a><details className="contact-github"><summary><Code2 size={17} /> GitHub <ChevronDown className="contact-github-chevron" size={15} /></summary><div className="contact-github-links"><a href="https://github.com/Tommy-Gong" target="_blank" rel="noreferrer"><span>Tommy-Gong</span><span className="contact-github-status">Previous</span><ArrowUpRight size={14} /></a><a href="https://github.com/TommyKeGong" target="_blank" rel="noreferrer"><span>TommyKeGong</span><span className="contact-github-status">Current</span><ArrowUpRight size={14} /></a></div></details><a href="https://www.linkedin.com/in/ke-gong-33454828b/" target="_blank" rel="noreferrer"><BriefcaseBusiness size={17} /> LinkedIn <ArrowUpRight size={14} /></a></div></div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 px-6 py-8 text-xs uppercase tracking-[0.16em] muted sm:flex-row sm:px-10 lg:px-16"><span>© {new Date().getFullYear()} Ke Gong</span><span>Software engineer · AI/ML · data</span><a className="footer-link" href="#top">Back to top ↑</a></footer>
    </div>
  )
}

export default App
