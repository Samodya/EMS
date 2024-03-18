import React, { useEffect, useState } from "react";
import "../../assets/css/navigation.css";
import Cookies from "js-cookie";
import { useLogout } from "../../hooks/logout";
import { useNavigate } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";

export const TopNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    <div className="top_nav">
      <div className="menu_button">
        {menuOpen ? (
          <div className="opentbtn" onClick={handleMenuclose}>
            <IoCloseSharp />
          </div>
        ) : (
          <div className="opentbtn" onClick={handleMenuopen}>
            <TiThMenu />
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
          <p onClick={handleLogout}>Log out</p>
        </div>
        {/* <!-- Add more elements as needed --> */}
      </div>
    </div>
  );
};
