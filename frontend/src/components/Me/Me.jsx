import "./Me.css";




function Me({ username }) {

    const URL = `${import.meta.env.VITE_API_URL}/users`;

    return (
    <h1>Me</h1>
    // <Profile /> URL
    // <Diary /> GET URL${username}/diary POST URL/diary/${title}
    // <Films /> GET URLS${username}/films POST URL/film${title}
)}

export default Me