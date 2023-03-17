import React from "react";

/**
 * React Function Component displays correct response and prompt for another assertion
 * @param {Object} imageItem - The picture item for the assertion.
 * @param {Object} colorItem - The color item for the assertion.
 * @param {Function} getAnAssertion - Function called to trigger a new assertion.
 * @param {String} promptText - Text to display with the prompt.
 * @returns {JSX.Element} - A React Component instance.
 */
const CorrectResponsePrompt = ({ imageItem, colorItem, getAnAssertion, promptText }) => {
    return (
        <div>
            <h2>
                {promptText}
            </h2>
            <button onClick={() => getAnAssertion(colorItem)}>What else do you know?</button>
        </div>
    );
};

export default CorrectResponsePrompt;