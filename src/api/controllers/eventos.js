const Evento = require("../models/eventos")

const getEventos = async (req, res, next) =>{
    try {
        const eventos = await Evento.find();
        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(400).json("error")
    }
}

const getEventoById = async (req, res, next) =>{
    try {
        const { id } = req.params;
        const evento = await Evento.findById(id);
        return res.status(200).json(evento);
    } catch (error) {
        return res.status(400).json("error")
    }
}

const postEvento = async (req, res, next) =>{
    try {
        const newEvento = new Evento(req.body);
        const evento = await newEvento.save();
        return res.status(201).json(evento)
    } catch (error) {
        return res.status(400).json("error")
    }
}

const updateEvento = async (req, res, next) =>{
    try {
        const { id } = req.params;
        const newEvento = new Evento(req.body);
        newEvento._id = id;
        const eventoUpdate = await Evento.findByIdAndUpdate(id, newEvento,{
          new: true,
        });
        return res.status(200).json(eventoUpdate);
    } catch (error) {
        return res.status(400).json("error")
    }
}

const deleteEvento = async (req, res, next) =>{
    try {
        const { id } = req.params;
        const evento = await Evento.findByIdAndDelete(id);
        return res.status(200).json({
            mensaje: "El evento ha sido eliminado",
            eventoEliminado: evento,
        })
        
    } catch (error) {
        return res.status(400).json("error")
    }
}

module.exports = {
    getEventos,
    getEventoById,
    postEvento,
    updateEvento,
    deleteEvento
}