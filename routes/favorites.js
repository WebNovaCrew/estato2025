const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  getUserFavorites,
  addFavorite,
  removeFavorite,
} = require('../config/database');

/**
 * @route   GET /api/favorites
 * @desc    Get user favorites
 * @access  Private
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const result = await getUserFavorites(req.userId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      data: result.data,
      count: result.data.length,
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   POST /api/favorites
 * @desc    Add property to favorites
 * @access  Private
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { propertyId } = req.body;

    if (!propertyId) {
      return res.status(400).json({
        success: false,
        error: 'Property ID required',
      });
    }

    const result = await addFavorite(req.userId, propertyId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json({
      success: true,
      message: 'Property added to favorites',
      data: result.data,
    });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   DELETE /api/favorites/:propertyId
 * @desc    Remove property from favorites
 * @access  Private
 */
router.delete('/:propertyId', authenticate, async (req, res) => {
  try {
    const result = await removeFavorite(req.userId, req.params.propertyId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      message: 'Property removed from favorites',
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

module.exports = router;

