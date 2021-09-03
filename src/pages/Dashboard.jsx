import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLogOutState, selectUserName } from '../app/reducer/userSlice'
import { auth } from '../config/firebase'
import { signOut } from 'firebase/auth'

const Dashboard = () => {
    const dispatch = useDispatch()
    const userName = useSelector(selectUserName)

    const handleSignOut = () => {
        signOut(auth).then(() => {
            dispatch(setUserLogOutState())
        }).catch((err) => alert(err.message))
    }

    if(!userName) { return <Redirect to="/sign-in" /> }
    return (
       <body>
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
        <div class="card">
      <h2>TITLE HEADING</h2>
      
      <h5>Title description, Sep 2, 2017</h5>
       <img class="w3-image" src="../assets/images/ma.jpg" alt="Hamburger Catering" width="1600" height="800"></img>
      <p>Some text..</p>
      <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    </div>
    </body>

    )
}

export default Dashboard
