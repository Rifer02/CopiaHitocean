require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conexión exitosa a MongoDB');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📦 Colecciones disponibles:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('👋 Desconectado');
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

testConnection();