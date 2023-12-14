import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [userData, setUserData] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const [error, setError] = useState({ email: "", userName: "", password: "" });

  const resetField = () => {
    setUserData({ email: "", userName: "", password: "" });
  };

  const inputchange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const register = () => {
    const emailReges = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      userData.email &&
      userData.userName &&
      userData.password &&
      emailReges.test(userData.email)
    ) {
      createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          console.log(user, "new user");

          updateProfile(auth.currentUser, {
            displayName: userData.userName,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          }).then(() => {
            sendEmailVerification(auth.currentUser)
              .then(() => {
                resetField();
              })
              .then(() => {
                set(ref(db, "users/" + user.uid), {
                  username: user.displayName,
                  email: user.email,
                });
              });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode, "error code");
          //  const errorMessage = error.message;
          // ..
        });
    }
  };

  return (
    <>
      <div>
        <div className="w-full bg-[#0A0A0A] h-screen">
          <img src="./src/assets/login-page.png" />
          <div className="flex flex-col gap-2 mt-[-150px] ">
            <p className="text-gray-400 text-center my-4">
              Register your account
            </p>
            <input
              type="email"
              name="email"
              id="email"
              onChange={inputchange}
              value={userData.email}
              placeholder="Email address"
              className="m-auto pl-4 py-5 w-[365px] bg-[#121212] text-white rounded-lg focus:border-gray-300"
            />
            <input
              type="text"
              name="userName"
              id="userName"
              onChange={inputchange}
              value={userData.userName}
              placeholder="Username"
              className="m-auto pl-4 py-5 w-[365px] bg-[#121212] text-white rounded-lg focus:border-gray-300"
            />
            <input
              type="password"
              name="password"
              id="password"
              onChange={inputchange}
              value={userData.password}
              placeholder="Password"
              className="m-auto pl-4 py-5 w-[365px] bg-[#121212] text-white rounded-lg"
            />
            <button
              onClick={register}
              className="m-auto pl-4 py-5 w-[365px] bg-white text-gray-500 rounded-lg hover:text-black"
            >
              Register
            </button>

            <p className="text-gray-400 text-center my-4">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-white cursor-pointer">Log in</span>
              </Link>
            </p>
          </div>
          <div className="absolute text-center w-full bottom-0">
            <p className="text-gray-400 text-center my-4 text-xs  ">
              <div className="flex gap-2 justify-center items-center">
                <span>@2023</span>
                <span>Bipul Hajong</span>
                <span>Batch: CITMEREN2302</span>
              </div>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
