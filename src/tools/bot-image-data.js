
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