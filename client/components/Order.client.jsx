import { useEffect, useState, useContext } from "react";
import AppContext from "../contexts/AppContext";

function OrderClient() {
    const { order, setOrder, setMyOrders } = useContext(AppContext);

    const [showOrder, setShowOrder] = useState(false);

    useEffect(() => {
        if (order.menus != "") {
            setShowOrder(true);
        }
    }, [order]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (order.name == "" || order.phone == "" || order.table == "" || order.menus == []) {
            alert("No se olvide de llenar todos los campos");
            return;
        }
        const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });
        const data = await res.json();

        const myOrders = localStorage.getItem("myOrders");
        if (myOrders) {
            const orders = JSON.parse(myOrders);
            orders.push(data.order);
            localStorage.setItem("myOrders", JSON.stringify(orders));
        } else {
            localStorage.setItem("myOrders", JSON.stringify([data.order]));
        }
        setMyOrders(JSON.parse(localStorage.getItem("myOrders")));
        setOrder({ ...order, menus: [], total: 0, duration: 0 });
        setShowOrder(false);
    };

    return (
        <>
            <div>
                <h1>Cliente: </h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        required
                        onChange={(e) => {
                            setOrder({ ...order, name: e.target.value });
                        }}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Teléfono"
                        required
                        onChange={(e) => {
                            setOrder({ ...order, phone: e.target.value });
                        }}
                    />
                    <input
                        type="text"
                        name="table"
                        placeholder="Mesa"
                        required
                        onChange={(e) => {
                            setOrder({ ...order, table: e.target.value });
                        }}
                    />
                    <div className="btns">
                        <button className="btn btn-1" type="submit">
                            <span className="edge"></span>
                            <span className="front text">Hacer pedido</span>
                        </button>
                        <button
                            className="btn btn-2"
                            onClick={(e) => {
                                e.preventDefault();
                                setOrder({ ...order, menus: [], total: 0, duration: 0 });
                                setShowOrder(false);
                            }}
                        >
                            <span className="edge"></span>
                            <span className="front text">Borrar</span>
                        </button>
                    </div>
                </form>
                {showOrder && (
                    <div className="order">
                        {order.menus.map(({ name, quantity, price }, index) => (
                            <div key={index}>
                                {name} x {quantity} - $ {price}
                            </div>
                        ))}
                        <h3>Total: {order.total}</h3>
                        <i>Duración apróximada: {order.duration} minutos</i>
                    </div>
                )}
            </div>
        </>
    );
}
export default OrderClient;
