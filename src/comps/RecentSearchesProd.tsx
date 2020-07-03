import React from "react";
import RecentSearchesList from "./RecentSearchesList";

export default function RecentSearchesProd() {
    return <div className="product__suggestion">
        <div className="product__suggestion-title">Recently viewed products</div>
        <div className="product__suggestion-content">
            <RecentSearchesList/>
        </div>
    </div>
}