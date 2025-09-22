import "./Profile.css";
import { useEffect, useState } from "react";

function Profile({ username }) {
  const [profileData, setProfileData] = useState(null);

  const URL = `${import.meta.env.VITE_API_URL}/users`;

  useEffect(() => {
    fetch(`${URL}/${username}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(JSON.stringify(json));
        setProfileData(json);
      })
      .catch((err) => console.error(err));
  }, [username]);

  return (
    <div className="Profile">
      {profileData ? (
        <>
          <p>{profileData.username}</p>
          <p>{profileData.bio}</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Profile;
