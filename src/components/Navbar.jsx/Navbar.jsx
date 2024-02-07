import { getAuth, signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { IoHome, IoLogOutOutline, IoSearch } from 'react-icons/io5'
import { FaUser } from 'react-icons/fa'
import { TbMessageCircle } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { resetUserState } from '../../slices/userSlice'
import { useState } from 'react'

const Navbar = ({ page }) => {
  const auth = getAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [exitPage, setExitPage] = useState(false)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('userLoginInfo')
        dispatch(resetUserState())
        navigate('/login')
      })
      .catch(error => {
        // An error happened.
        console.log(error)
      })
  }

  return (
    <>
      <div className='bg-primary w-full'>
        {exitPage && (
          <div className='absolute bg-gray-500 w-96 h-64 left-1/2 top-1/2 translate-x-[-50%] translate-y-[50%] flex flex-col gap-4 items-center justify-center text-center'>
            <h3 className='font-bold w-full text-white text-3xl'>
              Are you sure to exit?
            </h3>
            <div className='flex w-full justify-center gap-4'>
              <button
                onClick={handleSignOut}
                className='border py-2 px-4 font-bold text-xl text-white focus:bg-[#FF5733]'
              >
                Yes
              </button>
              <button
                onClick={() => setExitPage(false)}
                className='text-xl text-white bg-primary px-4 py-2 border border-primary font-bold focus:bg-transparent focus:border-none '
              >
                No
              </button>
            </div>
          </div>
        )}

        <div className='flex gap-32 text-3xl py-4 text-white mb-10 justify-center items-end'>
          <Link to='/'>
            <IoHome
              className={`bg-transparent ${
                page == 'Home' && 'fill-white'
              } fill-gray-500 hover:fill-white`}
            />
          </Link>
          <Link to='/chatbox'>
            <TbMessageCircle
              className={`cursor-pointer text-gray-500 ${
                page == 'chatbox' && 'text-white'
              } hover:text-white`}
            />
          </Link>
          <Link to="/users">
            <IoSearch
              className={`cursor-pointer text-gray-500 ${
                page == '' && 'text-white'
              } hover:text-white`}
            />
          </Link>
          <Link
            to='/profile'
            className={`cursor-pointer text-gray-500 ${
              page == 'Profile' && 'text-white'
            } hover:text-white`}
          >
            <FaUser />
          </Link>
          <IoLogOutOutline
            onClick={() => setExitPage(true)}
            className='hover:text-white text-gray-500 cursor-pointer'
          />
        </div>
      </div>
    </>
  )
}

export default Navbar
