export const site = {
  name: 'SoftenerIndex',
  tagline: 'Hard water, fair prices, local pros — not a door-to-door quote.',
  publisher: 'Bob Molina',
  description:
    'An editorial hard-water and water-softener directory. SoftenerIndex publishes fair-quote guidance, installer listings, and city pages — without invented hardness, price, or installer figures.',
  url: 'https://softenerindex.com',
} as const;

export const nav = [
  { href: '/guides', label: 'Guides' },
  { href: '/cities/phoenix-az', label: 'Phoenix, AZ' },
  { href: '/methodology', label: 'Numbers policy' },
] as const;
