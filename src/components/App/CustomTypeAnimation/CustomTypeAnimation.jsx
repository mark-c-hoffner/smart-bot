import React, { useState, useEffect, useRef } from "react";
import "./custom-type-animation.css";

/**
 * React Function Component wraps TextAnimation library.
 * @param {Array} sequence - A sequential array of type animation text and actions.
 * @param {Boolean} shouldSkip - If the typing animation should be skipped.
 * @param {Number} delayBetweenTyping - How long to wait between individual text displays.
 * @param {Function} doScrollToBottom - Function that scrolls text container to the bottom.
 * @returns {JSX.Element} - A React Component instance.
 */
const CustomTypeAnimation = ({ sequence, shouldSkip, delayBetweenTyping, doScrollToBottom }) => {
    const [displayedContent, setDisplayedContent] = useState("");
    const [currentText, setCurrentText] = useState(null);
    const [sequenceIndex, setSequenceIndex] = useState(null);
    const [textIndex, setTextIndex] = useState(null);
    const [doSkip, setDoSkip] = useState(true);

    const timeoutRef = useRef(null);
    const stopRunningTimeout = () => {
        if (timeoutRef.current != null) {
            clearTimeout(timeoutRef.current);
        };
    };

    useEffect(() => {
        return stopRunningTimeout;
    }, [])

    useEffect(() => {
        if (shouldSkip && sequence != null) {
            stopRunningTimeout();
            let concatString = '';
            sequence.forEach(e => {
                if (typeof e === "string") {
                    concatString = concatString.concat('', e);
                }
            });
            setTextIndex(null);
            setCurrentText(null);
            setDoSkip(true);
            setDisplayedContent(concatString);
            setSequenceIndex(null);
        }
    }, [shouldSkip]);

    useEffect(() => {
        if (sequence != null && sequence.length > 0) {
            setDoSkip(false);
            setDisplayedContent("");
            setSequenceIndex(0);
        };
    }, [sequence]);

    useEffect(() => {
        if (!doSkip && sequence != null && sequence.length > 0 && sequenceIndex != null) {
            const currentSequenceItem = sequence[sequenceIndex];
            switch (typeof currentSequenceItem) {
                case "string": {
                    setCurrentText(currentSequenceItem);
                    break;
                }
                case "number": {
                    timeoutRef.current = setTimeout(moveToNextSequence, currentSequenceItem);
                    break;
                }
                case "function": {
                    currentSequenceItem();
                    moveToNextSequence();
                    break;
                }
                default: {
                    console.error(`TypeAnimation sequence type ${typeof currentSequenceItem} at position ${sequenceIndex} not supported. Ignoring.`);
                    moveToNextSequence();
                }
            }
        }
    }, [sequenceIndex]);

    useEffect(() => {
        if (currentText != null) {
            setTextIndex(0);
            timeoutRef.current = setTimeout(iterateTextIndex, delayBetweenTyping);
        }
    }, [currentText]);

    const moveToNextSequence = () => {
        setCurrentText(null);
        setSequenceIndex((i) => {
            if (i >= sequence.length - 1) {
                return i;
            }
            return i + 1;
        });
    }

    const iterateTextIndex = () => {
        setTextIndex((i) => {
            if (i >= currentText.length - 1) {
                moveToNextSequence();
                return null;
            }
            timeoutRef.current = setTimeout(iterateTextIndex, delayBetweenTyping);
            return i + 1;
        });
    }

    useEffect(() => {
        if (currentText != null && textIndex != null) {
            setDisplayedContent((displayedContent) => displayedContent + currentText[textIndex]);
        }
    }, [textIndex]);

    useEffect(() => {
        doScrollToBottom();
    }, [displayedContent]);

    return (
        <pre className="type-writer">{displayedContent}</pre>
    );
}

export default CustomTypeAnimation;