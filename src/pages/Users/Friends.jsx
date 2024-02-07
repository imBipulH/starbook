import { getDatabase, onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Friends = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo);
  console.log(data);
  const [friends, setFriends] = useState([])
  const db = getDatabase()

  useEffect(() => {
    const friendRef = ref(db, 'friends/')
    onValue(friendRef, snapshot => {
      let friendsList = []
      snapshot.forEach(item => {
        friendsList.push(item.val())
      })
      setFriends(friendsList)
    })
  }, [])
  console.log('Friends', friends)

  return (
    <>
      <div className='bg-primary h-screen w-full'>
        <div className='w-[980px] m-auto'>
          <h1 className='text-white font-bold text-3xl my-4'>
            Friends
          </h1>
          <div>
            {friends &&
              friends.map((user, index) => {
                return (
                  <div className='flex flex-col gap-4' key={index}>
                    <div className='flex justify-between'>
                      <div className='flex flex-row gap-4 items-center my-2'>
                        <img
                          className='h-10'
                          src='../../../src/assets/react.svg'
                        />
                        <div className='flex flex-col'>
                          <p className='text-xl font-semibold text-white'>
                            {user.senderName}
                          </p>
                          <p className='text-white text-sm'>
                            {user.senderEmail}
                          </p>
                        </div>
                      </div>
                      <div className=''>
                        <button className='text-white border px-4 py-2 rounded-md'>
                          Message
                        </button>
                        <button className='text-white border px-4 py-2 rounded-md ml-4'>
                          Block
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Friends
