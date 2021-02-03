const Imagen = require("../models/imagen")
const fs = require("fs-extra")
const imagectrl = {}
imagectrl.uploadImage = function(req,res){
    let extension = req.body.archivo.name.split(".").pop()
    let data = {
        title: req.body.title
    }
    let imagen = new Imagen(data);
    imagen.save(function(err){
        if(!err){
            fs.rename(req.body.archivo.path, `public/imagenes/${imagen._id}.${extension}`)
            res.redirect("/public/imgs/freestylers/"+imagen._id)
        }else{
            console.log(imagen)
            res.render(err)
        }
    })
}
module.exports = imagectrl
