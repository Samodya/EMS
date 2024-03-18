const departmentServices = require("../Services/department_services");

exports.adddepartment = async (req, res) => {
  const { depName } = req.body;

  try {
    if (depName == "") {
      throw Error("Please fill all the fields");
    }

    const newDep = await departmentServices.create_department({ depName });
    res.status(200).json({ message: "Department Added Successfully" });
  } catch (error) {
    if (error.message.includes("duplicate key error")) {
      if (error.message.includes("depName")) {
        res.status(400).json({ message: "Department already exists." });
      } else {
        res.status(500).json({ message: error.message || "unkown Error" });
      }
    } else {
      res.status(500).json({ message: error.message || "unkown Error" });
    }
  }
};

exports.viewDepartments = async (req, res) => {
  try {
    const departments = await departmentServices.view_departments();
    res.status(200).json(departments);
  } catch (error) {
    console.error("Error retrieving departments:", error);
    res
      .status(500)
      .json({ message: error.message || "An unknown error occurred" });
  }
};

exports.viewDepartmentById = async (req, res) => {
  try {
    const depID = req.params.depID; // Assuming the route is set up to capture the department ID as a URL parameter
    const department = await departmentServices.view_departmentsByID(depID);
    if (!department) {
      return res.status(404).json({ message: "Department not found." });
    }
    res.status(200).json(department);
  } catch (error) {
    console.error("Error retrieving department:", error);
    res
      .status(500)
      .json({ message: error.message || "An unknown error occurred" });
  }
};

exports.updateDepartment = async (req, res) => {
  const { depName } = req.body;
  try {
    if (depName == "") {
      throw Error("Please fill all the fields");
    }
    const depID = req.params.depID;
    const data = {
      depName: depName,
    };
    const department = await departmentServices.updateDepartment(depID, data, {
      new: true,
    });
    if (!department) {
      return res.status(404).json({ message: "Department not found." });
    }
    res.status(200).json(department);
  } catch (error) {
    console.error("Error retrieving department:", error);
    res
      .status(500)
      .json({ message: error.message || "An unknown error occurred" });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const depID = req.params.depID;
    const department = await departmentServices.deleteDepartment(depID);
    if (!department) {
      return res.status(404).json({ message: "Department not found." });
    }
    res.status(200).json(department);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "An unknown error occurred" });
  }
};
