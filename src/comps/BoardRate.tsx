import React from "react";
import '../css/BoardRate.scss'

export default function BoardRate({boardRate}: { boardRate?: string }) {
    if (!!boardRate) {
        return <div className='board-rate'>
            <div className='board-rate__value'>Today's board rate: Rs. {boardRate}</div>
        </div>
    } else {
        return <></>
    }
}