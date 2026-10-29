import { useRef, useState } from 'react'
import { Icon } from './Icons.jsx'

export default function Contact({ t }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  const email = t.contact.channels.find((c) => c.icon === 'mail')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email.value)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = email.value
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="section contact" id="contact" data-spy="3">
      <span className="contact-ghost" aria-hidden="true">{t.contact.ghost}</span>
      <div className="wrap contact-inner">
        <h2 className="contact-title" data-reveal>
          {t.contact.titleA}
          <br />
          <span className="ghost">{t.contact.titleB}</span>
        </h2>
        <p className="contact-sub" data-reveal>{t.contact.sub}</p>

        <div className="channels" data-stagger>
          {t.contact.channels.map((c) => (
            <a
              className={`channel${c.primary ? ' channel--primary' : ''}`}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
              key={c.icon}
            >
              <span className="channel-icon"><Icon name={c.icon} /></span>
              <div>
                <span className="channel-name">{c.name}</span>
                <span className="channel-value">{c.value}</span>
                {c.icon === 'mail' && (
                  <button
                    className={`copy-btn channel-copy${copied ? ' done' : ''}`}
                    onClick={(e) => { e.preventDefault(); copyEmail() }}
                    aria-live="polite"
                  >
                    <Icon name="copy" size={14} />
                    {copied ? t.contact.copied : t.contact.copy}
                  </button>
                )}
              </div>
            </a>
          ))}
        </div>

        <p className="contact-note" data-reveal>
          <span className="pulse" aria-hidden="true" />
          {t.contact.avail}
        </p>
      </div>
    </section>
  )
}
