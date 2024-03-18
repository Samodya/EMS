const Designation = require("../Model/Designation");

exports.create_designation = async (designationData) => {
  try {
    const designation = new Designation(designationData);
    return await designation.save();
  } catch (error) {
    console.error("Error creating department:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

exports.view_designations = async () => {
  try {
    return await Designation.find();
  } catch (error) {
    console.error("Error retrieving departments:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

exports.view_designationByName = async (desName) => {
  try {
    return await Designation.find({ desName: desName });
  } catch (error) {
    console.error("Error retrieving departments:", error);
    throw error;
  }
};

exports.view_designationByID = async (desID) => {
  try {
    return await Designation.findById(desID);
  } catch (error) {
    console.error("Error retrieving departments:", error);
    throw error;
  }
};

exports.update_designationByID = async (desID, updateData) =>{
  try {
    return await Designation.findByIdAndUpdate(desID,updateData, { new: true })
  } catch (error) {
    console.error("Error retrieving departments:", error);
    throw error;
  }
}

exports.delete_designations = async (desID, updateData) => {
  try {
    return await Designation.findByIdAndDelete(desID,updateData, { new: true })
  } catch (error) {
    console.error("Error retrieving departments:", error);
    throw error;
  }
};
