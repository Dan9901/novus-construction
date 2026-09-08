export type TeamMember = {
  name: string;
  role: string;
  isOwner?: boolean;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: "Owner Name",
    role: "Founder & Site Manager",
    isOwner: true,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, working on site with the team on every project.",
  },
  {
    name: "Team Member Name",
    role: "Lead Carpenter",
    bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.",
  },
  {
    name: "Team Member Name",
    role: "General Building & Finishing",
    bio: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde.",
  },
];
