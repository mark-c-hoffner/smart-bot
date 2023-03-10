import React from "react";

/**
 * React Function Component displays correct response and prompt for another assertion
 * @param {Object} imageItem - The picture item for the assertion.
 * @param {Object} colorItem - The color item for the assertion.
 * @param {Function} getAnAssertion - Function called to trigger a new assertion.
 * @returns {JSX.Element} - A React Component instance.
 */
const CorrectResponsePrompt = ({ imageItem, colorItem, getAnAssertion }) => {
    return (
        <div>
            <h2>
                {`HA! :):) I always knew that the ${imageItem.item} was the color ${colorItem.name}. :):)`}
            </h2>
            <button onClick={() => getAnAssertion(colorItem)}>Want to know something else?</button>
        </div>
    );
};

export default CorrectResponsePrompt;