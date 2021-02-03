const mongoose = require("mongoose"),
    {Schema} = mongoose

const Freestyler = new Schema({
    nombre: {type: String, required: true, unique: true},
    pais: {type:String, required: true ,lowercase: true},
    imgUrl: {type: String, required: true}
})

module.exports = mongoose.model("Freestyler",Freestyler)