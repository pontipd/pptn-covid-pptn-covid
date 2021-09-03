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
        <div>
            <h1>Welcome to Dashboard Plearnpattanaaaaa</h1>
            <img src="assets/images/ma.jpg" alt=" "></img>
            <h2>{userName}</h2>
            
            <button onClick={handleSignOut} className="btn btn-secondary btn-sm">Sign Out</button>
        </div>
    )
}

export default Dashboard
