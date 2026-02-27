interface MascotProps {
  className?: string
  title?: string
}

export default function Mascot({ className, title = 'Little buddy' }: MascotProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="ls-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFDF7" />
          <stop offset="1" stopColor="#C1FAE7" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="46" fill="url(#ls-body)" stroke="#E8E6E3" strokeWidth="3" />
      <circle cx="44" cy="55" r="6" fill="#2C2C2C" />
      <circle cx="76" cy="55" r="6" fill="#2C2C2C" />
      <circle cx="41" cy="72" r="7" fill="#FFC1D8" opacity="0.65" />
      <circle cx="79" cy="72" r="7" fill="#FFC1D8" opacity="0.65" />
      <path
        d="M46 78c4 6 9 9 14 9s10-3 14-9"
        fill="none"
        stroke="#2C2C2C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M60 17c4 4 7 7 7 10 0 5-3 8-7 8s-7-3-7-8c0-3 3-6 7-10Z"
        fill="#FFC1D8"
        opacity="0.9"
      />
    </svg>
  )
}

