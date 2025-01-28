const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({

    userName: { type: String, required: true },
    Email: { type: String, required: true },
    password: { type: String, required: true },
    favoritos: [{ type: mongoose.Types.ObjectId, required: false, ref: "eventos" }],
    img: { type: String, required: true, ref: "user", default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShB4tmdMlAIWnS4_CW3w2o5xH8iJH99Jjwng&s" }, 
    rol: { type: String, required: true, default: "user", enum: ["admin", "user"], }

}, {
    timestamps: true,
    collection: "users"
});

userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 10);
})

const User = mongoose.model("users", userSchema, "users");
module.exports = User

