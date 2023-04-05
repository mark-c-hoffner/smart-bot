import React from "react";

/**
 * React Function Component wraps a number of buttons.
 * @param {Array} buttonDefinitions - An array of objects that define buttons.
 * @returns {JSX.Element} - A React Component instance.
 */
const ButtonWrapper = ({ buttonDefinitions }) => {

    const getButtons = () => {
        return buttonDefinitions.map((e, index) =>
            <button key={index} onClick={e.action}>{e.text}</button>
        )
    };

    return (
        <>{getButtons()}</>
    );
};

export default ButtonWrapper;