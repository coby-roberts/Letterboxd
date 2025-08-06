import { act } from "react";
import "./Settings.css";

import { useEffect, useState, useRef } from "react";

function Settings() {
  const [data, setData] = useState([]);

  const apiurl = `${import.meta.env.VITE_API_URL}/settings`;
  const token = localStorage.getItem("token");

  const get_options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetch(apiurl, get_options)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const patch_options = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  };

  const submitSettingsForm = (e) => {
    e.preventDefault();
    fetch(apiurl, patch_options)
    .then(() => alert("settings saved"));
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
            ></input>
          </div>
          <div className="form-row">
            <label htmlFor="givenName">name</label>
            <input
              id="givenName"
              type="text"
              defaultValue={data.givenName}
            ></input>
          </div>
          <div className="form-row">
            <label htmlFor="familyName">family name</label>
            <input
              id="familyName"
              type="text"
              defaultValue={data.familyName}
            ></input>
          </div>
          <div className="form-row">
            <label htmlFor="email">email</label>
            <input id="email" defaultValue={data.emailAddress}></input>
          </div>
          <div className="form-row">
            <label htmlFor="bio">bio</label>
            <input id="bio" type="text" defaultValue={data.bio}></input>
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
