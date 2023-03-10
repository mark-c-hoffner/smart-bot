import React, { useState } from "react";
import random from "../../../tools/random";
import matchData from "../../../tools/matchData";
import imageData from "../../../tools/imageData";

import AssertionPrompt from "./AssertionPrompt";
import CorrectResponsePrompt from "./CorrectResponsePrompt";

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

    const handleWrong = (imageItem, colorItem) => { }

    const handleCorrect = (imageItem, colorItem) => {
        setAssertionComponent(null);
        setResponseComponent(<CorrectResponsePrompt imageItem={imageItem} colorItem={colorItem} getAnAssertion={getAnAssertion} />);
        if (colorItem.match != imageItem.id) {
            colorItem.match = imageItem.id;
            setColors((prev) => {
                const i = prev.findIndex(f => f.name === colorItem.name);
                prev[i] = colorItem;
                return prev;
            });
        }
    }

    return (
        <div>
            {(assertionComponent != null) ?
                <> {assertionComponent} </>
                :
                (responseComponent != null) ?
                    <> {responseComponent} </>
                    :
                    <button onClick={() => getAnAssertion(null)}>See what I know?</button>
            }
        </div>
    );
};

export default Orchestrator;