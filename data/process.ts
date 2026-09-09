export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "We talk through your vision for the project, your goals and your budget.",
  },
  {
    number: "02",
    title: "Site Assessment",
    description: "A full survey of the site to understand the practical aspects, scope and constraints.",
  },
  {
    number: "03",
    title: "Planning & Quote",
    description: "A clear, itemised quote and project timeline, with compromises in design and cost always agreed with you.",
  },
  {
    number: "04",
    title: "Construction",
    description: "Skilled work carried out with regular updates throughout, so you're always in charge.",
  },
  {
    number: "05",
    title: "Completion",
    description: "A final walkthrough, snagging and handover — the vision complete.",
  },
];
