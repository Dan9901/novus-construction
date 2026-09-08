export type WhyUsPoint = {
  title: string;
  description: string;
  icon: "users" | "handshake" | "gem" | "search" | "phone-call" | "clipboard-check";
};

export const whyUsPoints: WhyUsPoint[] = [
  {
    title: "Experienced Team",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    icon: "users",
  },
  {
    title: "Personal Service",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
    icon: "handshake",
  },
  {
    title: "Quality Workmanship",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
    icon: "gem",
  },
  {
    title: "Attention to Detail",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    icon: "search",
  },
  {
    title: "Reliable Communication",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    icon: "phone-call",
  },
  {
    title: "End-to-End Support",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    icon: "clipboard-check",
  },
];
