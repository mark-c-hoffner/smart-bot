import React, { useState, useEffect } from "react";
import "./custom-type-animation.css";

/**
 * React Function Component wraps TextAnimation library.
 * @param {Array} sequence - A sequential array of type animation text and actions.
 * @param {Boolean} shouldSkip - If the typing animation should be skipped.
 * @param {Number} delayBetweenTyping - How long to wait between individual text displays.
 * @returns {JSX.Element} - A React Component instance.
 */
const CustomTypeAnimation = ({ sequence, shouldSkip, delayBetweenTyping }) => {
    const [displayedContent, setDisplayedContent] = useState("");
    const [currentText, setCurrentText] = useState(null);
    const [sequenceIndex, setSequenceIndex] = useState(null);
    const [textIndex, setTextIndex] = useState(null);
    const [doSkip, setDoSkip] = useState(true);

    let runningTimeout = null;

    useEffect(() => {
        return () => clearTimeout(runningTimeout);
    }, [])

    useEffect(() => {
        if (shouldSkip && sequence != null) {
            let concatString = '';
            sequence.forEach(e => {
                if (typeof e === "string") {
                    concatString = concatString.concat('', e);
                }
            });
            setCurrentText(null);
            setDoSkip(true);
            clearTimeout(runningTimeout);
            setDisplayedContent(concatString);
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
                    runningTimeout = setTimeout(moveToNextSequence, currentSequenceItem);
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
            runningTimeout = setTimeout(iterateTextIndex, delayBetweenTyping);
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
            runningTimeout = setTimeout(iterateTextIndex, delayBetweenTyping);
            return i + 1;
        });
    }

    useEffect(() => {
        if (currentText != null && textIndex != null) {
            setDisplayedContent((displayedContent) => displayedContent + currentText[textIndex]);
        }
    }, [textIndex]);

    return (
        <pre className="type-writer">{displayedContent}</pre>
    );
}

export default CustomTypeAnimation;