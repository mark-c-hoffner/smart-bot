import React, { useState } from "react";
import random from "../../../tools/random";
import { getWelcomeText, getAnswerIsCorrectText, getColorCorrectionText } from "../../../tools/text-data";
import matchData from "../../../tools/matchData";
import imageData from "../../../tools/imageData";

import TextAnimationWrapper from "../TextAnimationWrapper";
import AssertionPrompt from "./AssertionPrompt";
import CorrectResponsePrompt from "./CorrectResponsePrompt";
import TellColorPrompt from "./TellColorPrompt";

/**
 * React Function Component manages picture and color state. Displays assertions and prompts after user input.
 * @returns {JSX.Element} - A React Component instance.
 */
const Orchestrator = () => {
    const [colors, setColors] = useState(matchData);
    const [images, setImages] = useState(imageData);

    const [assertionComponent, setAssertionComponent] = useState();
    const [responseComponent, setResponseComponent] = useState();

    const getAnAssertion = (lastImageItem) => {
        setResponseComponent(null);
        const imageItem = getRandomImageItem(lastImageItem);
        const colorItem = getColorItem(imageItem);
        setAssertionComponent(<AssertionPrompt imageItem={imageItem} colorItem={colorItem} handleWrong={handleWrong} handleCorrect={handleCorrect} />);
    }

    const getRandomImageItem = (lastImageItem) => {
        const imageCopy = [...images];
        if (lastImageItem != null) {
            const i = imageCopy.indexOf(lastImageItem);
            imageCopy.splice(i, 1);
        }
        const imageNum = random(0, imageCopy.length - 1);
        return imageCopy[imageNum];
    }

    const getColorItem = (imageItem) => {
        const foundColorItem = colors.find(p => p.match === imageItem.id);
        if (foundColorItem != null) {
            return foundColorItem;
        }
        const colorNum = random(0, colors.length - 1);
        return colors[colorNum];
    }

    const handleCorrect = (imageItem, colorItem) => {
        setAssertionComponent(null);
        setResponseComponent(
            <CorrectResponsePrompt
                imageItem={imageItem}
                colorItem={colorItem}
                getAnAssertion={getAnAssertion}
                promptText={getAnswerIsCorrectText(imageItem.item, colorItem.name)}
            />
        );
        if (colorItem.match != imageItem.id) {
            colorItem.match = imageItem.id;
            setColors((prev) => {
                const i = prev.findIndex(f => f.name === colorItem.name);
                prev[i] = colorItem;
                return prev;
            });
        }
    }

    const handleWrong = (imageItem, colorItem) => {
        setAssertionComponent(null);
        setResponseComponent(<TellColorPrompt imageItem={imageItem} colorItem={colorItem} colors={colors} handleColorCorrection={handleColorCorrection} handleCorrect={handleCorrect} />);
    }

    const handleColorCorrection = (imageItem, newColor) => {
        setResponseComponent(null);
        const newColorItem = colors.find(e => e.name === newColor);
        newColorItem.match = imageItem.id;
        setColors((prev) => {
            const i = prev.findIndex(f => f.name === newColorItem.name);
            prev[i] = newColorItem;
            console.log(images)
            console.log(prev)
            return prev;
        });
        setResponseComponent(
            <CorrectResponsePrompt
                imageItem={imageItem}
                colorItem={newColorItem}
                getAnAssertion={getAnAssertion}
                promptText={getColorCorrectionText(imageItem.item, newColorItem.name)}
            />
        );
    }

    return (
        <div>
            {(assertionComponent != null) ?
                <> {assertionComponent} </>
                :
                (responseComponent != null) ?
                    <> {responseComponent} </>
                    :
                    <>
                        <TextAnimationWrapper textSourceArray={getWelcomeText()} />
                        <button onClick={() => getAnAssertion(null)}>That's why I'm here!</button>
                    </>
            }
        </div>
    );
};

export default Orchestrator;