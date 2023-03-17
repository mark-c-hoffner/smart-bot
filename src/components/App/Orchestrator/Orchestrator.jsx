import React, { useState } from "react";
import random from "../../../tools/random";
import matchData from "../../../tools/matchData";
import imageData from "../../../tools/imageData";

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

    const getAnAssertion = (lastColorItem) => {
        setResponseComponent(null);
        const colorItem = getRandomColorItem(lastColorItem);
        const imageItem = getPictureItem(colorItem);
        setAssertionComponent(<AssertionPrompt imageItem={imageItem} colorItem={colorItem} handleWrong={handleWrong} handleCorrect={handleCorrect} />);
    }

    const getRandomColorItem = (lastColorItem) => {
        const colorCopy = [...colors];
        if (lastColorItem != null) {
            const i = colorCopy.indexOf(lastColorItem);
            colorCopy.splice(i, 1);
        }
        const colorNum = random(0, colorCopy.length - 1);
        return colorCopy[colorNum];
    }

    const getPictureItem = (colorItem) => {
        const foundPictureItem = images.find(p => p.id === colorItem.match);
        if (foundPictureItem != null) {
            return foundPictureItem;
        }
        const imagesNum = random(0, images.length - 1);
        return images[imagesNum];
    }

    const handleCorrect = (imageItem, colorItem) => {
        setAssertionComponent(null);
        setResponseComponent(
            <CorrectResponsePrompt
                imageItem={imageItem}
                colorItem={colorItem}
                getAnAssertion={getAnAssertion}
                promptText={`HA! :):) I always knew that the ${imageItem.item} was the color ${colorItem.name}. :):)`}
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
        setResponseComponent(<TellColorPrompt imageItem={imageItem} colorItem={colorItem} colors={colors} handleColorCorrection={handleColorCorrection} />);
    }

    const handleColorCorrection = (imageItem, newColor) => {
        setResponseComponent(null);
        const newColorItem = colors.find(e => e.name === newColor);
        newColorItem.match = imageItem.id;
        setColors((prev) => {
            const i = prev.findIndex(f => f.name === newColorItem.name);
            prev[i] = newColorItem;
            return prev;
        });
        setResponseComponent(
            <CorrectResponsePrompt
                imageItem={imageItem}
                colorItem={newColorItem}
                getAnAssertion={getAnAssertion}
                promptText={`Oh wow! That makes so much more sense that the ${imageItem.item} is the color ${newColorItem.name}. Thank you so much! :):)`}
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
                        <h2>
                            {`Hi there! :):) I'm smart-bot. Not to toot my own horn, but some say I'm the smartest bot on the web. Do you want to see what I know?`}
                        </h2>
                        <button onClick={() => getAnAssertion(null)}>That's why I'm here!</button>
                    </>
            }
        </div>
    );
};

export default Orchestrator;