import { useEffect, useState, useContext } from "react";
import AppContext from "../contexts/AppContext";

function Cart() {
    const { myOrders, setMyOrders } = useContext(AppContext);

    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        const myOrders = localStorage.getItem("myOrders");
        if (myOrders) {
            setMyOrders(JSON.parse(myOrders));
        }
    }, []);

    const handleDeleteOrder = async (id) => {
        await fetch(process.env.NEXT_PUBLIC_URL_API + "/api/order/" + id, {
            method: "DELETE",
        });
        const orders = myOrders.filter((myOrder) => myOrder._id != id);
        localStorage.setItem("myOrders", JSON.stringify(orders));
        setMyOrders(orders);
    };

    return (
        <>
            <div
                className={showSidebar ? "offcanvas show-offcanvas" : "offcanvas"}
                onClick={() => {
                    setShowSidebar(!showSidebar);
                }}
            ></div>
            <div className="bar">
                <a
                    onClick={() => {
                        setShowSidebar(!showSidebar);
                    }}
                >
                    Ver mis pedidos
                </a>
                <div className={showSidebar ? "sidebar show-sidebar" : "sidebar"}>
                    <button
                        onClick={() => {
                            setShowSidebar(!showSidebar);
                        }}
                        className="btn"
                    >
                        &#10540;
                    </button>
                    <h1>Mis pedidos</h1>
                    <div className="myOrders">
                        {myOrders &&
                            myOrders.map(({ _id, table, menus, total }) => (
                                <div key={_id} className="myOrder">
                                    <h3>Mesa {table}</h3>
                                    {menus.map(({ name, quantity, price }, index) => (
                                        <div key={index}>
                                            {name} x {quantity} - $ {price}
                                        </div>
                                    ))}
                                    <h3>$ {total}</h3>
                                    <a
                                        onClick={() => {
                                            handleDeleteOrder(_id);
                                        }}
                                        className="btn"
                                    >
                                        Cancelar
                                    </a>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Cart;
