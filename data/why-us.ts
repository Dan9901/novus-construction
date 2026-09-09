export type WhyUsPoint = {
  title: string;
  description: string;
  icon: "users" | "handshake" | "gem" | "search" | "phone-call" | "clipboard-check";
};

export const whyUsPoints: WhyUsPoint[] = [
  {
    title: "Experienced Team",
    description:
      "Our team consists of qualified and experienced construction professionals who strive to achieve the highest standard of quality and value.",
    icon: "users",
  },
  {
    title: "Personal Service",
    description:
      "You're always in charge. We help bring your vision to life and only build what works for you, in a way that's always unique and functional.",
    icon: "handshake",
  },
  {
    title: "Quality Workmanship",
    description:
      "Our work is art. Our service is outstanding, and the quality of the work we produce speaks for itself.",
    icon: "gem",
  },
  {
    title: "Attention to Detail",
    description:
      "We bring the same attention to detail and perfection to every project, whatever its size or scope.",
    icon: "search",
  },
  {
    title: "Reliable Communication",
    description:
      "We decided to listen, and we've continued to listen ever since — making sure it's your design throughout the process.",
    icon: "phone-call",
  },
  {
    title: "End-to-End Support",
    description:
      "From pre-construction planning through construction management to the post-construction phase, we're with you the whole way.",
    icon: "clipboard-check",
  },
];
