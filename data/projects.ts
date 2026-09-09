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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A full renovation bringing a dated family home up to a modern standard.",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      "Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A two-storey extension adding significant living space to the rear of the property.",
    description: [
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
      "Et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A new-build family home constructed from foundation through to final finish.",
    description: [
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.",
      "Sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A complete kitchen fit-out finished with careful attention to detail.",
    description: [
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
      "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A sympathetic renovation preserving original character while modernising the interior.",
    description: [
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore.",
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat.",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A single-storey extension opening up the rear of the home into one bright living space.",
    description: [
      "Et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur.",
      "Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam.",
      "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
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
