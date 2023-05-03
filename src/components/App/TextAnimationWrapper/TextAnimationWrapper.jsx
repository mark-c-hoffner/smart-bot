import React, { useState, useEffect } from "react";
import CustomTypeAnimation from "../CustomTypeAnimation";

/**
 * React Function Component wraps TextAnimation library.
 * @param {Array} textSourceArray - An array of text to be animated.
 * @param {Function} textStartCallback - Function called before a line of text start.
 * @param {Function} textStopCallback - Function called after a line of text ends.
 * @param {Function} completionCallback - Function called when type animation is completed.
 * @param {Boolean} isSkippable - Whether the typing animation is currently in a skippable state.
 * @returns {JSX.Element} - A React Component instance.
 */
const TextAnimationWrapper = ({ textSourceArray, textStartCallback, textStopCallback, completionCallback, isSkippable }) => {
    const [editedArray, setEditedArray] = useState(null);
    const [shouldSkip, setShouldSkip] = useState(false);

    useEffect(() => {
        setShouldSkip(false);
    }, [isSkippable]);

    useEffect(() => {
        setEditedArray(prepTextForAnimation(textSourceArray))
    }, [textSourceArray]);

    const triggerTypingSkip = () => {
        if (isSkippable) {
            setShouldSkip(true);
            textStopCallback();
            completionCallback();
        };
    };

    const defaultNewLineDelay = 500;

    const prepTextForAnimation = (array) => {
        const newArray = [];
        if (array.length != 0) {
            array.forEach(e => {
                if (e != '' && e != ':)' & e != ':):)') {
                    newArray.push(textStartCallback)
                }
                newArray.push(e + '\n')
                newArray.push(textStopCallback)
                newArray.push(defaultNewLineDelay)
            });
            newArray.push(completionCallback);
        };
        return newArray;
    };

    return (
        <div
            className="TextAnimationWrapper"
            data-testid="text-animation-wrapper"
            onClick={triggerTypingSkip}
            style={{
                minHeight: "10em",
                cursor: isSkippable ? "progress" : "default",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                userSelect: "none",
            }}
        >
            <CustomTypeAnimation sequence={editedArray} shouldSkip={shouldSkip} delayBetweenTyping={40} />
        </div >
    );
};

export default TextAnimationWrapper;