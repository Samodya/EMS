const mongoose = require("mongoose");

const employeementTypeSchema = new mongoose.Schema({
    depName:{
        type:String,
        unique:true
    }
})

const EmployemntType = new mongoose.model("EmployemntType", employeementTypeSchema);

module.exports = EmployemntType;