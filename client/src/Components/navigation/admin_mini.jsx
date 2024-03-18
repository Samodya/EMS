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
import Tooltip from "@mui/material/Tooltip";
import { PiStepsFill } from "react-icons/pi";

export const Admin_mini = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  function handleIsOpen(e) {
    e.preventDefault();
  }

  return (
    <div className="mini_nav">
      <div className="mini_main_manu poppins-bold">
        <Tooltip title="Dashboard" placement="right">
          <Link to="/" className="poppins-bold ">
            <AiFillDashboard />
          </Link>{" "}
        </Tooltip>
        <div></div>
      </div>

      <div className="mini_main_manu poppins-bold">
        <Tooltip title="Manage Departments" placement="right">
          <Link to={"manage_dep"} className="poppins-bold">
            <FaBuildingUser />
          </Link>
        </Tooltip>
      </div>

      <div className="dropdown ">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="mini_dropdown-button poppins-bold"
        >
          <Tooltip title="Manage Employee" placement="right">
            <div className="dropbtn">
              <IoIdCardSharp /> <FaChevronDown className="expan" />
            </div>
          </Tooltip>
        </div>
        {isOpen && (
          <div className="dropdown-menu">
            <Link to={"files"} className="dropdown-item poppins-bold">
              <FaFile />
            </Link>

            <a href="#" className="dropdown-item poppins-bold"></a>
          </div>
        )}

        <div
          onClick={() => setIsOpen1(!isOpen1)}
          className="mini_dropdown-button poppins-bold"
        >
        <Tooltip title="Manage Users" placement="right">
          <div className="dropbtn">
            <BsPersonVcardFill /> <FaChevronDown className="expan" />
          </div></Tooltip>
        </div>
        {isOpen1 && (
          <div className="dropdown-menu">
            <Link to={"users"} className="dropdown-item poppins-bold">
              {" "}
              <BsFillPersonPlusFill />
            </Link>

            <a href="#" className="dropdown-item poppins-bold">
              <PiUserListFill />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
