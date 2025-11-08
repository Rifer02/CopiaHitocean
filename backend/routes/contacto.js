const express = require('express');
const router = express.Router();
const Contacto = require('../models/Contacto');

router.post('/', async (req, res) => {
  try {
    const { nombre, empresa, email, telefono, idea, conociste } = req.body;

    const nuevoContacto = new Contacto({
      nombre,
      empresa,
      email,
      telefono,
      idea,
      conociste
    });

    await nuevoContacto.save();
    console.log('✅ Contacto guardado:', nuevoContacto);

    res.status(201).json({
      success: true,
      message: 'Contacto guardado exitosamente',
      data: nuevoContacto
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(400).json({
      success: false,
      message: 'Error al guardar el contacto',
      error: error.message
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const contactos = await Contacto.find().sort({ fechaCreacion: -1 });
    res.json({
      success: true,
      count: contactos.length,
      data: contactos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener contactos',
      error: error.message
    });
  }
});

module.exports = router;