import React from "react";

interface MinaraLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  variant?: "navy" | "white" | "monochrome";
}

export function MinaraLogo({ className = "h-16 w-auto", variant = "navy", ...props }: MinaraLogoProps) {
  const primaryColor = variant === "white" ? "#ffffff" : variant === "monochrome" ? "currentColor" : "#0A1C4E";
  const secondaryColor = variant === "white" ? "#e2e8f0" : variant === "monochrome" ? "currentColor" : "#1e293b";

  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Minara Chamber of Commerce Logo"
      role="img"
      {...props}
    >
      {/* Minara Arch & Monogram Emblem */}
      <g fill={primaryColor}>
        {/* Base horizontal plinth */}
        <rect x="85" y="168" width="150" height="14" rx="1.5" />
        
        {/* Outer Arch Monogram */}
        <path
          d="M160 62L204 98V162H182V124L160 102L138 124V162H116V98L160 62Z"
        />
        
        {/* Diamond Cap */}
        <path
          d="M160 52L188 75L160 98L132 75L160 52Z"
        />

        {/* Side Outer Wings */}
        <path
          d="M116 106L104 116V162H116V106Z"
        />
        <path
          d="M204 106L216 116V162H204V106Z"
        />
      </g>

      {/* MINARA Wordmark */}
      <g fill={primaryColor}>
        <text
          x="160"
          y="230"
          textAnchor="middle"
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 900,
            fontSize: "36px",
            letterSpacing: "0.14em",
          }}
        >
          MINARA
        </text>
      </g>

      {/* Chamber of Commerce Subtitle */}
      <g fill={secondaryColor}>
        <text
          x="160"
          y="256"
          textAnchor="middle"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 400,
            fontSize: "17px",
            letterSpacing: "0.02em",
          }}
        >
          Chamber <tspan fontStyle="italic" fontSize="15px">of</tspan> Commerce
        </text>
      </g>
    </svg>
  );
}

