const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("conectado a la base de datos");
    } catch (error) {
        console.log("error al conectarse a la base de datos");
    }
    
}

module.exports = { connectDB }