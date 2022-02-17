import { tokens } from './../images/catalog/tokens';

export default function Catalog() {

    return (
        <div className="catalog">
            <ul className="catalog__list">
                {tokens.map((item, index) => {
                    return index < 5 && (
                        <li className="catalog__item" key={index}>
                            <img src={item} alt="" className="catalog__gif" />
                        </li>
                    );
                })}
            </ul>
            <ul className="catalog__list catalog__list--v2">
                {tokens.map((item, index) => {
                    return ((index >= 5) && (index < 9)) && (
                        <li className="catalog__item" key={index}>
                            <img src={item} alt="" className="catalog__gif" />
                        </li>
                    );
                })}
            </ul>
            <ul className="catalog__list">
                {tokens.map((item, index) => {
                    return index >= 9 && (
                        <li className="catalog__item" key={index}>
                            <img src={item} alt="" className="catalog__gif" />
                        </li>
                    );
                })}
            </ul>
            <h2 className="catalog__info">THESE ARE PREVIEWS, NOT ACTUAL TOKENS. MORE ON TWITTER.</h2>
        </div>
    )
}
