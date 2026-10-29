/** Small stroke-icon library — plain, universally readable shapes. */
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function Icon({ name, size = 26 }) {
  const p = { ...base, width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true }
  switch (name) {
    case 'building':
      return (
        <svg {...p}>
          <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5V21" />
          <path d="M14 9h4.5A1.5 1.5 0 0 1 20 10.5V21" />
          <path d="M2.5 21h19" />
          <path d="M7 8h1.5M9.5 8H11M7 11.5h1.5M9.5 11.5H11M7 15h1.5M9.5 15H11" />
          <path d="M16.5 12.5h1M16.5 15.5h1M10 21v-3" />
        </svg>
      )
    case 'bag':
      return (
        <svg {...p}>
          <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
          <path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...p}>
          <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
          <path d="M3.5 9.5h17M8 2.8V6.4M16 2.8V6.4" />
          <path d="M9.5 14.5l2 2 3.5-3.5" />
        </svg>
      )
    case 'gauge':
      return (
        <svg {...p}>
          <path d="M4.5 18.5a8.5 8.5 0 1 1 15 0" />
          <path d="M12 13.5 16 8.5" />
          <circle cx="12" cy="14.5" r="1.6" />
          <path d="M3.5 18.5h17" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg {...p} strokeWidth="1.5">
          <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 21l4.8-1.2A8.8 8.8 0 1 0 12 3.2Z" />
          <path d="M8.8 8.4c-.4 1.9 1.2 4.9 3.4 6.3 1.6 1 3 .9 3.4.3.3-.4.4-1.1.2-1.4l-1.6-.9c-.4-.2-.8 0-1 .3l-.5.6c-.7-.3-2.3-1.6-2.8-2.9l.7-.5c.3-.2.4-.6.2-1l-.8-1.5c-.2-.4-.9-.3-1.2.7Z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...p}>
          <path d="M5.5 3.5h3l1.5 4-2 1.5a12.5 12.5 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3.5 5.5a2 2 0 0 1 2-2Z" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
        </svg>
      )
    case 'copy':
      return (
        <svg {...p}>
          <rect x="8.5" y="8.5" width="12" height="12" rx="2" />
          <path d="M5.5 15.5h-1a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
        </svg>
      )
    case 'arrow':
      return (
        <svg {...p}>
          <path d="M4 12h16M13 5l7 7-7 7" />
        </svg>
      )
    default:
      return null
  }
}
