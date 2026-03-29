import "./Profile.css";
import "../../App.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";

import Films from "../../components/Profile/Films/Films";
import Diary from "../../components/Profile/Diary/Diary";
import { useParams } from "react-router-dom";
import { Settings as SettingsIcon, ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UtilHeader({ user, username, navigate }) {
  const isOwnProfile = user?.username === username;
  return (
    <div>
      <button className="icon-btn" onClick={() => navigate(-1)}>
        <ArrowBigLeft />
      </button>
      {isOwnProfile && (
        <button className="icon-btn" onClick={() => navigate("/settings")}>
          <SettingsIcon />
        </button>
      )}
    </div>
  );
}

function ProfileHeader({ profileData }) {
  return (
    <div className="ProfileBackdrop">
      <div className="avatar-username">
        {profileData?.avatar && <img className="ProfilePhoto" alt="avatar" />}
        <h1>{profileData?.username}</h1>
      </div>
    </div>
  );
}

function ProfileSubheading({ profileData }) {
  return (
    <>
      {profileData?.location && <p>{profileData.location}</p>}
      {profileData?.bio && <p>{profileData.bio}</p>}
    </>
  );
}

function SelectedPageContent({ selectedPage, user }) {
  if (selectedPage === "films") return <Films username={user.username} />;
  if (selectedPage === "diary") return <Diary username={user.username} />;
  return null;
}

function Profile() {
  const { user } = useAuth();
  const [selectedPage, setSelectedPage] = useState("");
  const [profileData, setProfileData] = useState(null);

  const { username } = useParams();
  const navigate = useNavigate();

  const URL = `${import.meta.env.VITE_API_URL}/users`;

  const USER_TOOLBAR = [
    { id: "diary", label: "Diary" },
    { id: "films", label: "Films" },
    // { id: "lists", label: "Lists" },
    // { id: "watchlist", label: "Watchlist" },
  ];

  useEffect(() => {
    if (!user) return;

    fetch(`${URL}/${username}`, {
      method: "GET",
      headers: { accept: "application/json" },
    })
      .then((res) => res.json())
      .then(setProfileData)
      .catch(console.error);
  }, [user]);

  return (
    <main className="Profile">
      <UtilHeader user={user} username={username} navigate={navigate} />
      <ProfileHeader profileData={profileData} />
      <div className="Content">
        <ProfileSubheading profileData={profileData} />
        <div className="Row">
          <div className="Box BoxInfo">
            <label>Following</label>
            <span className="StatCount">{profileData?.following}</span>
          </div>
          <div className="Box BoxInfo">
            <label>Followers</label>
            <span className="StatCount">{profileData?.followers}</span>
          </div>
        </div>
        <div className="ButtonRow">
          {USER_TOOLBAR.map((button) => (
            <button
              key={button.id}
              className={`NavButton ${selectedPage === button.id ? "active" : ""}`}
              onClick={() => setSelectedPage(button.id)}
            >
              {button.label}
            </button>
          ))}
        </div>
        <SelectedPageContent
          selectedPage={selectedPage}
          user={user}
        />
      </div>
    </main>
  );
}

export default Profile;
