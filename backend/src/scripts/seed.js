import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Outfit from '../models/Outfit.js';
import Celebrity from '../models/Celebrity.js';
import Item from '../models/Item.js';
import connectDB from '../config/mongodb.js';

// sample celebrities
const celebrities = [
  { name: 'Jenna Ortega', aesthetic: 'edgy' },
  { name: 'Sabrina Carpenter', aesthetic: 'pop-glam' },
  { name: 'Alexandra Saint Mleux', aesthetic: 'chic' },
  { name: 'IU', aesthetic: 'kpop-cute' },
  { name: 'Lisa (Blackpink)', aesthetic: 'streetwear' }
];

async function seedDB() {
  try {
    // connect to MongoDB
    await connectDB();

    // clear collections
    console.log('Clearing collections...');
    await Outfit.deleteMany({});
    await Celebrity.deleteMany({});
    await Item.deleteMany({});
    console.log('Collections cleared');

    // seed celebrities
    const celebDocs = await Celebrity.insertMany(celebrities);
    const celebIds = celebDocs.map(doc => doc._id);
    console.log('Seeded celebrities');

    // seed 100 outfits
    const outfits = Array.from({ length: 100 }, () => ({
      celebrityId: faker.helpers.arrayElement(celebIds),
      items: Array.from({ length: faker.number.int({ min: 3, max: 5 }) }, () => ({
        brand: faker.company.name(),
        price: faker.number.int({ min: 10, max: 300 }),
        category: faker.helpers.arrayElement(['top', 'bottom', 'shoes', 'accessory', 'dress']),
        alternatives: [
          {
            brand: 'H&M',
            price: faker.number.int({ min: 5, max: 30 }),
            tier: 'budget',
            retailerLink: `https://hm.com/product/${faker.string.uuid()}`
          },
          {
            brand: 'Zara',
            price: faker.number.int({ min: 30, max: 100 }),
            tier: 'mid-range',
            retailerLink: `https://zara.com/product/${faker.string.uuid()}`
          },
          {
            brand: faker.helpers.arrayElement(['Gucci', 'Prada', 'Chanel']),
            price: faker.number.int({ min: 100, max: 500 }),
            tier: 'investment',
            retailerLink: `https://luxury.com/product/${faker.string.uuid()}`
          }
        ],
        imageUrl: faker.image.url({ category: 'fashion' })
      })),
      occasion: faker.helpers.arrayElement(['airport', 'date night', 'concert', 'casual weekend']),
      weather: faker.helpers.arrayElement(['hot', 'cold', 'mild', 'rainy']),
      imageUrl: faker.image.url({ category: 'fashion' }),
      votes: []
    }));

    await Outfit.insertMany(outfits);
    console.log('Seeded 100 outfits and 5 celebrities!');

    // update celebrities with outfit references
    for (const celebId of celebIds) {
      const celebOutfits = await Outfit.find({ celebrityId: celebId }).select('_id');
      const outfitIds = celebOutfits.map(outfit => outfit._id);
      await Celebrity.updateOne({ _id: celebId }, { $set: { outfits: outfitIds } });
    }
    console.log('Updated celebrity outfit references');

    // seed sample closet items
    const sampleItems = Array.from({ length: 20 }, () => ({
      userId: null,
      type: faker.helpers.arrayElement(['shirt', 'jeans', 'sneakers', 'dress', 'accessory']),
      brand: faker.company.name(),
      color: faker.color.human(),
      imageUrl: faker.image.url({ category: 'fashion' })
    }));
    await Item.insertMany(sampleItems);
    console.log('Seeded 20 sample closet items!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDB();