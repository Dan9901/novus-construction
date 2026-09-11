import type { PlaceholderCategory } from "@/lib/types";

export type ProjectCategory =
  | "new-builds"
  | "extensions"
  | "renovations"
  | "interiors";

export const projectCategories: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new-builds", label: "New Builds" },
  { value: "extensions", label: "Extensions" },
  { value: "renovations", label: "Renovations" },
  { value: "interiors", label: "Interiors" },
];

export const projectCategoryPlaceholder: Record<ProjectCategory, PlaceholderCategory> = {
  "new-builds": "house",
  extensions: "extension",
  renovations: "renovation",
  interiors: "interior",
};

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  categoryLabel: string;
  location: string;
  duration: string;
  scope: string;
  summary: string;
  description: string[];
  galleryCount: number;
  /** Optional sample photo (path under /public) shown instead of the abstract placeholder. */
  image?: string;
  /** Optional real gallery photos (path under /public). When set, these replace the abstract gallery placeholders. */
  images?: { src: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "house-x",
    name: "House X",
    category: "renovations",
    categoryLabel: "Residential Renovation",
    location: "Co. Dublin, Ireland",
    duration: "14 weeks",
    scope: "Full internal renovation",
    summary:
      "A full renovation bringing a dated family home up to a modern standard, with a new open-plan kitchen and living space at its heart.",
    description: [
      "This project began with a full strip-out of the existing layout, which no longer suited how the family lived day to day. Working closely with the homeowners, we redesigned the ground floor around an open-plan kitchen and living space, removing internal walls to bring in more light and improve the flow between rooms.",
      "New electrics, plumbing and insulation were installed throughout, along with fresh plastering, flooring and joinery to bring the finish up to a modern standard without losing the character of the original house.",
      "The result is a home that works for the way the family actually lives — brighter, more efficient, and finished to a standard that will last.",
    ],
    galleryCount: 7,
    image: "/samples/kitchen-modern.jpg",
  },
  {
    slug: "house-y",
    name: "House Y",
    category: "extensions",
    categoryLabel: "Two-Storey Extension",
    location: "Co. Kildare, Ireland",
    duration: "18 weeks",
    scope: "Extension and structural works",
    summary:
      "A two-storey extension adding significant living space to the rear of the property, including a new open-plan kitchen and an additional bedroom above.",
    description: [
      "This two-storey extension was designed to give the family the extra space they'd outgrown, without changing the character of the existing house. Structural works included new steel supports and foundations to tie the extension seamlessly into the original build.",
      "At ground level, the extension created a large open-plan kitchen and dining area with sliding doors out to the garden. Upstairs, the additional floor space was used to add a fourth bedroom.",
      "We managed the project from planning and structural design through to final finishes, keeping the family informed at every stage of the build.",
    ],
    galleryCount: 3,
    image: "/projects/house-a-exterior.jpg",
    images: [
      { src: "/projects/house-a-exterior.jpg", label: "House Y — Exterior" },
      { src: "/projects/house-a-interior.jpg", label: "House Y — Open-Plan Living" },
      { src: "/projects/house-a-kitchen.jpg", label: "House Y — Kitchen" },
    ],
  },
  {
    slug: "house-z",
    name: "House Z",
    category: "new-builds",
    categoryLabel: "New Build Residence",
    location: "Co. Wicklow, Ireland",
    duration: "9 months",
    scope: "Ground-up new build",
    summary:
      "A new-build family home constructed from foundation through to final finish, designed for long-term comfort and energy efficiency.",
    description: [
      "Built from the ground up, this family home was constructed to a high standard of energy efficiency, with insulation, glazing and heating systems specified to keep running costs low for years to come.",
      "We managed every stage of the build in-house, from groundworks and structural build through to first and second fix, plastering, and final finishes.",
      "The finished home reflects close collaboration with the owners throughout, from the initial design through to the small details that made it feel like theirs.",
    ],
    galleryCount: 8,
    image: "/samples/exterior-brick.jpg",
  },
  {
    slug: "project-a",
    name: "Project A",
    category: "interiors",
    categoryLabel: "Kitchen & Interior Fit-Out",
    location: "Co. Dublin, Ireland",
    duration: "6 weeks",
    scope: "Kitchen and interior finishing",
    summary:
      "A complete kitchen fit-out finished with careful attention to detail, from cabinetry and worktops through to lighting and finishing touches.",
    description: [
      "This project focused on transforming a dated kitchen into a functional, modern space that works as the hub of the home. New cabinetry, worktops and integrated appliances were fitted throughout.",
      "Lighting was reworked to suit both everyday cooking and entertaining, with task lighting over worktops and softer feature lighting elsewhere in the room.",
      "Every detail, from cabinet hardware to tiling, was chosen and fitted with the same level of care as the larger structural elements of the job.",
    ],
    galleryCount: 6,
    image: "/samples/kitchen-exposed-beam.jpg",
  },
  {
    slug: "project-b",
    name: "Project B",
    category: "renovations",
    categoryLabel: "Period Property Renovation",
    location: "Co. Meath, Ireland",
    duration: "16 weeks",
    scope: "Sympathetic renovation",
    summary:
      "A sympathetic renovation preserving original character while modernising the interior for everyday family life.",
    description: [
      "Renovating a period property means balancing respect for the original building with the practical needs of a modern family. We worked carefully to retain original features — cornicing, fireplaces and joinery — while upgrading what lay beneath.",
      "Behind the scenes, the house received all-new electrics, plumbing, insulation and heating, bringing it up to a modern standard without disturbing its character.",
      "The finished renovation gives the family a comfortable, efficient home that still feels true to the building's original period.",
    ],
    galleryCount: 7,
    image: "/samples/exterior-brick.jpg",
  },
  {
    slug: "project-c",
    name: "Project C",
    category: "extensions",
    categoryLabel: "Single-Storey Extension",
    location: "Co. Dublin, Ireland",
    duration: "10 weeks",
    scope: "Extension and open-plan conversion",
    summary:
      "A single-storey extension opening up the rear of the home into one bright, open-plan living space.",
    description: [
      "This single-storey extension was built to open up the rear of the house, replacing a cramped kitchen and separate dining room with one bright, open-plan space.",
      "Large glazed doors were fitted to connect the new space to the garden, bringing in natural light throughout the day.",
      "The project was completed with minimal disruption to the rest of the home, keeping the family comfortable throughout the build.",
    ],
    galleryCount: 3,
    image: "/projects/house-b-exterior.jpg",
    images: [
      { src: "/projects/house-b-exterior.jpg", label: "Project C — Exterior" },
      { src: "/projects/house-b-interior.jpg", label: "Project C — Roof & Window Detail" },
      { src: "/projects/house-b-kitchen.jpg", label: "Project C — Kitchen" },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
