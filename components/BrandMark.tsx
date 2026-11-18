import React from "react";

interface BrandMarkProps {
  size?: number;
  className?: string;
}

export function BrandMark({ size = 36, className = "" }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* E bars in matte gold */}
      <rect x="6" y="10" width="28" height="9" fill="#D6A21E" />
      <rect x="6" y="27.5" width="22" height="9" fill="#D6A21E" />
      <rect x="6" y="45" width="28" height="9" fill="#D6A21E" />
      {/* G arc in crisp white */}
      <path
        d="M54 22C50.5 14.8 43 10 34 10H31V19H34C40.2 19 45.2 22.8 46.8 28H35V37H57V31C57 27.8 55.9 24.7 54 22Z"
        fill="#FFFFFF"
      />
      <path
        d="M34 45C29 45 24.7 42.3 22.4 38.2L14.8 43C18.7 49.6 25.8 54 34 54C45.8 54 55.4 45.4 57 34H47.6C46.2 40.3 40.6 45 34 45Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}
