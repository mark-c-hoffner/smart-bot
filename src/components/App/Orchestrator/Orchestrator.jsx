import React, { useState } from "react";
import random from "../../../tools/random";
import matchData from "../../../tools/matchData";
import imageData from "../../../tools/imageData";

import AssertionPrompt from "./AssertionPrompt";

/**
 * React Function Component manages picture and color state. Displays assertions and prompts after user input.
 * @returns {JSX.Element} - A React Component instance.
 */
const Orchestrator = () => {
    const [colors, setColors] = useState(matchData);
    const [pictures, setPictures] = useState(imageData);

    const [assertionComponent, setAssertionComponent] = useState();
    const [responseComponent, setResponseComponent] = useState();

    const getAnAssertion = (lastColorItem) => {
        setResponseComponent(null);
        const colorItem = getRandomColorItem(lastColorItem);
        const pictureItem = getPictureItem(colorItem);
        setAssertionComponent(<AssertionPrompt pictureItem={pictureItem} colorItem={colorItem} handleWrong={handleWrong} handleCorrect={handleCorrect} />);
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
        if (colorItem != null) {
            const foundPictureItem = pictures.find(p => p.id === colorItem.match);
            if (foundPictureItem != null) {
                return foundPictureItem;
            }
        }
        const picturesNum = random(0, pictures.length - 1);
        return pictures[picturesNum];
    }

    const handleWrong = (pictureItem, colorItem) => { }

    const handleCorrect = (pictureItem, colorItem) => { }

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