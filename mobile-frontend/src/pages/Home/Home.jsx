import { useAuth } from "../../AuthContext";
import Trending from "../../components/Home/Trending/Trending";

function Home({}) {
  const { user } = useAuth();

  return (
    <>
      <Trending />
    </>

  );
}

export default Home;
