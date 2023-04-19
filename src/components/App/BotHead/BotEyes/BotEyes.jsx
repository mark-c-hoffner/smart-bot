import React, { useEffect, useState } from "react";

import { getLookAroundArray, getOpen, getClosed } from "../../../../tools/bot-image-data";
import random from "../../../../tools/random";

/**
 * React Function Component displays and animates the bot eyes.
 * @returns {JSX.Element} - A React Component instance.
 */
const BotEyes = () => {
    const ANIMATION_TIME = 3000;
    const ANIMATION_OFFSET_RANGE = 500;
    const BLINK_LENGTH = 288;
    const STARTUP_DELAY = 1500;
    const STARTUP_BLINK_COUNT = 5;
    
    let lastBlink;
    let lastEyeLook;
    let animationTimeout;
    let blinkTimeout;
    let startupTimeout;
    let startupLoops = 0;

    const [eyeSource, setEyeSource] = useState(getClosed());

    useEffect(() => {
        lastEyeLook = getOpen();
        startupTimeout = setTimeout(doStartup, STARTUP_DELAY);
        animationTimeout = setTimeout(doAnimation, ANIMATION_TIME + STARTUP_DELAY);
        return () => {
            clearTimeout(startupTimeout);
            clearTimeout(animationTimeout);
            clearTimeout(blinkTimeout);
        };
    }, []);

    const doStartup = () => {
        if (startupLoops < STARTUP_BLINK_COUNT) {
            lastBlink = Date.now();
            setEyeSource(getClosed());
            startupTimeout = setTimeout(doStartup, BLINK_LENGTH / 1.5);
            blinkTimeout = setTimeout(clearBlink, BLINK_LENGTH / 3);
        };
        startupLoops++;
    };

    const doAnimation = () => {
        if (!checkBlink()) {
            const botImageData = getLookAroundArray();
            lastEyeLook = botImageData[random(0, botImageData.length - 1)];
            setEyeSource(lastEyeLook);
        };
        animationTimeout = setTimeout(doAnimation, ANIMATION_TIME + random(-ANIMATION_OFFSET_RANGE, ANIMATION_OFFSET_RANGE));
    };

    const checkBlink = () => {
        const currentTime = Date.now();
        if (currentTime - lastBlink > 5000) {
            lastBlink = currentTime;
            setEyeSource(getClosed());
            blinkTimeout = setTimeout(clearBlink, BLINK_LENGTH);
            return true;
        }
        return false;
    };

    const clearBlink = () => {
        setEyeSource(lastEyeLook);
    };

    return (
        <>
            <img data-testid="left-eye" className={"leftEye"} src={eyeSource.left} />
            <img data-testid="right-eye" className={"rightEye"} src={eyeSource.right} />
        </>
    );
};

export default BotEyes;