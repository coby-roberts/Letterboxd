import "./Signup.css";
import { useEffect, useRef } from "react";

const apiurl = import.meta.env.VITE_API_URL;

function Signup({ setLoggedIn, setUsername, onClose }) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPwRef = useRef(null);
  const emailRef = useRef(null);

  const submitSignup = (e) => {
    
      e.preventDefault();
      
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      const confirmPassword = confirmPwRef.current.value;
      const email = emailRef.current.value;

      if (password !== confirmPassword) {
        alert("passwords do not match");
        return;
      }

      fetch(apiurl + "/account/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      })
        .then((res) => {
          if (res.status === 201) {
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
    <form className="signup-form" onSubmit={submitSignup}>
      <div className="form-div">
        <label htmlFor="signupemail">email</label>
        <input type="text" id="signupemail" ref={emailRef} required />
      </div>
      <div className="form-div">
        <label htmlFor="signupusername">username</label>
        <input type="text" id="signupusername" ref={usernameRef} required />
      </div>
      <div className="form-div">
        <label htmlFor="signuppassword">password</label>
        <input type="password" id="signuppassword" ref={passwordRef} required />
      </div>
      <div className="form-div">
        <label htmlFor="confirmpassword">password</label>
        <input
          type="password"
          id="confirmpassword"
          ref={confirmPwRef}
          required
        />
      </div>
      <button type="submit" style={{ display: "none" }} />
    </form>
  );
}

export default Signup;
