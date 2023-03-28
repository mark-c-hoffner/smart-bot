import React from "react";
import TextAnimationWrapper from "../../TextAnimationWrapper";

/**
 * React Function Component displays correct response and prompt for another assertion
 * @param {Object} imageItem - The picture item for the assertion.
 * @param {Object} colorItem - The color item for the assertion.
 * @param {Function} getAnAssertion - Function called to trigger a new assertion.
 * @param {Array} promptText - An array of text to pass to the animator.
 * @returns {JSX.Element} - A React Component instance.
 */
const CorrectResponsePrompt = ({ imageItem, colorItem, getAnAssertion, promptText }) => {
    return (
        <div>
            <TextAnimationWrapper textSourceArray={promptText} />
            <button onClick={() => getAnAssertion(imageItem)}>What else do you know?</button>
        </div>
    );
};

export default CorrectResponsePrompt;