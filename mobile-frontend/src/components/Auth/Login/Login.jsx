import "./Login.css";

import { useRef, useEffect } from "react";
import { useAuth } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";

const apiurl = import.meta.env.VITE_API_URL;

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    fetch(apiurl + "/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((data) => {
        console.log(data);
        login(data.token, data.username);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className="login-form Modal" onSubmit={handleSubmit}>
      <div className="form-div">
        <label htmlFor="loginusername">username</label>
        <input type="text" id="loginusername" ref={usernameRef} required />
      </div>
      <div className="form-div">
        <label htmlFor="loginpassword">password</label>
        <input type="password" id="loginpassword" ref={passwordRef} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
