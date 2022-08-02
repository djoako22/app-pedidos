import { useEffect, useState } from "react";
import Card from "./Card";

function MenuAdmin({ setErrorMessage }) {
    const [menus, setMenus] = useState(null);
    const [formDataAddMenu, setFormDataAddMenu] = useState({});
    const [formDataEditMenu, setFormDataEditMenu] = useState({});
    const [showFormEditMenu, setShowFormEditMenu] = useState(false);
    const [idEditMenu, setIdEditMenu] = useState(null);

    useEffect(() => {
        getMenus();
    }, []);

    const getMenus = async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/api/menus");
        const data = await res.json();
        if (data.error) {
            setErrorMessage(data.error);
        }
        setMenus(data.menus);
    };

    const handleAddMenu = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in formDataAddMenu) {
            formData.append(key, formDataAddMenu[key]);
        }

        const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/api/menu", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        });
        const data = await res.json();
        if (data.error) {
            setErrorMessage(data.error);
        } else {
            getMenus();
            setFormDataAddMenu({});
            setErrorMessage(null);
            e.target.reset();
        }
    };

    const handleEditMenu = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in formDataEditMenu) {
            formData.append(key, formDataEditMenu[key]);
        }

        const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/api/menu/" + idEditMenu, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        });
        const data = await res.json();
        if (data.error) {
            setErrorMessage(data.error);
        } else {
            getMenus();
            setShowFormEditMenu(false);
            setErrorMessage(null);
            e.target.reset();
        }
    };

    const handleDeleteMenu = async (id) => {
        const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/api/menu/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await res.json();
        if (data.error) {
            setErrorMessage(data.error);
        } else {
            getMenus();
            setShowFormEditMenu(false);
            setErrorMessage(null);
        }
    };

    const handleFormEditMenu = (id) => {
        setIdEditMenu(id);
        setShowFormEditMenu(true);
    };

    return (
        <>
            <div>
                <h1>Menus</h1>
                {showFormEditMenu && (
                    <>
                        <h3>Editar menu:</h3>
                        <form onSubmit={handleEditMenu}>
                            <input
                                type="file"
                                name="image"
                                onChange={(e) => {
                                    setFormDataEditMenu({
                                        ...formDataEditMenu,
                                        image: e.target.files[0],
                                    });
                                }}
                            />
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                onChange={(e) => {
                                    setFormDataEditMenu({
                                        ...formDataEditMenu,
                                        name: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Descripción"
                                onChange={(e) => {
                                    setFormDataEditMenu({
                                        ...formDataEditMenu,
                                        description: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="text"
                                name="price"
                                placeholder="Precio"
                                onChange={(e) => {
                                    setFormDataEditMenu({
                                        ...formDataEditMenu,
                                        price: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="text"
                                name="duration"
                                placeholder="Duración"
                                onChange={(e) => {
                                    setFormDataEditMenu({
                                        ...formDataEditMenu,
                                        duration: e.target.value,
                                    });
                                }}
                            />
                            <div className="btns">
                                <button type="submit" className="btn btn-1">
                                    <span className="edge"></span>
                                    <span className="front text">Editar</span>
                                </button>
                                <button
                                    className="btn btn-2"
                                    onClick={() => {
                                        setShowFormEditMenu(false);
                                    }}
                                >
                                    <span className="edge"></span>
                                    <span className="front text">Cancelar</span>
                                </button>
                            </div>
                        </form>
                    </>
                )}
                <div className="container">
                    {menus &&
                        menus.map(({ _id, name, description, price, duration, image }) => {
                            image = image
                                ? process.env.NEXT_PUBLIC_URL_API + "/" + image
                                : "https://via.placeholder.com/150";
                            return (
                                <Card key={_id}>
                                    <h2>{name}</h2>
                                    <img src={image} alt="menu" />
                                    <p>{description}</p>
                                    <p>Duración: {duration} min</p>
                                    <h3>${price}</h3>
                                    <div>
                                        <a
                                            onClick={() => {
                                                handleFormEditMenu(_id);
                                            }}
                                        >
                                            Editar
                                        </a>
                                        {" o "}
                                        <a
                                            onClick={() => {
                                                handleDeleteMenu(_id);
                                            }}
                                        >
                                            Eliminar
                                        </a>
                                    </div>
                                </Card>
                            );
                        })}
                </div>
                <br />
                <h3>Crear menu:</h3>
                <form onSubmit={handleAddMenu}>
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => {
                            setFormDataAddMenu({
                                ...formDataAddMenu,
                                image: e.target.files[0],
                            });
                        }}
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        onChange={(e) => {
                            setFormDataAddMenu({
                                ...formDataAddMenu,
                                name: e.target.value,
                            });
                        }}
                        required
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Precio"
                        onChange={(e) => {
                            setFormDataAddMenu({
                                ...formDataAddMenu,
                                price: e.target.value,
                            });
                        }}
                        required
                    />
                    <input
                        type="text"
                        name="duration"
                        placeholder="Duración"
                        onChange={(e) => {
                            setFormDataAddMenu({
                                ...formDataAddMenu,
                                duration: e.target.value,
                            });
                        }}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Descripción"
                        onChange={(e) => {
                            setFormDataAddMenu({
                                ...formDataAddMenu,
                                description: e.target.value,
                            });
                        }}
                    />
                    <button type="submit" className="btn">
                        <span className="edge"></span>
                        <span className="front text">Crear</span>
                    </button>
                </form>
            </div>
        </>
    );
}
export default MenuAdmin;
