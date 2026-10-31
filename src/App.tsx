import { useState, useEffect } from 'react'
import './App.css'

// Icons as simple SVG components
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Próximamente...",
    date: "2026",
    excerpt: "Aquí iré compartiendo ideas sobre producto, desarrollo y todo lo que vaya aprendiendo.",
    slug: "#"
  }
]

const projects = [
  {
    name: 'worldcup-2026',
    description: 'Porra web del Mundial 2026 entre amigos: fase de grupos y playoffs con sistema 1-X-2, bonus Bota de Oro y ranking automático.',
    stack: ['TypeScript', 'PostgreSQL', 'Vercel'],
    repo: 'https://github.com/niicogrc/worldcup-2026',
    demo: 'https://worldcup-2026-niicogrcs-projects.vercel.app',
  },
  {
    name: 'telegram-nutricion-bot',
    description: 'Bot de Telegram con IA que manda cada mañana el menú del día y resuelve dudas de intercambios de comida. Corre 24/7 en producción.',
    stack: ['Python', 'Claude API', 'Railway'],
    repo: 'https://github.com/niicogrc/telegram-nutricion-bot',
  },
  {
    name: 'CompressedBlocksPlugin',
    description: 'Plugin de Paper para Minecraft que comprime bloques 9:1 por niveles y los descomprime con el crafteo vanilla.',
    stack: ['Java', 'Paper'],
    repo: 'https://github.com/niicogrc/CompressedBlocksPlugin',
  },
  {
    name: 'portfolio',
    description: 'Esta misma web: React + Vite con estética de terminal.',
    stack: ['React', 'TypeScript', 'Vite'],
    repo: 'https://github.com/niicogrc/portfolio',
  },
]

const TYPED_COMMAND = 'whoami'

function Prompt({ path = '~', children }: { path?: string; children: React.ReactNode }) {
  return (
    <p className="prompt" aria-hidden="false">
      <span className="prompt-user">nico@valencia</span>
      <span className="prompt-sep">:</span>
      <span className="prompt-path">{path}</span>
      <span className="prompt-dollar">$</span>
      <span className="prompt-cmd">{children}</span>
    </p>
  )
}

