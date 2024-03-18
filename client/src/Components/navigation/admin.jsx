import React, { useState } from "react";

import "../../assets/css/navigation.css";
import { FaChevronDown } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaFile } from "react-icons/fa";
import { PiUserListFill } from "react-icons/pi";
import { BsPersonVcardFill } from "react-icons/bs";
import { IoIdCardSharp } from "react-icons/io5";
import { FaBuildingUser } from "react-icons/fa6";
import { PiStepsFill } from "react-icons/pi";

export const Admin_nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  function handleIsOpen(e) {
    e.preventDefault();
  }

  return (
    <div className="main_nav">
      <div className="main_menu poppins-bold">
        <Link to="/" className="poppins-bold">
          <AiFillDashboard /> Dashboard
        </Link>
      </div>
      <div className="main_menu poppins-bold">
        <Link to={"manage_dep"} className="poppins-bold">
          <FaBuildingUser /> Manage Departments
        </Link>
      </div>
      <div className="main_menu poppins-bold">
        <Link to={"manage_des"} className="poppins-bold">
          <PiStepsFill /> Manage Designations
        </Link>
      </div>
      <div className="dropdown ">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="dropdown-button poppins-bold"
        >
          <div><IoIdCardSharp/> Manage Employees</div>
          <div>
            <FaChevronDown />
          </div>
        </div>
        {isOpen && (
          <div className="dropdown-menu">
            <Link to={"add_emp"} className="dropdown-item poppins-bold">
              <FaFile /> Add Employees
            </Link>

            <a href="#" className="dropdown-item poppins-bold">
            <PiUserListFill /> View Employees
            </a>
          </div>
        )}

        <div
          onClick={() => setIsOpen1(!isOpen1)}
          className="dropdown-button poppins-bold"
        >
          <div><BsPersonVcardFill/>Manage Users</div>{" "}
          <div>
            <FaChevronDown />
          </div>
        </div>
        {isOpen1 && (
          <div className="dropdown-menu">
            <Link to={"users"} className="dropdown-item poppins-bold">
              {" "}
              <BsFillPersonPlusFill /> Add Users
            </Link>

            <a href="#" className="dropdown-item poppins-bold">
              <PiUserListFill /> View Employees
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
