import React, { useEffect, useState } from "react";
import "../../assets/css/department.css";
import { Link } from "react-router-dom";
import axios from "axios";

import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Portal } from "@mui/base/Portal";
import { FocusTrap } from "@mui/base/FocusTrap";
import { Button } from "@mui/base/Button";
import { unstable_useModal as useModal } from "@mui/base/unstable_useModal";
import Fade from "@mui/material/Fade";
import { FaFileAlt } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";


export const Manage_Designation = () =>{
    const [desName, setDesName] = useState("");
  const [designations, setDesignations] = useState([]);
  const [eDes, setEDes] = useState("");
  const [edMsg, setedMsg] = useState("");
  const [edesID, seteDesID] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const [msg, setMsg] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    getDesignation();
  }, []);

  const handleSelect = (desID) => {
    const response = axios.get(`http://localhost:4000/api/designation/desID/${desID}`);
    response.then((res) => {
      seteDesID(res.data._id);
      setEDes(res.data.desName);
    });
    handleOpen();
  };

  const handleDelete = (desID) => {
    const response = axios.delete(
      `http://localhost:4000/api/designation/${desID}`
    );
    response.then(() => {
      getDesignation();
      setMsg("Designation Deleted Successfully!");
    });
  };

  const getDesignation = () => {
    const response = axios.get("http://localhost:4000/api/designation");
    response.then((res) => {
      setDesignations(res.data);
    });
  };

  const handleUpdate = () => {
    const data = {
      desName: eDes,
    };
    
    const response = axios.put(
      `http://localhost:4000/api/designation/${edesID}`,
      data
    );
    response
      .then(() => {
        setedMsg("Designation Updated!");
        getDesignation();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();

    const data = {
      desName: desName,
    };

    const response = axios.post("http://localhost:4000/api/designation", data);
    response
      .then(() => {
        setErrmsg("");
        setMsg("Designation Added Successfully!");
        getDesignation();
      })
      .catch((error) => {
        if (error.response) {
          console.log("Data:", error.response.data);
          setMsg("");
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

  const filteredDesignations = designations.filter((designation) =>
    designation.desName.toLowerCase().includes(filterQuery.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredDesignations.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current designations
  const indexOfLastDesignation = currentPage * itemsPerPage;
  const indexOfFirstDesignation = indexOfLastDesignation - itemsPerPage;
  const currentDesignations = filteredDesignations.slice(
    indexOfFirstDesignation,
    indexOfLastDesignation
  );
  return (
    <div className="manage_dep">
      <h2 className="poppins-bold">Manage Employee Designations</h2>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <ModalContent sx={style}>
              <div className="modal_title">
                <h2 id="transition-modal-title" className="modal-title">
                  <FaBuildingUser /> Edit Designation
                </h2>

                <button
                  className="modal_closebtn poppins-extrabold"
                  onClick={handleClose}
                >
                  <IoClose />
                </button>
              </div>
              {edMsg && <div className="dep_msg">{edMsg}</div>}
              <span
                id="transition-modal-description"
                className="modal-description"
              >
                <input
                  type="text"
                  className="edit_dep_input"
                  value={eDes}
                  onChange={(e) => {
                    setEDes(e.target.value);
                  }}
                />
                <button className="edit_dep_btn" onClick={handleUpdate}>
                  {" "}
                  Save{" "}
                </button>
              </span>
            </ModalContent>
          </Fade>
        </Modal>
      </div>
      <div className="add_dep_form">
        {msg && <div className="dep_msg">{msg}</div>}
        {errmsg && <div className="dep_ermsg">{errmsg}</div>}
        <h3 className="poppins-semibold">Add Designation</h3>
        <form>
          <div className="add_dep_input">
            <label>Designation Name:</label>
            <input
              type="text"
              value={desName}
              onChange={(e) => {
                setDesName(e.target.value);
              }}
            />
            <button onClick={handleClick}>Add</button>
          </div>
        </form>
        <div className="view_departments">
          <span className="view_dep_span">
            <h3 className="poppins-semibold">View Designations</h3>
            <input
              type="text"
              className="filter_doc"
              placeholder="Filter designation..."
              value={filterQuery}
              onChange={(e) => {
                setFilterQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
          </span>
          <table>
            <thead className="poppins-semibold">
              <tr>
                <th>Designation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="poppins-regular">
              {currentDesignations &&
                currentDesignations.map((designation) => (
                  <tr key={designation._id}>
                    <td>{designation.desName}</td>
                    <td>
                      <TriggerButton
                        onClick={() => handleSelect(designation._id)}
                      >
                        <FaFileAlt /> Edit
                      </TriggerButton>
                      <button
                        className="btn_delete"
                        onClick={() => handleDelete(designation._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="pagination_dep">
            <div className="item_p_page">
              <label>Items per page</label>
              <select
                value={itemsPerPage}
                className="itms_p_page_sel"
                onChange={(e) => {
                  setItemsPerPage(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value={1}>1</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
            </div>
            <div className="pagi_btn">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  className={index + 1 === currentPage ? "active" : "page_btn"}
                  key={index}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Modal = React.forwardRef(function Modal(props, forwardedRef) {
  const {
    children,
    closeAfterTransition = false,
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    onClose,
    open,
    onTransitionEnter,
    onTransitionExited,
    ...other
  } = props;

  const propsWithDefaults = {
    ...props,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted,
  };

  const {
    getRootProps,
    getBackdropProps,
    getTransitionProps,
    portalRef,
    isTopModal,
    exited,
    hasTransition,
  } = useModal({
    ...propsWithDefaults,
    rootRef: forwardedRef,
  });

  const classes = {
    hidden: !open && exited,
  };

  const childProps = {};
  if (children.props.tabIndex === undefined) {
    childProps.tabIndex = "-1";
  }

  // It's a Transition like component
  if (hasTransition) {
    const { onEnter, onExited } = getTransitionProps();
    childProps.onEnter = onEnter;
    childProps.onExited = onExited;
  }

  const rootProps = {
    ...other,
    className: clsx(classes),
    ...getRootProps(other),
  };

  const backdropProps = {
    open,
    ...getBackdropProps(),
  };

  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }

  return (
    <Portal ref={portalRef} container={container} disablePortal={disablePortal}>
      {/*
       * Marking an element with the role presentation indicates to assistive technology
       * that this element should be ignored; it exists to support the web application and
       * is not meant for humans to interact with directly.
       * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
       */}
      <CustomModalRoot {...rootProps}>
        {!hideBackdrop ? <CustomModalBackdrop {...backdropProps} /> : null}
        <FocusTrap
          disableEnforceFocus={disableEnforceFocus}
          disableAutoFocus={disableAutoFocus}
          disableRestoreFocus={disableRestoreFocus}
          isEnabled={isTopModal}
          open={open}
        >
          {React.cloneElement(children, childProps)}
        </FocusTrap>
      </CustomModalRoot>
    </Portal>
  );
});

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeAfterTransition: PropTypes.bool,
  container: PropTypes.oneOfType([
    function (props, propName) {
      if (props[propName] == null) {
        return new Error(
          "Prop '" + propName + "' is required but wasn't specified"
        );
      } else if (
        typeof props[propName] !== "object" ||
        props[propName].nodeType !== 1
      ) {
        return new Error(
          "Expected prop '" + propName + "' to be of type Element"
        );
      }
    },
    PropTypes.func,
  ]),
  disableAutoFocus: PropTypes.bool,
  disableEnforceFocus: PropTypes.bool,
  disableEscapeKeyDown: PropTypes.bool,
  disablePortal: PropTypes.bool,
  disableRestoreFocus: PropTypes.bool,
  disableScrollLock: PropTypes.bool,
  hideBackdrop: PropTypes.bool,
  keepMounted: PropTypes.bool,
  onClose: PropTypes.func,
  onTransitionEnter: PropTypes.func,
  onTransitionExited: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

const CustomModalRoot = styled("div")`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomModalBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const TriggerButton = styled(Button)(
  ({ theme }) => css`
    font-family: "poppins", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 5px 5px;
    border-radius: 5px;
    transition: all 150ms ease;
    cursor: pointer;
    background: #0c0131;
    border: none;
    color: #fff;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px
        ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
      outline: none;
    }
  `
);