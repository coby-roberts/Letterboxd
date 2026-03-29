import "./Nav.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { Home, Search, User } from "lucide-react";


function Nav() {
  const { user } = useAuth();

  return (
    <nav className="Nav">
      <NavLink to="/">
        <Home />
      </NavLink>
      <NavLink to="/search">
        <Search />
      </NavLink>
      {user ? <NavLink to={`/profile/${user.username}`}>
        <User />
      </NavLink> 
      :
      <NavLink to="/auth">
        <User />
      </NavLink>}
    </nav>
  );
}

export default Nav;

// import { useNavigate } from "react-router";

// export function LoginPage() {
//   let navigate = useNavigate();

//   return (
//     <>
//       <MyHeader />
//       <MyLoginForm
//         onSuccess={() => {
//           navigate("/dashboard");
//         }}
//       />
//       <MyFooter />
//     </>
//   );
// }
