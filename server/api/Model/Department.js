const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    depName:{
        type:String,
        require:true,
        unique:true
    }
})

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;