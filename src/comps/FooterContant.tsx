import React from "react";
import '../css/footerContact.scss'

export default function FooterContact() {
    return <div className='footer-contact'>
        <div className='footer-contact__address'>
            <div className='footer-contact__address-title'>Contact Us</div>
            <div className='footer-contact__address-info'>7, Yemen road</div>
            {/*<div className='footer-contact__address-info'>Yemen</div>*/}
            <div className='footer-contact__address-info'>Yemen - 608001</div>
        </div>
        <div className='flex flex-dr footer-contact__social'>
            {/*<div>Follow us on</div>*/}
            {/*<div className='flex flex-dr'>*/}
            <a href="https://www.facebook.com" rel="noopener noreferrer"
               target="_blank" className="footer-contact__social-item">
                <img className="footer-contact__social-image" alt="fb"
                     src="https://img.icons8.com/ios/48/000000/facebook-new.png"/>
            </a>
            <a className="footer-contact__social-item" href="https://www.twitter.com" rel="noopener noreferrer" target="_blank">
                <img className="footer-contact__social-image" alt="twitter"
                     src="https://img.icons8.com/ios/48/000000/twitter.png"/>
            </a>
            <a className="footer-contact__social-item" href="https://www.whatsapp.com" rel="noopener noreferrer" target="_blank">
                <img className="footer-contact__social-image" alt="whatsapp"
                     src="https://img.icons8.com/ios/48/000000/whatsapp.png"/>
            </a>
            {/*</div>*/}
        </div>
    </div>
}