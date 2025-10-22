import mongoose from 'mongoose';

const outfitSchema = new mongoose.Schema({
  celebrityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity', required: true },
  items: [{
    brand: String,
    price: Number,
    category: String,
    alternatives: [{
      brand: String,
      price: Number,
      tier: { type: String, enum: ['budget', 'mid-range', 'investment'] },
      retailerLink: String
    }],
    imageUrl: String
  }],
  occasion: { type: String, enum: ['airport', 'date night', 'concert', 'casual weekend'] },
  weather: { type: String, enum: ['hot', 'cold', 'mild', 'rainy'] },
  imageUrl: String,
  votes: [{ userId: String, score: Number }]
});

export default mongoose.model('Outfit', outfitSchema);