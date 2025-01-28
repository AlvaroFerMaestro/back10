const { isAuth, isAdmin } = require("../../middlewares/auth");
const { getUsers, getUserById, login, register, updateUser } = require("../controllers/user");


const usersRouter = require("express").Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.put("/:id", isAdmin, isAuth, updateUser);

module.exports = usersRouter;