import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate, Link } from 'react-router-dom';


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
        <div className='min-h-screen flex items-center justify-center '>
            <form onSubmit={handleSubmit} className='flex justify-center items-center rounded-md shadow-lg '>
                <div className='flex flex-col p-14 space-y-5 rounded-md shadow-3xl bg-white'>
                    <h2 className='text-3xl text-center mb-7'>Welcome Back </h2>

                    <input type='email' placeholder='Enter the email' value={email} onChange={(e) => setEmail(e.target.value)} className=' border border-slate-800 rounded-lg w-80 p-2 placeholder-black'></input>

                    <input type='password' placeholder='Enter the password' value={password} onChange={(e) => setPassword(e.target.value)} className='border border-slate-800 rounded-lg w-80 p-2 placeholder-black'></input>

                    <p className='text-sky-400 text-left' onClick={handlePasswordReset}>Forgot your password?</p>

                    <button className='border border-blue p-2 rounded-md ' type='submit'>Sign In</button>
                    <p className='text-center'>Don't have an account? <Link to="/register" className="text-sky-500">Sign up</Link></p>

                    <button className='border border-blue p-2 rounded-md ' onClick={firebase.signinWithGoogle} type='submit'>Continue with Google</button>
                </div>
            </form>
        </div>
    )
}

export default Login