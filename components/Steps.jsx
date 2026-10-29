export default function Steps({ t }) {
  return (
    <section className="section" id="steps" data-spy="2">
      {/* .steps-pin is the ScrollTrigger pin target on desktop */}
      <div className="wrap steps-pin">
        <header className="section-head">
          <h2 className="section-title rl"><span className="rl-in">{t.steps.title}</span></h2>
          <p className="section-sub">{t.steps.sub}</p>
        </header>

        <div className="steps-track">
          <span className="steps-rail" aria-hidden="true" />
          <span className="steps-fill" aria-hidden="true" />
          {t.steps.items.map((s) => (
            <div className="step" key={s.n}>
              <span className="step-n">{s.n}</span>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
