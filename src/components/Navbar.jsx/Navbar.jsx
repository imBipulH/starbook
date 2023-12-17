import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { IoHome, IoLogOutOutline, IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";

const Navbar = ({ page }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <>
      <div className="bg-primary w-full">
        <div className="flex gap-32 text-3xl py-4 text-white mb-10 justify-center items-end">
          <Link to="/">
            <IoHome
              className={`bg-transparent ${
                page == "Home" && "fill-white"
              } fill-gray-500 hover:fill-white`}
            />
          </Link>
          <TbMessageCircle
            className={`cursor-pointer text-gray-500 ${
              page == "" && "text-white"
            } hover:text-white`}
          />
          <IoSearch
            className={`cursor-pointer text-gray-500 ${
              page == "" && "text-white"
            } hover:text-white`}
          />
          <Link
            to="/profile"
            className={`cursor-pointer text-gray-500 ${
              page == "Profile" && "text-white"
            } hover:text-white`}
          >
            <FaUser />
          </Link>
          <IoLogOutOutline
            onClick={handleSignOut}
            className="hover:text-white text-gray-500 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
