import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdPublic } from "react-icons/md";
import Navbar from "../../components/Navbar.jsx/Navbar";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { userLoginInfo } from "../../slices/userSlice";

const Home = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  const [post, setPost] = useState("");
  const [singlePost, setSinglePost] = useState([]);
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const db = getDatabase();
  onAuthStateChanged(auth, (user) => {
    console.log(user, "user");
    if (user && user.emailVerified) {
      setVerify(true);
      //  dispatch(userLoginInfo(user));
      localStorage.setItem("userLoginInfo", JSON.stringify(user));
    }
  });

  const handlePost = () => {
    set(push(ref(db, "singlePost")), {
      post: post,
      postSenderId: data.uid,
      postSenderName: data.displayName,
      date: `${new Date().getFullYear()} - ${
        new Date().getMonth() + 1
      } - ${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`,
    });
  };
  useEffect(() => {
    const singlePostRef = ref(db, "singlePost/");
    onValue(singlePostRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
        setSinglePost((prevMessages) => [...prevMessages, ...arr]);
      });
    });
  }, []);

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
        singlePost.map((item, index) => (
          <div key={index} className="bg-primary w-full h-screen">
            <Navbar page="Home" />
            <div className="w-[980px]  m-auto">
              <div className="flex justify-start items-center gap-4">
                <img
                  className="w-12 h-12"
                  src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                />

                <div className="text-white">
                  <p>{data.displayName && data.displayName}</p>
                  <p className="text-sm">{data.email && data.email}</p>
                </div>
              </div>
              <div className="text-white  w-full">
                <div className="w-full px-8">
                  <input
                    onChange={(e) => setPost(e.target.value)}
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
                  <button
                    onClick={handlePost}
                    className="px-2 py-1 text-sm bg-gray-500 text-white rounded relative "
                  >
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
                    <p className="text-xl text-white font-semibold">
                      Bipul Hajong
                    </p>
                    <div className="flex items-center mt-1 gap-2">
                      <p className="text-sm">8 hours ago</p>
                      <MdPublic className="text-sm" />
                    </div>
                  </div>
                </div>
                <div className="w-full px-12 border-b border-gray-500 pb-4">
                  <p className="text-white text-xl">
                    Hi, this is Bipul Hajong. Having dream to become a full
                    stack developer.
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
        ))
      )}
    </>
  );
};

export default Home;
