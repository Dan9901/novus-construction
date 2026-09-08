import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.1" cy="6.9" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden {...props}>
      <path d="M14.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.3-1.4 1.5-1.4h1.4V5.3C16.9 5.2 16 5 15 5c-2.2 0-3.7 1.3-3.7 3.8v2.2H9v2.8h2.3V21" />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <line x1="7.3" y1="10.2" x2="7.3" y2="16.2" />
      <circle cx="7.3" cy="7.4" r="0.4" fill="currentColor" />
      <path d="M11 16.2v-6M11 12.6c0-1.3.9-2.4 2.3-2.4 1.4 0 2.2 1 2.2 2.5v3.5" />
    </svg>
  );
}
