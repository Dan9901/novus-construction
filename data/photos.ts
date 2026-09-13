export type Photo = {
  src: string;
  /** Doubles as the caption in galleries, so it describes what is actually in the frame. */
  alt: string;
};

const photo = (file: string, alt: string): Photo => ({ src: `/photos/${file}.jpg`, alt });

export const photos = {
  // Contemporary courtyard home
  courtyardGlazedCorner: photo("courtyard-glazed-corner", "Frameless glazed corner opening onto a paved courtyard"),
  courtyardGarden: photo("courtyard-garden", "Courtyard with sliding glass doors and a restored brick boundary wall"),
  courtyardOakJoinery: photo("courtyard-oak-joinery", "Full-height oak joinery beside floor-to-ceiling glazing"),
  courtyardTimberScreen: photo("courtyard-timber-screen", "Slatted timber screen and pendant light over a terrazzo floor"),
  courtyardTerrazzoStep: photo("courtyard-terrazzo-step", "Terrazzo floor stepping up to a glazed courtyard room"),
  courtyardTerrazzoHall: photo("courtyard-terrazzo-hall", "Terrazzo hallway with timber slats and hidden storage"),
  courtyardHallwayStairs: photo("courtyard-hallway-stairs", "Hallway with a slatted timber screen leading to the stairs"),
  courtyardGreenShower: photo("courtyard-green-shower", "Walk-in shower finished in green fish-scale tiles"),

  // Skylit kitchen extension
  skylitKitchenBifolds: photo("skylit-kitchen-bifolds", "Kitchen extension with rooflights and bifold doors to the garden"),
  skylitKitchenIsland: photo("skylit-kitchen-island", "Shaker kitchen island with a round oak breakfast table"),
  skylitKitchenLarder: photo("skylit-kitchen-larder", "Painted Shaker kitchen with a full-height larder unit"),
  skylitExtensionGarden: photo("skylit-extension-garden", "Single-storey rear extension with a new patio and fencing"),
  skylitExtensionPatio: photo("skylit-extension-patio", "Bifold doors opening onto a stepped patio"),
  skylitExtensionBifoldDoors: photo("skylit-extension-bifold-doors", "Bifold doors with curved concrete steps to the garden"),
  skylitExtensionRoof: photo("skylit-extension-roof", "Tiled extension roof fitted with rooflights"),
  skylitExtensionLandscaping: photo("skylit-extension-landscaping", "New paving and timber fencing to the rear garden"),

  // Sage kitchen and dining
  sageKitchenJoists: photo("sage-kitchen-joists", "Sage green kitchen under exposed timber joists and rooflights"),
  sageKitchenIsland: photo("sage-kitchen-island", "Sage green kitchen with a white stone worktop"),
  sageKitchenRun: photo("sage-kitchen-run", "Sage green kitchen run with open shelving and exposed joists"),
  sageKitchenDining: photo("sage-kitchen-dining", "Dining area beneath exposed timber joists"),

  // Open-plan renovation
  openPlanKitchenLiving: photo("open-plan-kitchen-living", "Open-plan kitchen and living space with a vaulted ceiling"),
  openPlanKitchenIsland: photo("open-plan-kitchen-island", "Handleless grey kitchen with a large island"),
  openPlanLivingOakDoors: photo("open-plan-living-oak-doors", "Open-plan space opening through glazed oak double doors"),
  openPlanHandlelessKitchen: photo("open-plan-handleless-kitchen", "Handleless kitchen with integrated ovens and an island"),
  openPlanStoneFireplace: photo("open-plan-stone-fireplace", "Stone-clad chimney breast with an inset fire"),
  openPlanFireplaceWall: photo("open-plan-fireplace-wall", "Living room with a stone feature wall and polished tile floor"),

  // Two-storey rear extension
  twoStoreyExterior: { src: "/projects/house-a-exterior.jpg", alt: "Two-storey rear extension with a zinc-clad canopy and garden patio" },
  twoStoreyInterior: { src: "/projects/house-a-interior.jpg", alt: "Open-plan kitchen and living room with a rooflight and garden views" },
  twoStoreyKitchen: { src: "/projects/house-a-kitchen.jpg", alt: "White Shaker kitchen with an island on a herringbone oak floor" },
  twoStoreyKitchenWide: photo("two-storey-extension-kitchen", "Shaker kitchen and herringbone floor in morning light"),
  twoStoreyGardenRoom: photo("two-storey-extension-garden-room", "Sunlit garden room with a herringbone oak floor"),

  // Single-storey garden extension
  singleStoreyExterior: { src: "/projects/house-b-exterior.jpg", alt: "Painted brick extension with full-width sliding glazing" },
  singleStoreyInterior: { src: "/projects/house-b-interior.jpg", alt: "Painted exposed joists, a rooflight and a circular window" },
  singleStoreyKitchen: { src: "/projects/house-b-kitchen.jpg", alt: "Bespoke oak kitchen with full-height larder units during fit-out" },

  // Brick and slate new build
  newBuildBrickSlate: photo("new-build-brick-slate", "Completed brick new build with a slate roof and rooflights"),
  newBuildSlateRoof: photo("new-build-slate-roof", "Natural slate roof with rooflights being completed"),
  newBuildRoofBattens: photo("new-build-roof-battens", "Roof battens fixed over membrane on a brick new build"),
  newBuildRoofMembrane: photo("new-build-roof-membrane", "Breathable roof membrane and battens before slating"),
  newBuildBrickCornerGlazing: photo("new-build-brick-corner-glazing", "Contemporary brick home with a glazed corner"),
  newBuildBrickGable: photo("new-build-brick-gable", "Brick gable elevation with large ground-floor glazing"),

  // Extensions
  extensionFlatRoofGlazing: photo("extension-flat-roof-glazing", "Flat-roof rear extension with a large sliding glass door"),
  extensionGableSlidingDoors: photo("extension-gable-sliding-doors", "Gable-fronted rear extension with sliding doors and a new patio"),
  extensionPitchedRoofRooflights: photo("extension-pitched-roof-rooflights", "Pitched-roof extension with rooflights and sliding doors"),

  // Refurbishments
  refurbishmentPeriodCottage: photo("refurbishment-period-cottage", "Refurbished period cottage with a slate hipped roof"),
  refurbishmentBrickCottage: photo("refurbishment-brick-cottage", "Red brick corner cottage with a slate roof and railings"),
  refurbishmentBedroom: photo("refurbishment-bedroom", "Refurbished bedroom with new carpet and panelled door"),

  // Bathrooms
  bathroomFreestandingBath: photo("bathroom-freestanding-bath", "Bathroom with a freestanding roll-top bath and patterned floor tiles"),
  bathroomMetroTiles: photo("bathroom-metro-tiles", "Metro-tiled bathroom with brass fittings and a wall-hung toilet"),
  bathroomMarbleVanity: photo("bathroom-marble-vanity", "Marble-topped vanity with a countertop basin"),
  bathroomCornerShower: photo("bathroom-corner-shower", "Corner shower enclosure with patterned floor tiles"),
  bathroomTiledBath: photo("bathroom-tiled-bath", "Tiled bath surround beneath a bathroom window"),
  bathroomWalkInShower: photo("bathroom-walk-in-shower", "Tiled shower enclosure with a glass door"),

  // General building, roofing and structure
  generalBuildingDriveway: photo("general-building-driveway", "Semi-detached home with a newly laid block-paved driveway"),
  roofingFlatRoofRooflights: photo("roofing-flat-roof-rooflights", "Flat roof with two new rooflights"),
  roofingFlatRoofRooflight: photo("roofing-flat-roof-rooflight", "Newly finished flat roof with a rooflight"),
  structuralRoofFrame: photo("structural-roof-frame", "Timber roof structure going up over new blockwork"),
  structuralRafters: photo("structural-rafters", "Timber rafters being fixed during roof construction"),
  structuralSpiralStair: photo("structural-spiral-stair", "Spiral staircase fitted through a new structural opening"),
} satisfies Record<string, Photo>;
