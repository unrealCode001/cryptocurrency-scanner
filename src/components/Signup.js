import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './Signup.scss'

const Signup = ({ history }) => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            history.push('/dashboard')
        }
    },[])

    const onSignup = () => {
        setLoading(true);
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, { displayName: name })
                    .then(() => history.push('/'))
                    .catch((e) => alert(e.message))
            }).catch((e) => alert(e.message))
            .finally(() => setLoading(false))
    }

    return (

    <section className='register'>
        <div className='register__form'>
            <label className='register__user'>Name &nbsp;</label><br/>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                name='name'
                type='name'
                className='register__user-input'
                /><br/>
            <label className='register__user' >Email &nbsp;</label><br/>
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                name='email'
                type='email'
                className='register__user-input'
                /><br/>
            <label className='register__pass'>Password: &nbsp;</label><br/>
            <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                name='password'
                type='password'
                className='register__pass-input'
                /><br/>

            <div className='register__buttons'>
                <button className='register__cancel'>
                    <Link to="/">
                        Cancel
                    </Link>
                </button>
                <button className='register__signup'onClick={onSignup}>Sign Up</button>
            </div>

        </div>
    </section>

    )
}

export default Signup;
