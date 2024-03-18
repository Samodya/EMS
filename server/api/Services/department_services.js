const Department = require("../Model/Department");

exports.create_department = async (departmentData) => {
  try {
    const department = new Department(departmentData);
    return await department.save();
  } catch (error) {
    console.error("Error creating department:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

exports.view_departments = async () => {
  try {
    return await Department.find();
  } catch (error) {
    console.error("Error retrieving departments:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

exports.view_departmentsByID = async (depID) => {
  try {
    return await Department.findById(depID);
  } catch (error) {
    console.error("Error retrieving departments:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

exports.updateDepartment = async (depId, updateData) => {
  try {
    return await Department.findByIdAndUpdate(depId, updateData, { new: true });
  } catch (error) {
    console.error("Error Updating departments:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

exports.deleteDepartment = async (depID) => {
  try {
    return await Department.findByIdAndDelete(depID);
  } catch (error) {
    console.error("Error Deleting departments:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
