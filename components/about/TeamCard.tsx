import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/data/team";

export function TeamCard({ member, index = 0 }: { member: TeamMember; index?: number }) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden border bg-background",
        member.isOwner ? "border-accent" : "border-border"
      )}
    >
      <div className="relative">
        <PlaceholderImage
          label={member.name}
          category="team"
          ratio="aspect-[3/4]"
          index={index}
          showLabel={false}
        />
        {member.isOwner ? (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-background">
            Founder &amp; Owner
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-display text-xl font-medium tracking-tight">{member.name}</h3>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          {member.role}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{member.bio}</p>
      </div>
    </div>
  );
}
