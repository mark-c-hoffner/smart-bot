import React from "react";
import GitHubLogo from "./github-mark-white.svg"

/**
 * React Function Component displays github logo and link to project page.
 * @param {String} linkAddress - Address to link to.
 * @returns {JSX.Element} - A React Component instance.
 */
const GitHubLink = ({ linkAddress }) => {
    return (
        <a href={linkAddress} target="_blank" rel="noopener noreferrer" >
            <img src={GitHubLogo} alt={"GitHub Logo"} height={"50em"} width={"50em"} />
        </a>
    );
};

export default GitHubLink;