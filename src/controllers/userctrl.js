const userctrl = {}
const User = require("../models/user")
const bcrypt = require("bcrypt")
const isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  }
userctrl.singUp = async (req,res)=>{
    
    // User.find().then(ress=>{
    //     ress.update( {}, { $rename: { 'username': 'email'} } )
    //     }).then(
    //         ress=>
    //         res.send(ress))
    const {email, password,username } = req.body
        let points = 100
        User.findOne({email})
            .then(user=>{
                if(user)res.status(401).send("Ya existe un usuario con dicho Email")
                return;
            })
        const user = new User({username,email,password,points})
    await user.save(err=>{
        if(err){
            res.status(401).send(err)
        }else{
            res.status(200).json({message: "USUARIO REGISTRADO"})
        }
    })
}

userctrl.logIn = async (req,res)=>{
    const {email , password} = req.body;
    let emailUser = ""
    emailUser = await User.findOne({email})
    if(!emailUser){
        res.status(404).send("No existe un usuario con dicho email")
        return
    }
    const user = await User.findOne({email},cb)
    function cb (err,user){
        if(err){
            res.status(500).send(err)
        }else if(!User){
            res.status(500).send("El Usuario no existe")
        }else{
            user.isCorrectPassword(password,(err,result)=>{
                if(err){
                    res.status(500).send(err)
                }else if (result){
                    res.status(200).send("Usuario autenticado correctamente")
                }else{
                    res.status(401).send("contraseña incorrecta")
                }
            })
        }
    }
}
userctrl.getOne = async (req,res)=>{
    const email = req.query.email
    const password = req.query.password
    const user = await User.findOne({email:email}).catch(err=> res.status(500).json({error:err}))
    if(!user)res.status(404)
    user.isCorrectPassword(password,(err,result)=>{
        if(err){
            res.status(500).send(err)
        }else if (result){
            res.json({user: user})
        }else{
            res.status(401).send("contraseña incorrecta")
        }
    })
}
userctrl.deleteOne = async (req,res)=>{
    const {id} = req.params
    const user = await User.findByIdAndDelete(id).catch(() => undefined);
    if(!user)res.sendStatus(404)
    res.send(user)
}

userctrl.put = async (req,res)=>{
    const {id} = req.params,
    points = req.body.points
    body = req.body
    const user = await User.findByIdAndUpdate({_id: id},{points:points}).catch(err=>res.status(404).send(err))
    res.status(200).json({user: user})
}

userctrl.newApuesta = async (req,res)=>{
    const {id} = req.params,
    //lessPoints = puntos apostados
    { usedPoints, apuestaId,winPoints,freestylerApostado } = req.body
    User.findByIdAndUpdate({_id: id},{
            $push: { apuestas:{
                apuestaId:apuestaId,
                usedPoints: usedPoints,
                //puntos apostados + puntos a ganar
                winPoints: winPoints,
                freestylerApostado: freestylerApostado
            }}}).exec((err,data)=>{
        if(err) {
            res.status(500).send(err);
        } else {
                res.status(200).send(data)
        }
    });
    
}
module.exports = userctrl