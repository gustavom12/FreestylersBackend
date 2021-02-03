const mongoose = require("mongoose"),
    Schema = mongoose.Schema

let imgSchema = new Schema({
    //title es el título de la imagen, por ejemplo: _id del freestyler, o su nombre
    title:{type: String,required: true},
    extension:{type: String, required: true}
})

module.exports = mongoose.model("Imagen",imgSchema)