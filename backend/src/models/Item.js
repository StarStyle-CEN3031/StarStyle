import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User' },
  type: String,
  brand: String,
  color: String,
  imageUrl: String
});

export default mongoose.model('Item', itemSchema);