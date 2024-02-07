// import { useState } from 'react'
// import { getDatabase } from "firebase/database";
import { getDatabase, ref, child, get } from "firebase/database";

import Navbar from '../../components/Navbar.jsx/Navbar'

const Chatbox = () => {
  // const db = getDatabase();
  // const [message, setMessage] = useState();


const dbRef = ref(getDatabase());
get(child(dbRef, `users/`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

  return (
    <>
      <div className='bg-primary h-screen w-full'>
        <div className='flex h-screen flex-col w-[980px] m-auto'>
          <div className='sticky top-1 z-10 '>
            <Navbar page='chatbox' />
          </div>
          <div className='flex gap-2 items-center pb-3 border-b'>
            <img className='h-10' src='../../../src/assets/react.svg' />
            <div className='flex text-white flex-col'>
              <p className='text-lg font-semibold'>Bipul Hajong</p>
              <p className='text-sm'>Online</p>
            </div>
          </div>
          <div className='flex grow w-full flex-col overflow-y-scroll'>
            <div className='my-4 py-4 grow '>
              <div className='text-left'>
                <p className='text-lg text-white border p-2 inline-block rounded-md'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <p className='text-sm text-white p-2'>20:00</p>
              </div>
              <div className='text-right'>
                <p className='text-lg text-gray-900 bg-gray-300 p-2 inline-block rounded-md'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <p className='text-sm text-white p-2'>20:00</p>
              </div>
              <div className='text-left'>
                <p className='bg-gray-300 p-2 inline-block rounded-md'>
                  <img className='w-64' src='../../../src/assets/bipul.jpg' />
                </p>
                <p className='text-sm text-white p-2'>20:00</p>
              </div>
              <div className='text-right'>
                <p className='bg-gray-300 p-2 inline-block rounded-md'>
                  <img className='w-64' src='../../../src/assets/bipul.jpg' />
                </p>
                <p className='text-sm text-white p-2'>20:00</p>
              </div>
              <div className='text-left'>
                <p className='text-lg text-white border p-2 inline-block rounded-md'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <p className='text-sm text-white p-2'>20:00</p>
              </div>
              <div className='text-right'>
                <p className='text-lg text-gray-900 bg-gray-300 p-2 inline-block rounded-md'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <p className='text-sm text-white p-2'>20:00</p>
              </div>
            </div>
          </div>
          <div className='flex w-[980px] gap-2'>
            <div className='grow border rounded-md px-4 py-1 '>
              <input
                type='text'
                placeholder='Write a message'
                className='text-white text-lg bg-primary w-full p-1 outline-none'
              />
            </div>
            <button className='text-white font-semibold border px-4 py-3 border-white rounded-md'>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chatbox
