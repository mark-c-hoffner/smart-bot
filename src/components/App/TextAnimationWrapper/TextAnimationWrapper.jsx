import React, { useState, useEffect, useRef } from "react";
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
    const scrollRef = useRef(null);

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

    const doScrollToBottom = () => {
        /* istanbul ignore else */
        if (scrollRef.current) {
            console.log("scroll")
            scrollRef.current.scrollIntoView({ behavior: "instant", block: "nearest", inline: "nearest" });
        }
    };

    return (
        <div
            className="textContainer"
            data-testid="text-animation-wrapper"
            onClick={triggerTypingSkip}
            style={{
                cursor: isSkippable ? "progress" : "default",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                userSelect: "none",
                textAlign: "left"
            }}
        >
            <CustomTypeAnimation sequence={editedArray} shouldSkip={shouldSkip} delayBetweenTyping={40} doScrollToBottom={doScrollToBottom} />
            <div className="scrollBuffer"/>
            <div className="scrollTarget" ref={scrollRef} />
        </div >
    );
};

export default TextAnimationWrapper;