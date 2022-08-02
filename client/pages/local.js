import Head from "next/head";
import Cart from "../components/Cart";
import OrderClient from "../components/Order.client";
import MenuClient from "../components/Menu.client";
import { useState } from "react";
import AppContext from "../contexts/AppContext";

export default function Local() {
    const [order, setOrder] = useState({ menus: [], duration: 0 });
    const [myOrders, setMyOrders] = useState(null);

    return (
        <div>
            <Head>
                <title>Pedidos</title>
                <meta name="description" content="Pedidos" />
            </Head>

            <main className="main">
                <AppContext.Provider value={{ order, setOrder, myOrders, setMyOrders }}>
                    <Cart />
                    <OrderClient />
                    <br />  
                    <MenuClient />
                </AppContext.Provider>
            </main>
        </div>
    );
}
