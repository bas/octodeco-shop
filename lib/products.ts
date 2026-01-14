import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    slug: "original",
    name: "Original Octocat",
    description: "The classic Octocat sticker that started it all. A must-have for any GitHub fan.",
    price: 4.99,
    image: "/images/products/original.png",
    featured: true,
  },
  {
    id: "2",
    slug: "professortocat",
    name: "Professortocat",
    description: "The scholarly Octocat, perfect for the academic coder in your life.",
    price: 5.99,
    image: "/images/products/Professortocat_v2.png",
    featured: true,
  },
  {
    id: "3",
    slug: "surftocat",
    name: "Surftocat",
    description: "Catch the wave with this rad surfing Octocat sticker.",
    price: 5.99,
    image: "/images/products/surftocat.png",
    featured: true,
  },
  {
    id: "4",
    slug: "jetpacktocat",
    name: "Jetpacktocat",
    description: "Blast off into the future with Jetpacktocat. To infinity and beyond!",
    price: 5.99,
    image: "/images/products/jetpacktocat.png",
    featured: true,
  },
  {
    id: "5",
    slug: "dinotocat",
    name: "Dinotocat",
    description: "A prehistoric take on the beloved Octocat. Roar!",
    price: 5.99,
    image: "/images/products/dinotocat.png",
  },
  {
    id: "6",
    slug: "mona-the-rivetertocat",
    name: "Mona the Rivetertocat",
    description: "We can code it! Inspired by the iconic Rosie the Riveter.",
    price: 5.99,
    image: "/images/products/mona-the-rivetertocat.png",
  },
  {
    id: "7",
    slug: "bouncercat",
    name: "Bouncercat",
    description: "The toughest Octocat on the block. No bugs allowed!",
    price: 4.99,
    image: "/images/products/bouncercat.png",
  },
  {
    id: "8",
    slug: "terracottocat",
    name: "Terracottocat",
    description: "An ancient warrior Octocat, standing guard over your code.",
    price: 5.99,
    image: "/images/products/Terracottocat_Single.png",
  },
  {
    id: "9",
    slug: "cherryontop-o-cat",
    name: "Cherry on Top Octocat",
    description: "Sweet as can be! The perfect finishing touch.",
    price: 4.99,
    image: "/images/products/cherryontop-o-cat.png",
  },
  {
    id: "10",
    slug: "femalecodertocat",
    name: "Female Codertocat",
    description: "Celebrating women in tech with this awesome coder Octocat.",
    price: 5.99,
    image: "/images/products/femalecodertocat.png",
  },
  {
    id: "11",
    slug: "inflatocat",
    name: "Inflatocat",
    description: "Float through your day with this buoyant Octocat.",
    price: 4.99,
    image: "/images/products/inflatocat.png",
  },
  {
    id: "12",
    slug: "justicetocat",
    name: "Justicetocat",
    description: "Fighting for code justice everywhere. The hero we need.",
    price: 5.99,
    image: "/images/products/justicetocat.jpg",
  },
  {
    id: "13",
    slug: "manufacturetocat",
    name: "Manufacturetocat",
    description: "Building the future, one commit at a time.",
    price: 4.99,
    image: "/images/products/manufacturetocat.png",
  },
  {
    id: "14",
    slug: "oktobercat",
    name: "Oktobercat",
    description: "Prost! Celebrate Oktoberfest with this festive Octocat.",
    price: 5.99,
    image: "/images/products/oktobercat.png",
  },
  {
    id: "15",
    slug: "red-polo",
    name: "Red Polo Octocat",
    description: "Casual Friday vibes with this stylish red polo Octocat.",
    price: 4.99,
    image: "/images/products/red-polo.png",
  },
  {
    id: "16",
    slug: "skatetocat",
    name: "Skatetocat",
    description: "Kickflip your way through code reviews with Skatetocat.",
    price: 5.99,
    image: "/images/products/skatetocat.png",
  },
  {
    id: "17",
    slug: "sponsortocat",
    name: "Sponsortocat",
    description: "Show your support for open source with Sponsortocat.",
    price: 4.99,
    image: "/images/products/sponsortocat.png",
  },
  {
    id: "18",
    slug: "vinyltocat",
    name: "Vinyltocat",
    description: "Spin some tunes with this music-loving Octocat DJ.",
    price: 5.99,
    image: "/images/products/vinyltocat.png",
  },
  {
    id: "19",
    slug: "welcometocat",
    name: "Welcometocat",
    description: "A warm welcome to the GitHub community!",
    price: 4.99,
    image: "/images/products/welcometocat.png",
  },
  {
    id: "20",
    slug: "yogitocat",
    name: "Yogitocat",
    description: "Find your inner peace with this zen Octocat. Namaste.",
    price: 5.99,
    image: "/images/products/yogitocat.png",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getAllProducts(): Product[] {
  return products;
}
