const express = require('express');
const router = express.Router();
const {appCode}Service = require('../services/{appCode}Service');
// NOTE: tenantMiddleware must be provided by the platform
// When integrating, adjust path to point to portal's middleware
const { tenantMiddleware } = require('../middleware/tenantMiddleware');  // Adjust path accordingly

// All routes require tenant context
router.use(tenantMiddleware);

/**
 * GET /api/{route}
 * Get all items for the current tenant
 */
router.get('/', async (req, res) => {
  try {
    const items = await {appCode}Service.getItems();
    res.json({ items });
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

/**
 * POST /api/{route}
 * Create a new item
 * Body: { name, description, ... }
 */
router.post('/', async (req, res) => {
  try {
    const itemData = req.body;

    // Validation
    if (!itemData.name) {
      return res.status(400).json({ 
        error: 'name is required' 
      });
    }

    const item = await {appCode}Service.createItem(itemData);

    res.status(201).json({ 
      message: 'Item created successfully',
      item 
    });
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

/**
 * GET /api/{route}/:id
 * Get specific item details
 */
router.get('/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    
    if (isNaN(itemId)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }

    const items = await {appCode}Service.getItems();
    const item = items.find(i => i.id === itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ item });
  } catch (err) {
    console.error('Error fetching item:', err);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

/**
 * PUT /api/{route}/:id
 * Update an item
 */
router.put('/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    
    if (isNaN(itemId)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }

    const itemData = req.body;
    const item = await {appCode}Service.updateItem(itemId, itemData);

    res.json({ 
      message: 'Item updated successfully',
      item 
    });
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

/**
 * DELETE /api/{route}/:id
 * Delete an item (soft delete)
 */
router.delete('/:id', async (req, res) => {
  try {
    const itemId = parseInt(req.params.id, 10);
    
    if (isNaN(itemId)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }

    await {appCode}Service.deleteItem(itemId);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;

