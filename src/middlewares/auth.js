const User = require("../api/models/user");
const { verificarLlave } = require("../utils/jwt");

const isAuth  = async (req, res, next) =>{
    try {
        
        const token = req.headers.authorization;
        const parsedToken = token.replace("Bearer ", "");

        const { id } = verificarLlave(parsedToken);
        const user = await User.findById(id)

        user.password = null;
        req.user = user;
        next();

    } catch (error) {
        return res.status(400).json("No estas autorizado")
    }
}

const isAdmin = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization;
        const parsedToken = token.replace("Bearer ", "");

        const { id } = verifyJwt(parsedToken);

        const user = await User.findById(id);

        if(user.rol === "admin"){
             user.password = null;
        req.user = user;
        next();
        } else {
            return res.status(400).json("Esta accion solo la puede utilizar los administradores.")
        }

       

    } catch (error) {
        return res.status(400).json("No estas autorizado");
    }
}

module.exports = { isAuth, isAdmin }