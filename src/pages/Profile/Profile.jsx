import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar.jsx/Navbar";
import { BiUpload } from "react-icons/bi";
import { useState, createRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import {
  getDatabase,
  ref as dref,
  update,
  onValue,
  set,
} from "firebase/database";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  console.log(data);

  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState("Your about content goes here");
  const [newContent, setNewContent] = useState("");
  const [profileModal, setProfileModal] = useState(false);
  const [coverModal, setCoverModal] = useState(false);
  const [image, setImage] = useState("");
  const [cover, setCover] = useState("");
  const [coverPhoto, setCoverPhoto] = useState();
  const auth = getAuth();
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  const db = getDatabase();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!localStorage.getItem("userLoginInfo")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const coverImgRef = dref(db, "users/" + data.uid);
    onValue(coverImgRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setCoverPhoto(data.coverPhoto);
    });
  }, []);

  const profileUpload = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(storage, "profile" + auth.currentUser.uid);
      uploadString(storageRef, cropData, "data_url").then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          });
          setProfileModal(false);
        });
      });
    }
  };

  const coverUpload = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(storage, "CoverPhoto" + data.uid);
      uploadString(storageRef, cropData, "data_url").then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          update(dref(db, "users/" + data.uid), {
            coverPhoto: downloadURL,
          }).then(() => {
            setCoverModal(false);
          });
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
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCoverPhotoData = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setCover(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleEdit = () => {
    setEdit(!edit);
    if (newContent !== null) {
      setContent(newContent);
    }
  };

  return (
    <>
      <div className="bg-primary h-screen w-fll overflow-y-auto">
        <div className="sticky top-0 z-10">
          <Navbar page="Profile" />
        </div>
        <div className="m-auto w-[980px] my-2 h-screen">
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
                    onClick={() => profileUpload()}
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
                  Change cover photo
                </div>
                <div className="my-2 flex items-center justify-center">
                  <Cropper
                    ref={cropperRef}
                    style={{ height: 400, width: "100%" }}
                    zoomTo={0}
                    initialAspectRatio={16 / 5}
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
                    onChange={getCoverPhotoData}
                    className="text-gray-500 bg-red-500"
                    type="file"
                  />
                </div>

                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={() => coverUpload()}
                    className="text-xl bg-gray-600 rounded-md py-1 px-3 text-white"
                  >
                    Upload
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
                  className="w-full h-full"
                  src={coverPhoto}
                  alt="Cover-Photo"
                />
                <div className="bg-[#0000005d] group-hover:w-12 rounded-full h-12 right-0 bottom-0 absolute flex justify-center items-center ">
                  <BiUpload
                    onClick={() => setCoverModal(true)}
                    className="group-hover:block hidden text-3xl text-white"
                  />
                </div>
              </div>
              <div className="absolute top-32 left-0  group">
                <img
                  className="w-44 h-44 rounded-full"
                  src={data.photoURL && data.photoURL}
                  alt="Profile-Photo"
                />
                <div className="bg-[#0000005d] group-hover:w-44 rounded-full h-44 top-0 left-0 absolute flex justify-center items-center ">
                  <BiUpload
                    onClick={() => setProfileModal(true)}
                    className="group-hover:block hidden text-3xl text-white"
                  />
                </div>
              </div>
            </div>
            <div className="w-full mt-4  flex justify-start items-center gap-8 relative">
              <div className=" flex-none flex-col justify-start">
                <div className="text-3xl my-1 font-semibold text-white">
                  {data.displayName}
                </div>
                <div className="text-lg font-semibold text-gray-600">
                  {data.email}
                </div>
              </div>
              <div className="w-full grow ">
                <button
                  onClick={handleEdit}
                  className="absolute right-0 bottom-0 text-white border border-gray-500 px-2 rounded-sm"
                >
                  Edit
                </button>
                {edit ? (
                  <textarea
                    readOnly="false"
                    name="Bio"
                    className="absolute z-10 top-0 right-0 bg-gray-600 w-[800px] h-[400px] p-2"
                  />
                ) : (
                  <p className="text-md text-white w-full h-full">
                    <span className="font-semibold text-gray-500">
                      About Me:{" "}
                    </span>
                    I grew up in village. Then I moved into DHAKA at 18th. I
                    started my career at age 18th. I workd at Grameen Uniqlo a
                    japanees clothing brand for 8 year. Their vision was to make
                    clothing for everyone to wear everywehere at any time.
                  </p>
                )}
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
