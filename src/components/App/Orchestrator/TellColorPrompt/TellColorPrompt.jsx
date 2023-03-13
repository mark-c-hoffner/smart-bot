import React from "react";
import { useState } from "react";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

/**
 * React Function Component displays correct response and prompt for another assertion
 * @param {Object} imageItem - The picture item for the assertion.
 * @param {Object} colorItem - The color item for the assertion.
 * @param {Array} colors - An array of color items.
 * @param {Function} handleColorCorrection - Function called to set the actual color of imageItem.
 * @returns {JSX.Element} - A React Component instance.
 */
const TellColorPrompt = ({ imageItem, colorItem, colors, handleColorCorrection }) => {
    const [wrongString, setWrongString] = useState(`Oh no! :( I'm so sorry. You must be very smart-bot. Would you be able to help me become smart like you? What color is ${imageItem.item}?`);
    const [selectedColorState, setSelectedColorState] = useState(null);

    const handleDropdownChange = (e) => {
        setSelectedColorState(e.value);
    };

    const getDropdownDisplayItems = (data) => {
        const options = [];
        let i = 0;
        data.forEach(e => {
            const obj = { value: e.name, label: e.name };
            options.push(obj);
            i++;
        });
        return options;
    };

    const handleTryAgain = () => {
        setSelectedColorState(null);
        setWrongString(`That's okay! We all make mistakes. :) ha ha. So then what color is ${imageItem.item}?`)
    };

    return (
        <div>
            {(selectedColorState === null) ?
                <>
                    <h2>
                        {wrongString}
                    </h2>
                    <Dropdown options={getDropdownDisplayItems(colors)} onChange={handleDropdownChange} value={colorItem.name} placeholder="Select an option" />
                </>
                :
                <>
                    <h2>
                        {`Great! Thanks for your help! So ${imageItem.item} is actually the color ${selectedColorState}?`}
                    </h2>
                    <button onClick={() => handleTryAgain()}>No, sorry! Let me try again.</button>
                    <button onClick={() => handleColorCorrection(imageItem, selectedColorState)}>That's right!</button>
                </>}
        </div>
    );
};

export default TellColorPrompt;