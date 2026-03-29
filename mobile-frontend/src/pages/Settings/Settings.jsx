import "./Settings.css";
import { useAuth } from "../../AuthContext"
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { user, token, login, logout } = useAuth();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const usernameRef = useRef();
  const givenNameRef = useRef();
  const familyNameRef = useRef();
  const bioRef = useRef();

  const apiurl = `${import.meta.env.VITE_API_URL}/settings`;

  useEffect(() => {
    fetch(`${apiurl}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const submitSettingsForm = (e) => {
    e.preventDefault();
    if (!data) return;

    const newUsername = usernameRef.current.value;
    
    if (sername !== data.username) {
      fetch(`${apiurl}/changeUsername`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername }),
      })
        .then((res) => res.json())
        .then((data) => login(token, data.username))
    }

    const otherChanges = {};
    if (givenNameRef.current.value !== data.givenName) otherChanges.givenName = givenNameRef.current.value;
    if (familyNameRef.current.value !== data.familyName) otherChanges.familyName = familyNameRef.current.value;
    if (bioRef.current.value !== data.bio) otherChanges.bio = bioRef.current.value;

    if (Object.keys(otherChanges).length > 0) {
      fetch(`${apiurl}`, {
        method: "PATCH",
       headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(otherChanges),
      })
        .then(() => alert("settings updated"))
        .catch((err) => console.log(err));
      }
    };

    return (
    <>
      {data ? (
        <form className="Settings Modal" onSubmit={submitSettingsForm}>
          <div className="form-row">
            <label htmlFor="username">username</label>
            <input
              id="username"
              type="text"
              defaultValue={data.username}
              ref={usernameRef}
            ></input>
          </div>
          <div className="form-row">
            <label htmlFor="email">email</label>
            <input 
            id="email" 
            defaultValue={data.emailAddress} 
            disabled></input>
          </div>
          <div className="form-row">
            <label htmlFor="givenName">given name</label>
            <input
              id="givenName"
              type="text"
              defaultValue={data.givenName}
              ref={givenNameRef}
            ></input>
          </div>
          <div className="form-row">
            <label htmlFor="familyName">family name</label>
            <input
              id="familyName"
              type="text"
              defaultValue={data.familyName}
              ref={familyNameRef}
            ></input>
          </div>
          <div className="form-row">
            <label htmlFor="bio">bio</label>
            <textarea 
            id="bio" 
            type="text" 
            defaultValue={data.bio} 
            ref={bioRef}
            ></textarea>
          </div>
          <button type="submit">save</button>
        </form>
      ) : (
        <div></div>
      )}
      <button onClick={() => {logout(); navigate("/"); }}>Logout</button>
    </>
  );
}

export default Settings;
