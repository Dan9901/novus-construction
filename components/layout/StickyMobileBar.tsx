import { FileText, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const items = [
  { label: "Call", href: siteConfig.phoneHref, icon: Phone, accent: false },
  { label: "Email", href: siteConfig.emailHref, icon: Mail, accent: false },
  { label: "Get Quote", href: "/contact", icon: FileText, accent: true },
] as const;

export function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 divide-x divide-background/10 border-t border-background/10 bg-foreground text-background lg:hidden">
      {items.map(({ label, href, icon: Icon, accent }) => (
        <a
          key={label}
          href={href}
          className={`flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
            accent ? "bg-accent text-background" : "hover:text-accent"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden />
          {label}
        </a>
      ))}
    </div>
  );
}
