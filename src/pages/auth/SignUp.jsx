import React, { useEffect, useState } from 'react'
import { Link, Redirect, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveUser, selectUserName } from '../../app/reducer/userSlice'
import { auth, providerGoogle, providerFacebook } from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, updateProfile } from 'firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SignUp = () => {

    useEffect(() => {
        document.title = "Sign up | Plearnpattana School"
     },[]);

    const dispatch = useDispatch()
    const userName = useSelector(selectUserName)

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const onInputFullName = (e) => setFullName(e.target.value)
    const onInputEmail = (e) => setEmail(e.target.value)
    const onInputPassword = (e) => setPassword(e.target.value)
    const onInputConfirmPassword = (e) => setConfirmPassword(e.target.value)


    /** Sign up with CreateUserWithEmailAndPassword */
    const handleSubmitSignUp = (e) => {
        e.preventDefault()
        if (confirmPassword !== password) {
            alert('Password is not match')
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch(
                setActiveUser({
                    userName: user.displayName,
                    userEmail: user.email,
                    userPhoto: user.photoURL,
                })
            )
            updateProfile(auth.currentUser, {
                displayName: fullName,
            }).then(() => {
                dispatch(
                    setActiveUser({
                        userName: auth.currentUser.displayName,
                    })
                )
            }).catch((error) => {
                console.log(error)
            })
        })
        .catch((error) => {
            console.log(error)
            console.log(error.code)
            console.log(error.message)
        });
    }

    /** Sign in with Google Auth */
    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, providerGoogle).then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            dispatch(
                setActiveUser({
                    userName: result.user.displayName,
                    userEmail: result.user.email,
                    userPhoto: result.user.photoURL,
                })
            )
        }).catch((error) => {
            // const errorCode = error.code;const errorMessage = error.message;const email = error.email;
            console.log(error)
            // const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    /** Sign in with Facebook Auth */
    const handleSignInWithFacebook = () => {
        signInWithPopup(auth, providerFacebook).then((result) => {
            dispatch(
                setActiveUser({
                    userName: result.user.displayName,
                    userEmail: result.user.email,
                    userPhoto: result.user.photoURL,
                })
            )
            // const credential = FacebookAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
        }).catch((error) => {
            // const errorCode = error.code;const errorMessage = error.message;const email = error.email;
            console.log(error)
            // const credential = FacebookAuthProvider.credentialFromError(error);
        });
    }

    if (userName) { return <Redirect to="/" /> }

    return (
        <>
            <div id="auth-page" className="container d-flex justify-content-center align-items-center">
                <div className="auth-content">
                    <div className="select-auth d-flex justify-content-center">
                        <NavLink activeClassName="active" to="/sign-in" ><h3>Sign in</h3></NavLink>
                        <NavLink activeClassName="active" to="/sign-up" id="link-signup-page"><h3>Sign up</h3></NavLink>
                    </div>
                    <h4>You are now sign up</h4>
                    <section id="sign-in-with-email-password">
                        <form onSubmit={handleSubmitSignUp}>
                            <div className="form-floating">
                                <input type="text" name="fullname" id="inputyourfullname" className="form-control" placeholder="full name" onChange={onInputFullName} required/>
                                <label htmlFor="inputyourfullname">Full Name</label>                            
                            </div>
                            <div className="form-floating">
                                <input type="email" name="email" id="inputyouremail" className="form-control" placeholder="example@email.com" onChange={onInputEmail} required/>
                                <label htmlFor="inputyouremail">Email</label>                            
                            </div>
                            <div className="form-floating">
                                <input type="password" name="password" id="inputyourpassword" className="form-control" placeholder="password" onChange={onInputPassword} required/>
                                <label htmlFor="inputyourpassword">Password</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" name="password_confirm" id="inputyourpasswordconfirm" className="form-control" placeholder="confirm password" onChange={onInputConfirmPassword} required/>
                                <label htmlFor="inputyourpasswordconfirm">Confirm Password</label>
                            </div>
                            <div className="d-flex justify-content-end align-items-center">
                                <button type="submit" className="btn btn-outline-primary btn-sm">Sign up</button>
                            </div>
                        </form>
                    </section>
                    <h4>Or continue with</h4>
                    <section id="sign-in-with-other">
                        <button onClick={handleSignInWithGoogle} className="btn btn-outline-light"><FontAwesomeIcon icon={['fab', 'google']} /> Sign in with Google</button>
                        <button onClick={handleSignInWithFacebook} className="btn btn-outline-light"><FontAwesomeIcon icon={['fab', 'facebook']} /> Sign in with Facebook</button>
                    </section>
                </div>
            </div>
        </>
    )
}

export default SignUp
