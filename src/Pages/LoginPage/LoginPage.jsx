import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        // Constructing the JSON body
        const requestBody = {
            email: username,
            password: password,
        };

        try {
            // Sending POST request
            const response = await fetch(
                "http://localhost:8081/api/scoutcompass/auth/user/authenticate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Origin: "http://localhost:3000",
                        "Content-Length": "<calculated when request is sent>",
                        Host: "<calculated when request is sent>",
                        Accept: "*/*",
                        "Accept-Encoding": "gzip, deflate, br",
                        Connection: "keep-alive",
                    },
                    body: JSON.stringify(requestBody),
                }
            );
            if (response.ok) {
                console.log("Login successful!");
                toast.success("Login Successful");
                // navigate("/home");
                window.location.href = "/home";
            } else {
                console.error("Login failed");
                toast.error("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="toast-container-wrapper">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
            <div className="background">
                <div className="warp">
                    <form action="" onSubmit={handleLogin}>
                        <h1 className="heading">Login</h1>

                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                            <FaUser className="icon" />
                        </div>

                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <FaLock className="icon" />
                        </div>

                        <div className="forgot">
                            <a href="#">Forgot Password?</a>
                        </div>

                        <button type="submit" className="login">
                            Login
                        </button>

                        <div className="signup">
                            <p>
                                Don't have an Account? <br />
                                <br />{" "}
                                <a href="#">
                                    <Link
                                        className="btn btn-success"
                                        to={"/signup"}
                                    >
                                        Sign up
                                    </Link>
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
