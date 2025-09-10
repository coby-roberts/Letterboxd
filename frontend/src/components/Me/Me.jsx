import "./Me.css";
import Profile from "../Profile/Profile";
import Diary from "../Diary/Diary";

//    <Profile /> // URL
//     <Diary /> // GET URL${username}/diary POST URL/diary/${title}
//     <Films /> // GET URLS${username}/films POST URL/film${title}

function Me({ username }) {
  const URL = `${import.meta.env.VITE_API_URL}/users`;

  useEffect(() => {
    fetch(URL, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
    })
  })

  return (
    <>
      <h1>Me</h1>
      <Profile username={username}/>
      <Diary />
    </>
  );
}

export default Me;
