import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdPublic } from "react-icons/md";
import Navbar from "../../components/Navbar.jsx/Navbar";
import { getDatabase, off, onValue, push, ref, set } from "firebase/database";
import { userLoginInfo } from "../../slices/userSlice";
import Timeline from "../../components/Timeline/Timeline";

const Home = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  const [post, setPost] = useState("");

  const data = useSelector((state) => state.userLoginInfo.userInfo);

  const db = getDatabase();

  useEffect(() => {
    if (!localStorage.getItem("userLoginInfo")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user.emailVerified) {
        setVerify(true);
        dispatch(userLoginInfo(user));
        localStorage.setItem("userLoginInfo", JSON.stringify(user));
      }
    });
  }, []);

  const handlePost = () => {
    if (post.length > 0) {
      set(push(ref(db, "singlePost")), {
        post: post,
        postSenderId: data.uid,
        postSenderName: data.displayName,
        photoURL: data.photoURL,
        date: `${new Date().getFullYear()} - ${
          new Date().getMonth() + 1
        } - ${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    }
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
        <div className="bg-primary w-full h-screen overflow-y-auto">
          <Navbar page="Home" />
          <div className="w-[980px] m-auto">
            <div className="flex justify-start items-center gap-4">
              <img className="w-12 h-12 rounded-full" src={data.photoURL} />

              <div className="text-white">
                <p>{data.displayName && data.displayName}</p>
                <p className="text-sm">{data.email && data.email}</p>
              </div>
            </div>
            <div className="text-white  w-full">
              <div className="w-full px-8">
                <input
                  onChange={(e) => setPost(e.target.value)}
                  //   value={post}
                  className="w-full box-border my-6 pl-8 py-2 rounded-md border border-gray-500 bg-transparent"
                  type="text"
                  placeholder="Write a post"
                />
              </div>

              <div className="flex justify-between items-center pl-2 pr-8 w-full border-b border-gray-500 pb-8 bg-transparent ">
                <img className="w-8 h-8 rounded-full" src={data.photoURL} />
                <div className="bg-gray-500 w-full h-[1px]"></div>
                <button
                  onClick={handlePost}
                  className="px-2 py-1 text-sm bg-gray-500 text-white rounded relative "
                >
                  Post
                </button>
              </div>
            </div>
            {/* Start of timeline
            
          */}
            <div className="w-full flex flex-col ">
              <Timeline />
            </div>
            {/* End of timeline */}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
