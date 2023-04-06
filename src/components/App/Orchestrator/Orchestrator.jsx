import React, { useEffect, useState } from "react";

import { getRandomImageItem, getColorItemFromImage, updateColors, getAllColorOptions } from "../../../tools/matchDataManager";
import { getWelcomeText, getAnswerIsCorrectText, getColorCorrectionText, getWrongText, getMistakeText, getCorrectionText, getCorrectionMistakeText, getAssertionText } from "../../../tools/text-data";
import TextAnimationWrapper from "../TextAnimationWrapper";
import DropdownWrapper from "../DropdownWrapper";
import ButtonWrapper from "../ButtonWrapper";

/**
 * React Function Component manages picture and color state. Displays assertions and prompts after user input.
 * @returns {JSX.Element} - A React Component instance.
 */
const Orchestrator = () => {
    const [textToAnimate, setTextToAnimate] = useState([]);
    const [interactable, setInteractable] = useState();
    const [imageDisplayItem, setImageDisplayItem] = useState({});

    useEffect(() => {
        const text = getWelcomeText();
        setTextToAnimate(text.body);
        setInteractable(getButtonWrapper([{ action: () => getAnAssertion(null), text: text.buttons[0] }]));
    }, []);

    const getAnAssertion = (lastImageItem) => {
        const imageItem = getRandomImageItem(lastImageItem);
        const colorItem = getColorItemFromImage(imageItem);

        setImageDisplayItem(imageItem);
        const text = getAssertionText(colorItem.name);
        setTextToAnimate(text.body);
        setInteractable(
            getButtonWrapper([
                { action: () => handleWrong(imageItem, colorItem), text: text.buttons[0] },
                { action: () => handleCorrect(imageItem, colorItem.name), text: text.buttons[1] }
            ])
        );
    }

    const handleCorrect = (imageItem, colorName) => {
        updateColors(imageItem, colorName);

        const text = getAnswerIsCorrectText(colorName);
        setTextToAnimate(text.body);
        setInteractable(getAssertionButton(imageItem, text.buttons));
    }

    const handleWrong = (imageItem, colorItem) => {
        const text = getWrongText();
        setTextToAnimate(text.body);
        setInteractable(getDropdownWrapper(imageItem, colorItem));
    }

    const handleDropdownChange = (imageItem, colorItem, e) => {
        if (colorItem.name != e.value) {
            const text = getCorrectionText(e.value);
            setTextToAnimate(text.body);
            setInteractable(
                getButtonWrapper([
                    { action: () => handleTryAgain(imageItem, colorItem), text: text.buttons[0] },
                    { action: () => handleColorCorrection(imageItem, e.value), text: text.buttons[1] }
                ])
            );
        } else {
            const text = getCorrectionMistakeText(e.value);
            setTextToAnimate(text.body);
            setInteractable(
                getButtonWrapper([
                    { action: () => handleTryAgain(imageItem, colorItem), text: text.buttons[0] },
                    { action: () => handleCorrect(imageItem, e.value), text: text.buttons[1] }
                ])
            );
        }
    };

    const handleTryAgain = (imageItem, colorItem) => {
        const text = getMistakeText();
        setTextToAnimate(text.body);
        setInteractable(getDropdownWrapper(imageItem, colorItem));
    };

    const handleColorCorrection = (imageItem, colorName) => {
        updateColors(imageItem, colorName);

        const text = getColorCorrectionText(colorName);
        setTextToAnimate(text.body);
        setInteractable(getAssertionButton(imageItem, text.buttons));
    }

    const getAssertionButton = (imageItem, buttonText) => {
        return getButtonWrapper([{ action: () => getAnAssertion(imageItem), text: buttonText[0] }]);
    }

    const getDropdownWrapper = (imageItem, colorItem) => {
        return <DropdownWrapper imageItem={imageItem} colorItem={colorItem} colors={getAllColorOptions()} handleDropdownChange={handleDropdownChange} />;
    }

    const getButtonWrapper = (data) => {
        return <ButtonWrapper buttonDefinitions={data} />;
    }

    return (
        <div>
            <img src={imageDisplayItem.source} alt={imageDisplayItem.alt} />
            <TextAnimationWrapper textSourceArray={textToAnimate} />
            {interactable}
        </div>
    );
};

export default Orchestrator;