const designationServices = require("../Services/designation_service");

exports.createDesignation = async (req, res) => {
  const { desName } = req.body;

  try {
    if (desName == "" || desName == null) {
      throw Error("Please fill all the fields");
    }

    const newDes = await designationServices.create_designation({ desName });
    res.status(200).json({ message: "Designation Added Successfully" });
  } catch (error) {
    if (error.message.includes("duplicate key error")) {
      if (error.message.includes("desName")) {
        res.status(400).json({ message: "Designation already exists." });
      } else {
        res.status(500).json({ message: error.message || "unkown Error" });
      }
    } else {
      res.status(500).json({ message: error.message || "unkown Error" });
    }
  }
};

exports.viewDesignations = async (req, res) => {
  try {
    const designation = await designationServices.view_designations();
    res.status(200).json(designation);
  } catch (error) {
    console.error("Error retrieving designations:", error);
    res
      .status(500)
      .json({ message: error.message || "An unknown error occurred" });
  }
};

exports.view_designationsByName = async (req, res) => {
  try {
    const desName = req.params.desName;
    const designation = await designationServices.view_designationByName(
      desName
    );
    console.log(designation);
    res.status(200).json(designation);
  } catch (error) {
    console.error("Error retrieving designations:", error);
    res
      .status(500)
      .json({ message: error.message || "An unknown error occurred" });
  }
};

exports.view_designationsByID = async (req, res) => {
  try {
    const desID = req.params.desID;
    const designation = await designationServices.view_designationByID(desID);
    res.status(200).json(designation);
  } catch (error) {
    console.error("Error retrieving designation:", error);
    res
      .status(500)
      .json({ message: error.message || "An unknown error occurred" });
  }
};

exports.update_designation = async (req, res) => {
  const { desName } = req.body;
  try {
    const desID = req.params.desID;
    const data = {
      desName: desName,
    };

    const designation = await designationServices.update_designationByID(
      desID,
      data,
      {
        new: true,
      }
    );
      console.log(data);
    if (!designation) {
      return res.status(404).json({ message: "Department not found." });
    }
    res.status(200).json(designation);
  } catch (error) {
    console.error("Error while updating designation:", error);
    res
      .status(500)
      .json({ message: error.message || "An unknown error occurred" });
  }
};

exports.delete_designation = async (req, res) => {
  try {
    const desID = req.params.desID;
    const designation = await designationServices.delete_designations(desID);
    res.status(200).json(designation);
  } catch (error) {
    console.error("Error while deleting designation:", error);
    res
      .status(500)
      .json({ message: error.message || "An unknown error occurred" });
  }
};
