import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                toast.error("Please fill in all fields");
                return;
            }

            const body = { email, password };

            const response = await fetch(
                "http://localhost:5020/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const parseRes = await response.json();

            if (parseRes.jwtToken) {
                localStorage.setItem("token", parseRes.jwtToken);
                setAuth(true);
                toast.success("Logged in successfully");
            } else {
                toast.error(parseRes.message || "Invalid credentials");
            }

        } catch (err) {
            console.error(err);
            toast.error("Server error. Please try again later.");
        }
    };

    return (
        <div>
            <div className="col-9 shadow-sm">
                <h2 className="text-center">Login</h2>
                <form onSubmit={submitForm}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control my-3"
                        value={email}
                        onChange={onChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control my-3"
                        value={password}
                        onChange={onChange}
                    />
                    <button className="btn btn-success">Login</button>
                </form>
                <Link to='/'>Sign Up</Link>
            </div>
        </div>
    );
};

export default Login;
