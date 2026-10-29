import { Icon } from './Icons.jsx'

export default function Header({ t, lang, onLang, onTheme, onNav }) {
  return (
    <header className="header">
      <div className="brand">
        <span className="brand-seal" aria-hidden="true">
          <img
            src="/logo/logo.png"
            alt=""
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </span>
        <span className="brand-txt">
          <span className="brand-name">{t.brand.name}</span>
          <span className="brand-est">{t.brand.est}</span>
        </span>
      </div>

      <nav className="nav" aria-label="Main">
        {t.nav.map((item) => (
          <button key={item.id} onClick={() => onNav(item.id)}>{item.label}</button>
        ))}
      </nav>

      <div className="tools">
        <button className="tool-btn" onClick={onTheme} aria-label="Toggle theme" title="Dark / Light">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path className="moon-fill" d="M10.5 1.8a6.5 6.5 0 1 0 3.7 8.9A5.2 5.2 0 0 1 10.5 1.8Z" fill="currentColor" stroke="none" />
            <g className="sun-rays">
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.2 3.2l1.1 1.1M11.7 11.7l1.1 1.1M12.8 3.2l-1.1 1.1M4.3 11.7l-1.1 1.1" />
            </g>
          </svg>
        </button>
        <button className="tool-btn lang-btn" onClick={onLang} aria-label="Switch language" title={lang === 'en' ? 'العربية' : 'English'}>
          {lang === 'en' ? 'ع' : 'EN'}
        </button>
      </div>

      <span className="header-progress" aria-hidden="true" />
    </header>
  )
}

export function ArrowDown() {
  return <Icon name="arrow" size={20} />
}
