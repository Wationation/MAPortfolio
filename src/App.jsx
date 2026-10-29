import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STR } from './i18n.js'
import Particles from './components/Particles.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Steps from './components/Steps.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)

const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const [lang, setLang] = useState(() =>
    (navigator.language || 'ar').toLowerCase().startsWith('ar') ? 'ar' : 'en',
  )
  const [theme, setTheme] = useState('dark')
  const t = STR[lang]
  const rootRef = useRef(null)

  /* ── Particles scroll-driven state (plain refs → zero re-renders) ──
     morph: eased along scroll progress · boost: fired by scroll velocity */
  const pfMorph = useRef({
    camera: 20, speed: 0.35, glow: 0.65, opacity: 0.55,
    driftSpeed: 0.5, connections: false, connectionDistance: 10,
  })
  const pfBoost = useRef({ v: 0 })
  const pfDim = useRef(1) // theme dimmer (light theme = softer field)
  const pfDynamic = () => {
    const m = pfMorph.current
    const b = pfBoost.current.v
    const d = pfDim.current
    return {
      camera: m.camera,
      speed: m.speed + b * 1.6,
      glow: (m.glow + b * 0.5) * d,
      opacity: Math.min(1, m.opacity * d + b * 0.25),
      twinkle: Math.min(1, 0.35 + b * 0.4),
      driftSpeed: m.driftSpeed + b * 9,
      connections: m.connections,
      connectionDistance: m.connectionDistance,
    }
  }

  const particleProps = theme === 'dark'
    ? {
        particleColors: ['#d9ae5f', '#f4e3bd', '#a87f2f'],
        lightMode: false,
        glow: 0.65,
        opacity: 0.55,
      }
    : {
        particleColors: ['#96690f', '#5c3d05', '#c19a2e'],
        lightMode: true,
        glow: 1.5,
        opacity: 0.6,
      }

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('lang', lang)
    html.setAttribute('dir', t.dir)
    document.title = t.docTitle
  }, [lang, t])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    pfDim.current = theme === 'dark' ? 1 : 0.85
    const m = document.querySelector('meta[name="theme-color"]')
    if (m) m.setAttribute('content', theme === 'dark' ? '#0e0d0b' : '#f6f2e9')
  }, [theme])

  /* ── animation engine ────────────────────────────────────────── */
  useLayoutEffect(() => {
    const root = rootRef.current
    const q = gsap.utils.selector(root)

    if (REDUCE) {
      gsap.set('[data-reveal], .rl-in, .word', { clearProps: 'all', opacity: 1 })
      const fill = root.querySelector('.steps-fill')
      const bar = root.querySelector('.header-progress')
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - innerHeight
        const p = max > 0 ? Math.min(1, scrollY / max) : 0
        if (bar) bar.style.transform = `scaleX(${p})`
        if (fill) {
          const r = fill.parentElement.getBoundingClientRect()
          const fp = Math.min(1, Math.max(0, (innerHeight * 0.8 - r.top) / (r.height + innerHeight * 0.2)))
          fill.style.transform = `scaleX(${fp})`
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      return () => window.removeEventListener('scroll', onScroll)
    }

    let decayFn = null
    let skewFn = null
    const ctx = gsap.context(() => {
      /* ---- intro: the page assembles over the particle field ---- */
      gsap.set(q('.header'), { autoAlpha: 0, y: -12 })
      gsap.set(q('.header-progress'), { scaleX: 0 })
      gsap.set(q('.hero-greet, .hero-tag, .hero-ctas, .hero-chips'), { autoAlpha: 0, y: 24 })
      gsap.set(q('.hero-name .word'), { yPercent: 130 })
      gsap.set(q('.hero-rule'), { scaleX: 0 })
      gsap.set(q('.scroll-hint'), { autoAlpha: 0 })

      gsap
        .timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })
        .to(q('.header'), { autoAlpha: 1, y: 0, duration: 0.6 }, 0)
        .to(q('.hero-greet'), { autoAlpha: 1, y: 0, duration: 0.6 }, 0.15)
        .to(q('.hero-name .word'), { yPercent: 0, duration: 0.9, stagger: 0.12, ease: 'power4.out' }, 0.3)
        .to(q('.hero-rule'), { scaleX: 1, duration: 0.7, ease: 'power4.out' }, 0.75)
        .to(q('.hero-tag'), { autoAlpha: 1, y: 0, duration: 0.7 }, 0.55)
        .to(q('.hero-ctas'), { autoAlpha: 1, y: 0, duration: 0.7 }, 0.7)
        .to(q('.hero-chips'), { autoAlpha: 1, y: 0, duration: 0.7 }, 0.82)
        .to(q('.scroll-hint'), { autoAlpha: 1, duration: 0.6 }, 1.3)

      /* ---- hero: lifts, shrinks and dissolves as you leave it ---- */
      gsap.to(q('.hero-copy')[0], {
        y: -140,
        scale: 0.96,
        autoAlpha: 0,
        transformOrigin: '50% 0%',
        ease: 'none',
        scrollTrigger: { trigger: q('.hero')[0], start: 'top top', end: 'bottom 22%', scrub: 0.4 },
      })
      gsap.to(q('.scroll-hint')[0], {
        autoAlpha: 0, y: 16, ease: 'none',
        scrollTrigger: { trigger: q('.hero')[0], start: 'top top', end: '15% top', scrub: true },
      })

      /* ---- the whole particle field sinks slower than the page (depth) ---- */
      gsap.fromTo(q('.pf-bg')[0], { yPercent: 0 }, {
        yPercent: 11, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      })

      /* ---- generic reveals ---- */
      q('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })
      q('.rl-in').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 115 },
          {
            yPercent: 0, duration: 1, ease: 'power4.out',
            scrollTrigger: { trigger: el.closest('.rl') || el, start: 'top 88%', once: true },
          },
        )
      })
      q('[data-stagger]').forEach((group) => {
        gsap.fromTo(
          group.children,
          { autoAlpha: 0, y: 26, scale: 0.97 },
          {
            autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: group, start: 'top 84%', once: true },
          },
        )
      })

      /* ---- section titles drift sideways with the scroll ---- */
      q('.section-title').forEach((el) => {
        gsap.fromTo(el, { xPercent: -2.2 }, {
          xPercent: 2.2, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        })
      })

      /* ---- services: cards swing in with 3D tilt, icons float on scroll ---- */
      gsap.fromTo(
        q('.service'),
        { autoAlpha: 0, y: 34, rotationX: 10, transformPerspective: 900 },
        {
          autoAlpha: 1, y: 0, rotationX: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: q('.services-grid')[0], start: 'top 82%', once: true },
        },
      )
      q('.service').forEach((el, i) => {
        const icon = el.querySelector('.service-icon')
        if (!icon) return
        gsap.fromTo(icon, { y: i % 2 ? 24 : -24 }, {
          y: i % 2 ? -24 : 24, ease: 'none',
          scrollTrigger: { trigger: q('.services-grid')[0], start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        })
      })

      /* ---- steps: PINNED sequence on desktop — rail draws, steps pop, then float ---- */
      const mm = gsap.matchMedia()
      mm.add('(min-width: 901px)', () => {
        const pinEl = q('.steps-pin')[0]
        const fill = q('.steps-fill')[0]
        const steps = q('.step')
        if (!pinEl || !fill) return
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinEl,
            start: 'top 72%',
            end: '+=90%',
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            onUpdate(self) {
              steps.forEach((st, i) => st.classList.toggle('lit', self.progress >= (i + 0.55) / 3))
            },
          },
        })
        tl.fromTo(steps, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.55, ease: 'power3.out' }, 0.1)
        tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 4.3 }, 0)
        tl.to(steps, { y: -22, ease: 'none', duration: 1.6, stagger: 0.4 }, 1.9)
      })
      mm.add('(max-width: 900px)', () => {
        const track = q('.steps-track')[0]
        const fill = q('.steps-fill')[0]
        const steps = q('.step')
        if (track && fill) {
          gsap.to(fill, {
            scaleX: 1, ease: 'none',
            scrollTrigger: { trigger: track, start: 'top 78%', end: 'bottom 55%', scrub: 0.5 },
          })
        }
        gsap.fromTo(
          steps,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: track, start: 'top 82%', once: true },
          },
        )
        steps.forEach((st) => {
          ScrollTrigger.create({
            trigger: st, start: 'top 70%',
            onEnter: () => st.classList.add('lit'),
            onLeaveBack: () => st.classList.remove('lit'),
          })
        })
      })

      /* ---- contact: ghost word drifts in from off-screen left, settles
              centre-stage long enough to read, then fades out before the
              footer arrives ---- */
      const ghost = q('.contact-ghost')[0]
      const ghostOffX = () =>
        -(document.documentElement.clientWidth + ghost.offsetWidth) / 2
      gsap.timeline({
        scrollTrigger: {
          trigger: q('.contact')[0],
          start: 'top bottom',
          end: 'max',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(ghost, { xPercent: -50, x: ghostOffX }, { x: 0, duration: 0.28, ease: 'power2.out' }, 0)
        .fromTo(ghost, { x: 0, autoAlpha: 1 }, { x: 90, autoAlpha: 0, duration: 0.18, ease: 'power1.in', immediateRender: false }, 0.82)
      gsap.fromTo(q('.channels')[0], { y: 44 }, {
        y: -44, ease: 'none',
        scrollTrigger: { trigger: q('.contact')[0], start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      })

      /* ---- footer reveal ---- */
      gsap.fromTo(q('.footer-in')[0].children, { autoAlpha: 0, y: 18 }, {
        autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: q('.footer')[0], start: 'top 94%', once: true },
      })

      /* ---- header scroll-spy ---- */
      const navBtns = document.querySelectorAll('.nav button')
      q('[data-spy]').forEach((sec, i) => {
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (!self.isActive) return
            navBtns.forEach((b, bi) => b.classList.toggle('active', bi === i))
          },
        })
      })

      /* ---- velocity skew: headlines lean subtly with scroll speed ---- */
      const skewTargets = [q('.hero-name')[0], ...q('.section-title'), q('.contact-title')[0]].filter(Boolean)
      const skewSet = skewTargets.map((el) => gsap.quickTo(el, 'skewX', { duration: 0.5, ease: 'power3.out' }))
      const skewState = { v: 0, idle: true }
      skewFn = () => {
        skewState.v *= 0.86
        const v = skewState.v
        if (Math.abs(v) > 0.01) {
          skewState.idle = false
          skewSet.forEach((set) => set(v))
        } else if (!skewState.idle) {
          skewState.idle = true
          skewSet.forEach((set) => set(0))
        }
      }
      gsap.ticker.add(skewFn)

      /* ---- master progress: header bar + particle morph + velocity boost ---- */
      const bar = root.querySelector('.header-progress')
      const m = pfMorph.current
      const boost = pfBoost.current
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate(self) {
          const p = self.progress
          if (bar) bar.style.transform = `scaleX(${p})`
          m.camera = 20 - p * 11 // dolly into the field as you descend
          m.speed = 0.35 + p * 0.55
          m.glow = 0.65 + p * 0.45
          m.opacity = 0.55 + p * 0.35
          m.driftSpeed = 0.5 + p * 2.3 // the rising stream accelerates
          m.connections = p > 0.6 // constellation links up near the contact section
          m.connectionDistance = p < 0.66 ? 10 : 10 + Math.min(1, (p - 0.66) / 0.16) * 125
          const vel = self.getVelocity()
          const sv = gsap.utils.clamp(-1.3, 1.3, vel / -2600)
          if (Math.abs(sv) > Math.abs(skewState.v) || !skewState.idle) skewState.v = sv
          const fast = Math.abs(vel)
          if (fast > 700) boost.v = Math.min(1.6, (fast - 700) / 1500)
        },
      })
      const decay = () => { boost.v *= 0.9 }
      gsap.ticker.add(decay)
      decayFn = decay

      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    }, root)

    return () => {
      if (decayFn) gsap.ticker.remove(decayFn)
      if (skewFn) gsap.ticker.remove(skewFn)
      ctx.revert()
    }
  }, [lang, t])

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: REDUCE ? 'auto' : 'smooth' })

  return (
    <div ref={rootRef}>
      <div className="pf-bg" aria-hidden="true">
        <Particles
          {...particleProps}
          particleCount={180}
          particleSpread={10}
          speed={0.35}
          particleBaseSize={90}
          sizeRandomness={1}
          cameraDistance={20}
          twinkle={0.35}
          shape="circle"
          moveParticlesOnHover
          hoverEffect="parallax"
          hoverFactor={1.2}
          hoverRadius={170}
          clickBurst
          drift="up"
          driftSpeed={0.5}
          intro
          paused={REDUCE}
          dynamic={REDUCE ? null : pfDynamic}
        />
      </div>

      <Header t={t} lang={lang} onLang={() => setLang(l => l === 'en' ? 'ar' : 'en')} onTheme={() => setTheme(x => x === 'dark' ? 'light' : 'dark')} onNav={go} />
      <main>
        <Hero t={t} onNav={go} />
        <Services t={t} />
        <Steps t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
      <div className="noise" aria-hidden="true" />
    </div>
  )
}
