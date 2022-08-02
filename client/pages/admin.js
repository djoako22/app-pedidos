import { useState, useEffect } from "react";
import OrderAdmin from "../components/Order.admin";
import MenuAdmin from "../components/Menu.admin";

function Admin() {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getUser();
        } else {
            window.location.href = "/login";
        }
    }, []);

    useEffect(() => {
        if (user && !(user.role === "ADMIN")) {
            window.location.href = "/login";
        }
    }, [user]);

    const getUser = async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/api/user/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (res.status === 200) {
            const data = await res.json();
            setUser(data.user);
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.reload();
        }
    };

    const handleLogout = async () => {
        await fetch(process.env.NEXT_PUBLIC_URL_API + "/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.reload();
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/api/user/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.error) {
            setErrorUpdate(data.error);
        } else {
            window.location.reload();
        }
    };

    return (
        <>
            <div className="main">
                {!(user && user.role === "ADMIN") ? (
                    <h1>You are not authorized to access this page</h1>
                ) : (
                    <>
                        <button onClick={handleLogout} className="btn">
                            <span className="edge"></span>
                            <span className="front text">Logout</span>
                        </button>

                        <h1>Hola, {user.username}!</h1>
                        
                        <h3>Donde recibiras tus pedidos?</h3>
                        <form onSubmit={handleUpdateUser}>
                            <input
                                type="text"
                                placeholder="Teléfono"
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                            />
                            <label>Teléfono actual: {user.phone}</label>
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                            <label>Email actual: {user.email}</label>
                            <button className="btn">
                                <span className="edge"></span>
                                <span className="front text">Guardar</span>
                            </button>
                        </form>
                        <br />
                        <OrderAdmin setErrorMessage={setErrorMessage} />
                        <br />
                        <MenuAdmin setErrorMessage={setErrorMessage} />
                    </>
                )}
                {errorMessage && alert(errorMessage)}
            </div>
        </>
    );
}

export default Admin;
