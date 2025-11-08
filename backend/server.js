console.log('=== INICIANDO SERVIDOR ===');

try {
  console.log('1. Cargando dotenv...');
  require('dotenv').config();
  console.log('✅ dotenv cargado');

  console.log('2. Cargando express...');
  const express = require('express');
  console.log('✅ express cargado');

  console.log('3. Cargando cors...');
  const cors = require('cors');
  console.log('✅ cors cargado');

  console.log('4. Cargando database...');
  const connectDB = require('./config/database');
  console.log('✅ database cargado');
  console.log('Tipo de connectDB:', typeof connectDB);

  console.log('5. Cargando rutas...');
  const contactoRoutes = require('./routes/contacto');
  console.log('✅ rutas cargadas');

  const app = express();

  console.log('6. Conectando a MongoDB...');
  connectDB();

  console.log('7. Configurando middlewares...');
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  console.log('✅ middlewares configurados');

  console.log('8. Configurando rutas...');
  app.use('/api/contacto', contactoRoutes);

  app.get('/', (req, res) => {
    res.json({ message: 'API HitOcean funcionando' });
  });
  console.log('✅ rutas configuradas');

  const PORT = process.env.PORT || 3000;
  
  console.log('9. Iniciando servidor...');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });

} catch (error) {
  console.error('❌ ERROR AL INICIAR:', error);
  console.error('Stack:', error.stack);
}