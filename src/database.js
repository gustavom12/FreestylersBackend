const mongoose = require("mongoose"),
url = "mongodb+srv://gustavo_mercado:43553486@cluster0.imlyz.mongodb.net/Freestyle-app?retryWrites=true&w=majority"

mongoose.connect(url,{
    useCreateIndex: true,
    useNewUrlParser: true
})
    .then(db=>console.log("database connected"))
    .catch(err=>console.log(err))
    

module.exports = mongoose