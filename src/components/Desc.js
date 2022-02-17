import React from 'react'
import Twitter from '../Icons/Twitter';
import Logo from './../Icons/Logo';
import rcc from "../images/desc/rcc.png";

export default function Desc() {
  return (
    <div className="desc">
        <div className="desc__column">
            <Logo className="desc__icon" />
            <h2 className="desc__title">Markus <br/> Magnusson</h2>
            <p className="desc__text">INVISIBLE FRIENDS are thought up, drawn and animated by this one Swedish dude.</p>
            <a href="/" className="desc__link">
                <Twitter className="desc__link-icon" />
            </a>
        </div>
        <div className="desc__column">
            <img src={rcc} alt="rcc" className="desc__icon desc__icon--2" />
            <h2 className="desc__title">Random Character <br/> Collective</h2>
            <p className="desc__text">INVISIBLE FRIENDS are a proud member of Random Character Collective. The internet's friendliest animator collective.</p>
            <a href="/" className="desc__link">
                <Twitter className="desc__link-icon" />
            </a>
        </div>
    </div>
  )
}
