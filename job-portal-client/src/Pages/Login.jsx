import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const firebase = useFirebase();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await firebase.signinUserWithEmailAndPassword(email, password);
        console.log("Successfull", result);
        console.log("Logged In");
    }

    const handlePasswordReset = () => {
        const email = prompt("Please enter your email");
        firebase.sendPReset(email);
        alert("Email Sent Check your inbox");
    }

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate("/home");
        }
    }, [firebase, navigate])

    return (
        <div className='flex items-center justify-center '>
            <div className="login-container ">
                <h2 className='font-bold mb-3 text-lg'>Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" id='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <div className="forgot-password" onClick={handlePasswordReset}>
                        <span className='text-sm'>Forgot your password?</span>
                    </div>
                    <button type="submit" className='bg-gradient-to-br from-green-300 to-blue-300 p-2'>Sign In</button>
                </form>
                <div className="signup-option">
                    <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                </div>
                <div className="google-login " onClick={firebase.signinWithGoogle}>
                    <img src="https://www.google.com/favicon.ico" alt="Google Logo" />
                    <span>Continue with Google</span>
                </div>
            </div>
        </div>
    )
}

export default Login