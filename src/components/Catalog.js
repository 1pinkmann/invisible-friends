import { tokens } from './../video/tokens';

export default function Catalog() {

    return (
        <div className="catalog">
            <ul className="catalog__list">
                {tokens.map((item, index) => {
                    return index < 5 && (
                        <li className="catalog__item" key={index}>
                            <video autoPlay={true} loop={true} muted={true} playsInline={true} className="catalog__video">
                                <source src={item} type="video/mp4" />
                            </video>
                        </li>
                    );
                })}
            </ul>
            <ul className="catalog__list catalog__list--v2 container">
                {tokens.map((item, index) => {
                    return ((index >= 5) && (index < 9)) && (
                        <li className="catalog__item" key={index}>
                            <video autoPlay={true} loop={true} muted={true} playsInline={true} className="catalog__video">
                                <source src={item} type="video/mp4" />
                            </video>
                        </li>
                    );
                })}
            </ul>
            <ul className="catalog__list">
                {tokens.map((item, index) => {
                    return index >= 9 && (
                        <li className="catalog__item" key={index}>
                            <video autoPlay={true} loop={true} muted={true} playsInline={true} className="catalog__video">
                                <source src={item} type="video/mp4" />
                            </video>
                        </li>
                    );
                })}
            </ul>
            <h2 className="catalog__info container">THESE ARE PREVIEWS, NOT ACTUAL TOKENS. MORE ON TWITTER.</h2>
        </div>
    )
}
