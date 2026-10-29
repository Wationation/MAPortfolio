import { Icon } from './Icons.jsx'

/**
 * Hero — pure typography over the Lightfall tunnel.
 * The name renders as word masks so GSAP can reveal it word by word
 * (safe for Arabic letter shaping — we never split inside a word).
 */
export default function Hero({ t, onNav }) {
  const whatsapp =
    (t.contact.channels.find((c) => c.icon === 'whatsapp') ?? t.contact.channels[0]).href
  const words = t.hero.name.split(' ')

  return (
    <section className="hero" id="home" data-spy="0">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-greet">{t.hero.greet}</p>
          <h1 className="hero-name" aria-label={t.hero.name}>
            {words.map((w, i) => (
              <span className="wmask" key={i} aria-hidden="true">
                <span className="word">{w}</span>
              </span>
            ))}
          </h1>
          <span className="hero-rule" aria-hidden="true" />
          <p className="hero-tag">{t.hero.tag}</p>

          <div className="hero-ctas">
            <button className="btn btn--solid" onClick={() => onNav('contact')}>
              {t.hero.cta1}
            </button>
            <a className="btn" href={whatsapp} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" />
              {t.hero.cta2}
            </a>
          </div>

          <div className="hero-chips">
            {t.hero.chips.map((c) => (
              <span key={c}>
                <Check />
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 9.5 12 17l8-7.5" />
        </svg>
      </div>
    </section>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 12.5 10 18 19.5 7" />
    </svg>
  )
}
