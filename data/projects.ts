import type { PlaceholderCategory } from "@/lib/types";
import { photos, type Photo } from "@/data/photos";

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
  /** Only shown when set — leave out rather than guess. */
  location?: string;
  /** Only shown when set — leave out rather than guess. */
  duration?: string;
  scope: string;
  summary: string;
  description: string[];
  image: Photo;
  images: Photo[];
};

export const projects: Project[] = [
  {
    slug: "contemporary-courtyard-home",
    name: "Contemporary Courtyard Home",
    category: "extensions",
    categoryLabel: "Courtyard Extension & Interior",
    scope: "Glazed extension, joinery and bathrooms",
    summary:
      "A contemporary home arranged around a private courtyard, with frameless glazing, terrazzo floors and oak joinery throughout.",
    description: [
      "This project is built around a small paved courtyard. Frameless glazing wraps the corner of the new rooms so the courtyard reads as part of the living space and daylight reaches deep into the plan, with the original brick boundary wall kept as a backdrop.",
      "Inside, a continuous terrazzo floor runs from the hallway through to the glazed rooms. Slatted timber screens divide spaces without closing them off, and full-height oak joinery hides storage along the walls.",
      "The bathrooms carry the same level of detail, including a walk-in shower finished in green fish-scale tiles.",
    ],
    image: photos.courtyardGlazedCorner,
    images: [
      photos.courtyardGlazedCorner,
      photos.courtyardOakJoinery,
      photos.courtyardTimberScreen,
      photos.courtyardGarden,
      photos.courtyardTerrazzoStep,
      photos.courtyardTerrazzoHall,
      photos.courtyardHallwayStairs,
      photos.courtyardGreenShower,
    ],
  },
  {
    slug: "skylit-kitchen-extension",
    name: "Skylit Kitchen Extension",
    category: "extensions",
    categoryLabel: "Single-Storey Rear Extension",
    scope: "Rear extension, kitchen and landscaping",
    summary:
      "A single-storey rear extension housing a painted Shaker kitchen, with rooflights overhead and bifold doors opening onto a new patio.",
    description: [
      "This single-storey extension adds a bright kitchen and dining space to the back of the house. Rooflights set into the tiled roof bring daylight down over the worktops, and bifold doors fold back fully to open the room to the garden.",
      "The kitchen itself is a painted Shaker design with a large island, a round oak breakfast table and a full-height larder unit.",
      "Outside, the garden was finished to match, with new paving, stepped access to the doors and timber fencing around the boundary.",
    ],
    image: photos.skylitKitchenBifolds,
    images: [
      photos.skylitKitchenBifolds,
      photos.skylitKitchenIsland,
      photos.skylitKitchenLarder,
      photos.skylitExtensionGarden,
      photos.skylitExtensionPatio,
      photos.skylitExtensionBifoldDoors,
      photos.skylitExtensionRoof,
      photos.skylitExtensionLandscaping,
    ],
  },
  {
    slug: "sage-kitchen-dining",
    name: "Sage Kitchen & Dining",
    category: "interiors",
    categoryLabel: "Kitchen & Dining Fit-Out",
    scope: "Kitchen fit-out and exposed joist ceiling",
    summary:
      "A sage green kitchen and dining space beneath exposed timber joists, with rooflights letting daylight in between the beams.",
    description: [
      "The defining feature of this space is the ceiling: timber joists left exposed and finished, with rooflights set between them to bring daylight down into the room.",
      "Below, a sage green kitchen runs along the wall with integrated ovens, open shelving and a white stone worktop that returns to form an island.",
      "The dining area sits under the same joisted ceiling, so the kitchen and dining space read as one continuous, light-filled room.",
    ],
    image: photos.sageKitchenJoists,
    images: [
      photos.sageKitchenJoists,
      photos.sageKitchenIsland,
      photos.sageKitchenRun,
      photos.sageKitchenDining,
    ],
  },
  {
    slug: "open-plan-renovation",
    name: "Open-Plan Kitchen & Living",
    category: "renovations",
    categoryLabel: "Open-Plan Renovation",
    scope: "Open-plan kitchen, living space and fireplace",
    summary:
      "An open-plan kitchen and living space with a vaulted ceiling, a handleless grey kitchen and a stone-clad feature fireplace.",
    description: [
      "This renovation opens the ground floor into one large kitchen and living space, with a vaulted ceiling and rooflights overhead and sliding doors out to the garden.",
      "The kitchen is a handleless grey design with integrated ovens and a large island. Glazed oak double doors connect it to the rest of the house, and a polished tile floor runs throughout.",
      "In the living room, the chimney breast was clad in stacked stone with an inset fire to create a feature wall.",
    ],
    image: photos.openPlanKitchenLiving,
    images: [
      photos.openPlanKitchenLiving,
      photos.openPlanKitchenIsland,
      photos.openPlanLivingOakDoors,
      photos.openPlanHandlelessKitchen,
      photos.openPlanStoneFireplace,
      photos.openPlanFireplaceWall,
    ],
  },
  {
    slug: "two-storey-rear-extension",
    name: "Two-Storey Rear Extension",
    category: "extensions",
    categoryLabel: "Two-Storey Extension",
    scope: "Two-storey extension, kitchen and flooring",
    summary:
      "A two-storey rear extension with a zinc-clad canopy, opening into a bright Shaker kitchen and garden room on a herringbone oak floor.",
    description: [
      "This two-storey extension adds space across both floors at the back of the house. It is rendered to match the existing building, with a zinc-clad canopy over the ground floor and French doors opening onto the patio.",
      "Inside, the ground floor becomes an open kitchen and living space. A white Shaker kitchen with an island sits beneath a rooflight, and a herringbone oak floor runs through to a sunlit garden room.",
    ],
    image: photos.twoStoreyExterior,
    images: [
      photos.twoStoreyExterior,
      photos.twoStoreyInterior,
      photos.twoStoreyKitchenWide,
      photos.twoStoreyKitchen,
      photos.twoStoreyGardenRoom,
    ],
  },
  {
    slug: "brick-and-slate-new-build",
    name: "Brick & Slate New Build",
    category: "new-builds",
    categoryLabel: "New Build Residence",
    scope: "New build, roof structure and slating",
    summary:
      "A brick-built new home finished with a natural slate roof and rooflights, photographed from the roof structure through to completion.",
    description: [
      "This new build is finished in red brick under a natural slate roof, with rooflights set into the slope and a flat-roofed single-storey section to the side.",
      "The photos follow the roof from structure to finish: breathable membrane and battens fixed over the rafters, the slates going on around the rooflights, and the completed roofline.",
    ],
    image: photos.newBuildBrickSlate,
    images: [
      photos.newBuildRoofMembrane,
      photos.newBuildRoofBattens,
      photos.newBuildSlateRoof,
      photos.newBuildBrickSlate,
    ],
  },
  {
    slug: "single-storey-garden-extension",
    name: "Single-Storey Garden Extension",
    category: "extensions",
    categoryLabel: "Single-Storey Extension",
    scope: "Rear extension, glazing and bespoke kitchen",
    summary:
      "A painted brick rear extension with full-width sliding glazing, exposed joists and a circular window, fitted with a bespoke oak kitchen.",
    description: [
      "This single-storey extension is built in brick and painted white, with full-width sliding glazing across the rear so the room opens directly onto the garden.",
      "Inside, the ceiling joists are left exposed and painted, with a rooflight bringing in extra daylight and a circular porthole window adding a distinctive detail.",
      "The kitchen is bespoke oak joinery with full-height larder cupboards, deep drawers and a range cooker, shown here during fit-out.",
    ],
    image: photos.singleStoreyExterior,
    images: [photos.singleStoreyExterior, photos.singleStoreyInterior, photos.singleStoreyKitchen],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
