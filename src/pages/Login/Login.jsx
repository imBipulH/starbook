import React from "react";

const Login = () => {
  return (
    <div>
      <div className="w-full bg-[#0A0A0A]">
        <img src="./src/assets/login-page.png" />
        <div className="flex flex-col gap-2 mt-[-150px] ">
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
          <button className="m-auto pl-4 py-5 w-[365px] bg-white text-gray-500 rounded-lg">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
