import React from "react";
import { useState, useEffect } from "react";
import { TypeAnimation } from 'react-type-animation';

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

/**
 * React Function Component wraps TextAnimation library.
 * @param {Array} textSourceArray - An array of text to be animated.
 * @returns {JSX.Element} - A React Component instance.
 */
const TextAnimationWrapper = ({ textSourceArray }) => {
    const [animationComponent, setAnimationComponent] = useState(<TypeAnimation wrapper="span" style={{ whiteSpace: "pre-line" }} sequence={prepTextForAnimation(textSourceArray)} />);

    //Because TypeAnimation is memoized, changing sequence state does not cause a rerender. Making TypeAnimation null for a frame forces rerender. 
    useEffect(() => {
        setAnimationComponent(null);
    }, [textSourceArray]);

    useEffect(() => {
        if (animationComponent == null) {
            setAnimationComponent(<TypeAnimation wrapper="span" style={{ whiteSpace: "pre-line" }} sequence={prepTextForAnimation(textSourceArray)} />);
        }
    }, [animationComponent]);

    return (
        <div className="TextAnimationWrapper">
            {animationComponent}
        </div >
    )
}

export default TextAnimationWrapper;