const { isAuth } = require("../../middlewares/auth");
const { getEventos, getEventoById, postEvento, updateEvento, deleteEvento } = require("../controllers/eventos");

const eventosRouter = require("express").Router();

eventosRouter.get("/", getEventos);
eventosRouter.get("/:id", getEventoById);
eventosRouter.post("/", isAuth, postEvento);
eventosRouter.put("/:id", isAuth,  updateEvento);
eventosRouter.delete("/:id",isAuth, deleteEvento);

module.exports = eventosRouter;