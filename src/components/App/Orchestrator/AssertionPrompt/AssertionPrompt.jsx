import React from "react";

/**
 * React Function Component displays a smart-bot assertion and user response options.
 * @param {Object} pictureItem - The picture item for the assertion.
 * @param {Object} colorItem - The color item for the assertion.
 * @param {Function} handleWrong - Function called when user prompts wrong.
 * @param {Function} handleCorrect - Function called when user prompts correct.
 * @returns {JSX.Element} - A React Component instance.
 */
const AssertionPrompt = ({ pictureItem, colorItem, handleWrong, handleCorrect }) => {
    return (
        <div>
            <h2>{`The ${pictureItem.item} is the color ${colorItem.name}. :)`}</h2>
            <button onClick={() => handleWrong(pictureItem, colorItem)}>Wrong!</button>
            <button onClick={() => handleCorrect(pictureItem, colorItem)}>That's right!</button>
        </div>
    );
};

export default AssertionPrompt;