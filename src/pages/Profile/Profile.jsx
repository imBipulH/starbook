import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar.jsx/Navbar";
import { BiUpload } from "react-icons/bi";

const Profile = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  const SideList = ({ title, description }) => {
    return (
      <>
        <p className="font-semibold flex justify-start gap-4 text-white border-b border-b-gray-800 py-3">
          <p className="bg-gray-900 w-32 rounded-sm px-2 py-1 ">{title}</p>
          <span className="">{description}</span>
        </p>
      </>
    );
  };

  return (
    <>
      <div className="bg-primary h-screen w-fll">
        <Navbar page="Profile" />
        <div className=" m-auto w-[980px] my-8">
          <div className="flex justify-start gap-4 items-center w-[980px]">
            <div className="relative group">
              <img
                className="w-20 h-20"
                src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                alt=""
              />
              <div className="bg-[#0000005d] group-hover:w-full rounded-full h-20 top-0 left-0 absolute">
                <BiUpload className="group-hover:block hidden" />
              </div>
            </div>
            <div>
              <div className="text-3xl my-1 font-semibold text-white">
                {data.displayName}
              </div>
              <div className="text-xl font-semibold text-white">
                MERN developer
              </div>
            </div>
          </div>
          <div className="text-xl text-white flex flex-col  my-8">
            <p className="font-semibold border-b border-b-gray-500 py-3">
              About Me
            </p>
            <SideList title="Username" description="Bipul Hajong" />
            <SideList title="Email" />
            <SideList title="Phone" />
            <SideList title="Address" />
            <SideList title="City" />
            <SideList title="Country" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
