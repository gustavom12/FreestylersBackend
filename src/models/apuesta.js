const mongoose = require("mongoose"),
    {Schema} = mongoose

const apuesta = new Schema({
    //Nombre del freestyler(izquierda)
    leftFreestyler: {
        _id:{type: String},
        nombre:{type: String},
        pais:{type: String},
        imgUrl:{type:String} 
    },
    rightFreestyler: {
        _id:{type: String},
        nombre:{type: String},
        pais:{type: String},
        imgUrl:{type:String} 
    },
    //Puntos de puesta de freestyler en la posicion izquierda
    leftPoints:{type: Number},
    rightPoints:{type:Number},
    finishDate: {type: Number, required: true},
    //Organización del evento, ejemplo: {nombre:FMS, img:"imgurl"}
    organization: {type: String}
})

module.exports = mongoose.model("apuesta",apuesta)