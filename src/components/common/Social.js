import Twitter from './../../Icons/Twitter';
import Instagram from './../../Icons/Instagram';
import Discord from './../../Icons/Discord';

export default function Social({ className }) {
    return (
        <ul className={"social " + (className ? className : "")}>
            <li className="social__item">
                <a href="/" className="social__link">
                    <Twitter className="social__icon" />
                </a>
            </li>
            <li className="social__item">
                <a href="/" className="social__link">
                    <Instagram className="social__icon" />
                </a>
            </li>
            <li className="social__item">
                <a href="/" className="social__link">
                    <Discord className="social__icon" />
                </a>
            </li>
        </ul>
    )
}
