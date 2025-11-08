const express = require('express');
const router = express.Router();
const { authenticate, requireAdmin } = require('../middleware/auth');
const { supabase } = require('../config/supabase');

/**
 * @route   GET /api/admin/dashboard
 * @desc    Get admin dashboard stats
 * @access  Private (Admin only)
 */
router.get('/dashboard', authenticate, requireAdmin, async (req, res) => {
  try {
    // Get total users
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // Get total properties
    const { count: totalProperties } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true });

    // Get pending properties
    const { count: pendingProperties } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Get total revenue
    const { data: payments } = await supabase
      .from('payments')
      .select('amount')
      .eq('status', 'completed');

    const totalRevenue = payments?.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0) || 0;

    res.json({
      success: true,
      data: {
        totalUsers: totalUsers || 0,
        totalProperties: totalProperties || 0,
        pendingProperties: pendingProperties || 0,
        totalRevenue: totalRevenue,
      },
    });
  } catch (error) {
    console.error('Get admin dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   GET /api/admin/users
 * @desc    Get all users
 * @access  Private (Admin only)
 */
router.get('/users', authenticate, requireAdmin, async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   GET /api/admin/properties
 * @desc    Get all properties (with filters)
 * @access  Private (Admin only)
 */
router.get('/properties', authenticate, requireAdmin, async (req, res) => {
  try {
    let query = supabase.from('properties').select('*');

    if (req.query.status) {
      query = query.eq('status', req.query.status);
    }

    const { data: properties, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      data: properties,
      count: properties.length,
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
 * @route   PUT /api/admin/properties/:id/approve
 * @desc    Approve property listing
 * @access  Private (Admin only)
 */
router.put('/properties/:id/approve', authenticate, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .update({
        status: 'approved',
        updated_at: new Date().toISOString(),
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: 'Property approved successfully',
      data,
    });
  } catch (error) {
    console.error('Approve property error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   PUT /api/admin/properties/:id/reject
 * @desc    Reject property listing
 * @access  Private (Admin only)
 */
router.put('/properties/:id/reject', authenticate, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .update({
        status: 'rejected',
        updated_at: new Date().toISOString(),
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: 'Property rejected',
      data,
    });
  } catch (error) {
    console.error('Reject property error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   GET /api/admin/agents
 * @desc    Get all agents (pending approval)
 * @access  Private (Admin only)
 */
router.get('/agents', authenticate, requireAdmin, async (req, res) => {
  try {
    const { data: agents, error } = await supabase
      .from('users')
      .select('*')
      .in('user_type', ['agent', 'landlord', 'owner'])
      .eq('verified', false)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      data: agents,
      count: agents.length,
    });
  } catch (error) {
    console.error('Get agents error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   PUT /api/admin/agents/:id/approve
 * @desc    Approve agent
 * @access  Private (Admin only)
 */
router.put('/agents/:id/approve', authenticate, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        verified: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: 'Agent approved successfully',
      data,
    });
  } catch (error) {
    console.error('Approve agent error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   GET /api/admin/reports
 * @desc    Get all reports
 * @access  Private (Admin only)
 */
router.get('/reports', authenticate, requireAdmin, async (req, res) => {
  try {
    const { data: reports, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      data: reports,
      count: reports.length,
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   PUT /api/admin/reports/:id/resolve
 * @desc    Resolve report
 * @access  Private (Admin only)
 */
router.put('/reports/:id/resolve', authenticate, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reports')
      .update({
        status: 'resolved',
        resolved_at: new Date().toISOString(),
        resolved_by: req.userId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: 'Report resolved successfully',
      data,
    });
  } catch (error) {
    console.error('Resolve report error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

module.exports = router;

