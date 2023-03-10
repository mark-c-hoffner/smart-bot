import React from "react";

/**
 * React Function Component displays a smart-bot assertion and user response options.
 * @param {Object} imageItem - The picture item for the assertion.
 * @param {Object} colorItem - The color item for the assertion.
 * @param {Function} handleWrong - Function called when user prompts wrong.
 * @param {Function} handleCorrect - Function called when user prompts correct.
 * @returns {JSX.Element} - A React Component instance.
 */
const AssertionPrompt = ({ imageItem, colorItem, handleWrong, handleCorrect }) => {
    return (
        <div>
            <h2>{`The ${imageItem.item} is the color ${colorItem.name}. :)`}</h2>
            <button onClick={() => handleWrong(imageItem, colorItem)}>Wrong!</button>
            <button onClick={() => handleCorrect(imageItem, colorItem)}>That's right!</button>
        </div>
    );
};

export default AssertionPrompt;