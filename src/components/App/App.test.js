import React from 'react';
import { render, waitFor } from '@testing-library/react';

const githublinkMock = jest.fn()
const orchestratorMock = jest.fn()

describe('App', () => {

    let App;

    beforeEach(async () => {
        jest.doMock('./GitHubLink', () => githublinkMock)
        jest.doMock('./Orchestrator', () => orchestratorMock)

        const obj = await import('./App.jsx');
        App = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<App />);
    })

    it('displays the title', async () => {
        render(<App />);
        await waitFor(() => expect(document.title).toBe('smart-bot'));
    })

    it('displays the text', () => {
        const { getByText } = render(<App />);
        expect(getByText('smart-bot')).toBeTruthy();
    })

    it('renders GitHubLink component with proper address', () => {
        render(<App />);
        expect(githublinkMock.mock.lastCall[0].linkAddress).toBe("https://github.com/mark-c-hoffner/smart-bot");
    })

    it('renders Orchestrator component', () => {
        render(<App />);
        expect(orchestratorMock).toHaveBeenCalled();
    })
})