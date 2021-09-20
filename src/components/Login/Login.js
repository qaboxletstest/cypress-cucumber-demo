import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(username, password)
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
        window.location.href = "http://localhost:3000/home"
    }

    return (
        <div>
            <div className="login-wrapper">
                <h1>PLEASE LOGIN</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input id="username" type="text" onChange={e => setUserName(e.target.value)} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div>
                        <button id="submit" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};