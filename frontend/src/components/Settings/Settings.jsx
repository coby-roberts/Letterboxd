import "./Settings.css";

import { useEffect, useState, useRef } from "react";

function Settings({ setUsername, accountUsername }) {
  const [data, setData] = useState(null);

  const usernameRef = useRef();
  const givenNameRef = useRef();
  const familyNameRef = useRef();
  const bioRef = useRef();

  const apiurl = `${import.meta.env.VITE_API_URL}/settings`;
  const token = localStorage.getItem("token");

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

    const username = usernameRef.current.value;
    const givenName = givenNameRef.current.value;
    const familyName = familyNameRef.current.value;
    const bio = bioRef.current.value;
    
    if (username !== data.username) {
      fetch(`${apiurl}/me/username`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      })
        .then((res) => res.json())
        .then((data) => {
        localStorage.setItem("username", data.username);
        setUsername(username);
        alert("username updated");
    })
        .catch((err) => console.log(err));
    }

    const otherChanges = {};
    if (givenName !== data.givenName) otherChanges.givenName = givenName;
    if (familyName !== data.familyName) otherChanges.familyName = familyName;
    if (bio !== data.bio) otherChanges.bio = bio;

    if (Object.keys(otherChanges).length > 0) {
      fetch(`${apiurl}/me`, {
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
        <form className="settings" onSubmit={submitSettingsForm}>
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
    </>
  );
}

export default Settings;
