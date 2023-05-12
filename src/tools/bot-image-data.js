
import leftEyeOpen from "../assets/images/bot/eye-left-open.png";
import leftEyeClose from "../assets/images/bot/eye-left-close.png";
import leftEyeLeft from "../assets/images/bot/eye-left-left.png";
import leftEyeRight from "../assets/images/bot/eye-left-right.png";

import rightEyeOpen from "../assets/images/bot/eye-right-open.png";
import rightEyeClose from "../assets/images/bot/eye-right-close.png";
import rightEyeLeft from "../assets/images/bot/eye-right-left.png";
import rightEyeRight from "../assets/images/bot/eye-right-right.png";

export const getLookAroundArray = () => [
    { left: leftEyeOpen, right: rightEyeOpen },
    { left: leftEyeLeft, right: rightEyeLeft },
    { left: leftEyeRight, right: rightEyeRight }
];

export const getOpen = () => {
    return { left: leftEyeOpen, right: rightEyeOpen };
};

export const getClosed = () => {
    return { left: leftEyeClose, right: rightEyeClose };
};

import mouthOpen from "../assets/images/bot/mouth-open.png";
import mouthOpen2 from "../assets/images/bot/mouth-open2.png";
import mouthOpen3 from "../assets/images/bot/mouth-open3.png";
import mouthOpen4 from "../assets/images/bot/mouth-open4.png";
import mouthOpen5 from "../assets/images/bot/mouth-open5.png";
import mouthClose from "../assets/images/bot/mouth-close.png";

export const getSpeechArray = () => [
    mouthOpen,
    mouthOpen2,
    mouthOpen3,
    mouthOpen4,
    mouthOpen5
];

export const getMouthOpen = () => {
    return mouthOpen;
};

export const getMouthClosed = () => {
    return mouthClose;
};