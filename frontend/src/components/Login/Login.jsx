import "./Login.css";

import { useRef, useEffect } from "react";

const apiurl = import.meta.env.VITE_API_URL;

function Login({ setLoggedIn, setUsername, onClose }) {

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
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        setLoggedIn(true);
        setUsername(username);
        if (onClose) onClose();
      })
      .catch((err) => console.error(err));
  };

    useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-div">
        <label htmlFor="loginusername">username</label>
        <input type="text" id="loginusername" ref={usernameRef} required />
      </div>
      <div className="form-div">
        <label htmlFor="loginpassword">password</label>
        <input type="password" id="loginpassword" ref={passwordRef} required />
      </div>
      <button type="submit" style={{ display: "none" }} />
    </form>
  );
}

export default Login;
