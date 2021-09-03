import React, { useEffect, useState } from 'react'
import { Link, Redirect, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveUser, selectUserName } from '../../app/reducer/userSlice'
import { auth, providerGoogle, providerFacebook } from '../../config/firebase'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SignIn = () => {

    useEffect(() => {
       document.title = "Sign in | Plearnpattana School"
    },[]);

    const dispatch = useDispatch()
    const userName = useSelector(selectUserName)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const onInputEmail = (e) => setEmail(e.target.value)
    const onInputPassword = (e) => setPassword(e.target.value)

    const handleSubmitSignIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            dispatch(
                setActiveUser({
                    userName: user.displayName,
                    userEmail: user.email,
                    userPhoto: user.photoURL,
                })
            )
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            console.log(error)
        });
    }

    /** Sign in with Google Auth */
    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, providerGoogle).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
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
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    /** Sign in with Facebook Auth */
    const handleSignInWithFacebook = () => {
        signInWithPopup(auth, providerFacebook).then((result) => {
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
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
            const credential = FacebookAuthProvider.credentialFromError(error);
        });
    }

    if (userName) { return <Redirect to="/" /> }

    return (
        <>
            <div id="auth-page" className="container d-flex justify-content-center align-items-center">
                <div className="auth-content">
                    <div className="select-auth d-flex justify-content-center">
                        <NavLink activeClassName="active" to="/sign-in"><h3>Sign in</h3></NavLink>
                        <NavLink activeClassName="active" to="/sign-up" id="link-signup"><h3>Sign up</h3></NavLink>
                    </div>
                    <h4>You are now sign in</h4>
                    <section id="sign-in-with-email-password">
                        <form onSubmit={handleSubmitSignIn}>
                            <div className="form-floating">
                                <input type="email" name="email" id="inputyouremail" className="form-control" placeholder="example@email.com" onChange={onInputEmail} required />
                                <label htmlFor="inputyouremail">Email</label>                            
                            </div>
                            <div className="form-floating">
                                <input type="password" name="password" id="inputyourpassword" className="form-control" placeholder="password" onChange={onInputPassword} required />
                                <label htmlFor="inputyourpassword">Password</label>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <Link to="/forget-password">Forgotten password?</Link>
                                <button type="submit" className="btn btn-outline-primary btn-sm">Sign in</button>
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

export default SignIn
