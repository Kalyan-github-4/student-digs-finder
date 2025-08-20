//PROPERTYCONTROLLER.JS

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
        capacity, photos, availability, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
    `;
  console.log("Incoming property data:", req.body);
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
      availability || 'available',
      "approved"
    ];
console.log("Values for DB insert:", values);

    const dbResult = await db.query(query, values);
     const savedProperty = dbResult.rows[0];

     const responseData = {
      id: String(savedProperty.id),
      title: savedProperty.title,
      type: savedProperty.type,
      location: savedProperty.location,
      nearestCollege: savedProperty.nearest_college,
      distance: savedProperty.distance,
      price: savedProperty.price,
      priceType: savedProperty.price_type,
      description: savedProperty.description,
      amenities: savedProperty.amenities,
      availability: savedProperty.availability,
      contact: {
        owner: savedProperty.owner_name,
        phone: savedProperty.owner_phone,
        email: savedProperty.owner_email
      },
      photos: savedProperty.photos,
      capacity: savedProperty.capacity,
      // Frontend required fields
      rating: 0,
      reviewCount: 0,
      image: savedProperty.photos?.[0] || '', // Use first photo as main image
      status: 'approved',
      rules: [],
      // Database timestamps
      created_at: savedProperty.created_at,
      updated_at: savedProperty.updated_at
    };

    res.status(201).json(responseData);
    
  } catch (error) {
    console.error('Error saving property:', error);
    res.status(500).json({ error: 'Failed to save property', details: error.stack });
  }
};

// New: Get all properties
const getProperties = async (req, res) => {
  try {
    const query = `SELECT * FROM property_listings ORDER BY created_at DESC`;
    const result = await db.query(query);

    // Format rows for frontend
    const properties = result.rows.map(p => ({
      id: String(p.id),
      title: p.title,
      type: p.type,
      location: p.location,
      nearestCollege: p.nearest_college,
      distance: p.distance,
      price: p.price,
      priceType: p.price_type,
      description: p.description,
      amenities: p.amenities || [],
      availability: p.availability,
      contact: {
        owner: p.owner_name,
        phone: p.owner_phone,
        email: p.owner_email
      },
      photos: p.photos || [],
      capacity: p.capacity,
      rating: 0,
      reviewCount: 0,
      image: p.photos?.[0] || "",
      status: p.status,
      rules: [],
      created_at: p.created_at,
      updated_at: p.updated_at
    }));
    res.json(properties);
    console.log("Raw DB rows:", result.rows); // <- log raw DB response
  } catch (error) {
    console.error("Error fetching properties:", error);
     res.status(500).json({ error: error.message, details: error.stack });
  }
};

module.exports = {
  createProperty,
  getProperties
};