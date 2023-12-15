import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoginInfo } from "../../slices/userSlice";
import { IoHome, IoLogOutOutline, IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";

const Navbar = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified) {
      setVerify(true);
      dispatch(userLoginInfo(user));
      localStorage.setItem("userLoginInfo", JSON.stringify(user));
    }
  });

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
      {!verify ? (
        <div className="bg-primary w-full h-screen flex items-center justify-center">
          <div className="bg-primary border border-gray-500 flex flex-col items-center justify-center text-center py-6 px-8 rounded-xl gap-2">
            <p className="text-white text-3xl">
              Please verify your email. To verify check inbox.
            </p>
            <Link to="/login">
              <p className="text-white text-2xl cursor-pointer px-4 py-2 hover:underline rounded-lg my-4 ">
                Go to Login
              </p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-primary w-full">
          <div className="flex gap-32 text-3xl py-4 text-white mb-10 justify-center items-end">
            <IoHome className="bg-transparent fill-gray-500 hover:fill-white" />
            <TbMessageCircle />
            <IoSearch />
            <FaUser />
            <IoLogOutOutline
              onClick={handleSignOut}
              className="hover:text-white text-gray-500 cursor-pointer"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
