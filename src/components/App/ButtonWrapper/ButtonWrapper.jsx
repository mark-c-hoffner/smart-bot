import React from "react";
import "./button-wrapper.css";

/**
 * React Function Component wraps a number of buttons.
 * @param {Array} buttonDefinitions - An array of objects that define buttons.
 * @returns {JSX.Element} - A React Component instance.
 */
const ButtonWrapper = ({ buttonDefinitions }) => {

    const getButtons = () => {
        return buttonDefinitions.map((e, index) =>
            <button className="convo-choice" key={index} onClick={e.action}>{e.text}</button>
        )
    };

    return (
        <div className="buttonWrapper">{getButtons()}</div>
    );
};

export default ButtonWrapper;