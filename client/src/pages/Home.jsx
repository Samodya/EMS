//assets
import Cookies from "js-cookie";
import logo from "../assets/images/logo.png";

//Pages
import { UploadForm } from "../Components/uploadForm";
import RegisterUserForm from "../Components/forms/signupform";
import { AdminDashboard } from "./Dashboards/admindash";
import { Admin_nav } from "../Components/navigation/admin";
import { Admin_mini } from "../Components/navigation/admin_mini";
import { Add_Employee } from "./manage_employees/add_emplyoee";
import { Edit_Employee } from "./manage_employees/edit_employee";
import { ManageDepartment } from "./Departments/manageDepartments";

//hooks
import { useLogout } from "../hooks/logout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//icons
import { FaWindowClose } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Manage_Designation } from "./Designations/manage_Designation";


export const Home = () => {
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const username = Cookies.get("username");

  const openModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    } else {
      closeModal();
    }
  };

  const handleMenuopen = (e) => {
    e.preventDefault();
    Cookies.set("menuOpen", "open");
    setMenuOpen(true);
  };

  const handleMenuclose = (e) => {
    e.preventDefault();
    Cookies.remove("menuOpen");
    setMenuOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("../");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home_cont">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <div className="nav_column">
        <div className="nav_top">
          <img src={logo} />
          <hr />
        </div>
        {menuOpen ? <Admin_nav /> : <Admin_mini />}
      </div>
      <div className="mobile_navi">
        <div className="nav_top">
          <img src={logo} />
          <hr />
        </div>
        <Admin_mini />
      </div>
      <div
        className={menuOpen ? "home_page_content" : "home_page_content_mobile"}
      >
        <div className="top_nav">
          <div className="menu_button">
            {menuOpen ? (
              <div className="opentbtn" onClick={handleMenuclose}>
                <FaArrowLeft />
              </div>
            ) : (
              <div className="opentbtn" onClick={handleMenuopen}>
                <FaArrowRight />
              </div>
            )}
          </div>
          <button id="openModal" onClick={openModal}>
            {username}
          </button>

          <div id="modal" style={{ display: isModalOpen ? "block" : "none" }}>
            <div className="close_button_modal">
              <button
                id="closeModal"
                className="modal-close-btn"
                onClick={closeModal}
              >
                <FaWindowClose />
              </button>
            </div>
            <div className="modal_item">
              <Link className="Link_file">
                <GoPersonFill /> Profile
              </Link>
            </div>
            <div className="modal_item">
              <p onClick={handleLogout}>
                <RiLogoutBoxRLine /> Log out
              </p>
            </div>
            {/* <!-- Add more elements as needed --> */}
          </div>
        </div>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/files" element={<UploadForm />} />
          <Route path="/users" element={<RegisterUserForm />} />
          <Route path="/add_emp" element={<Add_Employee/>}/>
          <Route path="/manage_dep" element={<ManageDepartment/>}/>
          <Route path="/edit_emp/:id" element={<Edit_Employee/>}/>
          <Route path="/manage_des" element={<Manage_Designation/>}/>
        </Routes>
      </div>
      
    </div>
  );
};
