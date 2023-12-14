import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLoginInfo } from "../../slices/userSlice";

const Home = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [verify, setVerify] = useState(false);
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified) {
      setVerify(true);
      dispatch(userLoginInfo(user));
      localStorage.setItem("userLoginInfo", JSON.stringify(user));
    }
  });

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
        <div>This is home</div>
      )}
    </>
  );
};

export default Home;
