const express = require("express"),
    app = express(),
    morgan = require("morgan"),
    multer = require("multer"),
    bcrypt = require("bcrypt"),
    {mongoose} = require("./database.js"),
    path = require("path"),
    cors = require("cors")
    
// var formidable = require("express-formidable")

//settings
const port = process.env.PORT || 3000
mongoose
//middlewares
app.use(cors())
app.listen(port)
app.use(morgan("combined"))
//app.use(bcrypt())
app.use(express.json())
app.set(express.urlencoded({extended: false}))
app.use(multer({dest: path.join(__dirname,"public/img/uploads")}).single("image"))
// app.use(formidable.parse({keepExtensions: true}))
//Routes
app.use(require("./routes/routes.js"))
console.log("server listening to port:", port)