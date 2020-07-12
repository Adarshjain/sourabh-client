import React from "react";
import '../css/footerContact.scss'
import Icon from "react-eva-icons";

export default function FooterContact() {
    return <div className='footer-contact'>
        <div>
            <div className='footer-contact__address'>
                <div className='footer-contact__address-title'>Contact Us</div>
                <div className='footer-contact__address-info'>3 1042, Nagari St,</div>
                <div className='footer-contact__address-info'>Srikalahasti,</div>
                <div className='footer-contact__address-info'>Andhra Pradesh - 517644</div>
                <div className='footer-contact__address-info'>
                    <Icon name="phone-call-outline" fill='#212121' size="medium"/>
                    &nbsp;Landline:&nbsp;&nbsp;
                    <a className='footer-contact__address-phone' href='tel:08578-222073'>08578-222073</a>
                </div>
            </div>
            <div className='flex flex-dr footer-contact__social'>
                {/*<div>Follow us on</div>*/}
                {/*<div className='flex flex-dr'>*/}
                {/*<a href="https://www.facebook.com" rel="noopener noreferrer"*/}
                {/*   target="_blank" className="footer-contact__social-item">*/}
                {/*    <img loading='lazy' className="footer-contact__social-image" alt="fb"*/}
                {/*         src="https://img.icons8.com/ios/48/000000/facebook-new.png"/>*/}
                {/*</a>*/}
                {/*<a className="footer-contact__social-item" href="https://www.twitter.com" rel="noopener noreferrer" target="_blank">*/}
                {/*    <img loading='lazy' className="footer-contact__social-image" alt="twitter"*/}
                {/*         src="https://img.icons8.com/ios/48/000000/twitter.png"/>*/}
                {/*</a>*/}
                <a className="footer-contact__social-item" href="https://wa.me/918838216695" rel="noopener noreferrer"
                   target="_blank">
                    <img loading='lazy' className="footer-contact__social-image" alt="whatsapp"
                         src="https://img.icons8.com/ios/48/000000/whatsapp.png"/>
                    <div>
                        <div>Enquire about our products on WhatsApp</div>
                        <div>
                            +918838216695
                        </div>
                    </div>
                </a>
                {/*</div>*/}
            </div>
        </div>
        <a href='https://goo.gl/maps/M5xrgc2gusHgEdHX6' className='footer-contact__loc-link' rel="noopener noreferrer" target="_blank">
            <img loading='lazy' className="footer-contact__location" alt="Shop location"
                 src="/assets/images/location.png"/>
        </a>
    </div>
}