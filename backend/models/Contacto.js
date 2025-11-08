const mongoose = require('mongoose');

const ContactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  empresa: {
    type: String,
    required: [true, 'La empresa es obligatoria'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  telefono: {
    type: String,
    trim: true
  },
  idea: {
    type: String,
    required: [true, 'La idea/proyecto es obligatoria'],
    trim: true
  },
  conociste: {
    type: String,
    required: [true, 'Este campo es obligatorio'],
    enum: ['redes-sociales', 'google', 'recomendacion', 'evento', 'otro']
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['pendiente', 'contactado', 'cerrado'],
    default: 'pendiente'
  }
});

module.exports = mongoose.model('Contacto', ContactoSchema);