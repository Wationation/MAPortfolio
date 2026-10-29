export default function Footer({ t }) {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <span>© {year} {t.brand.name} — {t.footer.city}</span>
      </div>
    </footer>
  )
}
