import express from 'express';
import Outfit from '../models/Outfit.js';

const router = express.Router();

// get all outfits with optional filters
router.get('/', async (req, res) => {
  try {
    const { occasion, weather, tier, celebrityId } = req.query;
    const query = {};
    if (occasion) query.occasion = occasion;
    if (weather) query.weather = weather;
    if (tier) query['items.alternatives.tier'] = tier;
    if (celebrityId) query.celebrityId = celebrityId;

    const outfits = await Outfit.find(query).populate('celebrityId', 'name aesthetic');
    res.json({ data: outfits, status: 200 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// gets single outfit by ID
router.get('/:id', async (req, res) => {
  try {
    const outfit = await Outfit.findById(req.params.id).populate('celebrityId', 'name aesthetic');
    if (!outfit) return res.status(404).json({ error: 'Outfit not found' });
    res.json({ data: outfit, status: 200 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// adds new outfit (admin-only)
router.post('/', async (req, res) => {
  try {
    const outfit = new Outfit(req.body);
    await outfit.save();
    res.status(201).json({ data: outfit, status: 201 });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;