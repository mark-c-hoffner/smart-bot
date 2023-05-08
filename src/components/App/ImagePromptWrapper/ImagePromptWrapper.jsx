import React, { useEffect, useState } from "react";
import "./image-prompt-wrapper.css";

/**
 * React Function Component wraps image.
 * @param {Object} imageDisplayItem - Source and alt text for image to display.
 * @returns {JSX.Element} - A React Component instance.
 */
const ImagePromptWrapper = ({ imageDisplayItem }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (imageDisplayItem.source != null) {
            setVisible(true);
        }
    }, [imageDisplayItem]);

    return (
        <div className={['image-container', (visible) ? 'visible' : 'notVisible'].join(' ')} data-testid={"image-container"} >
            <img src={imageDisplayItem.source} alt={imageDisplayItem.alt} />
        </div >
    );
};

export default ImagePromptWrapper;