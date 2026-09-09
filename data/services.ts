import type { PlaceholderCategory } from "@/lib/types";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string[];
  includes: string[];
  placeholderTag: string;
  placeholderCategory: PlaceholderCategory;
  /** Optional sample photo (path under /public) shown instead of the abstract placeholder. */
  image?: string;
};

export const services: Service[] = [
  {
    slug: "new-builds",
    title: "New Builds",
    shortDescription:
      "We plan and design new constructions to be functional and aesthetically pleasing, managed from foundation to finish.",
    description: [
      "We plan and design new constructions and renovations to be functional and aesthetically pleasing. From pre-construction services, where the practical aspects of the project are analysed, through construction management, planning and execution, to the post-construction phase, we're with you the whole way.",
      "Thanks to years of experience we can offer superior quality building at the most competitive rates, working closely with you so the experience is enjoyable from start to finish and beyond.",
    ],
    includes: [
      "Site preparation and groundworks",
      "Structural build and roofing",
      "First and second fix carpentry",
      "Coordination with architects and engineers",
      "Project management from start to finish",
    ],
    placeholderCategory: "house",
    placeholderTag: "New Build",
    image: "/samples/exterior-brick.jpg",
  },
  {
    slug: "extensions",
    title: "Home Extensions",
    shortDescription:
      "Single and two-storey extensions designed and built to expand your living space with lasting quality.",
    description: [
      "We combine expertise with innovation when we design and build the structural systems that give an extension its form and shape — creating with safety, economy and your vision in mind.",
      "From structural design through to full internal finishing, we manage every stage of your extension so it feels like a natural, seamless part of your home.",
    ],
    includes: [
      "Single and two-storey extensions",
      "Structural alterations and steel work",
      "Planning and building regulation support",
      "Seamless matching to existing structure",
      "Full internal finishing",
    ],
    placeholderCategory: "extension",
    placeholderTag: "Extension",
    image: "/samples/kitchen-exposed-beam.jpg",
  },
  {
    slug: "renovations",
    title: "Renovations",
    shortDescription:
      "We help you design and create spaces that reflect and express the uniqueness of the people living in your home.",
    description: [
      "You know what you want, what you like, and you can see the project in your mind's eye. We help bring it from inside your head into reality — and we do it in a way that means you're always in charge, even as we advise on what might not work, finding compromises in both design and cost.",
      "We aim to please, so that you can enjoy your home in exactly the way you envision it.",
    ],
    includes: [
      "Whole-home renovation",
      "Structural and cosmetic upgrades",
      "Electrical and plumbing coordination",
      "Period property sympathetic renovation",
      "Snagging and finishing detail",
    ],
    placeholderCategory: "renovation",
    placeholderTag: "Renovation",
  },
  {
    slug: "refurbishments",
    title: "Property Refurbishments",
    shortDescription:
      "Full refurbishment for tired or dated properties, carried out to the same standard as our new builds.",
    description: [
      "Thanks to years of experience we can offer superior quality refurbishment services at the most competitive rates, whatever the age or condition of the property.",
      "We work closely with you to make sure the experience is enjoyable from start to finish and beyond — when the vision is complete.",
    ],
    includes: [
      "Investment and rental property upgrades",
      "Full strip-out and rebuild",
      "Modernisation of dated interiors",
      "Energy efficiency improvements",
      "Fast, coordinated turnaround",
    ],
    placeholderCategory: "site",
    placeholderTag: "Refurbishment",
  },
  {
    slug: "kitchens",
    title: "Kitchens & Interiors",
    shortDescription:
      "The kitchen is for more than cooking — our fit-outs always reflect that this space is the hub of the home.",
    description: [
      "The kitchen is for more than cooking, and our fit-outs always reflect that this space is the hub of the home. It's the first room everyone wants to see when entering a home, and a space for family bonding — so we design it with your style and personality in mind.",
      "Every kitchen we fit is designed to be both functional and beautiful.",
    ],
    includes: [
      "Kitchen strip-out and installation",
      "Structural openings and steel beams",
      "Tiling, flooring and worktops",
      "Electrical and plumbing first fix",
      "Coordination with kitchen suppliers",
    ],
    placeholderCategory: "kitchen",
    placeholderTag: "Kitchen",
    image: "/samples/kitchen-modern.jpg",
  },
  {
    slug: "bathrooms",
    title: "Bathrooms",
    shortDescription:
      "Fully fitted bathrooms, designed and built to be both functional and beautiful.",
    description: [
      "As with every space in your home, your bathroom should be both functional and a true reflection of your style. We design and fit bathrooms with the same attention to detail we bring to every project.",
      "From layout and waterproofing through to fixtures and final finish, we manage the full process so the result is exactly what you envisioned.",
    ],
    includes: [
      "Full bathroom strip-out and refit",
      "Wet room and en-suite installation",
      "Waterproofing and tiling",
      "Plumbing and heating first fix",
      "Fixtures, fittings and finishing",
    ],
    placeholderCategory: "bathroom",
    placeholderTag: "Bathroom",
  },
  {
    slug: "general-building",
    title: "General Building",
    shortDescription:
      "Reliable general building work, backed by the same standards we bring to every project, however large or small.",
    description: [
      "Not every job is a full renovation or new build — we're also on hand for the smaller works and repairs that keep a home running well.",
      "We carry out this work in a way that's functional and aesthetically pleasing, with the same care and project management you'd expect from any of our larger builds.",
    ],
    includes: [
      "General repairs and maintenance",
      "Brickwork, blockwork and plastering",
      "Groundworks and landscaping support",
      "Small works and snagging",
      "Ad-hoc contractor support",
    ],
    placeholderCategory: "generic",
    placeholderTag: "General Building",
  },
  {
    slug: "structural-engineering",
    title: "Structural Engineering",
    shortDescription:
      "We research, plan and design structural systems to achieve your goals, and can meet any building challenge.",
    description: [
      "We combine expertise with innovation when we design and build the foundation that makes the form and shape of a home or a structure.",
      "We create with safety, economy and your vision in mind, and can meet any building challenge — from a single structural opening to full foundation design.",
    ],
    includes: [
      "Structural design and planning",
      "Foundation and load-bearing design",
      "Building-regulation compliant structural systems",
      "Support for new builds, extensions and renovations",
      "Safety and economy-focused engineering solutions",
    ],
    placeholderCategory: "site",
    placeholderTag: "Structural Engineering",
  },
  {
    slug: "grants",
    title: "Grants & SEAI Registered Works",
    shortDescription:
      "Novus Construction is an approved, registered contractor through the SEAI, helping clients access grant-supported home upgrades.",
    description: [
      "Novus Construction Ltd is an approved registered contractor through the SEAI. We carry out all the work clients can get grants for through their local authority — home renovations, home improvements, repair for leasing, better energy upgrades, piping and fitting, and solar panels and battery systems.",
      "We also adapt houses to suit people with disabilities, and to help older people stay in their own home for life.",
    ],
    includes: [
      "SEAI registered contractor status",
      "Better energy / retrofit upgrades",
      "Solar panel and battery system installation",
      "Local authority grant-supported works",
      "Adaptations for disabled and elderly access",
    ],
    placeholderCategory: "generic",
    placeholderTag: "Grants",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
