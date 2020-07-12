import React from "react";
import '../css/cardAccepted.scss'

export default function CardsAccepted() {
    return <div className='cards-accepted'>
        <div className='cards-accepted__text'>We accept all cards</div>
        <div className='cards-accepted__logo-container'>
            <img className='cards-accepted__logo' src="/assets/images/american-express.png" alt="american card"/>
            <img className='cards-accepted__logo' src="/assets/images/mastercard.png" alt="mastercard card"/>
            <img className='cards-accepted__logo' src="/assets/images/visa.png" alt="visa card"/>
        </div>
    </div>
}