import React, { useState } from "react";
import "./head-layout.css"

import BotEyes from "./BotEyes";
import BotMouth from "./BotMouth";
import headSrc from "../../../assets/images/bot/head-empty.png";

/**
 * React Function Component displays and animates the smart-bot image.
 * @param {Boolean} isAnimatingMouth - Boolean telling component to animate mouth.
 * @returns {JSX.Element} - A React Component instance.
 */
const BotHead = ({ isAnimatingMouth }) => {
    const [containerSize, setContainerSize] = useState({ height: 0, width: 0 });
    const [visible, setVisible] = useState(false);

    const handleImageLoad = ({ target }) => {
        setContainerSize({
            height: target.height,
            width: target.width,
        });
        setVisible(true);
    };

    return (
        <div
            data-testid="grid-container"
            className={['grid-container', (visible) ? 'visible' : 'notVisible'].join(' ')}
            style={{
                position: "relative",
                maxHeight: containerSize.height,
                maxWidth: containerSize.width
            }}
        >
            <div className="grid-layout">
                <BotEyes />
                <BotMouth isAnimatingMouth={isAnimatingMouth} />
            </div>
            <img data-testid="head-image" onLoad={handleImageLoad} src={headSrc} />
        </div >
    )
}

export default BotHead;