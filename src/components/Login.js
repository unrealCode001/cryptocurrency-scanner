import React, { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './Login.scss'

const Login = ({ history }) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            history.push('/dashboard')
        }
    },[])

    const onLogin = () => {
        setLoading(true)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                localStorage.setItem('token', userCredential._tokenResponse.idToken);
                history.push('/dashboard')
            })
            .catch(e => alert(e.message))
            .finally(() => setLoading(false))
    }

    return (
       
    <section className='login'>
        <div className='login__form'>
            <label className='login__user'>Email &nbsp;</label><br/>
            <input className='login__user-input'
                value={email}
                onChange={e => setEmail(e.target.value)}
                name='email'
                type='email'
                /><br/>
            <label className='login__pass'>Password: &nbsp;</label><br/>
            <input className='login__pass-input'
                value={password}
                onChange={e => setPassword(e.target.value)}
                name='password'
                type='password'
            /><br/>
            <div className='login__buttons'>
                <button className='login__register' type='submit'>      
                    <Link to="/signup">
                        Register
                    </Link>
                </button>
                <button className='login__login' onClick={onLogin}>Login</button>
            </div>
        </div>
    </section>
    )
}

export default Login;
