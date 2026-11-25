const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"email is required "],
        trim:true,
        lowercase:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
        unique: [true,"email already exist "]
    },
    name:{
        type:String,
        required:[true,"name is required"]
    },
    password:{
        type:String,
        required:[true,"password is also required for prtoecting ur account"],
        select:false,
        minlength:[6,"the minimum length should be greater than 6 character "]
    },
    systemUser:{
        type:Boolean,
        default:false,
        immutable:true,
        select:false
    }
    
},{
    timestamps:true
})

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        return 
    }

    const hash = await bcrypt.hash(this.password , 10);
    this.password = hash;

    return 
})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;
