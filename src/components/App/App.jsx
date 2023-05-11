import React from "react";
import { Helmet } from "react-helmet";
import './App.css';

import GitHubLink from "./GitHubLink";
import Orchestrator from "./Orchestrator";

/**
 * React Function Component displays title and starts Orchestrator.
 * @returns {JSX.Element} - A React Component instance.
 */
const App = () => {

    const projectAddress = "https://github.com/mark-c-hoffner/smart-bot";

    return (
        <div className="App">
            <Helmet>
                <meta charset="utf-8" />
                <title>smart-bot</title>
            </Helmet>
            <div className="topRight">
                <GitHubLink linkAddress={projectAddress} />
            </div>
            <div className="centered" data-testid="title">
                <h1>smart-bot</h1>
            </div>
            <Orchestrator />
        </div >
    )
}

export default App;