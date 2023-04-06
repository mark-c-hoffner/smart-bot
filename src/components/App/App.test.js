import React from 'react';
import { render, waitFor } from '@testing-library/react';

const orchestratorMock = jest.fn()

describe('App', () => {

    let App;

    beforeEach(async () => {
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

    it('renders Orchestrator component', () => {
        render(<App />);
        expect(orchestratorMock).toHaveBeenCalled();
    })
})