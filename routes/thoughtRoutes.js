const { Router } = require('express');
const {
  getThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../controllers/thoughtController');

const router = Router();

// Get list of all thoughts
router.get('/', getThoughts);

// Get a single thought by id
router.get('/:id', getThought);

// Create a thought
router.post('/', createThought);

// Update a thought
router.put('/:id', updateThought);

// Delete a thought
router.delete('/:id', deleteThought);

// Create a reaction
router.post('/:thoughtId/reactions', addReaction);

// Delete a reaction
router.delete('/:thoughtId/reactions', deleteReaction);

module.exports = router;