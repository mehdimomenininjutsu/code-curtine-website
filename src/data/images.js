// Centralized image URLs — all from Unsplash (free for commercial use)
const img = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Hero
export const HERO_IMAGE = img('1577926606472-fc6d3a33f7e1', 1920);

// Category images
export const CAT_SHEER = img('1617617495640-153230cf3408', 900);
export const CAT_BLACKOUT = img('1601000785676-f9b0ade234d3', 900);
export const CAT_VELVET = img('1659282386282-d7145e593bad', 900);
export const CAT_LINEN = img('1706817969183-908d5b67d465', 900);
export const CAT_PATTERNED = img('1617596225496-1d9da33a144b', 900);
export const CAT_CONTEMPORARY = img('1577926866949-c1ed2147d862', 900);

// Fabric texture images for products
export const FABRIC_WHITE = img('1615799998603-7c6270a45196', 700);
export const FABRIC_GREEN = img('1764437835866-73c7d0961c46', 700);
export const FABRIC_BEIGE = img('1764437835706-ba9d63250bd2', 700);
export const FABRIC_BLUE = img('1764437835979-03002314f2b7', 700);
export const FABRIC_PEACH = img('1764437835714-322ab28f0770', 700);
export const FABRIC_DARK = img('1521459467264-802e2ef3141f', 700);
export const FABRIC_BROWN_CURTAIN = img('1601000785676-f9b0ade234d3', 700);
export const FABRIC_RED_CURTAIN = img('1659282386282-d7145e593bad', 700);

// Collection images
export const COLL_VELVET = img('1659282386282-d7145e593bad', 1200);
export const COLL_NATURAL = img('1706817969183-908d5b67d465', 1200);
export const COLL_LIGHT = img('1617617495640-153230cf3408', 1200);

// Lookbook / interior images
export const LOOK_1 = img('1784653549463-83c9bd94c7e2', 900);
export const LOOK_2 = img('1766928210443-0be92ed5884a', 900);
export const LOOK_3 = img('1767050387941-b97f0d5a3232', 900);
export const LOOK_4 = img('1616594092403-fb65629b0a46', 900);
export const LOOK_5 = img('1666153047018-8f2cc61a8f47', 900);
export const LOOK_6 = img('1577926606472-fc6d3a33f7e1', 900);
export const LOOK_7 = img('1754611380518-61a923cc47ca', 900);
export const LOOK_8 = img('1617617495640-153230cf3408', 900);

// Trade program
export const TRADE_IMAGE = img('1767050387941-b97f0d5a3232', 1200);

// Final CTA background
export const FINAL_CTA_BG = img('1601000785676-f9b0ade234d3', 1600);
