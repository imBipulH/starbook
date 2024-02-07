import { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove } from 'firebase/database'
import { useSelector } from 'react-redux'

const FriendRequestList = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo)
  const [friendRequestList, setFriendRequestList] = useState()

  useEffect(() => {
    const db = getDatabase()
    const friendRequestRef = ref(db, 'friendRequest/')
    onValue(friendRequestRef, snapshot => {
      let requests = []
      snapshot.forEach(item => {
        if (item.val().receiverId == data.uid) {
          requests.push(item.val())
        }
      })
      setFriendRequestList(requests)
    })
  }, [])

  const handleAccept = (item) =>{
    const db = getDatabase();
    set(push(ref(db, "friends/")),{
        ...item
    }).then(()=>{
        remove(ref(db, 'friendRequest/'))
    })
  }


  return (
    <>
      <div className='bg-primary w-full'>
        <div className='w-[980px] m-auto'>
          <h1 className='text-white font-bold text-3xl my-4'>
            Friend Requests
          </h1>
          <div>
            {friendRequestList &&
              friendRequestList.map((user, index) => {
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
                          <p className='text-white text-sm'>{user.senderEmail}</p>
                        </div>
                      </div>
                      <div className=''>
                        <button className='text-white border px-4 py-2 rounded-md'>
                          Cancel
                        </button>
                        <button onClick={()=> handleAccept(user)} className='text-white border px-4 py-2 rounded-md ml-4'>
                          Accept
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

export default FriendRequestList
