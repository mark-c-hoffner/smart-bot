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

    const fontSize = 'clamp(1em, 3.7dvh, 2.5em)';

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
            boxShadow: "none",
            cursor: "pointer",
            // fontSize: fontSize,
            minHeight: '1em',
            height: "max-content",
            padding: "1px 6px",
            margin: "0px",
            borderImageSlice: "1",
            borderWidth: ".2em",
            borderTop: "0",
            borderLeft: "0",
            borderRight: "0",
            backgroundColor: "#161616",
            borderImageSource: "radial-gradient(rgb(255, 255, 255), #161616)"
        }),
        valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            padding: "0%"
        }),
        placeholder: (baseStyles, state) => ({
            ...baseStyles,
            color: rgb(213, 213, 213),
            margin: "0%",
            padding: "0%",
            "&:hover": {
                color: "white",
            },
        }),
        singleValue: (baseStyles, state) => ({
            ...baseStyles,
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
            fontSize: state.isFocused ? 'clamp(1.2em, 4.2dvh, 3.2em)' : fontSize,
            padding: "1%",
            "&:active": {
                backgroundColor: rgb(90, 90, 90),
            },
        }),
        dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            paddingTop: "0%",
            paddingBottom: "0%",
            fontSize: fontSize,
            minHeight: '1em',
            "svg:first-of-type": {
                width: fontSize,
                height: fontSize
            },
        }),
        indicatorSeparator: (baseStyles, state) => ({
            ...baseStyles,
            padding: "0%",
            margin: "0%",
            minHeight: '10px',
        }),
        indicatorsContainer: (baseStyles, state) => ({
            ...baseStyles,
            padding: "0%",
            minHeight: '1em',
            "svg:first-of-type": {
                width: fontSize,
                height: fontSize
            },
        })
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