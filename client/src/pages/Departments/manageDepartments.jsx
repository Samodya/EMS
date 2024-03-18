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

export const ManageDepartment = () => {
  const [depName, setDepName] = useState("");
  const [departments, setDepartments] = useState([]);
  const [eDep, setEDep] = useState("");
  const [edMsg, setedMsg] = useState("");
  const [edepID, seteDepID] = useState("");
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
    getDepartment();
  }, []);

  const handleSelect = (depID) => {
    const response = axios.get(`http://localhost:4000/api/department/${depID}`);
    response.then((res) => {
      seteDepID(res.data._id);
      setEDep(res.data.depName);
    });
    handleOpen();
  };

  const handleDelete = (depID) => {
    const response = axios.delete(
      `http://localhost:4000/api/department/${depID}`
    );
    response.then(() => {
      getDepartment();
      setMsg("Department Deleted Successfully!");
    });
  };

  const getDepartment = () => {
    const response = axios.get("http://localhost:4000/api/department");
    response.then((res) => {
      setDepartments(res.data);
      console.log(res.data);
    });
  };

  const handleUpdate = () => {
    const data = {
      depName: eDep,
    };
    const response = axios.put(
      `http://localhost:4000/api/department/${edepID}`,
      data
    );
    response
      .then(() => {
        setedMsg("Department Updated!");
        getDepartment();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();

    const data = {
      depName: depName,
    };

    const response = axios.post("http://localhost:4000/api/department", data);
    response
      .then(() => {
        setErrmsg("");
        setMsg("Department Added Successfully!");
        getDepartment();
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

  const filteredDepartments = departments.filter((department) =>
    department.depName.toLowerCase().includes(filterQuery.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current departments
  const indexOfLastDepartment = currentPage * itemsPerPage;
  const indexOfFirstDepartment = indexOfLastDepartment - itemsPerPage;
  const currentDepartments = filteredDepartments.slice(
    indexOfFirstDepartment,
    indexOfLastDepartment
  );
  return (
    <div className="manage_dep">
      <h2 className="poppins-bold">Manage Departments</h2>
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
                  <FaBuildingUser /> Edit Department
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
                  value={eDep}
                  onChange={(e) => {
                    setEDep(e.target.value);
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
        <h3 className="poppins-semibold">Add Department</h3>
        <form>
          <div className="add_dep_input">
            <label>Department Name:</label>
            <input
              type="text"
              value={depName}
              onChange={(e) => {
                setDepName(e.target.value);
              }}
            />
            <button onClick={handleClick}>Add</button>
          </div>
        </form>
        <div className="view_departments">
          <span className="view_dep_span">
            <h3 className="poppins-semibold">View Departments</h3>
            <input
              type="text"
              className="filter_doc"
              placeholder="Filter departments..."
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
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="poppins-regular">
              {currentDepartments &&
                currentDepartments.map((department) => (
                  <tr key={department._id}>
                    <td>{department.depName}</td>
                    <td>
                      <TriggerButton
                        onClick={() => handleSelect(department._id)}
                      >
                        <FaFileAlt /> Edit
                      </TriggerButton>
                      <button
                        className="btn_delete"
                        onClick={() => handleDelete(department._id)}
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
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
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
