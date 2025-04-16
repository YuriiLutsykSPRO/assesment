import type { Product } from "./index";

const generateProducts = (): Product[] => {
  const categories = [
    { name: "T-Shirt", basePrice: 29.99, sizes: ["S", "M", "L", "XL"] },
    { name: "Jeans", basePrice: 59.99, sizes: ["28", "30", "32", "34", "36"] },
    { name: "Dress", basePrice: 79.99, sizes: ["XS", "S", "M", "L", "XL"] },
    { name: "Jacket", basePrice: 89.99, sizes: ["S", "M", "L", "XL"] },
    { name: "Sweater", basePrice: 49.99, sizes: ["S", "M", "L", "XL"] },
    { name: "Skirt", basePrice: 39.99, sizes: ["XS", "S", "M", "L"] },
    { name: "Hoodie", basePrice: 69.99, sizes: ["S", "M", "L", "XL"] },
    { name: "Shirt", basePrice: 44.99, sizes: ["S", "M", "L", "XL"] },
    { name: "Shorts", basePrice: 34.99, sizes: ["28", "30", "32", "34"] },
    { name: "Blazer", basePrice: 99.99, sizes: ["S", "M", "L", "XL"] },
  ];

  const colors = [
    "black",
    "white",
    "navy",
    "gray",
    "red",
    "blue",
    "green",
    "beige",
    "brown",
    "pink",
  ];
  const materials = [
    "Cotton",
    "Wool",
    "Polyester",
    "Linen",
    "Denim",
    "Silk",
    "Cashmere",
    "Leather",
  ];
  const styles = [
    "Classic",
    "Modern",
    "Vintage",
    "Casual",
    "Formal",
    "Sporty",
    "Bohemian",
    "Minimalist",
  ];

  const products: Product[] = [];
  let id = 1;

  for (const category of categories) {
    for (const color of colors) {
      for (const material of materials) {
        for (const style of styles) {
          if (products.length >= 100) break;

          const name = `${style} ${material} ${category.name}`;
          const price = category.basePrice * (1 + Math.random() * 0.5);
          const description = `A ${style.toLowerCase()} ${color.toLowerCase()} ${category.name.toLowerCase()} made from premium ${material.toLowerCase()}.`;

          const variants = category.sizes.map((size) => ({
            color,
            size,
            stock: Math.floor(Math.random() * 20) + 5,
          }));

          products.push({
            id: id.toString(),
            name,
            price: Number(price.toFixed(2)),
            description,
            image: `https://picsum.photos/seed/${id}/800/1000`,
            variants,
          });

          id++;
        }
        if (products.length >= 100) break;
      }
      if (products.length >= 100) break;
    }
    if (products.length >= 100) break;
  }

  return products;
};

export const mockProducts: Product[] = generateProducts();