function monthsSince(year: number, monthIndex: number) {
  const now = new Date()
  const total = (now.getFullYear() - year) * 12 + now.getMonth() - monthIndex
  const years = Math.floor(total / 12)
  const months = total % 12
  const parts = []
  if (years) parts.push(`${years} ${years === 1 ? 'año' : 'años'}`)
  if (months) parts.push(`${months} ${months === 1 ? 'mes' : 'meses'}`)
  return parts.join(' ') || 'menos de un mes'
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
      return saved || 'dark'
    }
    return 'dark'
  })
  const [typed, setTyped] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? TYPED_COMMAND : ''
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (typed.length >= TYPED_COMMAND.length) return
    const id = setTimeout(() => setTyped(TYPED_COMMAND.slice(0, typed.length + 1)), 110)
    return () => clearTimeout(id)
  }, [typed])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const done = typed.length >= TYPED_COMMAND.length

  return (
    <div className="container">
      <div className="term">
        <header className="term-bar">
          <div className="term-dots" aria-hidden="true">
            <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
          </div>
          <span className="term-title">nico@valencia: ~ — zsh</span>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </header>

        <nav className="navbar" aria-label="Secciones">
          <a href="#about" className="nav-link">about.md</a>
          <a href="#experience" className="nav-link">experience/</a>
          <a href="#projects" className="nav-link">projects/</a>
          <a href="#blog" className="nav-link">blog/</a>
          <a href="#contact" className="nav-link">contact.sh</a>
        </nav>

        <main className="main">
          {/* Hero */}
          <section className="hero fade-in" id="hero">
            <div className="hero-content">
              <p className="prompt">
                <span className="prompt-user">nico@valencia</span>
                <span className="prompt-sep">:</span>
                <span className="prompt-path">~</span>
                <span className="prompt-dollar">$</span>
                <span className="prompt-cmd">{typed}</span>
                {!done && <span className="cursor" aria-hidden="true" />}
              </p>
              <h1 className="hero-title">
                Buenas! Me llamo <span className="highlight">Nico García</span>
              </h1>
              <p className="hero-description">
                <span className="highlight">Product Engineer</span> en <span className="company">Shakers</span>.
                De Valencia, España 🇪🇸. Especializado en convertir ideas en productos que funcionan.
              </p>
              <Prompt>
                <span className="cmd-name">open</span> <span className="cmd-flag">--links</span>
              </Prompt>
              <div className="hero-buttons" id="contact">
                <a href="mailto:nicogtdm@gmail.com" className="btn btn-primary">
                  <MailIcon />
                  Contáctame
                </a>
                <a href="https://www.linkedin.com/in/nicolasgarciacosta/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <a href="https://github.com/niicogrc" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <GitHubIcon />
                  GitHub
                </a>
              </div>
            </div>
            <div className="hero-avatar">
              <img src="/nico1.jpg" alt="Nico García" />
              <span className="avatar-caption">nico1.jpg</span>
            </div>
          </section>

          {/* About */}
          <section className="section fade-in" id="about" style={{ animationDelay: '0.2s' }}>
            <Prompt><span className="cmd-name">cat</span> about.md</Prompt>
            <div className="about-card">
              <h2 className="section-title"># Sobre mí</h2>
              <p className="about-text">
                Vivo en <span className="highlight">Valencia</span>. Cuando no estoy programando,
                me encontrarás en el <span className="highlight">gym</span>, jugando
                <span className="highlight"> videojuegos</span> o escuchando <span className="highlight">música</span>.
              </p>
            </div>
          </section>

          {/* Work */}
          <section className="section fade-in" id="experience" style={{ animationDelay: '0.25s' }}>
            <Prompt><span className="cmd-name">git</span> log <span className="cmd-flag">--experience</span></Prompt>
            <h2 className="section-title"># Experiencia</h2>

            {/* Shakers */}
            <div className="work-item">
              <div className="work-timeline">
                <div className="work-dot"></div>
                <div className="work-line"></div>
              </div>
              <div className="work-content">
                <div className="work-header">
                  <img src="/Shakers_logo.png" alt="Shakers" className="work-logo" />
                  <span className="work-company">Shakers</span>
                  <span className="work-badge">HEAD → actualmente</span>
                </div>
                <p className="work-role">Product Engineer</p>
                <p className="work-period">jul. 2025 - actualidad · {monthsSince(2025, 6)}</p>
                <p className="work-description">
                  Desarrollo de soluciones de alto impacto como parte del equipo de Producto.
                  Trabajando con metodología de sprints en un equipo dual, enfocado en IA, desarrollo full stack y mejora continua.
                </p>
                <div className="work-subrole">
                  <p className="work-role">Empleado en prácticas</p>
                  <p className="work-period">feb. 2025 - jul. 2025 · 6 meses</p>
                </div>
              </div>
            </div>

            {/* Microsoft */}
            <div className="work-item">
              <div className="work-timeline">
                <div className="work-dot work-dot-secondary"></div>
                <div className="work-line"></div>
              </div>
              <div className="work-content">
                <div className="work-header">
                  <img src="/Microsoft_logo.svg" alt="Microsoft" className="work-logo" />
                  <span className="work-company">Microsoft</span>
                </div>
                <p className="work-role">Junior Ambassador</p>
                <p className="work-period">feb. 2025 - jul. 2025 · 6 meses</p>
                <p className="work-description">
                  Apoyo al equipo de Copilot AI Adoption y Product Led Growth.
                  Ayudando a impulsar la integración de herramientas de IA generativa en diversas unidades de negocio.
                </p>
                <div className="work-skills">
                  <span className="skill-tag">IA</span>
                  <span className="skill-tag">Copilot Studio</span>
                </div>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="section fade-in" id="projects" style={{ animationDelay: '0.28s' }}>
            <Prompt><span className="cmd-name">ls</span> <span className="cmd-flag">-la</span> projects/</Prompt>
            <h2 className="section-title"># Proyectos</h2>
            <div className="project-grid">
              {projects.map(project => (
                <article key={project.name} className="project-card">
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="work-skills">
                    {project.stack.map(tech => (
                      <span key={tech} className="skill-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.repo} target="_blank" rel="noopener noreferrer">[código]</a>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">[demo]</a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Blog */}
          <section className="section fade-in" id="blog" style={{ animationDelay: '0.3s' }}>
            <Prompt><span className="cmd-name">ls</span> <span className="cmd-flag">-la</span> blog/</Prompt>
            <h2 className="section-title"># Blog</h2>
            <div className="blog-list">
              {blogPosts.map(post => (
                <article key={post.id} className="blog-post">
                  <div className="blog-header">
                    <h3 className="blog-title">{post.title}</h3>
                    <span className="blog-date">{post.date}</span>
                  </div>
                  <p className="blog-excerpt">{post.excerpt}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section end-prompt">
            <Prompt>
              <span className="cursor" aria-hidden="true" />
            </Prompt>
          </section>
        </main>

        <footer className="footer">
          <p>built with care · 2026</p>
        </footer>
      </div>
    </div>
  )
}

export default App
