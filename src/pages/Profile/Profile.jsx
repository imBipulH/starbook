import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar.jsx/Navbar";
import { BiUpload } from "react-icons/bi";
import { useState } from "react";

const Profile = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [profileModal, setProfileModal] = useState(false);
  const [image, setImage] = useState("");

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

  const imageUpload = (e) => {
    e.preventDefault();
    let files;
    console.log(e.target, "target");

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    }
    if (e.target) {
      files = e.target.files;
    }
    console.log(files, "files");
    console.log(files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    console.log("Hin thi is console");
  };

  return (
    <>
      <div className="bg-primary h-screen w-fll">
        <Navbar page="Profile" />
        <div className=" m-auto w-[980px] my-8">
          {profileModal && (
            <>
              <div className="w-[600px] z-10 h-[500px] border border-gray-600 py-4 px-8 rounded-xl bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-3xl text-white text-center w-full">
                  Change profile picture
                </div>

                <div>
                  <input
                    onChange={imageUpload}
                    className="text-gray-500 bg-red-500"
                    type="file"
                  />
                </div>

                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={() => console.log("This is a button")}
                    className="text-xl bg-gray-600 rounded-md py-1 px-3 text-white"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => setProfileModal(false)}
                    className="text-xl bg-gray-600 rounded-md py-1 px-3 text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-start gap-4 items-center w-[980px]">
            <div className="relative group">
              <img
                className="w-20 h-20 rounded-full"
                src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                alt=""
              />
              <div className="bg-[#0000005d] group-hover:w-full rounded-full h-20 top-0 left-0 absolute flex justify-center items-center ">
                <BiUpload
                  onClick={() => setProfileModal(true)}
                  className="group-hover:block hidden text-3xl text-white"
                />
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
