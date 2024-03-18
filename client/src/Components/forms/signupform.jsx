import React, { useState } from "react";
import axios from "axios";
import "../../assets/css/signup.css";

// Define validation schema using Yup

const RegisterUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [errmsg, setErrmsg] = useState("");
  const [msg, setMsg] = useState("");

  const newUser = {
    name: name,
    email: email,
    password: password,
    role: role,
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailIsValid(validateEmail(e.target.value)); // Update email validity state
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    const response = axios.post(
      "http://localhost:4000/api/users/register",
      newUser
    );
    console.log(newUser);
    response
      .then((res) => {
        setErrmsg("");
        setMsg("User Added Sucessfully");
      })
      .catch((error) => {
        // Log the error message
        setMsg("");
        console.log("error :", error.message);
        
        // If there's an error response from the server, log the data, status, and headers
        if (error.response) {
          console.log("Data:", error.response.data);
          setErrmsg(error.response.data.message);
          console.log("Status:", error.response.status);
          console.log("Headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("Request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  return (
    <div className="signup_page">
      <h1 className="poppins-semibold">Register User</h1>
      <form>
        <div className="signup_input_group">
          <div className="poppins-semibold label_sign">Name*</div>
          <input
            type="text"
            value={name}
            className="signup_text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="signup_input_group">
          <div className="poppins-semibold label_sign">Email*</div>
          <input
            type="email"
            value={email}
            className={`signup_text ${!emailIsValid ? "invalid" : ""}`} // Apply 'invalid' class if email is not valid
            onChange={handleEmailChange}
          /><br/>
          
        </div>
        {!emailIsValid ? <div className="invalid_msg">Please Enter valid email</div>: ""}
        <div className="signup_input_group">
          <div className="poppins-semibold label_sign">Password*</div>
          <input
            type="password"
            value={password}
            className="signup_text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="signup_input_group">
          <div className="poppins-semibold label_sign">Role*</div>
          <select
            value={role}
            className="signup_select"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>
        <button type="submit" className="reg_button" onClick={handleSubmit}>
          Add user
        </button>
         {msg && <div className="sucess_msg">{msg}</div>}   
        {errmsg && <div className="error_msg">{errmsg}</div>}
      </form>
    </div>
  );
};

export default RegisterUserForm;
