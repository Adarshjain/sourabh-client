import React from "react";

export default function Social({id}: { id: string }) {
    const productUrl = window.location.origin + "/product?id=" + id;
    const fbUrl = "https://www.facebook.com/sharer/sharer.php?u=" + window.location.origin + "&text=" + productUrl;
    const twitterUrl = "http://twitter.com/share?text=" + productUrl;
    const whatsappUrl = "whatsapp://send?text=" + productUrl;

    function copyUrl() {
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.value = productUrl;
        input.select();
        input.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alert("Copied the text: " + input.value);
        document.body.removeChild(input);
    }


    return <div className="product__social">
        <div className="product__social-header">Share</div>
        <a href={fbUrl} rel="noopener noreferrer"
           target="_blank" className="product__social-item">
            <img loading='lazy' className="product__social-image" alt="fb"
                 src="https://img.icons8.com/ios/48/000000/facebook-new.png"/>
        </a>
        <a className="product__social-item" href={twitterUrl} rel="noopener noreferrer" target="_blank">
            <img loading='lazy' className="product__social-image" alt="twitter"
                 src="https://img.icons8.com/ios/48/000000/twitter.png"/>
        </a>
        <a className="product__social-item" href={whatsappUrl} rel="noopener noreferrer" target="_blank">
            <img loading='lazy' className="product__social-image" alt="whatsapp"
                 src="https://img.icons8.com/ios/48/000000/whatsapp.png"/>
        </a>
        <div className="product__social-item" onClick={copyUrl}>
            <img loading='lazy' className="product__social-image" alt="copy-url"
                 src="https://img.icons8.com/ios/26/000000/copy.png"/>
        </div>
    </div>
}