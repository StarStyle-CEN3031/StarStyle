import mongoose from 'mongoose';

const celebritySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  aesthetic: { type: String, required: true },
  outfits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Outfit' }]
});

export default mongoose.model('Celebrity', celebritySchema);