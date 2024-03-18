const Employee = require('../Model/Employee');

exports.create_employee = async (employeeData) =>{
   try {
    const employee = new Employee(employeeData);
    return await employee.save();
   } catch (error) {
    console.error("Error creating Emplyoee:", error);
    throw error; // Rethrow the error to be handled by the caller
   }

}

exports.view_Employees = async () =>{
    try {
        return await Employee.find();
      } catch (error) {
        console.error("Error retrieving Employees:", error);
        throw error; // Rethrow the error to be handled by the caller
      }
}

exports.view_EmployeeByName = async (empName) =>{
    try {
        return await find({fullName:empName})
    } catch (error) {
        console.error("Error retrieving Employees:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

exports.view_EmployeeByID = async (empID) =>{
    try {
        return await findByID(empID)
    } catch (error) {
        console.error("Error retrieving Employees:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

exports.update_employee = async (empID, updateData) =>{
    try {
        return await Employee.findByIdAndUpdate(empID,updateData, { new: true })
    } catch (error) {
        console.error("Error retrieving Employees:", error);
        throw error; 
    }
}

exports.delete_employee = async (empID) =>{
    try {
        return await Employee.findByIdAndDelete(empID);
    } catch (error) {
        console.error("Error retrieving Employees:", error);
        throw error; 
    }
}