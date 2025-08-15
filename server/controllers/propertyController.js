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
      availability || 'available'
    ];
console.log("Values for DB insert:", values);

    const dbResult = await db.query(query, values);
     const savedProperty = dbResult.rows[0];

     const responseData = {
      id: savedProperty.id,
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
      status: 'pending',
      rules: [],
      // Database timestamps
      created_at: savedProperty.created_at,
      updated_at: savedProperty.updated_at
    };

    res.status(201).json({
      
      ...savedProperty,
      rating: 0,
      reviewCount: 0,
      image: savedProperty.photos[0] || '',
      status: 'pending',
      rules: []
    });
    
  } catch (error) {
    console.error('Error saving property:', error);
    res.status(500).json({ error: 'Failed to save property', details: error.stack });
  }
};

module.exports = {
  createProperty
};