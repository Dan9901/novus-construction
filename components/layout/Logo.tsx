import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, tone = "default" }: { className?: string; tone?: "default" | "dark" }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center", className)}
      aria-label="Novus Construction — Home"
    >
      <Image
        src={tone === "dark" ? "/logo-dark.png" : "/logo.png"}
        alt="Novus Construction"
        width={113}
        height={61}
        priority
        className="h-14 w-auto sm:h-16"
      />
    </Link>
  );
}
