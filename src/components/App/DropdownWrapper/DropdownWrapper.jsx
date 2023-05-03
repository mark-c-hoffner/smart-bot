import React from "react";
import Select from "react-select";
import "./dropdown-wrapper.css";

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

    const rgb = (r, g, b) => {
        return `rgb(${r}, ${g}, ${b})`;
    }

    const selectStyling = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            textAlign: "center",
            border: "none",
            cursor: "pointer",
            boxShadow: "inset 0em 1.9em #161616",
            background: "radial-gradient(rgb(255, 255, 255), #161616)",
            minHeight: "0px",
            height: "2.1em",
            paddingBottom: "0px"
        }),
        placeholder: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: "1.4em",
            color: rgb(213, 213, 213),
            "&:hover": {
                color: "white",
            },
        }),
        singleValue: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: "1.4em",
            color: rgb(213, 213, 213),
            "&:hover": {
                color: "white",
            },
        }),
        menu: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: rgb(22, 22, 22),
            color: rgb(230, 230, 230),
            marginTop: "0%"
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            cursor: "pointer",
            backgroundColor: state.isFocused ? rgb(60, 60, 60) : rgb(50, 50, 50),
            color: state.isFocused ? rgb(255, 255, 255) : rgb(230, 230, 230),
            fontSize: state.isFocused ? '1.1em' : '1em'
        }),
    }

    return (
        <Select
            className="dropdown-container"
            styles={selectStyling}
            isSearchable={false}
            isClearable={false}
            placeholder={colorItem.name}
            options={getDropdownDisplayItems(colors)}
            onChange={e => handleDropdownChange(imageItem, colorItem, e)}
        />
    );
};

export default DropdownWrapper;