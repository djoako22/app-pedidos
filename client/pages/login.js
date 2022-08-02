import { useState, useEffect } from "react";
import Card from "../components/Card";

function Login() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.error) {
            setErrorMessage(data.error);
        } else {
            localStorage.setItem("token", data.token);
            localStorage.setItem("refreshToken", data.refreshToken);
            window.location.href = "/admin";
        }
    };

    return (
        <>
            <div className="main">
                {token ? (
                    <h1>You are logged</h1>
                ) : (
                    <Card>
                        <h1>Login</h1>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="username"
                                placeholder="username"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        username: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="text"
                                name="password"
                                placeholder="password"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <button type="submit" className="btn">
                                <span className="edge"></span>
                                <span className="front text">Login</span>
                            </button>
                        </form>
                        {errorMessage && <p>{errorMessage}</p>}
                    </Card>
                )}
            </div>
        </>
    );
}

export default Login;
