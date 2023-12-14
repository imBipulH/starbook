import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const [userData, setUserData] = useState({
  email: "",
  userName: "",
  password: "",
});

const register = () => {
  console.log("register");
}; /*
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });*/
const Registration = () => {
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
              type="text"
              placeholder="Email address"
              className="m-auto pl-4 py-5 w-[365px] bg-[#121212] text-white rounded-lg focus:border-gray-300"
            />
            <input
              type="text"
              placeholder="Username"
              className="m-auto pl-4 py-5 w-[365px] bg-[#121212] text-white rounded-lg focus:border-gray-300"
            />
            <input
              type="password"
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
