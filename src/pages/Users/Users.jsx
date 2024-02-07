import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar.jsx/Navbar'
import { getDatabase, ref, onValue, set, push } from 'firebase/database'
import { useSelector } from 'react-redux';
import FriendRequestList from './friendRequestList';
import Friends from './Friends';


const Users = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo)
  const [users, setUsers] = useState([])
  const [requestList, setRequestList] = useState()

  useEffect(() => {
    const db = getDatabase()
    const starCountRef = ref(db, 'users/')
    onValue(starCountRef, snapshot => {
      let arr = []
      snapshot.forEach(item => {
        if (data.uid != item.key) {
          arr.push({ ...item.val(), userId: item.key })
        }
      })
      setUsers(arr)
    })
  }, [])

  const handleFirendRequest = (item) => {
    const db = getDatabase()
    const friendRequestRef = ref(db, 'friendRequest/')
    onValue(friendRequestRef, snapshot => {
      let arr = []
      snapshot.forEach(item => {
        arr.push(item.val())
      })
      setRequestList(arr)
    })

    if (
      requestList.some(
        request =>
          request.senderId === data.uid && request.receiverId === item.userId
      )
    ) {
      console.log('Request sent')
    } else {
      set(push(ref(db, 'friendRequest/')), {
        senderName: data.displayName,
        senderId: data.uid,
        senderEmail: data.email,
        senderDp: data.photoURL,
        receiverName: item.username,
        receiverId: item.userId,
        receiverEmail: item.email,
        receiverDp: item.dp,
        date: `${new Date().getFullYear()} - ${
          new Date().getMonth() + 1
        } - ${new Date().getDate()}, ${new Date().getHours()}:${new Date().getMinutes()}`
      })
    }
  }
  return (
    <>
      <div className='bg-primary h-screen w-full'>
        <div className='sticky top-0 z-10'>
          <Navbar />
        </div>
        <div className='w-[980px] m-auto'>
          <h1 className='text-white font-bold text-3xl my-4'>User Lists</h1>
          <div>
            {users &&
              users.map((user, index) => {
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
                            {user.username}
                          </p>
                          <p className='text-white text-sm'>{user.email}</p>
                        </div>
                      </div>
                      <div className=''>
                        <button className='text-white border px-4 py-2 rounded-md'>
                          Message
                        </button>
                        <button
                          onClick={() => handleFirendRequest(user)}
                          className='text-white border px-4 py-2 rounded-md ml-4'
                        >
                          Add Friend
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        <FriendRequestList />
        <Friends/>
      </div>
    </>
  )
}

export default Users
