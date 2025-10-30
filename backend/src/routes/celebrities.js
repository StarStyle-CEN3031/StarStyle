import express from 'express';
import Celebrity from '../models/Celebrity.js';
import Outfit from '../models/Outfit.js';

const router = express.Router();

// get celebrities with optional aesthetic filter
router.get('/', async (req, res) => {
  try {
    const { aesthetic } = req.query;
    const query = aesthetic ? { aesthetic } : {};
    const celebrities = await Celebrity.find(query).populate('outfits');
    res.json({ data: celebrities, status: 200 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get single celebrity and their outfits
router.get('/:id/outfits', async (req, res) => {
  try {
    const celebrity = await Celebrity.findById(req.params.id);
    if (!celebrity) return res.status(404).json({ error: 'Celebrity not found' });
    const outfits = await Outfit.find({ celebrityId: req.params.id });
    res.json({ data: { celebrity, outfits }, status: 200 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;