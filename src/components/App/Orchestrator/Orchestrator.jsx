import React from "react";
import { useState } from "react";

import { getWelcomeText, getAnswerIsCorrectText, getColorCorrectionText, getWrongText, getMistakeText, getCorrectionText, getCorrectionMistakeText, getAssertionText } from "../../../tools/text-data";
import TextAnimationWrapper from "../TextAnimationWrapper";
import DropdownWrapper from "../DropdownWrapper";
import { getRandomImageItem, getColorItemFromImage, updateColors, getAllColorOptions } from "../../../tools/matchDataManager";

/**
 * React Function Component manages picture and color state. Displays assertions and prompts after user input.
 * @returns {JSX.Element} - A React Component instance.
 */
const Orchestrator = () => {
    const [textToAnimate, setTextToAnimate] = useState(getWelcomeText());
    const [interactable, setInteractable] = useState(<button onClick={() => getAnAssertion(null)}>That's why I'm here!</button>);

    const getAnAssertion = (lastImageItem) => {
        const imageItem = getRandomImageItem(lastImageItem);
        const colorItem = getColorItemFromImage(imageItem);

        setTextToAnimate(getAssertionText(imageItem.item, colorItem.name));
        setInteractable(<>
            <button onClick={() => handleWrong(imageItem, colorItem)}>Wrong!</button>
            <button onClick={() => handleCorrect(imageItem, colorItem)}>That's right!</button>
        </>)
    }

    const handleCorrect = (imageItem, colorItem) => {
        updateColors(imageItem, colorItem.name);

        setTextToAnimate(getAnswerIsCorrectText(imageItem.item, colorItem.name));
        setInteractable(getAssertionButton());
    }

    const handleWrong = (imageItem, colorItem) => {
        setTextToAnimate(getWrongText(imageItem.item));
        setInteractable(getDropdownWrapper(imageItem, colorItem));
    }

    const handleDropdownChange = (imageItem, colorItem, e) => {
        if (colorItem.name != e.value) {
            setTextToAnimate(getCorrectionText(imageItem.item, e.value));
            setInteractable(
                <>
                    <button onClick={() => handleTryAgain(imageItem, colorItem)}>No, sorry! Let me try again.</button>
                    <button onClick={() => handleColorCorrection(imageItem, e.value)}>That's right!</button>
                </>
            );
        } else {
            setTextToAnimate(getCorrectionMistakeText(imageItem.item, e.value));
            setInteractable(
                <>
                    <button onClick={() => handleTryAgain(imageItem, colorItem)}>My mistake, smart-bot. Let me try again.</button>
                    <button onClick={() => handleCorrect(imageItem, colorItem)}>I'm so sorry, smart-bot. You were right the first time.</button>
                </>
            );
        }
    };

    const handleTryAgain = (imageItem, colorItem) => {
        setTextToAnimate(getMistakeText(imageItem.item))
        setInteractable(getDropdownWrapper(imageItem, colorItem));
    };

    const handleColorCorrection = (imageItem, newColor) => {
        const newColorItem = updateColors(imageItem, newColor);
        
        setTextToAnimate(getColorCorrectionText(imageItem.item, newColorItem.name));
        setInteractable(getAssertionButton());
    }

    const getAssertionButton = (imageItem) => {
        return <button onClick={() => getAnAssertion(imageItem)}>What else do you know?</button>;
    }

    const getDropdownWrapper = (imageItem, colorItem) => {
        return <DropdownWrapper imageItem={imageItem} colorItem={colorItem} colors={getAllColorOptions()} handleDropdownChange={handleDropdownChange} />;
    }
    
    return (
        <div>
            <TextAnimationWrapper textSourceArray={textToAnimate} />
            {interactable}
        </div>
    );
};

export default Orchestrator;