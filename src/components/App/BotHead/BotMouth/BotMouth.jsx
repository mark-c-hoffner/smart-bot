import React, { useEffect, useState } from "react";

import { getSpeechArray, getMouthOpen } from "../../../../tools/bot-image-data";
import random from "../../../../tools/random";

/**
 * React Function Component displays and animates the bot mouth.
 * @param {Boolean} isAnimatingMouth - Boolean telling component to animate mouth.
 * @returns {JSX.Element} - A React Component instance.
 */
const BotEyes = ({ isAnimatingMouth }) => {
    const ANIMATION_TIME = 175;
    const ANIMATION_OFFSET_RANGE = 25;

    let speechTimeout;
    let lastSpeechImage;

    const [mouthSrc, setMouthSource] = useState(getMouthOpen());

    useEffect(() => {
        if (isAnimatingMouth) {
            lastSpeechImage = mouthSrc;
            doSpeechAnimation();
        } else {
            clearTimeout(speechTimeout);
        }
        return () => clearTimeout(speechTimeout);
    }, [isAnimatingMouth]);

    const doSpeechAnimation = () => {
        const speechArray = [...getSpeechArray()];
        const i = speechArray.indexOf(lastSpeechImage);
        speechArray.splice(i, 1);
        const imageNum = random(0, speechArray.length - 1);
        const speechImage = speechArray[imageNum];
        setMouthSource(speechImage);
        lastSpeechImage = speechImage;
        speechTimeout = setTimeout(doSpeechAnimation, ANIMATION_TIME + random(-ANIMATION_OFFSET_RANGE, ANIMATION_OFFSET_RANGE));
    };

    return (
        <>
            <img data-testid="mouth" className={"mouth"} src={mouthSrc} />
        </>
    );
};

export default BotEyes;