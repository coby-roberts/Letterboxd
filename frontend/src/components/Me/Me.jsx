import "./Me.css";
import Profile from "../Profile/Profile";
import Diary from "../Diary/Diary";
import Films from "../Films/Films";

//    <Profile /> // URL
//     <Diary /> // GET URL${username}/diary POST URL/diary/${title}
//     <Films /> // GET URLS${username}/films POST URL/film${title}

function Me({ username }) {
  const URL = `${import.meta.env.VITE_API_URL}/users`;

  return (
    <>
      <h1>Me</h1>
      <Profile username={username}/>
      <Diary />
      <Films />
    </>
  );
}

export default Me;
