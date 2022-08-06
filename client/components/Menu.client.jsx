import { useEffect, useState, useContext } from "react";
import AppContext from "../contexts/AppContext";
import Card from "./Card";

function MenuClient() {
    const { order, setOrder } = useContext(AppContext);

    const [menus, setMenus] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMenus();
        const interval = setInterval(getMenus, 20000);
        return () => clearInterval(interval);
    }, []);

    const getMenus = async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/api/menus");
        const data = await res.json();
        setMenus(data.menus);
        setLoading(false);
    };

    const addMenu = (menu) => {
        const { name, price, duration } = menu;

        let existMenu = false;
        for (let i = 0; i < order.menus.length; i++) {
            if (name == order.menus[i].name) {
                existMenu = true;
                order.menus[i].price += price;
                order.menus[i].quantity++;
                break;
            }
        }
        if (!existMenu) {
            order.menus.push({ name, quantity: 1, price });
        }
        setOrder({
            ...order,
            total: order.menus.reduce((a, b) => a + b.price, 0),
            duration: order.duration + duration,
        });
    };

    return (
        <>
            <div>
                <h1>Menus:</h1>
                <div className="container">
                    {loading ? (
                        <div>Cargando...</div>
                    ) : (
                        <>
                            {menus.map((menu) => (
                                <div
                                    key={menu._id}
                                    onClick={() => {
                                        addMenu(menu);
                                    }}
                                >
                                    <Card hover>
                                        <h2>{menu.name}</h2>
                                        <img
                                            src={
                                                menu.image
                                                    ? process.env.NEXT_PUBLIC_URL_API +
                                                      "/" +
                                                      menu.image
                                                    : "https://via.placeholder.com/150"
                                            }
                                        />
                                        <p>{menu.description}</p>
                                        <h3>${menu.price}</h3>
                                    </Card>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
export default MenuClient;
