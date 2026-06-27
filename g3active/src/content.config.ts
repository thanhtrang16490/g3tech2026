import { defineCollection, z } from 'astro:content';

const productsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    // Basic Info
    name: z.string(),
    category: z.string(),
    price: z.number(),
    originalPrice: z.number().optional().nullable(),
    
    // Images
    image: z.string(),
    gallery: z.array(z.string()).optional().default([]),
    
    // Badges & Ratings
    badge: z.string().optional().nullable(),
    rating: z.number().default(5),
    reviews: z.number().default(0),
    
    // Descriptions
    description: z.string(),
    shortDescription: z.string().optional(),
    
    // Specifications
    specs: z.array(z.string()).default([]),
    features: z.array(z.string()).optional().default([]),
    
    // SEO
    slug: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    
    // Inventory
    stock: z.number().optional().default(100),
    featured: z.boolean().optional().default(false),
    hotDeal: z.boolean().optional().default(false),
    newArrival: z.boolean().optional().default(false),
    
    // External Source
    sourceUrl: z.string().optional(),
    sourceWebsite: z.string().optional().default('thaihungsmarthome.com'),
  })
});

const categoriesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    icon: z.string(),
    description: z.string(),
    order: z.number().optional().default(0),
  })
});

export const collections = {
  'products': productsCollection,
  'categories': categoriesCollection,
};
