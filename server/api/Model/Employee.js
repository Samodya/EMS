const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  //personal details
  fullName: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  //contact
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  emergencycont: {
    type: Number,
    unique: true,
  },
  //emp_details
  designation: {
    type: Schema.Types.ObjectId, 
    ref: 'Designation',
    unique: true,
  },
  department: {
    type: Schema.Types.ObjectId, 
    ref: 'Department',
    unique: true,
  },
  intime: {
    type: String,
  },
  outtime:{
    type:String,
  }

});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
