import React from "react";
import { TypeAnimation } from 'react-type-animation';

/**
 * React Function Component wraps TextAnimation library.
 * @param {Array} textSourceArray - An array of text to be animated.
 * @returns {JSX.Element} - A React Component instance.
 */
const TextAnimationWrapper = ({ textSourceArray }) => {
    const animationDelay = 500;

    const prepTextForAnimation = (array) => {
        const newArray = [];
        let concatString = '';
        array.forEach(e => {
            concatString = concatString.concat(e, '\n');
            newArray.push(concatString)
            newArray.push(animationDelay)
        });
        return newArray;
    };

    return (
        <div className="TextAnimationWrapper">
            <TypeAnimation wrapper="span" style={{ whiteSpace: "pre-line" }} sequence={prepTextForAnimation(textSourceArray)} />
        </div >
    )
}

export default TextAnimationWrapper;