import React from "react";
import Select from "react-select";

/**
 * React Function Component wraps the dropdown library and prepares color list for dropdown display.
 * @param {Object} imageItem - The image item for the assertion.
 * @param {Object} colorItem - The color item for the assertion.
 * @param {Array} colors - An array of color items.
 * @param {Function} handleDropdownChange - Function called when dropdown changes.
 * @returns {JSX.Element} - A React Component instance.
 */
const DropdownWrapper = ({ imageItem, colorItem, colors, handleDropdownChange }) => {

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

    return (
        <Select options={getDropdownDisplayItems(colors)} onChange={e => handleDropdownChange(imageItem, colorItem, e)} placeholder={colorItem.name} />
    );
};

export default DropdownWrapper;