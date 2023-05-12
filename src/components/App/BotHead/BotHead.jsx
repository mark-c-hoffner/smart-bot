import React, { useState } from "react";
import "./head-layout.css"

import BotEyes from "./BotEyes";
import BotMouth from "./BotMouth";
import headSrc from "../../../assets/images/bot/head-empty.png";

/**
 * React Function Component displays and animates the smart-bot image.
 * @param {Boolean} isAnimatingMouth - Boolean telling component to animate mouth.
 * @param {Function} bootupCompletionCallback - Called when bootup animation is complete.
 * @returns {JSX.Element} - A React Component instance.
 */
const BotHead = ({ isAnimatingMouth, bootupCompletionCallback }) => {
    const [visible, setVisible] = useState(false);

    const handleImageLoad = () => {
        setVisible(true);
    };

    return (
        <div
            data-testid="grid-container"
            className={['grid-container', (visible) ? 'visible' : 'notVisible'].join(' ')}
        >
            <div className="grid-layout">
                <BotEyes bootupCompletionCallback={bootupCompletionCallback} />
                <BotMouth isAnimatingMouth={isAnimatingMouth} />
            </div>
            <img data-testid="head-image" className="bot" onLoad={handleImageLoad} src={headSrc} />
        </div >
    )
}

export default BotHead;