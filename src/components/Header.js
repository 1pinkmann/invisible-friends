import Goto from './../Icons/Goto';
import Logo from './../Icons/Logo';
import Social from './common/Social';
import CustomMarquee from './common/CustomMarquee';

export default function Header() {


    return (
        <header className="header">
            <CustomMarquee />
            <div className="header__wrapper">
                <a href="/" className="header__link">
                    <span>Shop</span>
                    <Goto className="header__link-icon" />
                </a>
                <a href="/" className="header__logo">
                    <Logo className="header__logo-icon" />
                </a>
                <Social />
            </div>
        </header >
    )
}