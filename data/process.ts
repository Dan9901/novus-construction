export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Initial Consultation",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. We talk through your project, your goals and your budget.",
  },
  {
    number: "02",
    title: "Site Assessment",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A full survey of the site to understand scope and constraints.",
  },
  {
    number: "03",
    title: "Planning & Quote",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. A clear, itemised quote and project timeline.",
  },
  {
    number: "04",
    title: "Construction",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate. Skilled work carried out with regular updates throughout.",
  },
  {
    number: "05",
    title: "Completion",
    description:
      "Excepteur sint occaecat cupidatat non proident. A final walkthrough, snagging and handover of your finished space.",
  },
];
