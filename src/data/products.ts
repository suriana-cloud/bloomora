import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- Single DIY Fuzzy Flower Kits ---
  {
    id: 'single-tulip-kit',
    kitNumber: 1,
    name: 'Single Tulip Kit',
    price: 5.0,
    category: 'single',
    flowerType: 'Tulip',
    shortDescription: 'Sweet and elegant fuzzy wire tulip. The quintessential beginner flower with soft petal folds.',
    description: 'The Single Tulip Kit is our most popular introductory craft kit. With just a few bends of our plush, vibrant fuzzy wires, you will shape a delicate tulip bloom and tender green leaf. Designed for complete newcomers, it offers a calming, satisfying crafting experience that produces an everlasting bloom.',
    included: [
      'Fuzzy wires for making 1 tulip flower',
      'Wooden stick (flower stem)',
      'Floral tape',
      'Instruction card with a QR code linking to step-by-step instructions'
    ],
    beginnerInfo: {
      difficulty: 'Beginner (Easy)',
      estimatedTime: '15 – 20 mins',
      targetAudience: 'Ages 8+ and beginners of all ages',
      isNoExperienceRequired: true
    },
    imagePlaceholderColor: '#F8C8DC',
    inStock: true,
    isPopular: true
  },
  {
    id: 'single-lily-kit',
    kitNumber: 2,
    name: 'Single Lily Kit',
    price: 7.0,
    category: 'single',
    flowerType: 'Lily',
    shortDescription: 'Graceful fuzzy wire lily with delicate curved petals, elegant stamens, and slender leaves.',
    description: 'Craft a timeless, graceful lily using premium velvety fuzzy wires. This kit introduces petal-curving and stamen-assembling techniques that result in an astonishingly lifelike, soft-touch floral sculpture. A wonderful desk ornament or heartfelt handmade token.',
    included: [
      'Fuzzy wires for making 1 lily flower',
      'Wooden stick (flower stem)',
      'Floral tape',
      'Floral stamen',
      'Instruction card with a QR code linking to step-by-step instructions'
    ],
    beginnerInfo: {
      difficulty: 'Beginner-Friendly',
      estimatedTime: '20 – 25 mins',
      targetAudience: 'Craft lovers, teens & adults',
      isNoExperienceRequired: true
    },
    imagePlaceholderColor: '#FFF0F5',
    inStock: true
  },
  {
    id: 'single-sunflower-kit',
    kitNumber: 3,
    name: 'Single Sunflower Kit',
    price: 7.0,
    category: 'single',
    flowerType: 'Sunflower',
    shortDescription: 'Bright, cheerful sunflower with vibrant golden petals and a fluffy textured seed center.',
    description: 'Bring constant sunshine indoors! Our Single Sunflower Kit includes radiant golden-yellow fuzzy wires for concentric petals and rich chocolate-brown wires to spiral into a thick, fluffy floral core. Guaranteed to brighten any study desk or bedside table.',
    included: [
      'Fuzzy wires for making 1 sunflower',
      'Wooden stick (flower stem)',
      'Floral tape',
      'Instruction card with a QR code linking to step-by-step instructions'
    ],
    beginnerInfo: {
      difficulty: 'Beginner-Friendly',
      estimatedTime: '20 – 25 mins',
      targetAudience: 'Anyone seeking a burst of cheerfulness',
      isNoExperienceRequired: true
    },
    imagePlaceholderColor: '#FEF3C7',
    inStock: true,
    isPopular: true
  },
  {
    id: 'single-hibiscus-kit',
    kitNumber: 4,
    name: 'Single Hibiscus Kit',
    price: 7.0,
    category: 'single',
    flowerType: 'Hibiscus',
    shortDescription: 'Malaysia’s beloved Bunga Raya with broad flared petals and an iconic accented staminal column.',
    description: 'Celebrate national beauty and tropical charm with our Single Hibiscus Kit. Featuring rich blush/crimson fuzzy wires, prominent golden-tipped pistils, and broad tropical leaves, this kit makes a meaningful Malaysian cultural keepsake and creative hobby project.',
    included: [
      'Fuzzy wires for making 1 hibiscus flower',
      'Wooden stick (flower stem)',
      'Floral tape',
      'Floral stamen',
      'Instruction card with a QR code linking to step-by-step instructions'
    ],
    beginnerInfo: {
      difficulty: 'Beginner-Friendly',
      estimatedTime: '20 – 25 mins',
      targetAudience: 'Proud Malaysians & flower enthusiasts',
      isNoExperienceRequired: true
    },
    imagePlaceholderColor: '#FDE2E4',
    inStock: true
  },
  {
    id: 'single-daisy-kit',
    kitNumber: 5,
    name: 'Single Daisy Kit',
    price: 5.0,
    category: 'single',
    flowerType: 'Daisy',
    shortDescription: 'Pure, playful daisy with crisp white fuzzy wire petals and a sunny yellow button center.',
    description: 'Simple, sweet, and wonderfully soothing to make. The Single Daisy Kit requires minimal wire-twisting, making it ideal for absolute first-timers, stress-relief study breaks, or parent-child weekend crafting sessions.',
    included: [
      'Fuzzy wires for making 1 daisy flower',
      'Wooden stick (flower stem)',
      'Floral tape',
      'Instruction card with a QR code linking to step-by-step instructions'
    ],
    beginnerInfo: {
      difficulty: 'Super Easy (First-Timer Friendly)',
      estimatedTime: '15 mins',
      targetAudience: 'Beginners of all skill levels, kids & students',
      isNoExperienceRequired: true
    },
    imagePlaceholderColor: '#F1F5F9',
    inStock: true
  },

  // --- DIY Fuzzy Flower Bouquet Kits ---
  {
    id: 'tulip-bouquet-kit',
    kitNumber: 6,
    name: 'Tulip Bouquet Kit',
    price: 15.0,
    category: 'bouquet',
    flowerType: 'Tulip',
    shortDescription: 'Complete multi-bloom tulip bouquet with Korean-style florist wrapping and satin ribbon.',
    description: 'Level up your crafting with our comprehensive Tulip Bouquet Kit. You will make a harmonious bunch of multi-tonal fuzzy tulips, assemble them with greenery, and wrap them in elegant frosted Korean florist paper tied with a silky satin ribbon.',
    included: [
      'Fuzzy wires for making 7 tulip flowers',
      'Wooden sticks for 7 flower stems',
      'Floral tape',
      'Instruction card with a QR code linking to step-by-step instructions',
      'Korean-style bouquet wrapping paper & satin ribbon'
    ],
    beginnerInfo: {
      difficulty: 'Beginner+ (Guided step-by-step)',
      estimatedTime: '45 – 60 mins',
      targetAudience: 'Gift givers, anniversary & graduation surprises',
      isNoExperienceRequired: true
    },
    imagePlaceholderColor: '#FBCFE8',
    inStock: true,
    isPopular: true
  },
  {
    id: 'lily-bouquet-kit',
    kitNumber: 7,
    name: 'Lily Bouquet Kit',
    price: 20.0,
    category: 'bouquet',
    flowerType: 'Lily',
    shortDescription: 'A magnificent bouquet of graceful fuzzy wire lilies with rich greenery and boutique wrapping.',
    description: 'A showstopping statement piece. The Lily Bouquet Kit lets you handcraft multi-layered fuzzy lilies featuring curved petal silhouettes, lifelike stamens, and foliage, wrapped in multi-tier florist packaging for that luxury flower-shop aesthetic.',
    included: [
      'Fuzzy wires for making 5 lily flowers',
      'Wooden sticks for 5 flower stems',
      'Floral tape',
      'Floral stamens',
      'Instruction card with a QR code linking to step-by-step instructions',
      'Boutique florist wrapping paper & matching satin ribbon'
    ],
    beginnerInfo: {
      difficulty: 'Intermediate Beginner',
      estimatedTime: '60 mins',
      targetAudience: 'Crafters who enjoy detailed and rewarding projects',
      isNoExperienceRequired: true
    },
    imagePlaceholderColor: '#FCE7F3',
    inStock: true
  },
  {
    id: 'sunflower-bouquet-kit',
    kitNumber: 8,
    name: 'Sunflower Bouquet Kit',
    price: 15.0,
    category: 'bouquet',
    flowerType: 'Sunflower',
    shortDescription: 'A radiant bouquet of fuzzy sunflowers with companion foliage, wrapped in rustic aesthetic.',
    description: 'The ultimate graduation and celebration bouquet! Craft cheerful, vibrant fuzzy sunflowers, pair them with crafted greenery filler sprigs, and wrap them with our florist-grade dual-tone kraft paper and warm ribbon.',
    included: [
      'Fuzzy wires for making 3 sunflowers',
      'Wooden sticks for 3 flower stems',
      'Floral tape',
      'Instruction card with a QR code linking to step-by-step instructions',
      'Rustic dual-tone bouquet wrapping & coordinating ribbon'
    ],
    beginnerInfo: {
      difficulty: 'Beginner+ (Rewarding & easy)',
      estimatedTime: '45 – 60 mins',
      targetAudience: 'Graduations, birthdays, congratulations gifts',
      isNoExperienceRequired: true
    },
    imagePlaceholderColor: '#FEF08A',
    inStock: true,
    isPopular: true
  },
  {
    id: 'hibiscus-bouquet-kit',
    kitNumber: 9,
    name: 'Hibiscus Bouquet Kit',
    price: 17.0,
    category: 'bouquet',
    flowerType: 'Hibiscus',
    shortDescription: 'A vibrant tropical arrangement of fuzzy hibiscus flowers with decorative greenery and wrapping.',
    description: 'Create an exotic and celebratory arrangement inspired by Malaysia’s floral heritage. Includes vibrant hibiscus blooms with intricate stamens, surrounded by complementary fuzzy greenery, nestled in boutique wrap with a matching ribbon.',
    included: [
      'Fuzzy wires for making 3 hibiscus flowers',
      'Wooden sticks for 3 flower stems',
      'Floral tape',
      'Floral stamens',
      'Instruction card with a QR code linking to step-by-step instructions',
      'Matte frosted boutique bouquet wrapping paper & satin tie ribbon'
    ],
    beginnerInfo: {
      difficulty: 'Beginner+ (Clear instructions provided)',
      estimatedTime: '50 mins',
      targetAudience: 'Flower crafters and patriotic decor lovers',
      isNoExperienceRequired: true
    },
    imagePlaceholderColor: '#FECDD3',
    inStock: true
  },
  {
    id: 'daisy-bouquet-kit',
    kitNumber: 10,
    name: 'Daisy Bouquet Kit',
    price: 15.0,
    category: 'bouquet',
    flowerType: 'Daisy',
    shortDescription: 'An adorable cluster of handmade fuzzy daisies wrapped into a cute pastel meadow bouquet.',
    description: 'A bundle of pure joy! Make a charming cluster of 5 cheerful fuzzy wire daisies with little green leaves, bundled together with pastel wrapper and tied with a dainty ribbon. A relaxing, beginner-friendly weekend craft.',
    included: [
      'Fuzzy wires for making 5 daisy flowers',
      'Wooden sticks for 5 flower stems',
      'Floral tape',
      'Instruction card with a QR code linking to step-by-step instructions',
      'Pastel blush florist wrapping sheet & satin ribbon'
    ],
    beginnerInfo: {
      difficulty: 'Beginner (Very approachable)',
      estimatedTime: '45 mins',
      targetAudience: 'Students, young adults & friendship gifts',
      isNoExperienceRequired: true
    },
    imagePlaceholderColor: '#E2E8F0',
    inStock: true
  },

  // --- Mixed Flower Kit ---
  {
    id: 'mix-flowers-bouquet-kit',
    kitNumber: 11,
    name: 'Mix Flowers Bouquet Kit',
    price: 25.0,
    category: 'mixed',
    flowerType: 'Mixed',
    shortDescription: 'Our signature grand DIY kit combining tulips, sunflowers, daisies, and lilies into one stunning bouquet.',
    description: 'The ultimate Bloomora experience! Why choose just one when you can bloom them all? This flagship grand kit includes an abundant assortment of colourful fuzzy wires allowing you to craft a balanced ensemble of tulips, sunflowers, daisies, and lilies, complete with luxury wrapping paper, florist mesh, ribbons, and a Bloomora gift card.',
    included: [
      'Assorted fuzzy wires for tulips, sunflowers, daisies, and lilies',
      'Wooden sticks for multiple flower stems',
      'Floral tape & floral stamens',
      'Instruction card with a QR code linking to step-by-step instructions',
      'Premium Korean florist wrapping sheets & satin ribbon',
      'Bloomora handwritten greeting card envelope'
    ],
    beginnerInfo: {
      difficulty: 'Fun Creative Project for All Levels',
      estimatedTime: '60 – 90 mins',
      targetAudience: 'The ultimate DIY gift, date-night activity, or self-care project',
      isNoExperienceRequired: true
    },
    imagePlaceholderColor: '#FDE2E4',
    inStock: true,
    isPopular: true
  }
];

export const INITIAL_BUSINESS_SETTINGS = {
  whatsappNumber: '013-8700683',
  facebookUrl: 'https://facebook.com/bloomora.fuzzyflowers',
  instagramUrl: 'https://instagram.com/bloomora.official',
  duitnowQrNumber: '013-8700683',
  duitnowRecipientName: 'BLOOMORA ENTERPRISE',
  duitnowBankName: 'Maybank / Touch \'n Go eWallet',
  pickupLocationDetails: 'UiTM Campus Main Gate / Student Centre (Exact pickup time will be coordinated via WhatsApp after payment verification)',
  deliveryFeeNote: 'Delivery rates are calculated based on area/postcode. The Bloomora team will confirm delivery details via WhatsApp.'
};
