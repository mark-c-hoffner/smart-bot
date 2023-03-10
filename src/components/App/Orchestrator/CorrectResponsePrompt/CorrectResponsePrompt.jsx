import React from "react";

/**
 * React Function Component 
 * @returns {JSX.Element} - A React Component instance.
 */
const CorrectResponsePrompt = ({ pictureItem, colorItem, getAnAssertion }) => {
    return (
        <div>
            <h2>
                {`HA! :):) I always knew that the ${pictureItem.item} was the color ${colorItem.name}. :):)`}
            </h2>
            <button onClick={() => getAnAssertion(colorItem)}>Want to know something else?</button>
        </div>
    );
};

export default CorrectResponsePrompt;