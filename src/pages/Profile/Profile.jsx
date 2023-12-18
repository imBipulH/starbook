import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar.jsx/Navbar";
import { BiUpload } from "react-icons/bi";
import { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { getDatabase, ref as dref, update } from "firebase/database";
import { getAuth, updateProfile } from "firebase/auth";

const Profile = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  console.log(data);
  const [profileModal, setProfileModal] = useState(false);
  const [coverModal, setCoverModal] = useState(false);
  const [image, setImage] = useState("");
  const [cover, setCover] = useState("");
  const [profilePhoto, setProfilePhoto] = useState();
  const [coverPhoto, setCoverPhoto] = useState();
  const auth = getAuth();
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  const db = getDatabase();

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

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const message4 = cropData;
      const storage = getStorage();
      const storageRef = ref(storage, data.uid);
      uploadString(storageRef, message4, "data_url").then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          setProfilePhoto(downloadURL);
          // setProfileModal(false);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            update(dref(db, "users/" + data.uid), {
              dp: downloadURL,
            });
            setProfileModal(false);
          });
        });
      });
    }
  };
  const getCoverData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const message4 = cropData;
      const storage = getStorage();
      const storageRef = ref(storage, data.uid);
      uploadString(storageRef, message4, "Cover_Photo").then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          setCoverPhoto(downloadURL); /* .then(() => {
          // setProfileModal(false);
          /*    updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }) */ /*
            update(dref(db, "users/" + data.uid), {
              coverPhoto: downloadURL,
            });
            setCoverModal(false);
          }); */
        });
      });
    }
  };

  const imageUpload = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    console.log(files, "files");
    console.log(files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    console.log(image);
  };

  const coverUpload = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    console.log(files, "files");
    console.log(files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setCover(reader.result);
    };
    reader.readAsDataURL(files[0]);
    console.log(image);
  };

  return (
    <>
      <div className="bg-primary h-screen w-fll">
        <Navbar page="Profile" />
        <div className=" m-auto w-[980px] my-2 h-screen">
          {profileModal && (
            <>
              <div className="w-[600px] z-10 h-[500px] border border-gray-600 py-4 px-8 rounded-xl bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-3xl text-white text-center w-full">
                  Change profile picture
                </div>

                <div className="my-2 flex items-center justify-center">
                  <Cropper
                    ref={cropperRef}
                    style={{ height: 400, width: "100%" }}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    guides={true}
                  />
                </div>

                <div className="flex justify-center items-center my-2">
                  <input
                    onChange={imageUpload}
                    className="text-gray-500 bg-red-500"
                    type="file"
                  />
                </div>

                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={getCropData}
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
          {coverModal && (
            <>
              <div className="w-[600px] z-10 h-[500px] border border-gray-600 py-4 px-8 rounded-xl bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-3xl text-white text-center w-full">
                  Change profile picture
                </div>

                <div className="my-2 flex items-center justify-center">
                  <Cropper
                    ref={cropperRef}
                    style={{ height: 400, width: "100%" }}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={cover}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    guides={true}
                  />
                </div>

                <div className="flex justify-center items-center my-2">
                  <input
                    onChange={coverUpload}
                    className="text-gray-500 bg-red-500"
                    type="file"
                  />
                </div>

                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={getCoverData}
                    className="text-xl bg-gray-600 rounded-md py-1 px-3 text-white"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => setCoverModal(false)}
                    className="text-xl bg-gray-600 rounded-md py-1 px-3 text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="flex flex-col justify-center gap-4 items-center w-[980px]">
            <div className="relative">
              <div className="group">
                <img
                  className="w-full h-40"
                  src={coverPhoto}
                  alt="Cover-Photo"
                />
                <div className="bg-[#0000005d] group-hover:w-12 rounded-full h-12 right-0 bottom-0 absolute flex justify-center items-center ">
                  <BiUpload
                    onClick={() => setProfileModal(true)}
                    className="group-hover:block hidden text-3xl text-white"
                  />
                </div>
              </div>
              <div className="absolute top-28 left-0  group">
                <img
                  className="w-20 h-20 rounded-full"
                  src={data.photoURL}
                  alt="Profile-Photo"
                />
                <div className="bg-[#0000005d] group-hover:w-20 rounded-full h-20 top-0 left-0 absolute flex justify-center items-center ">
                  <BiUpload
                    onClick={() => setProfileModal(true)}
                    className="group-hover:block hidden text-3xl text-white"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl my-1 font-semibold text-white">
                {data.displayName}
              </div>
              <div className="text-xl font-semibold text-white">
                MERN developer
              </div>
            </div>
          </div>
          <div className="text-xl text-white flex flex-col  my-8">
            {/*   <p className="font-semibold border-b border-b-gray-500 py-3">
              About Me
            </p> */}
            {/* <SideList title="Username" description="Bipul Hajong" /> */}
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
