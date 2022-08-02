import { useEffect, useState } from "react";

function OrderAdmin({ setErrorMessage }) {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            getOrders();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getOrders = async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_URL_API + "/api/orders", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await res.json();
        if (data.error) {
            setErrorMessage(data.error);
        } else {
            setOrders(data.orders);
        }
    };

    const handleUpdateOrder = async (id) => {
        await fetch(process.env.NEXT_PUBLIC_URL_API + "/api/order/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ status: "COMPLETED" }),
        });
    };

    const handleDeleteOrder = async (id) => {
        await fetch(process.env.NEXT_PUBLIC_URL_API + "/api/order/" + id, {
            method: "DELETE",
        });
    };

    return (
        <>
            <div>
                <h1>Pedidos</h1>
                <div className="table">
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Mesa</th>
                                <th>Pedido</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders &&
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order.name}</td>
                                        <td>{order.phone}</td>
                                        <td>{order.table}</td>
                                        <td>
                                            {order.menus.map(({ name, quantity, price }, index) => (
                                                <div key={index}>
                                                    {name} x {quantity} - {price}
                                                    <br />
                                                </div>
                                            ))}
                                        </td>
                                        <td>{order.total}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <a
                                                onClick={() => {
                                                    handleUpdateOrder(order._id);
                                                }}
                                            >
                                                Listo
                                            </a>
                                            {" - "}
                                            <a
                                                onClick={() => {
                                                    handleDeleteOrder(order._id);
                                                }}
                                            >
                                                Cancelar
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default OrderAdmin;
