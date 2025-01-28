const { generateKey } = require("../../utils/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) =>{
    try {
        const users = await User.find().populate("favoritos");
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json("error")
    }
}

const getUserById = async (req, res, next) =>{
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate("favoritos");
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json("error")
    }
}

/* const register = async (req, res, next) =>{
    try {
        const userDuplicated = await User.findOne({ userName: req.body.userName });
        
        if(userDuplicated){
            return res.status(400).json("Usuario ya existente");
        }

        const newUser = new User({
            userName: req.body.userName,
            password: req.body.password,
            Email: req.body.Email,
            favoritos: req.body.favoritos,
            img: req.body.img,
            rol: "user"
        }); 
        const user = await newUser.save();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json("error")
    }
} */
    const register = async (req, res, next) => {
        try {
            const { userName, Email, password, img } = req.body;
    
            if (!userName || !Email || !password) {
                return res.status(400).json({ message: "Todos los campos son obligatorios." });
            }
    
            const userDuplicated = await User.findOne({ userName });
            if (userDuplicated) {
                return res.status(400).json({ message: "Usuario ya existente." });
            }
    
            const emailDuplicated = await User.findOne({ Email });
            if (emailDuplicated) {
                return res.status(400).json({ message: "Correo ya registrado." });
            }
    
            const newUser = new User({
                userName,
                Email,
                password,
                img: img || "https://default-image.com/default.png",
            });
    
            const user = await newUser.save();
            return res.status(201).json({ message: "Usuario registrado exitosamente.", user });
        } catch (error) {
            console.error("Error en el registro:", error);
            return res.status(500).json({ message: "Error interno del servidor." });
        }
    };
    


const login = async (req, res, next) =>{
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });

        if(!user){
            return res.status(400).json("Usuario o contraseña incorrectos");
        }

        if(bcrypt.compareSync(password, user.password)){
            const token = generateKey(user._id);
            return res.status(200).json({ token, user })
        }

        return res.status(400).json("Usuario o contraseña incorrectos");

    } catch (error) {
        return res.status(400).json("errorrr")
    }
}

const updateUser = async (req, res, next) =>{
  try {
    
    const { id } = req.params;

    if(req.user._id.toString() !== id){
        return res.status(400).json("Esta funcion solo la pueden realizar los administradores")
    }

    const oldUser = await User.findById(id);
    const newUser = new User(req.body);
    newUser._id = id;
    newUser.favoritos = [...oldUser.favoritos, ...newUser.favoritos];
    const userUpdate = await User.findByIdAndUpdate(id, newUser, {
        new: true,
    })

    return res.status(200).json(userUpdate);

  } catch (error) {
    return res.status(400).json("error");
  }
}

module.exports = {
    getUsers,
    getUserById,
    register,
    login,
    updateUser
}