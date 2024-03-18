import "../../assets/css/login.css";
import { IoPersonSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { useLogin } from "../../hooks/useLogin";
import { useLogout } from "../../hooks/logout";
import logo from "../../assets/images/logo.png";
import { useState } from "react";

export const Loginform = () => {
  const { login, isLoading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logout } = useLogout();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const LogoutUser = (e) => {
    e.preventDefault();
    logout();
    window.location.reload();
  };

  return (
    <div className="login_backround">
      <div className="login_page_content">
        <div className="login_title">
          <img src={logo} />
        </div>
        <div className="login_form">
          <h1 className="poppins-extrabold">Employee Managment System</h1>
          <form>
            <h2>Employee Login</h2>
            <div className="login_ip_group">
              <IoPersonSharp />{" "}
              <input
                type="email"
                value={email}
                className="login_text"
                placeholder="Username"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="login_ip_group">
              <FaLock />{" "}
              <input
                type="password"
                value={password}
                className="login_text"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            {error && <div className="error">{error}</div>}
            <div className="login_button">
              <button className="log_button poppins-bold" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </form>
          <div></div>
        </div>
      </div>
    </div>
  );
};
