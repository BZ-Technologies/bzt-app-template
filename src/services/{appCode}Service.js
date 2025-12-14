// NOTE: These dependencies must be provided by the platform
// When integrating, adjust paths to point to portal's db pool and middleware
const pool = require('../db/pool');  // Adjust path: ../../db/pool or /opt/bzt-portal/app/src/db/pool
const { getTenantId } = require('../middleware/tenantMiddleware');  // Adjust path accordingly

/**
 * Get all items for the current tenant
 * @returns {Promise<Array>} Array of items
 */
async function getItems() {
  const tenantId = getTenantId();
  if (!tenantId) {
    throw new Error('Tenant context required');
  }

  const conn = await pool.getConnection();
  try {
    const items = await conn.query(
      `SELECT 
        id, name, description, status, created_at, updated_at
       FROM {app_code}_items
       WHERE tenant_id = ? AND is_active = TRUE
       ORDER BY created_at DESC`,
      [tenantId]
    );
    return items;
  } finally {
    conn.release();
  }
}

/**
 * Create a new item
 * @param {Object} itemData - Item information
 * @returns {Promise<Object>} Created item record
 */
async function createItem(itemData) {
  const tenantId = getTenantId();
  if (!tenantId) {
    throw new Error('Tenant context required');
  }

  const { name, description } = itemData;

  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      `INSERT INTO {app_code}_items 
       (tenant_id, name, description, is_active)
       VALUES (?, ?, ?, ?)`,
      [tenantId, name, description || null, true]
    );

    // Fetch the created record
    const [item] = await conn.query(
      'SELECT * FROM {app_code}_items WHERE id = ?',
      [result.insertId]
    );

    return item;
  } finally {
    conn.release();
  }
}

/**
 * Update an item
 * @param {number} itemId - ID of the item
 * @param {Object} itemData - Updated item data
 * @returns {Promise<Object>} Updated item record
 */
async function updateItem(itemId, itemData) {
  const tenantId = getTenantId();
  if (!tenantId) {
    throw new Error('Tenant context required');
  }

  const conn = await pool.getConnection();
  try {
    // Verify tenant owns this item
    const [existing] = await conn.query(
      'SELECT id FROM {app_code}_items WHERE id = ? AND tenant_id = ?',
      [itemId, tenantId]
    );

    if (!existing) {
      throw new Error('Item not found or access denied');
    }

    // Update item
    await conn.query(
      `UPDATE {app_code}_items SET
        name = ?,
        description = ?,
        updated_at = NOW()
       WHERE id = ? AND tenant_id = ?`,
      [
        itemData.name || null,
        itemData.description || null,
        itemId,
        tenantId
      ]
    );

    // Fetch updated record
    const [updated] = await conn.query(
      'SELECT * FROM {app_code}_items WHERE id = ?',
      [itemId]
    );

    return updated;
  } finally {
    conn.release();
  }
}

/**
 * Delete an item (soft delete by setting is_active = false)
 * @param {number} itemId - ID of the item to delete
 * @returns {Promise<void>}
 */
async function deleteItem(itemId) {
  const tenantId = getTenantId();
  if (!tenantId) {
    throw new Error('Tenant context required');
  }

  const conn = await pool.getConnection();
  try {
    await conn.query(
      'UPDATE {app_code}_items SET is_active = FALSE WHERE id = ? AND tenant_id = ?',
      [itemId, tenantId]
    );
  } finally {
    conn.release();
  }
}

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem
};

