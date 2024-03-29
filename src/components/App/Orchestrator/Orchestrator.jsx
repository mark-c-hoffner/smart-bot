import React, { useState } from "react";

import { getRandomImageItem, getColorItemFromImage, updateColors, getAllColorOptions } from "../../../tools/match-data-manager";
import { getRankQuoteText, getWelcomeText, getAnswerIsCorrectText, getColorCorrectionText, getWrongText, getMistakeText, getCorrectionText, getCorrectionMistakeText, getAssertionText } from "../../../tools/text-data";
import botRank from "../../../tools/rank-getter";

import ImagePromptWrapper from "../ImagePromptWrapper";
import BotHead from "../BotHead";
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
    const [interactableVisible, setInteractableVisible] = useState(false);
    const [isAnimatingMouth, setIsAnimatingMouth] = useState(false);
    const [isTypingAnimationSkippable, setIsTypingAnimationSkippable] = useState(false);
    const [startupComplete, setStartupComplete] = useState(false);

    const bootupCompletionCallback = () => {
        const text = getWelcomeText(botRank);
        setTextToAnimate(text.body);
        doInteractableChange(getButtonWrapper([{ action: () => getAnAssertion(null), text: text.buttons[0] }]));
        setStartupComplete(true);
    };

    const doInteractableChange = (interactable) => {
        setIsTypingAnimationSkippable(true);
        setInteractableVisible(false);
        setInteractable(interactable);
    }

    const getAnAssertion = (lastImageItem) => {
        const imageItem = getRandomImageItem(lastImageItem);
        const colorItem = getColorItemFromImage(imageItem);

        const text = getAssertionText(colorItem.name);
        setTextToAnimate(text.body);
        doInteractableChange(
            getButtonWrapper([
                { action: () => handleWrong(imageItem, colorItem), text: text.buttons[0] },
                { action: () => handleCorrect(imageItem, colorItem.name), text: text.buttons[1] }
            ])
        );
        setImageDisplayItem(imageItem);
    }

    const handleCorrect = (imageItem, colorName) => {
        updateColors(imageItem, colorName);

        const text = getAnswerIsCorrectText(colorName);
        setTextToAnimate(text.body);
        doInteractableChange(getAssertionButton(imageItem, text.buttons));
    }

    const handleWrong = (imageItem, colorItem) => {
        const text = getWrongText();
        setTextToAnimate(text.body);
        doInteractableChange(getDropdownWrapper(imageItem, colorItem));
    }

    const handleDropdownChange = (imageItem, colorItem, e) => {
        if (colorItem.name != e.value) {
            const text = getCorrectionText(e.value);
            setTextToAnimate(text.body);
            doInteractableChange(
                getButtonWrapper([
                    { action: () => handleTryAgain(imageItem, colorItem), text: text.buttons[0] },
                    { action: () => handleColorCorrection(imageItem, e.value), text: text.buttons[1] }
                ])
            );
        } else {
            const text = getCorrectionMistakeText(e.value);
            setTextToAnimate(text.body);
            doInteractableChange(
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
        doInteractableChange(getDropdownWrapper(imageItem, colorItem));
    };

    const handleColorCorrection = (imageItem, colorName) => {
        updateColors(imageItem, colorName);

        const text = getColorCorrectionText(colorName);
        setTextToAnimate(text.body);
        doInteractableChange(getAssertionButton(imageItem, text.buttons));
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

    const textAnimationCompletionCallback = () => {
        setInteractableVisible(true);
        setIsTypingAnimationSkippable(false);
    }

    const textStartCallback = () => {
        setIsAnimatingMouth(true);
    }

    const textStopCallback = () => {
        setIsAnimatingMouth(false);
    }

    return (
        <div className="main-body-container">
            <h2>{getRankQuoteText(botRank)}</h2>
            <BotHead isAnimatingMouth={isAnimatingMouth} bootupCompletionCallback={bootupCompletionCallback} />
            {startupComplete ?
                <>
                    <div className="bot-dialog-box">
                        <ImagePromptWrapper imageDisplayItem={imageDisplayItem} />
                        <TextAnimationWrapper
                            textSourceArray={textToAnimate}
                            textStartCallback={textStartCallback}
                            textStopCallback={textStopCallback}
                            completionCallback={textAnimationCompletionCallback}
                            isSkippable={isTypingAnimationSkippable}
                        />
                    </div>
                    <div className="interactableContainer">
                        {interactableVisible ? interactable : <></>}
                    </div>
                </>
                :
                <></>
            }
        </div>
    );
};

export default Orchestrator;