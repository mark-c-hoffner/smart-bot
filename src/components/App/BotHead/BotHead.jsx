import React, { useState } from "react";
import "./head-layout.css"

import headSrc from "../../../assets/images/bot/head-empty.png";
import leftEyeSrc from "../../../assets/images/bot/eye-left-open.png";
import rightEyeSrc from "../../../assets/images/bot/eye-right-open.png";
import mouthSrc from "../../../assets/images/bot/mouth-open.png";

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
                <img className={"leftEye"} src={leftEyeSrc} />
                <img className={"rightEye"} src={rightEyeSrc} />
                <img className={"mouth"} src={mouthSrc} />
            </div>
            <img data-testid="head-image" onLoad={handleImageLoad} src={headSrc} />
        </div >
    )
}

export default BotHead;