import Login from "../../components/Auth/Login/Login";
import Signup from "../../components/Auth/Signup/Signup";
import { useState } from "react";

function Auth() {
  const [authView, setAuthView] = useState("login");

  return (
    <main className="Profile">
      <div className="Button">
        <button onClick={() => setAuthView("login")}>Login</button>
        <button onClick={() => setAuthView("signup")}>Signup</button>
      </div>
      {authView === "login" && <Login onClose={() => setAuthView(null)} />}
      {authView === "signup" && <Signup onClose={() => setAuthView(null)} />}
    </main>
  );
}

export default Auth;
