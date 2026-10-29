import { Icon } from './Icons.jsx'

export default function Services({ t }) {
  return (
    <section className="section" id="services" data-spy="1">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <h2 className="section-title rl"><span className="rl-in">{t.services.title}</span></h2>
          <p className="section-sub">{t.services.sub}</p>
        </header>

        <div className="services-grid">
          {t.services.items.map((s) => (
            <article className="service" key={s.title}>
              <span className="service-icon"><Icon name={s.icon} /></span>
              <div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
