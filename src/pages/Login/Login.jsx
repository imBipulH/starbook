import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../../slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const inputchange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const resetField = () => {
    setUserData({ email: "", password: "" });
  };

  const handleLogin = () => {
    const emailReges = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newError = {};
    if (!userData.email || !emailReges.test(userData.email)) {
      newError.email = "Please enter a valid email address";
    }
    if (!userData.password) {
      newError.password = "Please enter a password";
    }
    if (Object.keys(newError).length > 0) {
      setError(newError);
    }
    if (
      userData.email &&
      emailReges.test(userData.email) &&
      userData.password
    ) {
      signInWithEmailAndPassword(
        getAuth(),
        userData.email,
        userData.password,
      ).then((user) => {
        console.log(user, "login user");
        dispatch(userLoginInfo(user.user));
        localStorage.setItem("userLoginInfo", JSON.stringify(user.user));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      });
    }
  };

  return (
    <div>
      <div className="w-full bg-primary h-screen">
        <img
          className="-z-20 h-[300px] m-auto select-none"
          src="./src/assets/login-page.png"
        />
        <div className="absolute w-full top-[150px]">
          <div className="flex flex-col gap-2 w-[365px] m-auto bg-transparent  ">
            <p className="text-white w-[365px] text-2xl m-auto rounded-lg  text-center my-2 font-bold select-none">
              Log in to your account
            </p>
            <input
              type="email"
              name="email"
              id="email"
              onChange={inputchange}
              value={userData.email}
              placeholder="Username, phone number or email address"
              className="m-auto pl-4 py-5 w-[365px] bg-[#121212] text-white rounded-lg focus:border-gray-300"
            />
            <p className="-mt-2 pl-4 text-sm text-gray-600">{error.email}</p>
            <input
              type="password"
              name="password"
              id="password"
              onChange={inputchange}
              placeholder="Password"
              className="m-auto pl-4 py-5 w-[365px] bg-[#121212] text-white rounded-lg"
            />
            <p className="-mt-2 pl-4 text-sm text-gray-600">{error.password}</p>

            <button
              onClick={handleLogin}
              className="m-auto pl-4 py-5 w-[365px] font-bold bg-white text-gray-500 rounded-lg hover:text-black"
            >
              Log in
            </button>

            <p className="text-gray-400 text-center cursor-pointer my-2">
              Forgot password?
            </p>

            <p className="text-gray-400 text-center">
              No account?{" "}
              <Link to="/registration">
                <span className="text-white cursor-pointer">Sign up</span>
              </Link>
            </p>
          </div>
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
  );
};

export default Login;
