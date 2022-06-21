import React, { useEffect, useState } from "react";
import CreateProduct from "../components/CreateProduct.js";
import HeadComponent from "../components/Head.js";
import Product from "../components/product.js";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image"
// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TWITTER_HANDLE2 = "theartintheraw";
const TWITTER_LINK2 = `https://twitter.com/${TWITTER_HANDLE2}`;

const App = () => {
    const { publicKey } = useWallet();
    const isOwner = (publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY
        : false);
    const [creating, setCreating] = useState(false);
    const [products, setProducts] = useState([]);

    const renderNotConnectedContainer = () => (
        <div>
            <Image
                src="https://ghostlifeclub.mypinata.cloud/ipfs/QmSj9GspiAg2mVgkDxxSqdMEuQWwt1v6DWH68BMjeTQRNr/"
                alt="glc city"
            />

            <div className="button-container">
                <WalletMultiButton className="cta-button connect-wallet-button" />
            </div>
        </div>
    );

    useEffect(() => {
        if (publicKey) {
            fetch(`/api/fetchProducts`)
                .then((response) => response.json())
                .then((data) => {
                    setProducts(data);
                    console.log("Products", data);
                });
        }
    }, [publicKey]);

    const renderItemBuyContainer = () => (
        <div className="products-container">
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    );

    return (
        <div className="App">
            <HeadComponent />
            <div className="container">
                <header className="header-container">
                    <p className="header"> Ghostlife Solana Pay Store</p>
                    <p className="sub-text">
                        The Store by Ghostlife Club that you can use with Sol
                    </p>

                    {isOwner && (
                        <button
                            className="create-product-button"
                            onClick={() => setCreating(!creating)}>
                            {creating ? "Close" : "Create Product"}
                        </button>
                    )}
                </header>

                <main>
                    {creating && <CreateProduct />}
                    {publicKey
                        ? renderItemBuyContainer()
                        : renderNotConnectedContainer()}
                </main>

                <div className="footer-container">
                    <a href={TWITTER_LINK} target="_blank" rel="noReferrer">
                        <Image
                            alt="Twitter Logo"
                            className="twitter-logo"
                            src="twitter-logo.svg"
                        />
                    </a>
                    <a
                        className="footer-text"
                        href={TWITTER_LINK}
                        target="_blank"
                        rel="noReferrer">
                        {`built on @${TWITTER_HANDLE}`}
                    </a>
                    {"\n"}
                    <a href={TWITTER_LINK2} target="_blank" rel="noReferrer">
                        <Image
                            alt="Twitter Logo"
                            className="twitter-logo"
                            src="twitter-logo.svg"
                        />
                    </a>
                    <a
                        className="footer-text"
                        href={TWITTER_LINK2}
                        target="_blank"
                        rel="noReferrer">{`built by @${TWITTER_HANDLE2}`}</a>
                </div>
            </div>
        </div>
    );
};

export default App;
