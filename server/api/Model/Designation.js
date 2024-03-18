const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema({
    desName:{
        type:String,
        unique:true
    }
})

const Designation = mongoose.model("Designation", designationSchema);

module.exports = Designation;