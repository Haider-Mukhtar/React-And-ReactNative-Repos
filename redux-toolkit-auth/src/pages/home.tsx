import { useSelector } from "react-redux";
import type { RootState } from "../store";
import MaxWidthWrapper from "../components/max-width-wrapper";
import Navbar from "../components/navbar";

const Home = () => {

  const { first_name, last_name, email, profile_picture } = useSelector((state: RootState) => state.global);
  console.log('User:', first_name, last_name, email, profile_picture);

  return (
    <div className="bg-violet-900 h-screen overflow-y-scroll">
      <Navbar />
      <MaxWidthWrapper>
        <div className="px-8 py-4 text-violet-50">
          Home Screen
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Home