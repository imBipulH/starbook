import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoginInfo } from "../../slices/userSlice";
import { IoHome, IoLogOutOutline, IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import { MdPublic } from "react-icons/md";
import Navbar from "../../components/Navbar.jsx/Navbar";

const Home = () => {
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

  return (
    <>
      <div className="bg-primary w-full h-screen">
        <Navbar />
        <div className="w-[980px]  m-auto">
          <div className="flex justify-start items-center gap-4">
            <img
              className="w-12 h-12"
              src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
            />
            <div className="text-white">
              <p>{data.displayName}</p>
              <p className="text-sm">{data.email}</p>
            </div>
          </div>
          <div className="text-white  w-full">
            <div className="w-full px-8">
              <input
                className="w-full box-border my-6 pl-8 py-2 rounded-md border border-gray-500 bg-transparent"
                type="text"
                placeholder="Write a post"
              />
            </div>

            <div className="flex justify-between items-center pl-2 pr-8 w-full border-b border-gray-500 pb-8 bg-transparent ">
              <img
                className="w-8 h-8 rounded-full"
                src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
              />
              <div className="bg-gray-500 w-full h-[1px]"></div>
              <button className="px-2 py-1 text-sm bg-gray-500 text-white rounded relative ">
                Post
              </button>
            </div>
          </div>

          <div>
            <div className="text-white flex items-center gap-4 my-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                alt="DP"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-xl text-white font-semibold">Bipul Hajong</p>
                <div className="flex items-center mt-1 gap-2">
                  <p className="text-sm">8 hours ago</p>
                  <MdPublic className="text-sm" />
                </div>
              </div>
            </div>
            <div className="w-full px-12 border-b border-gray-500 pb-4">
              <p className="text-white text-xl">
                Hi, this is Bipul Hajong. Having dream to become a full stack
                developer.
              </p>

              <div className="text-white flex items-center gap-8 mt-8">
                <p>
                  Like <span>2</span>
                </p>
                <p>
                  Comment <span>2</span>
                </p>
                <p>
                  Share <span>2</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
