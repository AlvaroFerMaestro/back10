const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({

    titulo: { type: String, require: true },
    precio: { type: Number, required: true },
    imagen: { type: String, require: true },
    descripcion: { type: String, require: true },
    valoracion: { type: Number, require: true },
}, {
    timestamps: true,
    collection: "eventos"
});

const Evento = mongoose.model("eventos", eventoSchema, "eventos");
module.exports = Evento