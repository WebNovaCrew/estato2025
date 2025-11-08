const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticate, optionalAuth } = require('../middleware/auth');
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require('../config/database');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { supabase } = require('../config/supabase');

// Fix multer reference in error handler
const MulterError = multer.MulterError;

// Configure multer for multiple file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

/**
 * @route   GET /api/properties
 * @desc    Get all properties with filters
 * @access  Public
 */
router.get('/', optionalAuth, async (req, res) => {
  try {
    const filters = {
      propertyType: req.query.propertyType,
      transactionType: req.query.transactionType,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : null,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : null,
      area: req.query.area,
      search: req.query.search,
    };

    const result = await getAllProperties(filters);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      data: result.data,
      count: result.data.length,
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   GET /api/properties/:id
 * @desc    Get property by ID
 * @access  Public
 */
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const result = await getPropertyById(req.params.id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   POST /api/properties
 * @desc    Create new property
 * @access  Private
 */
router.post(
  '/',
  authenticate,
  upload.array('images', 10),
  [
    body('title').notEmpty().trim(),
    body('description').notEmpty().trim(),
    body('price').isFloat({ min: 0 }),
    body('propertyType').isIn(['Apartment', 'House', 'Villa', 'Room', 'PG', 'Commercial', 'Shop', 'Warehouse', 'Plot', 'Farmhouse', 'Studio', 'Penthouse', 'Office Space']),
    body('transactionType').isIn(['Buy', 'Rent', 'Lease', 'Room Rent', 'PG', 'Co-living', 'Short-term Rent', 'Lease-to-Own']),
    body('location').notEmpty().trim(),
    body('area').notEmpty().trim(),
    body('size').isFloat({ min: 0 }),
    body('bedrooms').isInt({ min: 0 }),
    body('bathrooms').isInt({ min: 0 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          errors: errors.array(),
        });
      }

      // Get user profile for owner details
      const { data: userProfile } = await supabase
        .from('users')
        .select('name, phone')
        .eq('id', req.userId)
        .single();

      // Upload images to Supabase Storage
      const imageUrls = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const fileExt = file.originalname.split('.').pop();
          const fileName = `properties/${uuidv4()}.${fileExt}`;

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(fileName, file.buffer, {
              contentType: file.mimetype,
              upsert: false,
            });

          if (!uploadError) {
            const { data: urlData } = supabase.storage
              .from('property-images')
              .getPublicUrl(fileName);
            imageUrls.push(urlData.publicUrl);
          }
        }
      }

      const propertyData = {
        title: req.body.title,
        description: req.body.description,
        price: parseFloat(req.body.price),
        property_type: req.body.propertyType,
        transaction_type: req.body.transactionType,
        location: req.body.location,
        area: req.body.area,
        size: parseFloat(req.body.size),
        bedrooms: parseInt(req.body.bedrooms),
        bathrooms: parseInt(req.body.bathrooms),
        images: imageUrls,
        owner_id: req.userId,
        owner_name: userProfile?.name || 'Unknown',
        owner_phone: req.body.ownerPhone || userProfile?.phone || '',
        amenities: req.body.amenities ? JSON.parse(req.body.amenities) : [],
        is_furnished: req.body.isFurnished === 'true',
        year_built: req.body.yearBuilt ? parseInt(req.body.yearBuilt) : null,
        latitude: req.body.latitude ? parseFloat(req.body.latitude) : null,
        longitude: req.body.longitude ? parseFloat(req.body.longitude) : null,
        is_featured: req.body.isFeatured === 'true',
        status: 'pending', // New listings need approval
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const result = await createProperty(propertyData);

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.status(201).json({
        success: true,
        message: 'Property created successfully',
        data: result.data,
      });
    } catch (error) {
      console.error('Create property error:', error);
      res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
);

/**
 * @route   PUT /api/properties/:id
 * @desc    Update property
 * @access  Private
 */
router.put(
  '/:id',
  authenticate,
  upload.array('images', 10),
  async (req, res) => {
    try {
      // Check if user owns the property
      const property = await getPropertyById(req.params.id);
      if (!property.success || property.data.owner_id !== req.userId) {
        return res.status(403).json({
          success: false,
          error: 'You do not have permission to update this property',
        });
      }

      const updates = {};
      if (req.body.title) updates.title = req.body.title;
      if (req.body.description) updates.description = req.body.description;
      if (req.body.price) updates.price = parseFloat(req.body.price);
      if (req.body.propertyType) updates.property_type = req.body.propertyType;
      if (req.body.transactionType) updates.transaction_type = req.body.transactionType;
      if (req.body.location) updates.location = req.body.location;
      if (req.body.area) updates.area = req.body.area;
      if (req.body.size) updates.size = parseFloat(req.body.size);
      if (req.body.bedrooms) updates.bedrooms = parseInt(req.body.bedrooms);
      if (req.body.bathrooms) updates.bathrooms = parseInt(req.body.bathrooms);
      if (req.body.amenities) updates.amenities = JSON.parse(req.body.amenities);
      if (req.body.isFurnished !== undefined) updates.is_furnished = req.body.isFurnished === 'true';
      if (req.body.yearBuilt) updates.year_built = parseInt(req.body.yearBuilt);
      if (req.body.latitude) updates.latitude = parseFloat(req.body.latitude);
      if (req.body.longitude) updates.longitude = parseFloat(req.body.longitude);

      // Handle new images
      if (req.files && req.files.length > 0) {
        const imageUrls = property.data.images || [];
        for (const file of req.files) {
          const fileExt = file.originalname.split('.').pop();
          const fileName = `properties/${uuidv4()}.${fileExt}`;

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(fileName, file.buffer, {
              contentType: file.mimetype,
              upsert: false,
            });

          if (!uploadError) {
            const { data: urlData } = supabase.storage
              .from('property-images')
              .getPublicUrl(fileName);
            imageUrls.push(urlData.publicUrl);
          }
        }
        updates.images = imageUrls;
      }

      updates.updated_at = new Date().toISOString();

      const result = await updateProperty(req.params.id, updates);

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.json({
        success: true,
        message: 'Property updated successfully',
        data: result.data,
      });
    } catch (error) {
      console.error('Update property error:', error);
      res.status(500).json({
        success: false,
        error: 'Server error',
      });
    }
  }
);

/**
 * @route   DELETE /api/properties/:id
 * @desc    Delete property
 * @access  Private
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    // Check if user owns the property
    const property = await getPropertyById(req.params.id);
    if (!property.success || property.data.owner_id !== req.userId) {
      return res.status(403).json({
        success: false,
        error: 'You do not have permission to delete this property',
      });
    }

    const result = await deleteProperty(req.params.id);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      message: 'Property deleted successfully',
    });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   GET /api/properties/:id/similar
 * @desc    Get similar properties
 * @access  Public
 */
router.get('/:id/similar', optionalAuth, async (req, res) => {
  try {
    const property = await getPropertyById(req.params.id);
    if (!property.success) {
      return res.status(404).json(property);
    }

    const filters = {
      propertyType: property.data.property_type,
      transactionType: property.data.transaction_type,
      area: property.data.area,
    };

    const result = await getAllProperties(filters);
    if (!result.success) {
      return res.status(400).json(result);
    }

    // Filter out current property and limit to 5
    const similarProperties = result.data
      .filter(p => p.id !== req.params.id)
      .slice(0, 5);

    res.json({
      success: true,
      data: similarProperties,
    });
  } catch (error) {
    console.error('Get similar properties error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

module.exports = router;

