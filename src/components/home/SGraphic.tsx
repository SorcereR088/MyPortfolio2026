type SGraphicProps = { className?: string };

export default function SGraphic({ className }: SGraphicProps) {
  return (
    <svg
      viewBox="660 0 700 708"
      preserveAspectRatio="xMaxYMid slice"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="s-gradient"
          gradientUnits="userSpaceOnUse"
          x1="760"
          y1="0"
          x2="1300"
          y2="708"
        >
          <stop offset="0" stopColor="#BDFFD0" />
          <stop offset="0.55" stopColor="#8BFFA8" />
          <stop offset="1" stopColor="#47A369" />
        </linearGradient>
      </defs>

      {/* Main S stroke */}
      <path
        d="M 790 -30
           C 762 70, 735 170, 738 260
           C 742 360, 780 462, 900 462
           C 1000 462, 1100 440, 1180 432
           C 1250 424, 1304 450, 1304 510
           C 1304 580, 1240 650, 1198 708
           L 1170 760"
        stroke="url(#s-gradient)"
        strokeWidth="54"
        strokeLinejoin="round"
      />

      {/* Top-right tip */}
      <path
        d="M 1050 -20 L 1122 -20
           C 1118 60 1100 120 1090 148
           C 1080 168 1052 160 1052 140
           C 1052 110 1050 50 1050 -20 Z"
        fill="url(#s-gradient)"
      />
    </svg>
  );
}