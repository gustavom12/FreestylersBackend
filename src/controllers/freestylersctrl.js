const Freestyler = require("../models/freestyler"),
    freestylerctrl = {}
freestylerctrl.getAll = async (req,res)=>{
    let {skip} = req.params,
        {limit} = req.params,
        {asc} = req.params
    if(!skip)skip = 0
    if(!limit)limit = 20 
    const freestylers = await Freestyler.find()
        .skip(skip)
        .limit(limit)
        if(asc)Freestyler.asc(asc)
        .catch((err) => res.json({error: err}));
    res.json(freestylers)
}
freestylerctrl.getOne = async (req, res)=>{
    const {id} = req.params
    const freestyler = await Freestyler.findById(id).catch((err) => res.json({error: err}));
    res.json(freestyler)
}

freestylerctrl.post = async (req,res)=>{
    const freestyler = new Freestyler(req.body)
    await freestyler.save().catch((err) => res.json({error: err}));
    res.json({
        "status": "guardado correctamente"
    })
}

freestylerctrl.put = async (req,res)=>{
    const {id} = req.params
    const newApuesta = {
        nombre: req.body.nombre,
        pais: req.body.pais,
        imgUrl: req.body.imgUrl
    }
    await apuesta.findByIdAndUpdate(id,{$set:newApuesta}).catch((err) => res.json({error: err}));
    res.json({status:"se ha actualizado correctamente"})
}

freestylerctrl.delete = async(req,res)=>{
    const freestyler = await Freestyler.findOneAndRemove(req.params.id).catch((err) => res.json({error: err}));
    res.json({status: "Eliminado correctamente"})
}
module.exports = freestylerctrl