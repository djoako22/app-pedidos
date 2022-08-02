import Head from "next/head";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Pedidos</title>
                <meta name="description" content="Pedidos" />
            </Head>

            <main align="center">
                <Link href="/local">
                    <a>Ir al local</a>
                </Link>
            </main>
        </div>
    );
}
