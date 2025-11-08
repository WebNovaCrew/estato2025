const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const {
  getUserChats,
  getChatMessages,
  createChat,
  sendMessage,
} = require('../config/database');
const { supabase } = require('../config/supabase');

/**
 * @route   GET /api/chats
 * @desc    Get user chats
 * @access  Private
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const result = await getUserChats(req.userId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      data: result.data,
      count: result.data.length,
    });
  } catch (error) {
    console.error('Get chats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   POST /api/chats
 * @desc    Create new chat
 * @access  Private
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { participant2Id, propertyId } = req.body;

    if (!participant2Id || !propertyId) {
      return res.status(400).json({
        success: false,
        error: 'Participant ID and Property ID required',
      });
    }

    // Get property details
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('title, owner_id, owner_name')
      .eq('id', propertyId)
      .single();

    if (propertyError || !property) {
      return res.status(404).json({
        success: false,
        error: 'Property not found',
      });
    }

    // Get participant names
    const { data: user1 } = await supabase
      .from('users')
      .select('name')
      .eq('id', req.userId)
      .single();

    const { data: user2 } = await supabase
      .from('users')
      .select('name')
      .eq('id', participant2Id)
      .single();

    const chatData = {
      participant1_id: req.userId,
      participant1_name: user1?.name || 'Unknown',
      participant2_id: participant2Id,
      participant2_name: user2?.name || 'Unknown',
      property_id: propertyId,
      property_title: property.title,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const result = await createChat(chatData);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json({
      success: true,
      message: 'Chat created successfully',
      data: result.data,
    });
  } catch (error) {
    console.error('Create chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   GET /api/chats/:chatId/messages
 * @desc    Get chat messages
 * @access  Private
 */
router.get('/:chatId/messages', authenticate, async (req, res) => {
  try {
    // Verify user is participant in chat
    const { data: chat, error: chatError } = await supabase
      .from('chats')
      .select('*')
      .eq('id', req.params.chatId)
      .single();

    if (chatError || !chat) {
      return res.status(404).json({
        success: false,
        error: 'Chat not found',
      });
    }

    if (chat.participant1_id !== req.userId && chat.participant2_id !== req.userId) {
      return res.status(403).json({
        success: false,
        error: 'You do not have access to this chat',
      });
    }

    const result = await getChatMessages(req.params.chatId);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json({
      success: true,
      data: result.data,
      count: result.data.length,
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

/**
 * @route   POST /api/chats/:chatId/messages
 * @desc    Send message
 * @access  Private
 */
router.post('/:chatId/messages', authenticate, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message content required',
      });
    }

    // Verify user is participant in chat
    const { data: chat, error: chatError } = await supabase
      .from('chats')
      .select('*')
      .eq('id', req.params.chatId)
      .single();

    if (chatError || !chat) {
      return res.status(404).json({
        success: false,
        error: 'Chat not found',
      });
    }

    if (chat.participant1_id !== req.userId && chat.participant2_id !== req.userId) {
      return res.status(403).json({
        success: false,
        error: 'You do not have access to this chat',
      });
    }

    // Get sender name
    const { data: sender } = await supabase
      .from('users')
      .select('name')
      .eq('id', req.userId)
      .single();

    const messageData = {
      chat_id: req.params.chatId,
      sender_id: req.userId,
      sender_name: sender?.name || 'Unknown',
      content: content.trim(),
      created_at: new Date().toISOString(),
    };

    const result = await sendMessage(messageData);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: result.data,
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

module.exports = router;

