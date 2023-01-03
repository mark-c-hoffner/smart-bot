import React from "react"
import { Helmet } from "react-helmet"
import './App.css'

/**
 * React Function Component 
 * @returns {JSX.Element} - A React Component instance.
 */
const App = () => {
    return (
        <div className="App">
            <Helmet>
                <meta charset="utf-8" />
                <title>smart bot</title>
            </Helmet>
            <div className="centered" data-testid="title">
                <h1>smart bot</h1>
                <h2>The smartest bot in the world.</h2>
            </div>
        </div >
    )
}

export default App