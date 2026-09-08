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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ground-up construction managed from foundation to finish.",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Considered extensions that expand living space with lasting quality.",
    description: [
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Thoughtful renovation work that respects a home's character.",
    description: [
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.",
      "Sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Full refurbishment for tired or dated properties.",
    description: [
      "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.",
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Considered interior builds finished to a high standard.",
    description: [
      "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fully fitted bathrooms, from layout to final finish.",
    description: [
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.",
      "Ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Reliable general building work for smaller jobs and repairs.",
    description: [
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas.",
      "Et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
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
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
