import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

import { getWrongText, getMistakeText, getCorrectionText, getCorrectionMistakeText } from "../../../../tools/text-data";
import TextAnimationWrapper from "../../TextAnimationWrapper";

/**
 * React Function Component displays correct response and prompt for another assertion
 * @param {Object} imageItem - The picture item for the assertion.
 * @param {Object} colorItem - The color item for the assertion.
 * @param {Array} colors - An array of color items.
 * @param {Function} handleColorCorrection - Function called to set the actual color of imageItem.
 * @param {Function} handleCorrect - Function called when user prompts correct.
 * @returns {JSX.Element} - A React Component instance.
 */
const TellColorPrompt = ({ imageItem, colorItem, colors, handleColorCorrection, handleCorrect }) => {
    const [wrongText, setWrongText] = useState(getWrongText(imageItem.item));
    const [interactable, setInteractable] = useState();

    useEffect(() => {
        setInteractableToDropDown();
    }, []);

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

    const setInteractableToDropDown = () => {
        setInteractable(<Dropdown options={getDropdownDisplayItems(colors)} onChange={handleDropdownChange} value={colorItem.name} />);
    }

    const handleDropdownChange = (e) => {
        if (colorItem.name != e.value) {
            setWrongText(getCorrectionText(imageItem.item, e.value));
            setInteractable(
                <>
                    <button onClick={() => handleTryAgain()}>No, sorry! Let me try again.</button>
                    <button onClick={() => handleColorCorrection(imageItem, e.value)}>That's right!</button>
                </>
            );
        } else {
            setWrongText(getCorrectionMistakeText(imageItem.item, e.value));
            setInteractable(
                <>
                    <button onClick={() => handleTryAgain()}>My mistake, smart-bot. Let me try again.</button>
                    <button onClick={() => handleCorrect(imageItem, colorItem)}>I'm so sorry, smart-bot. You were right the first time.</button>
                </>
            );
        }
    };

    const handleTryAgain = () => {
        setInteractableToDropDown();
        setWrongText(getMistakeText(imageItem.item))
    };

    return (
        <div>
            <TextAnimationWrapper textSourceArray={wrongText} />
            {interactable}
        </div>
    );
};

export default TellColorPrompt;