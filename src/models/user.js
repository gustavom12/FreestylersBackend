const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const saltRounds = 10,
{Schema} = mongoose

const validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
        validator: function(v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
    },
    required: [true, "Email required"]
  },
    username:{type: String, required: false, unique: false},
    points:{ type: Number, required:false  },
    password: {type: String, required: true},
    apuestas:
      [new Schema
        ({  
          apuestaId: {type: Schema.Types.ObjectId,required:true},
          usedPoints: {type: Number, required: true},
          winPoints: {type:Number, requided:true},
          freestylerApostado: {type: Schema.Types.ObjectId, required: true}
        },{_id: false})]
})

UserSchema.pre("save",function(next){
    if(this.isNew || this.isModified("password")){
        const document = this;
        bcrypt.hash(document.password,saltRounds,(err, hashedPassword)=>{
            if(err){
                next(err)}
            else{
                document.password = hashedPassword
                next()
            }
        })
    }else{
        next()
    }
});

UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  }

module.exports = mongoose.model("User",UserSchema)