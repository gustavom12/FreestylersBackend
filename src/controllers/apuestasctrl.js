const apuestaCtrl = {},
    apuesta = require("../models/apuesta"),
    freestyler = require("../models/freestyler")

apuestaCtrl.apuestasGet = async (req,res)=>{
    let {skip} = Number(req.query.skip),
        {limit} = Number(req.query.limit),
        {asc} = req.query
    const apuestas = await apuesta.find()
        // if(skip)apuestas.skip(skip)
        // if(limit)apuestas.limit(limit)
        // if(asc)apuestas.asc(asc)
        .catch((err) => res.json({error: err}));
    res.json(apuestas)
}
apuestaCtrl.apuestasPost = async (req,res)=>{
    const {
        leftPoints,rightPoints, organization,finishDate,rightFreestylerId,leftFreestylerId
    } = req.body
    const leftFreestyler = await freestyler.findById(leftFreestylerId)
        .catch((err) => res.json({error: "err1"}))
    const rightFreestyler = await freestyler.findById(rightFreestylerId)
        .catch((err) => res.json({error: "err2"}))
    const newApuesta = await new apuesta({
        leftFreestyler: leftFreestyler,
        rightFreestyler: rightFreestyler,
        leftPoints: leftPoints,
        rightPoints: rightPoints,
        finishDate: finishDate,
        organization: organization
    })
    await newApuesta.save().catch((err) => res.status(500).json({error: "err3"}));
    res.json({
        "status": "guardado correctamente"
    })
}
apuestaCtrl.apuestasPut = async (req,res)=>{
    const {id} = req.params
    const newApuesta = {
        leftFreestylerName: req.body.leftFreestylerName,
        leftPoints: req.body.leftPoints,
        rightFreestylerName: req.body.rightFreestylerName,
        rightPoints: req.body.rightPoints,
        finishDate: req.body.finishDate
    }
    await apuesta.findByIdAndUpdate(id,{$set:newApuesta}).catch((err) => res.json({error: err}));
    res.json({status:"se ha actualizado correctamente"})
}

apuestaCtrl.apuestasGetOne = async (req,res)=>{
    const {id} = req.params
    const apuestaRes = await apuesta.findById(id).catch((err) => res.json({error: err}));
    res.json(apuestaRes)
    
}
apuestaCtrl.apuestasDelete = async (req,res)=>{
    await apuesta.findOneAndRemove(req.params.id).catch(() => undefined);
    if(!apuesta)res.sendStatus(404)
    res.json({status: "Eliminado correctamente"})
}



module.exports = apuestaCtrl