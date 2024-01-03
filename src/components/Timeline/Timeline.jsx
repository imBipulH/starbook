import React from "react";
import { getDatabase, off, onValue, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { MdPublic } from "react-icons/md";
import moment from "moment";

const Timeline = () => {
  const [singlePost, setSinglePost] = useState([]);
  const db = getDatabase();

  const handleSinglePost = () => {
    const singlePostRef = ref(db, "singlePost/");
    onValue(singlePostRef, (snapshot) => {
      // let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        //    arr.push(item.val());
      });
      // setSinglePost((prev) => [...prev, ...arr]);
    });
  };

  useEffect(() => {
    handleSinglePost();
  }, []);

  useEffect(() => {
    const singlePostRef = ref(db, "singlePost");
    onValue(singlePostRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        arr.push(item.val());
      });
      setSinglePost(arr);
    });
  }, []);

  return (
    <>
      {singlePost &&
        singlePost.map((item, id) => (
          <div key={id}>
            <div className="text-white flex items-center gap-4 my-4">
              <img
                src={item.photoURL && item.photoURL}
                alt="DP"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-xl text-white font-semibold">
                  {item.postSenderName && item.postSenderName}
                </p>
                <div className="flex items-center mt-1 gap-2">
                  <p className="text-sm">
                    {moment(item.date, "YYYY-MM-DD HH:mm").fromNow()}
                  </p>
                  <MdPublic className="text-sm" />
                </div>
              </div>
            </div>
            <div className="w-full px-12 border-b border-gray-500 pb-4">
              <p className="text-white text-xl">{item.post && item.post}</p>

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
        ))}
    </>
  );
};

export default Timeline;
