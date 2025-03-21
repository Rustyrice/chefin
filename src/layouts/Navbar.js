import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineInbox,
  AiOutlineHistory,
} from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { IoFilter } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { Button } from '@chakra-ui/react'
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import styled from 'styled-components'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_PUBLIC_SUPABASE_URL, // Your Supabase URL
  process.env.REACT_APP_SUPABASE_ANON_KEY, // Your Supabase anonymous key
)

const Navbar = () => {
  const logo = '../logo.svg'
  // const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isBottomBarVisible, setBottomBarVisible] = useState(true)
  const [isSignupLoginPopupOpen, setSignupLoginPopupOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let prevScrollPos = window.pageYOffset
    let isScrollingDown = false

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      isScrollingDown = prevScrollPos < currentScrollPos
      prevScrollPos = currentScrollPos

      setBottomBarVisible(!isScrollingDown)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleSignupLoginPopup = () => {
    setSignupLoginPopupOpen((prevValue) => !prevValue)
  }

  const closePopup = () => {
    setSignupLoginPopupOpen(false)
  }

  // const toggleSidebarPopup = () => (
  //   <Box
  //     sx={{ width: 250, height: '100%' }}
  //     role="presentation"
  //     onClick={() => setSidebarOpen(false)}
  //     onKeyDown={() => setSidebarOpen(false)}
  //   >
  //     {loggedIn ? (
  //       <List>
  //         {['Messages', 'Wishlists', 'Your Account'].map((text, index) => (
  //           <ListItem key={text} disablePadding>
  //             <ListItemButton>
  //               <ListItemText primary={text} />
  //             </ListItemButton>
  //           </ListItem>
  //         ))}
  //       </List>
  //     ) : (
  //       <List>
  //         {['Log in', 'Sign up'].map((text, index) => (
  //           <ListItem key={text} disablePadding>
  //             <ListItemButton onClick={toggleSignupLoginPopup}>
  //               <ListItemText primary={text} />
  //             </ListItemButton>
  //           </ListItem>
  //         ))}
  //       </List>
  //     )}
  //     <Divider />
  //     <List>
  //       {['Start your home restaurant', 'Contact Us', 'Help'].map(
  //         (text, index) => (
  //           <ListItem key={text} disablePadding>
  //             <ListItemButton>
  //               <ListItemText primary={text} />
  //             </ListItemButton>
  //           </ListItem>
  //         ),
  //       )}
  //     </List>
  //   </Box>
  // )

  const toggleProfilePopup = () => {
    setProfilePopupOpen((prevValue) => !prevValue)
  }

  const BlackBorderTextField = styled(TextField)`
    & label.Mui-focused {
      color: black;
    }
    & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: black;
      }
    }
  `

  const handleGoogleSignIn = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: 'http://localhost:3000/home' },
      })

      if (error) {
        console.error('Google sign-in error:', error.message)
      } else {
        console.log('Google sign-in successful:', user)
        setUser(user)
      }
    } catch (error) {
      console.error('An error occurred during Google sign-in:', error)
    }
  }

  async function checkLoggedIn() {
    setLoading(true)
    const { data } = await supabase.auth.getSession()
    if (data.session) {
      const userEmail = data.session.user.email

      if (userEmail.endsWith('@bath.ac.uk')) {
        setUser(data.session.user)
        setLoggedIn(true)
      } else {
        await supabase.auth.signOut()
        setUser(null)
        setLoggedIn(false)
        console.warn(
          'Access denied: Only @bath.ac.uk email addresses are allowed.',
        )
      }
    } else {
      setUser(null)
      setLoggedIn(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    checkLoggedIn() // check if user is logged in on page load

    // listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user?.email.endsWith('@bath.ac.uk')) {
          setUser(session?.user)
          setLoggedIn(true)
        } else {
          setUser(null)
          setLoggedIn(false)
        }
      },
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleManualAuth = async () => {
    if (!email.endsWith('@bath.ac.uk')) {
      setErrorMessage('Only @bath.ac.uk email addresses are allowed.')
      return
    }

    setLoading(true)
    let authResponse

    if (isSignUp) {
      authResponse = await supabase.auth.signUp({ email, password })
    } else {
      authResponse = await supabase.auth.signInWithPassword({ email, password })
    }

    const { error, data } = authResponse
    if (error) {
      console.error('An error occurred:', error.message)
      setErrorMessage(error.message)
    } else {
      setUser(data.user)
      setLoggedIn(true)
      closePopup()
    }
    setLoading(false)
  }

  let navigate = useNavigate()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log('Error signing out:', error)
    } else {
      setUser(null)
      setLoggedIn(false)
      navigate('/')
    }
  }

  return (
    <div className="w-full fixed bg-white z-50 shadow-md">
      <nav
        id="navber"
        className="flex items-center justify-between md:px-4 py-2 border-b-2 border-gray-200"
      >
        <div className="flex items-center" onClick={() => navigate('/home')}>
          {/* <div className="hidden lg:flex"> */}
          {/* desktop sidebar commented out as it is not needed */}
          {/* <AiOutlineMenu
              className="text-3xl text-black cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            /> */}
          {/* <Drawer
              anchor="left"
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            >
              {toggleSidebarPopup()}
            </Drawer> */}
          {/* </div> */}
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            src={logo}
            alt="chefin logo"
            className="object-center w-8 m-2 cursor-pointer hidden sm:block"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-green-400 text-3xl font-bold cursor-pointer hidden lg:block text-left"
          >
            Chefin
          </motion.div>
        </div>

        {/* search and filter for mobile layout  */}
        <div className="md:hidden">
          <div className="p-2 flex flex-row items-center">
            <div className="flex flex-1 text-center bg-white px-2 py-2 border rounded-full mr-2 shadow-lg">
              <button className="flex items-center text-black p-2 rounded-full">
                <AiOutlineSearch />
              </button>
              <input
                type="text"
                placeholder="Where?"
                className="bg-transparent outline-none flex-1"
              />
            </div>
            <button className="flex items-center p-2 border border-gray-500 rounded-full">
              <IoFilter />
            </button>
          </div>
        </div>

        <div className="text-center">
          <ul className="flex items-center justify-end list-none">
            {/* Mobile and tablet layout */}
            {isBottomBarVisible && (
              <motion.div
                className="fixed bottom-0 left-0 right-0 bg-white p-3 flex justify-around items-center lg:hidden border-t-2 border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Link to="/home">
                  <div className="flex flex-col items-center cursor-pointer">
                    <AiOutlineSearch className="text-2xl text-gray-300" />
                    <p className="text-xs text-gray-500">Explore</p>
                  </div>
                </Link>
                <div
                  className="flex flex-col items-center cursor-pointer"
                  // onClick={}
                >
                  <AiOutlineHeart className="text-2xl text-gray-300" />
                  <p className="text-xs text-gray-500">Wishlists</p>
                </div>
                {loggedIn ? (
                  <>
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      // onClick={}
                    >
                      <AiOutlineHistory className="text-2xl text-gray-300" />
                      <p className="text-xs text-gray-500">History</p>
                    </div>
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      // onClick={}
                    >
                      <AiOutlineInbox className="text-2xl text-gray-300" />
                      <p className="text-xs text-gray-500">Inbox</p>
                    </div>
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={toggleProfilePopup}
                    >
                      <AiOutlineUser className="text-2xl text-gray-300" />
                      <p className="text-xs text-gray-500">Profile</p>
                    </div>
                  </>
                ) : (
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={toggleSignupLoginPopup}
                  >
                    <AiOutlineUser className="text-2xl text-gray-300" />
                    <p className="text-xs text-gray-500">Log in</p>
                  </div>
                )}
                {/* <div className="flex flex-col items-center cursor-pointer">
                  <AiOutlineMenu
                    className="text-2xl text-gray-600"
                    onClick={() => setSidebarOpen(true)}
                  />
                  <p className="text-xs text-gray-500">More</p>
                </div> */}
              </motion.div>
            )}

            {/* Laptop and desktop layout */}
            <div className="hidden md:flex items-center justify-center">
              {/* search and filter for laptop layout  */}
              {/* <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-full">
                  <input
                    type="text"
                    placeholder="Anywhere"
                    className="bg-transparent outline-none ml-1 w-20"
                  />
                  <div className="border-l-2 border-gray-300 h-6 mx-2"></div>
                  <input
                    type="text"
                    placeholder="Any week"
                    className="bg-transparent outline-none ml-1 w-20"
                  />
                  <div className="border-l-2 border-gray-300 h-6 mx-2"></div>
                  <input
                    type="text"
                    placeholder="Add guests"
                    className="bg-transparent outline-none ml-1 w-20"
                  />
                  <button className="flex items-center space-x-2 ml-5 bg-green-400 text-white p-2 rounded-full">
                    <AiOutlineSearch />
                  </button>
                </div>
                {loggedIn ? (
                  // If user is logged in, show profile icon
                  <>
                    <motion.li>
                      <button
                        className="
                        inline-block
                        px-4
                        py-2
                        text-sm
                        font-bold
                        leading-relaxed
                        text-white
                        uppercase
                        transition-colors
                        duration-200
                        transform
                        bg-green-400
                        rounded
                        hover:bg-green-500
                        ml-6
                      "
                        href="#"
                      >
                        Cook with us
                      </button>
                    </motion.li>
                    <motion.li>
                      <div
                        className="flex items-center cursor-pointer rounded-full border border-gray-300 p-1 ml-3 hover:shadow-xl transform duration-100"
                        onClick={toggleProfilePopup}
                      >
                        <AiOutlineUser className="text-2xl text-gray-600" />
                      </div>
                    </motion.li>
                  </>
                ) : (
                  // If user is not logged in yet
                  <>
                    <motion.li>
                      <button
                        className="
                        inline-block
                        px-4
                        py-2
                        text-sm
                        font-bold
                        leading-relaxed
                        text-white
                        uppercase
                        transition-colors
                        duration-200
                        transform
                        bg-green-400
                        rounded
                        hover:bg-green-500
                        ml-6
                      "
                        onClick={toggleSignupLoginPopup}
                      >
                        Get started
                      </button>
                    </motion.li>
                    <motion.li>
                      <div
                        className="flex items-center cursor-pointer rounded-full border border-gray-300 p-1 ml-3 hover:shadow-xl transform duration-100"
                        onClick={toggleProfilePopup}
                      >
                        <AiOutlineUser className="text-2xl text-gray-600" />
                      </div>
                    </motion.li>
                  </>
                )}
              </div> */}
              <div className="hidden md:flex items-center space-x-4">
                <motion.li>
                  <button
                    className="
                        inline-block
                        px-4
                        py-2
                        text-sm
                        font-bold
                        leading-relaxed
                        text-white
                        uppercase
                        transition-colors
                        duration-200
                        transform
                        bg-green-400
                        rounded
                        hover:bg-green-500
                        ml-6
                      "
                    onClick={() => navigate('/safety-guidelines')}
                  >
                    Safety Guidelines
                  </button>
                </motion.li>
              </div>
            </div>
          </ul>
        </div>
      </nav>

      {/* Profile icon popup for user log out*/}
      {isProfilePopupOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 right-0 mt-14 mr-4 bg-white border rounded-md shadow-lg w-60 "
        >
          {loggedIn ? (
            <>
              <button className="text-left block w-full px-4 py-2 mb-3 mt-2 text-gray-600 hover:bg-gray-100 text-sm font-bold">
                Messages
              </button>
              <button className="text-left block w-full px-4 py-2 mb-3 text-gray-600 hover:bg-gray-100 text-sm font-bold">
                Wishlists
              </button>
              <div className="border-b-2 border-gray-100"></div>
              <button className="text-left block w-full px-4 py-2 mb-3 mt-3 text-gray-600 hover:bg-gray-100 text-sm">
                Start your home restaurant
              </button>
              <button className="text-left block w-full px-4 py-2 mb-3 text-gray-600 hover:bg-gray-100 text-sm">
                Account
              </button>
              <div className="border-b-2 border-gray-100"></div>
              <button
                className="text-left block w-full px-4 py-2 mb-3 mt-3 text-gray-600 hover:bg-gray-100 text-sm"
                onClick={() => navigate('/safety-guidelines')}
              >
                Our Safety Guidelines
              </button>
              <button
                className="text-left block w-full px-4 py-2 mb-3 text-gray-600 hover:bg-gray-100 text-sm"
                onClick={handleSignOut}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                className="text-left block w-full px-4 py-2 mb-3 mt-3 text-gray-600 hover:bg-gray-100 text-sm font-bold"
                onClick={toggleSignupLoginPopup}
              >
                Log in
              </button>
              <button
                className="text-left block w-full px-4 py-2 mb-3 text-gray-600 hover:bg-gray-100 text-sm"
                onClick={toggleSignupLoginPopup}
              >
                Sign up
              </button>
              <div className="border-b-2 border-gray-100"></div>
              <button className="text-left block w-full px-4 py-2 mb-3 mt-3 text-gray-600 hover:bg-gray-100 text-sm">
                Start your home restaurant
              </button>
              <button className="text-left block w-full px-4 py-2 mb-3 mt-3 text-gray-600 hover:bg-gray-100 text-sm">
                Help Center
              </button>
            </>
          )}
        </motion.div>
      )}

      {/* Popup for Sign Up and Log In */}
      <Dialog
        // fullscreen
        open={isSignupLoginPopupOpen}
        onClose={closePopup}
        fullWidth
        maxWidth="sm"
        className="rounded-md shadow-lg"
      >
        <DialogTitle
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            paddingTop: '1rem',
            paddingBottom: '0.25rem',
          }}
          className="bg-white text-gray-800 font-bold py-1 pl-4 pr-8 rounded-t-md text-center border-b-2 border-gray-200"
        >
          {isSignUp ? 'Sign Up' : 'Log In'}
          <IconButton
            onClick={closePopup}
            className="text-gray-800 hover:bg-gray-300 p-1 ml-auto float-right b"
            style={{
              borderradius: '50%',
              padding: '0.25rem',
            }}
          >
            <CloseIcon className="text-gray-700" />
          </IconButton>
        </DialogTitle>
        <DialogContent className="px-4 py-2">
          <Stack spacing={1} className="mb-4 mt-5 w-full">
            <span className="text-lg md:text-2xl font-semibold">
              Welcome to Chefin
            </span>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <BlackBorderTextField
              variant="outlined"
              label="Email"
              className="bg-white rounded-lg"
              InputProps={{
                className: 'rounded-lg',
              }}
            /> */}
          </Stack>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <button
            onClick={handleManualAuth}
            disabled={loading}
            className="
            inline-block
            px-6
            py-3
            text-sm
            font-bold
            leading-relaxed
            text-white
            uppercase
            transition-colors
            duration-200
            transform
            bg-green-400
            rounded
            hover:bg-green-500
            w-full
          "
            style={{
              marginBottom: '1rem',
            }}
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>
          <p
            className="text-center text-sm text-gray-600 cursor-pointer mt-2"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? 'Already have an account? Log in'
              : "Don't have an account? Sign up"}
          </p>
          {/* "or" line separator */}
          <div className="flex items-center justify-center mb-2">
            <div className="border-t border-gray-300 flex-grow"></div>
            <div className="px-3 text-gray-800">or</div>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>
          {/* Google Log In Button */}
          <Button
            as={motion.button}
            size="lg"
            leftIcon={<FcGoogle size={20} />}
            onClick={handleGoogleSignIn}
            className="font-semibold w-full bg-white border border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 rounded-md py-3 px-6 transition-all duration-200"
            _focus={{ boxShadow: 'outline' }}
            marginBottom="1rem"
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            Continue with Google
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Navbar
