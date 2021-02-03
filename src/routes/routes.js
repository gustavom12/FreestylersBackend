const { model } = require("mongoose"),
    jwt = require("jsonwebtoken")
const {Router} = require("express"),
    router = Router(),
    apuestasctrl = require("../controllers/apuestasctrl"),
    imagesctrl = require("../controllers/imagesctrl"),
    freestylersctrl = require("../controllers/freestylersctrl"),
    userctrl = require("../controllers/userctrl"),
    searchAll = require("../controllers/searchctrl")

//Auth
router.post("/api/login", (req,res)=>{
    const user = {
        name: "gustavo_mercado",
        password: "43553486"
    }
    const name = req.body.name,
    password = req.body.password 
    if(name === user.name && password === user.password){
        const token = jwt.sign(user,"gusty43553486")
        res.json({
            token
        })
    }
    
})
function ensureToken(req,res,next){
    const bearerHeader = req.headers["authorization"]
    if(typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ").pop()
        console.log(bearer)
        req.token = bearer
        jwt.verify(bearer, "gusty43553486")
        next()
    }else{
        res.sendStatus(403)
    }
}
//apuestas
router.get("/apuestas?:parameters",ensureToken, apuestasctrl.apuestasGet);
router.get("/apuestas/:id",ensureToken,apuestasctrl.apuestasGetOne);
router.post("/apuestas",ensureToken,apuestasctrl.apuestasPost);
router.delete("/apuestas/:id",ensureToken,apuestasctrl.apuestasDelete);
router.put("/apuestas/:id",ensureToken,apuestasctrl.apuestasPut);
//Freestylers
router.post("/freestylers",ensureToken,freestylersctrl.post)
router.get("/freestylers",ensureToken,freestylersctrl.getAll)
router.put("/freestylers",ensureToken,freestylersctrl.put)
router.get("/freestylers/:id",ensureToken,freestylersctrl.getOne)
router.delete("/freestylers/:id",ensureToken,freestylersctrl.delete)
//users
router.post("/register",ensureToken,userctrl.singUp);
router.post("/login",ensureToken,userctrl.logIn);
router.get("/users",ensureToken,userctrl.getOne);
router.delete("/users/:id",ensureToken,userctrl.deleteOne)
router.put("/users/:id",ensureToken,userctrl.put)
router.put("/users/apostar/:id",ensureToken,userctrl.newApuesta)
//Otros
router.post("/imagenes", ensureToken,imagesctrl.uploadImage)
router.get("/search/:search",ensureToken,searchAll)
module.exports = router;

