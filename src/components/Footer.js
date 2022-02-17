import logo from "../images/svg/logo.svg";
import Social from "./common/Social";

export default function Footer() {
    return (
        <div className="footer">
            <a href="/" className="footer__link">
                <img src={logo} alt="Logo" className="footer__link-icon" />
            </a>
            <Social className="footer__social" />
        </div>
    )
}
