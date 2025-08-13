const db = require('../db');

const createProperty = async (req, res) => {
  try {
    const {
      title,
      type,
      location,
      nearestCollege,
      distance,
      price,
      priceType,
      description,
      amenities,
      contact,
      photos,
      capacity,
      availability
    } = req.body;

    const query = `
      INSERT INTO property_listings (
        title, type, location, nearest_college, distance,
        price, price_type, description, amenities,
        owner_name, owner_phone, owner_email,
        capacity, photos, availability
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *
    `;

    const values = [
      title,
      type,
      location,
      nearestCollege || null,
      distance || null,
      parseFloat(price),
      priceType,
      description || null,
      amenities || [],
      contact.owner,
      contact.phone,
      contact.email,
      capacity ? parseInt(capacity) : null,
      photos || [],
      availability || 'available'
    ];

    const result = await db.query(query, values);
    res.status(201).json(result.rows[0]);
    
  } catch (error) {
    console.error('Error saving property:', error);
    res.status(500).json({ error: 'Failed to save property', details: error.message });
  }
};

module.exports = {
  createProperty
};