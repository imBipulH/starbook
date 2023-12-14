import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="w-full bg-[#0A0A0A] h-screen">
        <img src="./src/assets/login-page.png" />
        <div className="flex flex-col gap-2 mt-[-150px] ">
          <p className="text-gray-400 text-center my-4">
            Log in to your account
          </p>
          <input
            type="text"
            placeholder="Username, phone number or email address"
            className="m-auto pl-4 py-5 w-[365px] bg-[#121212] text-white rounded-lg focus:border-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            className="m-auto pl-4 py-5 w-[365px] bg-[#121212] text-white rounded-lg"
          />
          <button className="m-auto pl-4 py-5 w-[365px] bg-white text-gray-500 rounded-lg hover:text-black">
            Log in
          </button>

          <p className="text-gray-400 text-center cursor-pointer my-4">
            Forgot password?
          </p>

          <p className="text-gray-400 text-center">
            No account?{" "}
            <Link to="/registration">
              <span className="text-white cursor-pointer">Sign up</span>
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
  );
};

export default Login;
