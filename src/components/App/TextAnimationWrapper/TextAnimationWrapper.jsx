import React, { useState, useEffect } from "react";
import { TypeAnimation } from 'react-type-animation';

/**
 * React Function Component wraps TextAnimation library.
 * @param {Array} textSourceArray - An array of text to be animated.
 * @param {Function} textStartCallback - Function called before a line of text start.
 * @param {Function} textStopCallback - Function called after a line of text ends.
 * @param {Function} completionCallback - Function called when type animation is completed.
 * @returns {JSX.Element} - A React Component instance.
 */
const TextAnimationWrapper = ({ textSourceArray, textStartCallback, textStopCallback, completionCallback }) => {
    const [animationComponent, setAnimationComponent] = useState();

    //Because TypeAnimation is memoized, changing sequence state does not cause a rerender. Making TypeAnimation null for a frame forces rerender. 
    useEffect(() => {
        setAnimationComponent(null);
    }, [textSourceArray]);

    useEffect(() => {
        if (animationComponent == null) {
            setAnimationComponent(<TypeAnimation wrapper="span" style={{ whiteSpace: "pre-line" }} sequence={prepTextForAnimation(textSourceArray)} />);
        }
    }, [animationComponent]);

    const animationDelay = 500;
    const prepTextForAnimation = (array) => {
        const newArray = [];
        if (array.length != 0) {
            let concatString = '';
            array.forEach(e => {
                if (e != '' && e != ':)' & e != ':):)') {
                    newArray.push(textStartCallback)
                }
                concatString = concatString.concat(e, '\n');
                newArray.push(concatString)
                newArray.push(textStopCallback)
                newArray.push(animationDelay)
            });
            newArray.push(completionCallback);
        }
        return newArray;
    };

    return (
        <div className="TextAnimationWrapper">
            {animationComponent}
        </div >
    )
}

export default TextAnimationWrapper;