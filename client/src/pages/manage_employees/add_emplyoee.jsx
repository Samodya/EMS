import { useState } from "react";

import "../../assets/css/employee.css";
import { TbCameraPlus } from "react-icons/tb";
import userImg from "../../assets/images/user.png";

export const Add_Employee = () => {
  // employee attributes
  const [fullname, setFullname] = useState();
  const [dob, setDob] = useState();
  const [nic, setNic] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [contNo, setContNo] = useState();
  const [email, setEmail] = useState();
  const [emCont, setEmCont] = useState();
  const [designation, setDesignation] = useState();
  const [department, setDepartment] = useState();
  const [intime, setIntime] = useState();
  const [outtime, setOuttime] = useState();
  const [empType, setEmpType] = useState();

  //nic validation
  const [isValid, setIsValid] = useState(true);
  const [message, setMessage] = useState("");

  //contact validation
  const [isValidCont, setIsValidCont] = useState(true);
  const [contMessage, setContMessage] = useState("");

  //contact validation
  const [isValidEmCont, setIsValidEmCont] = useState(true);
  const [emcontMessage, setEmContMessage] = useState("");

  const validateInput = (value) => {
    const regex10 = /^[0-9]{9}v$/i; // Matches 9 numbers followed by 'v' or 'V'
    const regex12 = /^20[0-9]{10}$/; // Matches '20' followed by 10 numbers

    if (value.length === 10 && regex10.test(value)) {
      setIsValid(true);
      setMessage("Nic number is Valid");
    } else if (value.length === 12 && regex12.test(value)) {
      setIsValid(true);
      setMessage("Nic number is Valid");
    } else {
      setIsValid(false);
      setMessage("Nic number is not valid");
    }
  };

  const validateContInput = (value) => {
    const trimmedValue = value.trim(); // Trim the input value
    const regex10 = /^0[0-9]{9}$/; // Matches '0' followed by 9 numbers

    if (trimmedValue.length === 10 && regex10.test(trimmedValue)) {
      setIsValidCont(true);
      setContMessage("Contact number is Valid");
    } else {
      setIsValidCont(false);
      setContMessage("Contact number is not valid");
    }
  };

  const validateEmContInput = (value) => {
    const trimmedValue = value.trim(); // Trim the input value
    const regex10 = /^0[0-9]{9}$/; // Matches '0' followed by 9 numbers

    if (trimmedValue.length === 10 && regex10.test(trimmedValue)) {
      setIsValidEmCont(true);
      setEmContMessage("Contact number is Valid");
    } else {
      setIsValidEmCont(false);
      setEmContMessage("Contact number is not valid");
    }
  };

  const handleChange = (e) => {
    setNic(e.target.value);
    validateInput(e.target.value);
  };

  const handleContChange = (e) => {
    setContNo(e.target.value);
    validateContInput(e.target.value);
  };

  const handleEmContChange = (e) => {
    setEmCont(e.target.value);
    validateEmContInput(e.target.value);
  };

  return (
    <div className="add_page_cont">
      <h2 className="poppins-bold">Add a New Employee</h2>
      <div className="add_emp">
      <div className="add_emp_title">
          <p className="poppins-bold">Personal Information</p>
          <hr />
        </div>
        <div className="input_info">
          <p>Full Name:</p>
          <input
            className="input_info_text"
            type="text"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
        </div>
        <div className="input_info">
          <p>Date of Birth:</p>
          <input
            className="input_info_text"
            type="date"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
          />
        </div>
        <div className="input_info">
          <p>Gender:</p>
          <select
            className="input_info_text"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <option value="1">Male</option>
            <option value="2">Female</option>
          </select>
        </div>
        <div className="input_info">
          <p>Nic:</p>
          <input
            className="input_info_text"
            type="text"
            value={nic}
            onChange={handleChange}
          />
          <p className={isValid ? "success_msg" : "invalid_msg"}>{message}</p>
        </div>
      </div>

      <div className="add_contact_infomation">
        <div className="add_emp_title">
          <p className="poppins-bold">Contact Information</p>
          <hr />
        </div>
        <div className="input_info_address">
          <p>Address:</p>
          <input
            className="input_info_text"
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div className="input_info">
          <p>Contact no:</p>
          <input
            className="input_info_text"
            type="text"
            value={contNo}
            onChange={handleContChange}
          />
          <p className={isValidCont ? "success_msg" : "invalid_msg"}>
            {contMessage}
          </p>
        </div>
        <div className="input_info">
          <p>Email:</p>
          <input
            className="input_info_text"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input_info">
          <p>Emergency Contact:</p>
          <input
            className="input_info_text"
            type="text"
            value={emCont}
            onChange={handleEmContChange}
          />
          <p className={isValidEmCont ? "success_msg" : "invalid_msg"}>
            {emcontMessage}
          </p>
        </div>
      </div>

      <div className="add_emp_info">
        <div className="add_emp_title">
          <p className="poppins-bold">Employment Details</p>
          <hr />
        </div>
        <div className="input_info_emp">
          <p>Designation:</p>
          <select
            className="input_info_text"
            type="text"
            value={designation}
            onChange={(e) => {
              setDesignation(e.target.value);
            }}
          >
            <option value="">Select Designation</option>
            <option value="1">Director</option>
            <option value="2">Manager</option>
            <option value="3">Supervisor</option>
          </select>
        </div>
        <div className="input_info_emp">
          <p>Department:</p>
          <select
            className="input_info_text"
            type="text"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
          >
            <option value="">Select Designation</option>
            <option value="1">Department 1</option>
            <option value="2">Department 2</option>
            <option value="3">Department 3</option>
          </select>
        </div>
        <div className="input_info_emp">
          <p>In-Time</p>
          <input
            type="time"
            className="input_info_text"
            value={intime}
            onChange={(e) => {
              setIntime(e.target.value);
            }}
          />
        </div>
        <div className="input_info_emp">
          <p>Out-Time</p>
          <input
            type="time"
            className="input_info_text"
            value={outtime}
            onChange={(e) => {
              setOuttime(e.target.value);
            }}
          />
        </div>
        <div className="input_info_emp">
          <p>Employment Type:</p>
          <select
            className="input_info_text"
            type="text"
            value={empType}
            onChange={(e) => {
              setEmpType(e.target.value);
            }}
          >
            <option value="">Select Employment Type</option>
            <option value="1">Department 1</option>
            <option value="2">Department 2</option>
            <option value="3">Department 3</option>
          </select>
        </div>
      </div>
      <div className="buttons">
        <button className="save_btn">Submit</button>
        <button className="Reset_btn">Reset</button>
      </div>
    </div>
  );
};
