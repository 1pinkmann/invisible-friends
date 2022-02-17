import Header from './components/Header';
import tokensGif from "./images/banner/tokens.gif";
import CustomMarquee from './components/common/CustomMarquee';
import Catalog from './components/Catalog';
import Desc from './components/Desc';
import Footer from './components/Footer';

export default function App() {

    return (
        <>
            <Header />
            <main className="main">
                <div className="banner">
                    <h1 className="banner__title">INVISIBLE <br /> FRIENDS</h1>
                    <img src={tokensGif} alt="Tokens" className="banner__gif" />
                    <div className="banner__minted">
                        <h2 className="banner__minted-value">0/5000</h2>
                        <h6 className="banner__minted-title">MINTED</h6>
                    </div>
                    <button className="button banner__button">Connect wallet</button>
                </div>
                <CustomMarquee direction="left" />
                <Catalog />
                <CustomMarquee>
                    <span>Nice to unsee you ·&nbsp;</span>
                    <span>Nice to unsee you ·&nbsp;</span>
                    <span>Nice to unsee you ·&nbsp;</span>
                    <span>Nice to unsee you ·&nbsp;</span>
                    <span>Nice to unsee you ·&nbsp;</span>
                    <span>Nice to unsee you ·&nbsp;</span>
                    <span>Nice to unsee you ·&nbsp;</span>
                    <span>Nice to unsee you ·&nbsp;</span>
                    <span>Nice to unsee you ·&nbsp;</span>
                    <span>Nice to unsee you ·&nbsp;</span>
                </CustomMarquee>
                <Desc />
            </main>
            <Footer />
        </>
    );
}
