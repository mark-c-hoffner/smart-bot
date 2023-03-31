import random from "./random";
import matchDataSeed from "./matchData";
import imageData from "./imageData";

let matchData = matchDataSeed;

/**
 * Function returns a random image item from the image data.
 * @param {Object} excludedImageItem - An image item to exclude from the random item selection.
 * @returns {Object} - A random image item.
 */
export const getRandomImageItem = (excludedImageItem) => {
    const imageCopy = [...imageData];
    if (excludedImageItem != null) {
        const i = imageCopy.indexOf(excludedImageItem);
        imageCopy.splice(i, 1);
    }
    const imageNum = random(0, imageCopy.length - 1);
    return imageCopy[imageNum];
}

/**
 * Function returns a color item based on the given image item.
 * @param {Object} imageItemToMatch - An image item to check for a color item match against.
 * @returns {Object} - A matched or random color item.
 */
export const getColorItemFromImage = (imageItemToMatch) => {
    const foundColorItem = matchData.find(e => e.match === imageItemToMatch.id);
    if (foundColorItem != null) {
        return foundColorItem;
    }
    const colorNum = random(0, matchData.length - 1);
    return matchData[colorNum];
}

/**
 * Function checks if a color item's match has been changed and updates the match data.
 * @param {Object} imageItem - An image item whose color match may have changed.
 * @param {String} colorName - The name of a color that matches the image item.
 * @returns {Object} - The color item that matches the given image item.
 */
export const updateColors = (imageItem, colorName) => {
    const colorItem = matchData.find(e => e.name === colorName);
    if (colorItem.match != imageItem.id) {
        colorItem.match = imageItem.id;
        const matchClone = [...matchData];
        const i = matchClone.findIndex(f => f.name === colorItem.name);
        matchClone[i] = colorItem;
        matchData = matchClone;
    }
    return colorItem;
}

/**
 * Function returns the entire match data array.
 * @returns {Array} - An array of color items.
 */
export const getAllColorOptions = () => {
    return matchData;
}

/**
 * Function resets match data to the original seed.
 */
export const resetMatchData = () => {
    matchData = matchDataSeed;
}